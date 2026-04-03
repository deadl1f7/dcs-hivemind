---
name: create-mission
description: "Use when: creating a new DCS mission, /createmission, generate mission spec, design scenario, plan mission, build scenario spec, define mission objectives, scenario design, mission planning. Generates a full structured mission specification (factions, unit groups, flights, SAM sites, IADS, objectives, win conditions) for the currently running mission and hands it off to MissionBuilder for injection."
argument-hint: "Describe the type of mission you want, e.g. 'SEAD escort strike on a defended airfield' or leave blank to be interviewed"
---

# create-mission Skill

Generates a complete, structured DCS mission specification from a brief description or an interactive interview, then delegates execution to the MissionBuilder agent.

## When to Use

- User types `/createmission` in chat
- User asks to "create a mission", "design a scenario", "plan a mission", "build a scenario"
- Any request to design a new DCS mission from scratch

## Procedure

### Step 1 — Query the Live Theatre

Before interviewing the user, call `GetTheatre` via the dcs-world skill to determine the active map. Use the returned theatre name to look up location names, airbases, and terrain features from [DCS Theatre Reference](../../assets/theatre-reference.md). This grounds all AO descriptions in the correct geography.

### Step 2 — Interview the User

If the user has not provided enough detail, ask the following questions (use `vscode_askQuestions` if available, otherwise ask in chat):

1. **Mission Type** — What is the core mission type?
   - Strike / Deep Strike
   - SEAD / DEAD
   - CAS (Close Air Support)
   - CAP / Air Superiority
   - Ground Assault / Armoured Push
   - Interdiction
   - Combined Arms (mixed air + ground)
   - Other (describe)
2. **Complexity** — Simple (1-2 objectives, small force), Medium (3-4 objectives, mixed arms), Complex (multi-phase, large force)
3. **Bluefor Faction** — Who is the Bluefor side? (e.g. USA, NATO, UK)
4. **Redfor Faction** — Who is the Redfor side? (e.g. Russia, Iran, Generic OPFOR)
5. **Area of Operations** — Where on the map? Name a city, airbase, or region as the focal point.
6. **Key Objective** — What must Bluefor accomplish? (e.g. "destroy the radar at Gudauta", "hold the Sukhumi corridor")
7. **Player Role** (optional) — Is there a human player slot? What aircraft/role?

If the user already provided a description with enough context, skip the interview and infer answers from it.

---

### Step 3 — Generate the Mission Spec

Using the theatre (from `GetTheatre`) and the user's answers, produce a formatted mission specification following the [Mission Spec Template](./assets/mission-spec-template.md).

The spec must include all of these sections:

#### 3.1 Header
- `Theatre` — resolved from `GetTheatre` (do not ask the user)
- `Mission Type` — primary type
- `Complexity` — Simple / Medium / Complex
- `Summary` — 2-3 sentence narrative hook

#### 3.2 Factions
- **Bluefor**: faction name, doctrine (aggressive/defensive/combined arms)
- **Redfor**: faction name, doctrine

#### 3.3 Area of Operations
- Primary AO name and description (map region, approximate lat/lon zone or named location)
- Key terrain features relevant to the scenario (ridgelines, chokepoints, urban areas, coastline)

#### 3.4 Objectives
List each objective with:
- `ID` (OBJ-1, OBJ-2, …)
- `Description` — what must be done
- `Faction` — Bluefor or Redfor
- `Type` — Destroy / Capture / Defend / Escort / Suppress / Reach
- `Priority` — Primary / Secondary
- `Win Condition` — what marks it complete

#### 3.5 Ground Forces

For each ground group, specify:
| Group Name (Template) | Coalition | Type | Role | Location | Units |
|---|---|---|---|---|---|
| `RED_ArmourPush_1` | Redfor | Armour | Assault | East of Sukhumi | T-80U x4, BMP-2 x2 |
| `BLUE_MANPAD_Screen` | Bluefor | Infantry | Air Defence | Batumi perimeter | Igla-S x3 |

