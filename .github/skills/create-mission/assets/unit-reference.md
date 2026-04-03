# DCS Unit Type Reference

Exact `type` strings for `coalition.addGroup` and `coalition.addStaticObject`. Extracted live from DCS Syria map.

**Use these exact strings — DCS will silently substitute `Leopard-2` for unknown types, making detection by name impossible.**

---

## Common Wrong Names → Correct DCS Type

| What you might write | Correct DCS type string |
|---|---|
| `Leopard-2A4` | `Leopard-2` |
| `M2 Bradley` | `M-2 Bradley` |
| `SAU Msta-S` / `2S19 Msta-S` | Not available in Syria — use `2B11 mortar` or `L118_Unit` |
| `55G6` | `55G6 EWR` |
| `Igla-S` | `SA-18 Igla-S manpad` (unit) + `SA-18 Igla-S comm` (commander) |
| `Igla` | `SA-18 Igla manpad` (unit) + `SA-18 Igla comm` (commander) |
| `Stinger` | `Soldier stinger` (single) or `Stinger comm` (network) |
| `BTR80` | `BTR-80` |
| `ZSU-23` / `Shilka` | `ZSU-23-4 Shilka` |

---

## Armour & IFV

| DCS Type Name | Description |
|---|---|
| `T-55` | Soviet MBT (older) |
| `T-72B` | Soviet/Russian MBT |
| `Leopard-2` | NATO MBT (NOT `Leopard-2A4`) |
| `BMP-1` | Soviet IFV |
| `BMP-2` | Soviet IFV (cannon) |
| `BRDM-2` | Soviet recon vehicle |
| `BTR-80` | Soviet APC (wheeled) |
| `M-2 Bradley` | US IFV (NOT `M2 Bradley`) |
| `M-113` | US APC (older) |
| `M113` | US APC (alias — prefer `M-113`) |
| `VAB_Mephisto` | French ATGM carrier |

---

## Infantry & Manpads

| DCS Type Name | Description |
|---|---|
| `Infantry AK` | Generic rifleman (AK) |
| `Soldier M4` | US soldier |
| `Soldier M249` | US SAW gunner |
| `Soldier RPG` | RPG anti-tank |
| `Soldier stinger` | Stinger MANPAD operator |
| `Stinger comm` | Stinger team commander (needed with `Soldier stinger`) |
| `SA-18 Igla manpad` | Igla MANPAD operator |
| `SA-18 Igla comm` | Igla team commander |
| `SA-18 Igla-S manpad` | Igla-S MANPAD operator |
| `SA-18 Igla-S comm` | Igla-S team commander |

> **Manpad pattern:** Always pair one `comm` unit with 2-4 manpad units in the same group.

---

## Short-Range Air Defence (SHORAD)

| DCS Type Name | Description | NATO Designator |
|---|---|---|
| `Gepard` | German SPAAG (twin 35mm) | — |
| `ZSU-23-4 Shilka` | Soviet SPAAG (quad 23mm) | ZSU-23-4 |
| `Vulcan` | US M163 VADS (20mm) | M163 |
| `M6 Linebacker` | Bradley with Stinger | — |
| `M1097 Avenger` | HMMWV with Stinger | — |
| `Strela-1 9P31` | SA-9 Gaskin | SA-9 |
| `Strela-10M3` | SA-13 Gopher | SA-13 |
| `Tor 9A331` | SA-15 Gauntlet | SA-15 |
| `Osa 9A33 ln` | SA-8 Gecko launcher | SA-8 |
| `HEMTT_C-RAM_Phalanx` | US C-RAM Phalanx | — |
| `Roland ADS` | Franco-German Roland | — |
| `rapier_fsa_launcher` | British Rapier launcher | — |
| `rapier_fsa_blindfire_radar` | Rapier tracking radar | — |
| `rapier_fsa_optical_tracker_unit` | Rapier optical tracker | — |

---

## Medium / Long-Range SAM

### SA-6 Kub (needs 2+ units: radar + launcher)

| DCS Type Name | Role |
|---|---|
| `Kub 1S91 str` | SA-6 radar / STR |
| `Kub 2P25 ln` | SA-6 launcher |

### SA-8 Osa (self-contained launcher)

| DCS Type Name | Role |
|---|---|
| `Osa 9A33 ln` | SA-8 launcher (radar integrated) |

### SA-11 Buk (needs 3 units)

| DCS Type Name | Role |
|---|---|
| `SA-11 Buk CC 9S470M1` | Command post |
| `SA-11 Buk SR 9S18M1` | Search radar |
| `SA-11 Buk LN 9A310M1` | Launcher |

### S-300PS (needs 4+ units)

| DCS Type Name | Role |
|---|---|
| `S-300PS 64H6E sr` | Big Bird search radar |
| `S-300PS 54K6 cp` | Command post |
| `S-300PS 5P85C ln` | Launcher (type C) |
| `S-300PS 5P85D ln` | Launcher (type D) |
| `S-300PS 40B6M tr` | Track radar |
| `S-300PS 40B6MD sr` | Low-altitude search radar |

### S-200

| DCS Type Name | Role |
|---|---|
| `S-200_Launcher` | Launcher |
| `RPC_5N62V` | Tracking radar |

### S-75 / SA-2 Guideline

| DCS Type Name | Role |
|---|---|
| `S_75M_Volhov` | Launcher |
| `SNR_75V` | Fan Song tracking radar |

