# Mission Specification Template

> Copy this template and fill in every section. Replace all `[PLACEHOLDER]` values.
> Sections marked `(optional)` may be omitted for simple missions.

---

## Header

> `Theatre` is resolved automatically from the live mission via `GetTheatre` — do not fill it in manually.

| Field | Value |
|---|---|
| **Theatre** | [resolved from GetTheatre] |
| **Mission Type** | [PLACEHOLDER — e.g. SEAD / Strike / CAP] |
| **Complexity** | [Simple / Medium / Complex] |
| **Summary** | [2-3 sentence narrative hook describing the conflict and stakes] |

---

## Factions

| Role | Faction | Doctrine |
|---|---|---|
| **Bluefor** | [PLACEHOLDER] | [Aggressive / Defensive / Combined Arms] |
| **Redfor** | [PLACEHOLDER] | [Aggressive / Defensive / Combined Arms] |

---

## Area of Operations

- **Primary AO**: [Map region or named location — e.g. "Sukhumi corridor, coastal strip NW Georgia"]
- **Key Terrain**: [Ridgelines, chokepoints, urban areas, coastline that affect tactics]
- **AO Radius**: [Approximate radius — e.g. "~50 km centred on Sukhumi"]

---

## Objectives

| ID | Description | Faction | Type | Priority | Win Condition |
|---|---|---|---|---|---|
| OBJ-1 | [PLACEHOLDER] | Bluefor | [Destroy/Capture/Defend/Escort/Suppress/Reach] | Primary | [PLACEHOLDER] |
| OBJ-2 | [PLACEHOLDER] | Redfor | [Destroy/Capture/Defend/Escort/Suppress/Reach] | Secondary | [PLACEHOLDER] |

---

## Ground Forces

> Group names are DCS mission editor template group names. Flag with `[SPAWN-TEMPLATE NEEDED]` if template must be created.

| Group Name (Template) | Coalition | Type | Role | Location | Units |
|---|---|---|---|---|---|
| `[GROUP_NAME]` | [Blue/Red] | [Armour/Infantry/Artillery/AAA/SAM/Mechanised] | [Assault/Defend/Screen/Fire Support] | [Named location or rough coords] | [e.g. T-80U x4, BMP-2 x2] |

---

## Air Defence / IADS

| Group Name (Template) | Coalition | System | Role | Location | MANTIS / Standalone | Notes |
|---|---|---|---|---|---|---|
| `[GROUP_NAME]` | [Blue/Red] | [e.g. S-300 PS / SA-6 / Hawk / Patriot] | [Long Range SAM / Medium SAM / SHORAD / EWR] | [Named location] | [MANTIS / Standalone] | |

---

## Air Assets / Flights

| Flight Name (Template) | Coalition | Aircraft | Role | Task | Airbase / FARP | Loadout Hint | Notes |
|---|---|---|---|---|---|---|---|
| `[FLIGHT_NAME]` | [Blue/Red] | [e.g. F-16C / Su-27 / A-10C] | [CAP/SEAD/CAS/Strike/Escort/Transport] | [Patrol AO / Suppress SA-X / Attack armour] | [e.g. Batumi] | [Key weapons] | [AI / PLAYER / Dispatcher-managed] |

---

## Static Structures (optional)

> Static objects for targets, FARPs, depots, or scenery.

| Static Name | Coalition | Type | Location | Purpose |
|---|---|---|---|---|
| `[STATIC_NAME]` | [Blue/Red/Neutral] | [e.g. EWR Radar / FARP / Command Post / Ammo Depot] | [Named location] | [Target / Support / Atmosphere] |

---

## Moose Systems

List which Moose autonomous systems MissionBuilder should activate:

- [ ] **MANTIS** — Redfor IADS (SAMs + EWR integration)
- [ ] **AI_A2A_DISPATCHER** — CAP scramble on detection
- [ ] **AI_A2G_DISPATCHER** — Ground attack response
- [ ] **AI_A2G_SEAD** — SEAD missions against SAM sites
- [ ] **AI_A2G_CAS** — CAS support for ground forces
- [ ] **AI_A2G_BAI** — Battlefield interdiction
- [ ] **ARMYGROUP** — Ground assault management
- [ ] **AIRWING / SQUADRON** — Full squadron AI management (complex missions)
- [ ] **CHIEF** — Top-level strategic AI (complex missions)
- [ ] **SET_GROUP + SCHEDULER** — Timed reinforcement waves
- [ ] **RAT** — Random AI background traffic
- [ ] **ZONE_CAPTURE_COALITION** — Dynamic zone capture objectives
- [ ] Other: [describe]

---

## Triggers & Events (optional)

| Trigger ID | Condition | Action |
|---|---|---|
| TRG-1 | [e.g. OBJ-1 complete] | [e.g. Spawn RED_Reinforcements wave 2] |
| TRG-2 | [e.g. Mission start] | [e.g. Bluefor briefing outText] |
| TRG-3 | [e.g. OBJ-1 + OBJ-2 complete] | [e.g. "Mission Success" message + end flag] |

---

## MissionBuilder Prompt

> Copy this block and send it to @MissionBuilder to inject the scenario.

```
@MissionBuilder Please create the following DCS mission scenario:

[PASTE FILLED SPEC HERE]
```
