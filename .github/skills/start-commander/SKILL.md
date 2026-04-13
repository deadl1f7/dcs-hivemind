---
name: start-commander
description: "Use when: start commander, begin tactical session, activate AI commander, command red forces, command blue forces, tactical AI setup, commander session, start tactical AI, run commander, initialize commander, /commander"
argument-hint: "Specify faction (Red/Blue), objective, AWACS unit name, and intel mode — or leave blank to be interviewed"
---

# start-commander Skill

Collects all required Commander session parameters via an interview, then composes and hands off the startup prompt to the **Commander** subagent. The Commander runs the Session Startup Procedure and executes the first Decision Cycle.

## When to Use

- User types `/commander` or `/start-commander`
- User says "start the commander", "begin a tactical session", "run tactical AI", "command red/blue forces"
- Hivemind's `/commander` flow is triggered

---

## Procedure

### Step 1 — Interview the User

If parameters were not already provided, ask the following (use `vscode_askQuestions` if available):

1. **Faction** — Which side is the Commander controlling?
   - Red
   - Blue

2. **Objective** — What is the Commander's primary mandate?
   - `DEFEND` — Hold the AO, minimize enemy penetration
   - `ATTRIT` — Destroy enemy forces while preserving own strength
   - `ASSAULT` — Seize terrain or destroy a specific target, accept losses
   - `SCREEN` — Buy time, trading space for time; retreat when threatened
   - `ANNIHILATE` — All-in, maximum aggression, destroy everything

3. **AWACS Unit Name** — The exact DCS unit name of the faction's AWACS aircraft or early-warning radar. This is the unit the Commander will call `GetDetectedTargets` on when in `AWACS_ONLY` mode.

4. **Intel Mode** — How should the Commander sense the enemy?
   - `AWACS_ONLY` *(realistic)* — Enemy contacts from the AWACS radar only. Fog of war applies.
   - `SATELLITE` — All enemy units visible directly via gRPC. No fog of war.

5. **Scenario Spec** *(optional)* — Paste the MissionBuilder scenario spec or a brief description of the AO and enemy order of battle. Helps the Commander make informed decisions from the first cycle.

---

### Step 2 — Compose the Commander Startup Prompt

Using the collected parameters, build the following structured prompt:

```
Faction: <Red|Blue>
Objective: <DEFEND|ATTRIT|ASSAULT|SCREEN|ANNIHILATE>
AWACS Unit: <unit name>
Intel Mode: <AWACS_ONLY|SATELLITE>
Scenario: <spec or "none">

Run the Session Startup Procedure:
1. Health check (call check_health — abort if grpcClientConnected is false)
2. Register agent name via MB_setAgent('Commander') Eval inject
3. Build the initial force picture (GetGroups → GetUnits → GetPosition for own side; enemy picture per intelMode)
4. Execute one full Decision Cycle: Assess → Decide → Issue Orders → Report

Return the Commander's Report in the structured format defined in your agent file.
```

---

### Step 3 — Invoke Commander Subagent

Hand the composed prompt to the **Commander** subagent using the `agent` tool.

Do not execute any gRPC calls yourself. Commander owns all gRPC interaction and Lua injection.

---

### Step 4 — Present Report and Offer Next Cycle

After the Commander subagent returns, display its report to the user verbatim, then ask:

> "Commander cycle complete. Say **next** to run another decision cycle, **stop** to end the session, or describe any override orders."

| User response | Action |
|---|---|
| **next** | Invoke Commander again: `"Run one Decision Cycle. Refresh the force picture and issue orders for this cycle."` |
| **override `<instruction>`** | Invoke Commander with the override prepended: `"Override: <instruction>. Then run one Decision Cycle."` |
| **stop** | End the session. Summarise total cycles run and orders issued. |

---

## Rules

- **Do not query gRPC yourself.** This skill only orchestrates. Commander owns all gRPC calls and Eval injections.
- **The AWACS unit name must be exact** — it must match the DCS unit name in the mission. If the user is unsure, note it in the prompt and Commander will attempt `GetGroups` to discover candidates.
- **Intel mode is sticky for the session** — do not change it mid-session unless the user explicitly requests it.