### S-125 / SA-3 Neva

| DCS Type Name | Role |
|---|---|
| `5p73 s-125 ln` | Launcher |
| `snr s-125 tr` | Low Blow tracking radar |
| `p-19 s-125 sr` | Flat Face search radar |

### NASAMS

| DCS Type Name | Role |
|---|---|
| `NASAMS_LN_B` | Launcher B |
| `NASAMS_LN_C` | Launcher C |
| `NASAMS_Radar_MPQ64F1` | Search radar |
| `NASAMS_Command_Post` | Command post |

### Patriot

| DCS Type Name | Role |
|---|---|
| `Patriot str` | Search and track radar |
| `Patriot ln` | Launcher |
| `Patriot cp` | Command post |
| `Patriot AMG` | Antenna mast group |
| `Patriot ECS` | Engagement control |
| `Patriot EPP` | Power plant |

### Hawk

| DCS Type Name | Role |
|---|---|
| `Hawk sr` | Search radar |
| `Hawk tr` | Track radar |
| `Hawk cwar` | CWAR |
| `Hawk ln` | Launcher |
| `Hawk pcp` | Power/command post |

> **Hawk minimum site:** `sr` + `tr` + `cwar` + `ln` (x2-3) + `pcp`

---

## EWR / Radar

| DCS Type Name | Description |
|---|---|
| `55G6 EWR` | Soviet Tall King EWR (NOT `55G6`) |
| `p-19 s-125 sr` | Flat Face search radar (also used standalone EWR) |
| `FPS-117` | US long-range EWR |
| `RLS_19J6` | Soviet radar |
| `Kub 1S91 str` | SA-6 radar (can double as forward EWR in MANTIS) |

---

## Artillery

| DCS Type Name | Description |
|---|---|
| `2B11 mortar` | Soviet 120mm mortar |
| `L118_Unit` | British L118 light artillery |

> **Note:** `2S19 Msta-S` / `SAU Msta-S` is NOT available on Syria map. Use `2B11 mortar` or `L118_Unit` as substitutes.

---

## Logistics / Support

| DCS Type Name | Description |
|---|---|
| `Ural-375` | Soviet 4-ton truck |
| `Ural-375 PBU` | Ural command variant |
| `Ural-4320-31` | Ural modern variant |
| `Ural-4320T` | Ural tanker |
| `Ural-4320 APA-5D` | Ural GPU |
| `KAMAZ Truck` | Russian KAMAZ |
| `GAZ-66` | Soviet light truck |
| `M 818` | US 5-ton truck |
| `Hummer` | US HMMWV (unarmed) |
| `M1043 HMMWV Armament` | Armed HMMWV |
| `M1045 HMMWV TOW` | TOW HMMWV |
| `M978 HEMTT Tanker` | US fuel tanker |
| `Land_Rover_101_FC` | British Land Rover |
| `Land_Rover_109_S3` | British Land Rover S3 |
| `ATZ-5` / `ATZ-10` / `ATZ-60_Maz` / `ATMZ-5` | Soviet fuel trucks |
| `ZiL-131 APA-80` | Soviet GPU |
| `SKP-11` | Soviet airfield starter |
| `generator_5i57` | Generator |

---

## Fixed-Wing Aircraft

| DCS Type Name | Description |
|---|---|
| `Su-24M` | Russian strike aircraft |
| `Su-27` | Russian air superiority |
| `Su-17M4` | Russian ground attack |
| `MiG-29A` | Russian fighter |
| `MiG-23MLD` | Russian fighter |
| `MiG-21Bis` | Russian/Soviet fighter |
| `MiG-25PD` | Russian interceptor |
| `F-15C` | US air superiority |
| `A-50` | Russian AWACS |
| `E-3A` | NATO AWACS |
| `KC-135` | US tanker |
| `KC135MPRS` | US tanker (probe/drogue) |
| `S-3B Tanker` | US carrier tanker |

---

## Helicopters

| DCS Type Name | Description |
|---|---|
| `Mi-24P` | Russian attack helicopter |
| `Mi-8MT` | Russian transport helicopter |
| `SH-60B` | US naval helicopter |

---

## Naval

| DCS Type Name | Description |
|---|---|
| `CVN_72` | US carrier (Abraham Lincoln) |
| `Stennis` | US carrier (Stennis) |
| `USS_Arleigh_Burke_IIa` | US destroyer |
| `PERRY` | US frigate |
| `NEUSTRASH` | Russian destroyer |
| `MOLNIYA` | Russian missile corvette |
| `Dry-cargo ship-2` | Cargo ship |

---

## Group Category Constants

Use integer literals — the `Group` global may not be available at spawn time:

| Category | Integer | Use for |
|---|---|---|
| `0` | Airplane | Fixed-wing combat/transport |
| `1` | Helicopter | Rotary wing |
| `2` | Ground | All ground vehicles and infantry |
| `3` | Ship | Naval surface combatants |

---

## Country ID Reference (Syria Theatre)

| country.id | Integer | Notes |
|---|---|---|
| `country.id.RUSSIA` | `0` | Redfor primary |
| `country.id.USA` | `2` | Bluefor primary |
| `country.id.TURKEY` | `3` | Bluefor (Hatay/Incirlik) |
| `country.id.SYRIA` | `47` | Redfor secondary |

> Always verify with: `return net.dostring_in('server', 'return tostring(country.id.TURKEY)')`