#### 3.6 Air Defence / IADS

For each SAM or EWR group:
| Group Name (Template) | Coalition | System | Role | Location | Notes |
|---|---|---|---|---|---|
| `RED_SA10_Site` | Redfor | S-300 PS | Long Range SAM | NE Sukhumi | MANTIS-managed |
| `RED_SA6_FWD` | Redfor | Kub | Medium SAM | Forward line | Roving threat |
| `RED_EWR_East` | Redfor | 55G6 EWR | Early Warning | Tbilisi East | Feeds IADS |

#### 3.7 Air Assets / Flights

For each flight (AI or player):
| Flight Name (Template) | Coalition | Aircraft | Role | Task | Airbase/FARP | Loadout Hint | Notes |
|---|---|---|---|---|---|---|---|
| `BLUE_F16_SEAD` | Bluefor | F-16C | SEAD | Suppress SA-6 | Batumi | AGM-88 x4, AIM-9 x2 | AI |
| `RED_Su27_CAP` | Redfor | Su-27 | CAP | Patrol AO | Gudauta | R-77 x4, R-73 x2 | AI dispatcher |
| `BLUE_A10_CAS` | Bluefor | A-10C | CAS | Attack armour | Senaki | Mk-82 x8, GAU | AI |

#### 3.8 Static Structures (optional)

For structures to spawn as static objects:
| Static Name | Coalition | Type | Location | Purpose |
|---|---|---|---|---|
| `RED_Radar_Gudauta` | Redfor | EWR Radar | Gudauta airfield | Target - strike objective |
| `BLUE_FARP_Alpha` | Bluefor | FARP | South Sukhumi | Rearming point |

#### 3.9 Moose Systems to Use

List the autonomous Moose systems that MissionBuilder should activate:
- **MANTIS** — for Redfor IADS (SAMs + EWR)  
- **AI_A2A_DISPATCHER** — for Redfor CAP (threat detection → scramble)
- **AI_A2G_DISPATCHER** — for Bluefor CAS response
- **AI_A2G_SEAD** — for Bluefor SEAD flights
- **ARMYGROUP** — for ground assault management
- **SET_GROUP / SCHEDULER** — for timed reinforcements

#### 3.10 Triggers & Events (optional)

| Trigger | Condition | Action |
|---|---|---|
| Phase 2 Start | OBJ-1 complete | Spawn RED_Reinforcements_Tank |
| Radio Message | Mission start | Bluefor briefing text |
| End Condition | OBJ-1 + OBJ-2 complete | Message "Mission Success" |

#### 3.11 MissionBuilder Prompt

End the spec with a ready-to-use MissionBuilder invocation block — a single paragraph starting with `@MissionBuilder` the user can copy directly:

```
@MissionBuilder <paste the full spec above>
```

---

### Step 4 — Present and Confirm

- Display the complete spec in the chat response
- Ask the user: "Does this look right? Type **go** to inject it via MissionBuilder, or tell me what to change."
- If the user says **go** (or equivalent), delegate to MissionBuilder by handing off the full spec as the input prompt
- If the user requests changes, update the relevant sections of the spec and re-present it

---

## Rules

- **Do not inject Lua yourself.** This skill only produces specs. Execution is MissionBuilder's responsibility.
- **All group names in the spec are template group names** that must already exist in the mission editor, OR flag them with `[SPAWN-TEMPLATE NEEDED]` so MissionBuilder knows to ask or create a generic template.
- **Keep the spec precise.** Vague specs lead to poor injections. Include unit counts, system names, and location hints.
- **Balanced scenarios.** Do not design so that one side has an insurmountable advantage unless explicitly requested.
- **Flag player slots.** If the user wants a player slot, mark the flight row with `[PLAYER]` in the Notes column. MissionBuilder must not issue orders to that slot.

---

## References

- [Mission Spec Template](./assets/mission-spec-template.md)
- [DCS Theatre Reference](../../assets/theatre-reference.md)
