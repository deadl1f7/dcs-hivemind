# DCS-HIVEMIND

## Purpose

Create an agent integration with dcs.
This is a crude POC of what can be done, theres alot of bugs, missing loadouts for some flights etc.
In the future a agent environment controlled via discord bot would be a viable approach.

## Architecture

```mermaid
flowchart LR
    A[Copilot] --> B[MCP Server]
    B --> C[dcs-grpc]
    C --> D[DCS Lua / MOOSE]
```

## Requirements

- Github Copilot Preferably Premium to leverage more advanced models.

- NodeJS (<https://nodejs.org/en/download>)

- aspire (<https://aspire.dev/get-started/install-cli/>)

- dcs-grpc (<https://github.com/DCS-gRPC/rust-server>) Follow the guide to install and enable: ```eval = true``` (DANGER MAKE SURE YOU UNDERSTAND WHAT THIS IMPLIES), in the config at ```~/Saved Games/DCS/Config/dcs-grpc.lua```

- Add ```dofile(lfs.writedir()..[[Scripts\DCS-gRPC\grpc-mission.lua]])``` to the ```C:/SteamLibrary/steamapps/common/DCSWorld/Scripts/MissionScripting.lua``` or ED directory.

## Getting started

1. Start aspire ```aspire start```
2. Start the DCS mission

## Using it

### Creating a mission

Chat: "```@Hivemind``` Lets create a mission!" and follow the creation procedure to create a scenario.

### Commanding forces

Chat: "```@Hivemind``` Begin tactical session" to begin commanding the forces as described by the procedure.

### If failing to interact

Check connection with
Chat: ```/test-mcp-health```

### Agents

| Agent | Description |
|-------|-------------|
| `@Hivemind` | Top-level orchestrator. Delegates mission creation, tactical analysis, and battlefield command to specialist subagents. Entry point for all high-level tasks. |
| `@MissionBuilder` | Composes and injects Lua/Moose scenarios into a live DCS mission via gRPC `Eval`. Spawns groups, sets up AI dispatchers, SEAD, CAP, and autonomous logic. |
| `@Commander` | Autonomous battlefield commander for one faction. Reads the AWACS radar picture and issues orders to AI units every tactical cycle. |

### Skills

#### Workflow Skills

| Skill | Description |
|-------|-------------|
| `create-mission` | Interviews the user, queries the live theatre, and generates a full structured mission spec (factions, flights, SAM sites, IADS, objectives) then hands it to MissionBuilder. |
| `start-commander` | Initialises a tactical AI session and activates the Commander agent for a chosen faction. |
| `test-mcp-health` | Verifies MCP server connectivity and gRPC client status via the `check_health` tool. |
| `test-rest-health` | Verifies REST API availability and gRPC client status via the REST health endpoint. |
| `aspire` | Manages the Aspire AppHost — start/stop, debug logs, adding integrations, and invoking MCP tools via the `aspire mcp` CLI. |

#### DCS gRPC Service Skills

Each skill is a thin wrapper around a DCS-gRPC proto service, providing ready-to-use `call_grpc_method` patterns.

| Skill | Service | What it does |
|-------|---------|--------------|
| `dcs-atmosphere` | Atmosphere | Query wind, temperature, and pressure at a map position. |
| `dcs-coalition` | Coalition | Spawn/query groups and static objects, list players, get reference points per coalition. |
| `dcs-common` | Common | Shared enums and types (ObjectCategory, Coalition side, etc.) used across all other services. |
| `dcs-controller` | Controller | Set unit alarm state (GREEN/RED/AUTO) and query detected targets. |
| `dcs-custom` | Custom | Non-standard APIs: DCT integration, mission `Eval` (Lua execution), magnetic declination. |
| `dcs-group` | Group | List units in a group, activate/deactivate groups, destroy groups. |
| `dcs-hook` | Hook | Mission lifecycle control — pause, unpause, load missions, get mission name/filename, hook-env evaluation. |
| `dcs-metadata` | Metadata | Health check and version info for the gRPC service itself. |
| `dcs-mission` | Mission | Stream live DCS events and unit updates, manage scenario time, issue mission/coalition commands. |
| `dcs-net` | Net | Multiplayer management — send chat, kick players, force slot changes. |
| `dcs-raw` | (any) | Fallback skill for calling any gRPC method when no specific skill exists. |
| `dcs-srs` | SRS | Text-to-speech radio transmissions and SRS client management via Simple Radio Standalone. |
| `dcs-timer` | Timer | Query elapsed mission time and absolute date/time within the scenario. |
| `dcs-trigger` | Trigger | Display on-screen text, manage map marks, set/get user flags, fire trigger actions. |
| `dcs-unit` | Unit | Query individual unit properties — position, velocity, radar, player name, emissions. |
| `dcs-world` | World | Query airbases, map marks, and theatre (map) information. |

### Assets (`.github/assets/`)

Reference documents consumed by agents during mission planning and scenario building.

| File | Description |
|------|-------------|
| `unit-reference.md` | Exact DCS `type` strings for ground units, vehicles, and statics extracted live from DCS. Use these to avoid silent substitution bugs. |
| `loadout-reference.md` | Payload pylon tables and CLSID reference extracted verbatim from DCS `UnitPayloads` files. Do not invent CLSIDs. |
| `theatre-reference.md` | Quick reference for each DCS map — key regions, airbases, and common scenario focal points. |

### Available Libraries

- **`libs/mission-builder-lib.lua`** — Core prelude. Must be injected before any `MB_*` function calls.
- **`libs/Moose/`** — MOOSE source is included to piggy back on VSCode's indexing capability to improve intelligence of the agent, it can make semantic searches instead of loading everything into context. A point-in-time snapshot of the [MOOSE framework](https://github.com/FlightControl-Master/MOOSE) is included in this repo. It is **not** automatically kept up to date and may lag behind the current MOOSE release. Read the Moose source files from `libs/Moose/` when you need to understand available APIs or class signatures, but do not assume the snapshot reflects the latest upstream changes.

## How Lua Execution Works

All scenario code is injected into the live DCS mission at runtime — no mission file editing required.

### The Execution Path

```
Copilot (MissionBuilder agent)
  └─▶ call_grpc_method { method: "Eval", payload: { luaCode: "..." } }
        └─▶ dcs-grpc-wrapper MCP Server (Node.js)
              └─▶ gRPC → DCS-gRPC Rust server (runs in DCS process)
                    └─▶ net.dostring_in("server", code)  ← hook environment
                          └─▶ MB_safeExec wraps code in pcall
                                └─▶ mission scripting environment
                                      (coalition, trigger, Moose, Group, ...)
```

### The `Eval` gRPC Method

The `dcs-custom` skill exposes a single `Eval` method that accepts raw Lua:

```json
{
  "method": "Eval",
  "payload": { "luaCode": "return world.theatre()" }
}
```

This is gated behind `eval = true` in `~/Saved Games/DCS/Config/dcs-grpc.lua`. **Read what this enables before turning it on** — any connected client can execute arbitrary code inside DCS.

### `MB_safeExec` — The Safety Wrapper

`libs/mission-builder-lib.lua` is a one-time prelude injected at the start of a session. It defines `MB_safeExec(code, description)` in the gRPC hook environment.

All subsequent scenario code is routed through it:

```lua
MB_safeExec([==[
  -- your mission code here
  coalition.addGroup(...)
]==], "spawn red armour")
```

What it does internally:

1. **Routes into the mission environment** — calls `net.dostring_in('server', ...)` which re-enters the full DCS mission scripting context where `coalition`, `trigger`, `Group`, Moose, etc. are available. The hook environment itself only has `net.*`.
2. **Wraps in `pcall`** — catches any Lua errors so a bad spawn or Moose call cannot crash DCS or silently fail.
3. **Surfaces errors in-game** — on failure, calls `trigger.action.outText(...)` to display the error on screen and logs it via `env.info(...)` to the DCS log.
4. **Tags log lines** — every log entry is prefixed with the currently registered agent name (`MissionBuilder` or `Commander`), set via `MB_setAgent(name)`.

The prelude itself runs in the hook env and is completely safe to inject before a mission loads actors.
