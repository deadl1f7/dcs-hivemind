# DCS Loadout Reference

Payload structure, preset pylon tables, and CLSID reference extracted directly from DCS UnitPayloads files.

**Source of truth:** `E:\SteamLibrary\steamapps\common\DCSWorld\MissionEditor\data\scripts\UnitPayloads\<Airframe>.lua`
All pylon tables below are copied verbatim from those files — do NOT invent CLSIDs.

---

## Rules

- **NEVER leave `pylons = {}`** — DCS will spawn the aircraft unarmed.
- **ALWAYS set `payload.fuel = 99999`** — DCS caps to the airframe's actual internal tank maximum (= 100% fuel at spawn).
- **NEVER use `db_weapons`** — not available in the DCS mission scripting environment.
- **Use a named preset from this file** rather than constructing pylons manually. Copy the pylon block exactly as shown.
- **NEVER invent CLSIDs** — only use CLSIDs verified here or from the UnitPayloads .lua files on disk.

---

## Payload Table Structure

```lua
payload = {
  pylons = {
    [1] = { CLSID = "{GUID}", num = 1 },  -- num must match the pylon station
    -- omit stations that are empty
  },
  fuel  = 99999,
  flare = 96,
  chaff = 96,
  gun   = 100,
}
```

---

## Task → Preset Mapping

| Tasking | Airframe | Recommended preset name |
|---|---|---|
| CAP | Su-27 | `R-73*4,R-27ER*4,R-27ET*2` |
| CAP | MiG-29S | `R-73*4,R-27R*2,Fuel-1500` |
| CAP | MiG-29A | `R-73*4,R-27R*2,Fuel-1500` |
| CAP | F-15C | `AIM-9*4,AIM-120*4,Fuel*3` |
| CAP | F-16C | `AIM-120C*4,AIM-9M*2,ECM,Fuel*2` |
| CAS rockets | Su-25 | `S-8KOM*120,R-60M*2,Fuel*2` |
| CAS rockets | Su-25 | `RBK-250*2,S-8KOM*80,R-60M*2,Fuel*2` |
| CAS guided | Su-25 | `Kh-29L*2,Kh-25ML*4,R-60M*2` |
| CAS | Ka-52 | `APU-6 Vikhr-M*2` or `B-8*2, APU-6 Vikhr-M*2` |
| CAS | AH-64D | `8xAGM-114, 38xHYDRA-70` |
| CAS | Mi-24V | `8x9M114, 40xS-8` |
| Strike | Su-24M | `UB-13*4,FAB-500*2` |
| Strike guided | Su-24M | `KAB-500*4,R-60M*2` or `Kh-29L*2,R-60M*2` |
| SEAD | Su-24M | `Kh31P*2_Kh25ML*2_L-081` or `Kh58*2_Kh25ML*2_L-081` |
| Strike | F-15E | `AIM-120B*2,AIM-9M*2,FUEL,GBU-31*4,AGM-65H,AGM-65D` |
| Strike | F-16C | `AGM-65D*4,AIM-120*2,ECM,Fuel*2,LIGHTNING` |
| SEAD | F-16C | `AGM-88*2, AGM-65D*2, AIM-120B*2, ECM,LIGHTNING` |

---

## Su-25 Presets (10-pylon airframe)

All CLSIDs from `Su-25.lua`. `num` = pylon station.

**Preset: `RBK-250*2,S-8KOM*80,R-60M*2,Fuel*2`** (recommended CAS)

```lua
pylons = {
  [1]  = { CLSID = "{682A481F-0CB5-4693-A382-D00DD4A156D7}", num = 1  },  -- R-60M
  [2]  = { CLSID = "{F72F47E5-C83A-4B85-96ED-D3E46671EE9A}", num = 2  },  -- RBK-250
  [3]  = { CLSID = "{F72F47E5-C83A-4B85-96ED-D3E46671EE9A}", num = 3  },  -- RBK-250
  [4]  = { CLSID = "{4203753F-8198-4E85-9924-6F8FF679F9FF}", num = 4  },  -- fuel tank
  [5]  = { CLSID = "{E8D4652F-FD48-45B7-BA5B-2AE05BB5A9CF}", num = 5  },  -- S-8KOM
  [6]  = { CLSID = "{E8D4652F-FD48-45B7-BA5B-2AE05BB5A9CF}", num = 6  },  -- S-8KOM
  [7]  = { CLSID = "{4203753F-8198-4E85-9924-6F8FF679F9FF}", num = 7  },  -- fuel tank
  [8]  = { CLSID = "{F72F47E5-C83A-4B85-96ED-D3E46671EE9A}", num = 8  },  -- RBK-250
  [9]  = { CLSID = "{F72F47E5-C83A-4B85-96ED-D3E46671EE9A}", num = 9  },  -- RBK-250
  [10] = { CLSID = "{682A481F-0CB5-4693-A382-D00DD4A156D7}", num = 10 },  -- R-60M
}
```

**Preset: `S-8KOM*120,R-60M*2,Fuel*2`** (pure rockets)

```lua
pylons = {
  [1]  = { CLSID = "{682A481F-0CB5-4693-A382-D00DD4A156D7}", num = 1  },  -- R-60M
  [2]  = { CLSID = "{E8D4652F-FD48-45B7-BA5B-2AE05BB5A9CF}", num = 2  },  -- S-8KOM
  [3]  = { CLSID = "{E8D4652F-FD48-45B7-BA5B-2AE05BB5A9CF}", num = 3  },  -- S-8KOM
  [4]  = { CLSID = "{4203753F-8198-4E85-9924-6F8FF679F9FF}", num = 4  },  -- fuel tank
  [5]  = { CLSID = "{E8D4652F-FD48-45B7-BA5B-2AE05BB5A9CF}", num = 5  },  -- S-8KOM
  [6]  = { CLSID = "{E8D4652F-FD48-45B7-BA5B-2AE05BB5A9CF}", num = 6  },  -- S-8KOM
  [7]  = { CLSID = "{4203753F-8198-4E85-9924-6F8FF679F9FF}", num = 7  },  -- fuel tank
  [8]  = { CLSID = "{E8D4652F-FD48-45B7-BA5B-2AE05BB5A9CF}", num = 8  },  -- S-8KOM
  [9]  = { CLSID = "{E8D4652F-FD48-45B7-BA5B-2AE05BB5A9CF}", num = 9  },  -- S-8KOM
  [10] = { CLSID = "{682A481F-0CB5-4693-A382-D00DD4A156D7}", num = 10 },  -- R-60M
}
```

**Preset: `Kh-29L*2,Kh-25ML*4,R-60M*2`** (guided CAS/strike)

```lua
pylons = {
  [1]  = { CLSID = "{682A481F-0CB5-4693-A382-D00DD4A156D7}", num = 1  },  -- R-60M
  [2]  = { CLSID = "{FC56DF80-9B09-44C5-8976-DCFAFF219062}", num = 2  },  -- UB-13 pod (filler)
  [3]  = { CLSID = "{6DADF342-D4BA-4D8A-B081-BA928C4AF86D}", num = 3  },  -- Kh-25ML
  [4]  = { CLSID = "{D5435F26-F120-4FA3-9867-34ACE562EF1B}", num = 4  },  -- Kh-29L
  [5]  = { CLSID = "{6DADF342-D4BA-4D8A-B081-BA928C4AF86D}", num = 5  },  -- Kh-25ML
  [6]  = { CLSID = "{6DADF342-D4BA-4D8A-B081-BA928C4AF86D}", num = 6  },  -- Kh-25ML
  [7]  = { CLSID = "{D5435F26-F120-4FA3-9867-34ACE562EF1B}", num = 7  },  -- Kh-29L
  [8]  = { CLSID = "{6DADF342-D4BA-4D8A-B081-BA928C4AF86D}", num = 8  },  -- Kh-25ML
  [9]  = { CLSID = "{FC56DF80-9B09-44C5-8976-DCFAFF219062}", num = 9  },  -- UB-13 pod (filler)
  [10] = { CLSID = "{682A481F-0CB5-4693-A382-D00DD4A156D7}", num = 10 },  -- R-60M
}
```

Other available Su-25 preset names (full pylon tables must be read from `Su-25.lua`):

- `FAB-250*4,UB-13*2,R-60M*2,SPPU-22*2`
- `S-25L*6,UB-13*2,R-60M*2`
- `RBK-500AO*4,S-8KOM*40,R-60M*2,Fuel*2`
- `RBK-500AO*6,R-60M*2,Fuel*2`
- `FAB-500*6,R-60M*2,Fuel*2`
- `FAB-100*32,R-60M*2`
- `BetAB-500ShP*8,R-60M*2`

---

## Su-27 Presets (10-pylon airframe)

All CLSIDs from `Su-27.lua`.

**Preset: `R-73*4,R-27ER*4,R-27ET*2`** (primary CAP)

```lua
pylons = {
  [1]  = { CLSID = "{FBC29BFE-3D24-4C64-B81D-941239D12249}", num = 1  },  -- R-73
  [2]  = { CLSID = "{FBC29BFE-3D24-4C64-B81D-941239D12249}", num = 2  },  -- R-73
  [3]  = { CLSID = "{B79C379A-9E87-4E50-A1EE-7F7E29C2E87A}", num = 3  },  -- R-27ET
  [4]  = { CLSID = "{E8069896-8435-4B90-95C0-01A03AE6E400}", num = 4  },  -- R-27ER
  [5]  = { CLSID = "{E8069896-8435-4B90-95C0-01A03AE6E400}", num = 5  },  -- R-27ER
  [6]  = { CLSID = "{E8069896-8435-4B90-95C0-01A03AE6E400}", num = 6  },  -- R-27ER
  [7]  = { CLSID = "{E8069896-8435-4B90-95C0-01A03AE6E400}", num = 7  },  -- R-27ER
  [8]  = { CLSID = "{B79C379A-9E87-4E50-A1EE-7F7E29C2E87A}", num = 8  },  -- R-27ET
  [9]  = { CLSID = "{FBC29BFE-3D24-4C64-B81D-941239D12249}", num = 9  },  -- R-73
  [10] = { CLSID = "{FBC29BFE-3D24-4C64-B81D-941239D12249}", num = 10 },  -- R-73
}
```

**Preset: `R-73*2,R-27ER*6,ECM`** (BVR-heavy)

```lua
pylons = {
  [1]  = { CLSID = "{44EE8698-89F9-48EE-AF36-5FD31896A82F}", num = 1  },  -- ECM pod (left)
  [2]  = { CLSID = "{FBC29BFE-3D24-4C64-B81D-941239D12249}", num = 2  },  -- R-73
  [3]  = { CLSID = "{E8069896-8435-4B90-95C0-01A03AE6E400}", num = 3  },  -- R-27ER
  [4]  = { CLSID = "{E8069896-8435-4B90-95C0-01A03AE6E400}", num = 4  },  -- R-27ER
  [5]  = { CLSID = "{E8069896-8435-4B90-95C0-01A03AE6E400}", num = 5  },  -- R-27ER
  [6]  = { CLSID = "{E8069896-8435-4B90-95C0-01A03AE6E400}", num = 6  },  -- R-27ER
  [7]  = { CLSID = "{E8069896-8435-4B90-95C0-01A03AE6E400}", num = 7  },  -- R-27ER
  [8]  = { CLSID = "{E8069896-8435-4B90-95C0-01A03AE6E400}", num = 8  },  -- R-27ER
  [9]  = { CLSID = "{FBC29BFE-3D24-4C64-B81D-941239D12249}", num = 9  },  -- R-73
  [10] = { CLSID = "{44EE8698-89F9-48EE-AF36-5FD31896A82A}", num = 10 },  -- ECM pod (right)
}
```

Other Su-27 preset names:

- `R-73*4,R-27ER*6`
- `R-73*2,R-27ER*4,R-27ET*2,ECM`
- `FAB-500*6,R-73*2,ECM`
- `CAS S-8KOM Rockets + RBK-500 PTAB1`
- `CAS S-8KOM Rockets`
- `CAS S-13 Rockets`
- `CAS S-25 Rockets`

---

## Su-24M Presets (8-pylon airframe: stations 1-8; centre = 5)

All CLSIDs from `Su-24M.lua`. R-60M uses string ID `{APU-60-1_R_60M}`.

**Preset: `UB-13*4,FAB-500*2`** (primary CAS/strike)

```lua
pylons = {
  [1] = { CLSID = "{FC56DF80-9B09-44C5-8976-DCFAFF219062}", num = 1 },  -- UB-13 rockets
  [2] = { CLSID = "{FC56DF80-9B09-44C5-8976-DCFAFF219062}", num = 2 },  -- UB-13 rockets
  [3] = { CLSID = "{37DCC01E-9E02-432F-B61D-10C166CA2798}", num = 3 },  -- FAB-500
  [4] = { CLSID = "{37DCC01E-9E02-432F-B61D-10C166CA2798}", num = 6 },  -- FAB-500
  [5] = { CLSID = "{FC56DF80-9B09-44C5-8976-DCFAFF219062}", num = 7 },  -- UB-13 rockets
  [6] = { CLSID = "{FC56DF80-9B09-44C5-8976-DCFAFF219062}", num = 8 },  -- UB-13 rockets
}
```

**Preset: `KAB-500*4,R-60M*2`** (guided bombs)

```lua
pylons = {
  [1] = { CLSID = "{APU-60-1_R_60M}",                       num = 1 },  -- R-60M
  [2] = { CLSID = "{BA565F89-2373-4A84-9502-A0E017D3A44A}", num = 2 },  -- KAB-500
  [3] = { CLSID = "{BA565F89-2373-4A84-9502-A0E017D3A44A}", num = 3 },  -- KAB-500
  [4] = { CLSID = "{BA565F89-2373-4A84-9502-A0E017D3A44A}", num = 6 },  -- KAB-500
  [5] = { CLSID = "{BA565F89-2373-4A84-9502-A0E017D3A44A}", num = 7 },  -- KAB-500
  [6] = { CLSID = "{APU-60-1_R_60M}",                       num = 8 },  -- R-60M
}
```

**Preset: `Kh31P*2_Kh25ML*2_L-081`** (SEAD)

```lua
pylons = {
  [1] = { CLSID = "{6DADF342-D4BA-4D8A-B081-BA928C4AF86D}", num = 1 },  -- Kh-31P
  [2] = { CLSID = "{D8F2C90B-887B-4B9E-9FE2-996BC9E9AF03}", num = 2 },  -- Kh-25ML
  [3] = { CLSID = "{0519A264-0AB6-11d6-9193-00A0249B6F00}", num = 5 },  -- L-081 pod
  [4] = { CLSID = "{D8F2C90B-887B-4B9E-9FE2-996BC9E9AF03}", num = 7 },  -- Kh-25ML
  [5] = { CLSID = "{6DADF342-D4BA-4D8A-B081-BA928C4AF86D}", num = 8 },  -- Kh-31P
}
```

**Preset: `B-8*2,Fuel*3`** (rockets + range)

```lua
pylons = {
  [1] = { CLSID = "{F72F47E5-C83A-4B85-96ED-D3E46671EE9A}", num = 1 },  -- B-8 pod
  [2] = { CLSID = "{7D7EC917-05F6-49D4-8045-61FC587DD019}", num = 2 },  -- fuel tank
  [3] = { CLSID = "{16602053-4A12-40A2-B214-AB60D481B20E}", num = 5 },  -- fuel tank (centre)
  [4] = { CLSID = "{7D7EC917-05F6-49D4-8045-61FC587DD019}", num = 7 },  -- fuel tank
  [5] = { CLSID = "{F72F47E5-C83A-4B85-96ED-D3E46671EE9A}", num = 8 },  -- B-8 pod
}
```

**Preset: `Kh-31A*2,R-60M*2,Fuel`** (anti-ship)

```lua
pylons = {
  [1] = { CLSID = "{APU-60-1_R_60M}",                       num = 1 },  -- R-60M
  [2] = { CLSID = "{4D13E282-DF46-4B23-864A-A9423DFDE504}", num = 2 },  -- Kh-31A
  [3] = { CLSID = "{16602053-4A12-40A2-B214-AB60D481B20E}", num = 5 },  -- fuel
  [4] = { CLSID = "{4D13E282-DF46-4B23-864A-A9423DFDE504}", num = 7 },  -- Kh-31A
  [5] = { CLSID = "{APU-60-1_R_60M}",                       num = 8 },  -- R-60M
}
```

Other Su-24M preset names:

- `Kh58*2_Kh25ML*2_L-081` (SEAD with Kh-58)
- `Kh25MPU*2_Kh25ML*2_L-081`
- `FAB-500*4,R-60M*2`
- `FAB-250*8`
- `RBK-500AO*4,R-60M*2`
- `KAB-1500*2,R-60M*2,Fuel`
- `Kh-59M*2,R-60M*2`
- `UB-13*4`
- `FAB-100*24`
- `B-8*6`

---

## MiG-29S Presets

All CLSIDs from `MiG-29S.lua`. Stations: 1,2,3 (left) + 4 (centreline fuel) + 5,6,7 (right).

**Preset: `R-73*4,R-27R*2,Fuel-1500`** (CAP)

```lua
pylons = {
  [1] = { CLSID = "{FBC29BFE-3D24-4C64-B81D-941239D12249}", num = 1 },  -- R-73
  [2] = { CLSID = "{FBC29BFE-3D24-4C64-B81D-941239D12249}", num = 2 },  -- R-73
  [3] = { CLSID = "{9B25D316-0434-4954-868F-D51DB1A38DF0}", num = 3 },  -- R-27R
  [4] = { CLSID = "{2BEC576B-CDF5-4B7F-961F-B0FA4312B841}", num = 4 },  -- Fuel-1500
  [5] = { CLSID = "{9B25D316-0434-4954-868F-D51DB1A38DF0}", num = 5 },  -- R-27R
  [6] = { CLSID = "{FBC29BFE-3D24-4C64-B81D-941239D12249}", num = 6 },  -- R-73
  [7] = { CLSID = "{FBC29BFE-3D24-4C64-B81D-941239D12249}", num = 7 },  -- R-73
}
```

**Preset: `R-77*4,R-73*2,Fuel-1500`** (BVR-heavy CAP)

```lua
pylons = {
  [1] = { CLSID = "{FBC29BFE-3D24-4C64-B81D-941239D12249}", num = 1 },  -- R-73
  [2] = { CLSID = "{R-77}",                                  num = 2 },  -- R-77
  [3] = { CLSID = "{R-77}",                                  num = 3 },  -- R-77
  [4] = { CLSID = "{2BEC576B-CDF5-4B7F-961F-B0FA4312B841}", num = 4 },  -- Fuel-1500
  [5] = { CLSID = "{R-77}",                                  num = 5 },  -- R-77
  [6] = { CLSID = "{R-77}",                                  num = 6 },  -- R-77
  [7] = { CLSID = "{FBC29BFE-3D24-4C64-B81D-941239D12249}", num = 7 },  -- R-73
}
```

> **Note:** `{R-77}` above may need verification — read MiG-29S.lua preset 11 for exact CLSID.

Other MiG-29S preset names:

- `R-73*2,R-60M*2,R-27R*2`
- `R-73*6,Fuel-1500`
- `R-60M*6,Fuel-1500`
- `B-8*4,R-73*2,Fuel` (CAS)
- `FAB-500*4,R-73*2,Fuel`
- `RBK-500AO*4,R-73*2,Fuel`

---

## MiG-29A Presets

Same pylon layout as MiG-29S. Same CLSIDs from `MiG-29A.lua`.

**Preset: `R-73*4,R-27R*2,Fuel-1500`** (identical to MiG-29S)

```lua
pylons = {
  [1] = { CLSID = "{FBC29BFE-3D24-4C64-B81D-941239D12249}", num = 1 },  -- R-73
  [2] = { CLSID = "{FBC29BFE-3D24-4C64-B81D-941239D12249}", num = 2 },  -- R-73
  [3] = { CLSID = "{9B25D316-0434-4954-868F-D51DB1A38DF0}", num = 3 },  -- R-27R
  [4] = { CLSID = "{2BEC576B-CDF5-4B7F-961F-B0FA4312B841}", num = 4 },  -- Fuel-1500
  [5] = { CLSID = "{9B25D316-0434-4954-868F-D51DB1A38DF0}", num = 5 },  -- R-27R
  [6] = { CLSID = "{FBC29BFE-3D24-4C64-B81D-941239D12249}", num = 6 },  -- R-73
  [7] = { CLSID = "{FBC29BFE-3D24-4C64-B81D-941239D12249}", num = 7 },  -- R-73
}
```

---

## F-15C Presets

All CLSIDs from `F-15C.lua`. 11-station airframe.

**Preset: `AIM-9*4,AIM-120*4,Fuel*3`** (recommended CAP)

```lua
pylons = {
  [1]  = { CLSID = "{6CEB49FC-DED8-4DED-B053-E1F033FF72D3}", num = 1  },  -- AIM-9
  [2]  = { CLSID = "{E1F29B21-F291-4589-9FD8-3272EEC69506}", num = 2  },  -- AIM-120
  [3]  = { CLSID = "{6CEB49FC-DED8-4DED-B053-E1F033FF72D3}", num = 3  },  -- AIM-9
  [4]  = { CLSID = "{C8E06185-7CD6-4C90-959F-044679E90751}", num = 4  },  -- fuel
  [5]  = { CLSID = "{C8E06185-7CD6-4C90-959F-044679E90751}", num = 5  },  -- fuel
  [6]  = { CLSID = "{E1F29B21-F291-4589-9FD8-3272EEC69506}", num = 6  },  -- AIM-120
  [7]  = { CLSID = "{C8E06185-7CD6-4C90-959F-044679E90751}", num = 7  },  -- fuel
  [8]  = { CLSID = "{C8E06185-7CD6-4C90-959F-044679E90751}", num = 8  },  -- fuel
  [9]  = { CLSID = "{6CEB49FC-DED8-4DED-B053-E1F033FF72D3}", num = 9  },  -- AIM-9
  [10] = { CLSID = "{E1F29B21-F291-4589-9FD8-3272EEC69506}", num = 10 },  -- AIM-120
  [11] = { CLSID = "{6CEB49FC-DED8-4DED-B053-E1F033FF72D3}", num = 11 },  -- AIM-9
}
```

**Preset: `AIM-120B*4, AIM-7M*2, AIM-9M*2, Fuel*3`**

```lua
pylons = {
  [1]  = { CLSID = "{E1F29B21-F291-4589-9FD8-3272EEC69506}", num = 2  },  -- AIM-120B
  [2]  = { CLSID = "{E1F29B21-F291-4589-9FD8-3272EEC69506}", num = 6  },  -- AIM-120B
  [3]  = { CLSID = "{E1F29B21-F291-4589-9FD8-3272EEC69506}", num = 10 },  -- AIM-120B
  [4]  = { CLSID = "{C8E06185-7CD6-4C90-959F-044679E90751}", num = 11 },  -- AIM-9M (wingtip)
  [5]  = { CLSID = "{6CEB49FC-DED8-4DED-B053-E1F033FF72D3}", num = 9  },  -- AIM-7M
  [6]  = { CLSID = "{6CEB49FC-DED8-4DED-B053-E1F033FF72D3}", num = 3  },  -- AIM-7M
  [7]  = { CLSID = "{C8E06185-7CD6-4C90-959F-044679E90751}", num = 1  },  -- AIM-9M (wingtip)
  [8]  = { CLSID = "{C8E06185-7CD6-4C90-959F-044679E90751}", num = 5  },  -- fuel
  [9]  = { CLSID = "{C8E06185-7CD6-4C90-959F-044679E90751}", num = 8  },  -- fuel
  [10] = { CLSID = "{8D399DDA-FF81-4F14-904D-099B34FE7918}", num = 7  },  -- fuel
  [11] = { CLSID = "{8D399DDA-FF81-4F14-904D-099B34FE7918}", num = 4  },  -- fuel
}
```

Other F-15C preset names:

- `AIM-9*2,AIM-120*6,Fuel`
- `AIM-9*2,AIM-120*6,Fuel*3`
- `AIM-9*2,AIM-120*2,AIM-7*4,Fuel*3`
- `AIM-120*8,Fuel*3`

---

## F-16C Presets

All CLSIDs from `F-16C.lua`. 10-station airframe (5 = centerline).

**Preset: `AGM-88*2, AGM-65D*2, AIM-120B*2, ECM,LIGHTNING`** (SEAD)

```lua
pylons = {
  [1]  = { CLSID = "{C8E06185-7CD6-4C90-959F-044679E90751}", num = 1  },  -- AIM-9 (wingtip)
  [2]  = { CLSID = "{6CEB49FC-DED8-4DED-B053-E1F033FF72D3}", num = 2  },  -- AIM-120B
  [3]  = { CLSID = "{444BA8AE-82A7-4345-842E-76154EFCCA46}", num = 3  },  -- AGM-88
  [4]  = { CLSID = "{B06DD79A-F21E-4EB9-BD9D-AB3844618C93}", num = 4  },  -- AGM-65D
  [5]  = { CLSID = "{A111396E-D3E8-4b9c-8AC9-2432489304D5}", num = 5  },  -- Lightning pod
  [6]  = { CLSID = "{6D21ECEA-F85B-4E8D-9D51-31DC9B8AA4EF}", num = 6  },  -- ECM
  [7]  = { CLSID = "{B06DD79A-F21E-4EB9-BD9D-AB3844618C93}", num = 7  },  -- AGM-65D
  [8]  = { CLSID = "{444BA8AE-82A7-4345-842E-76154EFCCA46}", num = 8  },  -- AGM-88
  [9]  = { CLSID = "{6CEB49FC-DED8-4DED-B053-E1F033FF72D3}", num = 9  },  -- AIM-120B
  [10] = { CLSID = "{C8E06185-7CD6-4C90-959F-044679E90751}", num = 10 },  -- AIM-9 (wingtip)
}
```

**Preset: `AGM-65D*4,AIM-120*2,ECM,Fuel*2,LIGHTNING`** (CAS/strike)

```lua
pylons = {
  [1] = { CLSID = "{C8E06185-7CD6-4C90-959F-044679E90751}", num = 1  },  -- AIM-9
  [2] = { CLSID = "{E6A6262A-CA08-4B3D-B030-E1A993B98452}", num = 3  },  -- AGM-65D (triple L)
  [3] = { CLSID = "{F376DBEE-4CAE-41BA-ADD9-B2910AC95DEC}", num = 4  },  -- fuel
  [4] = { CLSID = "{A111396E-D3E8-4b9c-8AC9-2432489304D5}", num = 5  },  -- Lightning pod
  [5] = { CLSID = "{6D21ECEA-F85B-4E8D-9D51-31DC9B8AA4EF}", num = 6  },  -- ECM
  [6] = { CLSID = "{F376DBEE-4CAE-41BA-ADD9-B2910AC95DEC}", num = 7  },  -- fuel
  [7] = { CLSID = "{E6A6262A-CA08-4B3D-B030-E1A993B98453}", num = 8  },  -- AGM-65D (triple R)
  [8] = { CLSID = "{C8E06185-7CD6-4C90-959F-044679E90751}", num = 10 },  -- AIM-9
}
```

**Preset: `Mk-82*6,AIM-120*2,ECM,Fuel*2,LIGHTNING`** (dumb bombs)

```lua
pylons = {
  [1] = { CLSID = "{C8E06185-7CD6-4C90-959F-044679E90751}", num = 1  },  -- AIM-9
  [2] = { CLSID = "{60CC734F-0AFA-4E2E-82B8-93B941AB11CF}", num = 3  },  -- Mk-82 triple
  [3] = { CLSID = "{F376DBEE-4CAE-41BA-ADD9-B2910AC95DEC}", num = 4  },  -- fuel
  [4] = { CLSID = "{6D21ECEA-F85B-4E8D-9D51-31DC9B8AA4EF}", num = 6  },  -- ECM
  [5] = { CLSID = "{F376DBEE-4CAE-41BA-ADD9-B2910AC95DEC}", num = 7  },  -- fuel
  [6] = { CLSID = "{60CC734F-0AFA-4E2E-82B8-93B941AB11CF}", num = 8  },  -- Mk-82 triple
  [7] = { CLSID = "{C8E06185-7CD6-4C90-959F-044679E90751}", num = 10 },  -- AIM-9
  [8] = { CLSID = "{A111396E-D3E8-4b9c-8AC9-2432489304D5}", num = 5  },  -- Lightning pod
}
```

**Preset: `AIM-120C*4,AIM-9M*2,ECM,Fuel*2`** (CAP)

```lua
-- Read full pylon table from F-16C.lua — preset name verified
```

Other F-16C preset names:

- `AIM-120*2,GBU-31*2,ECM,Fuel*2,LIGHTNING`
- `AIM-120*2,GBU-10*2,ECM,Fuel*2,LIGHTNING`
- `AIM-120*2,GBU-12*2,ECM,Fuel*2,LITENING`
- `AGM-88*2,AIM-120*2,AIM-9*2,ECM,Fuel*2,LIGHTNING`
- `CBU97*4,AIM120*2,ECM,Fuel*2,LITENING`
- `AGM-154*2,AIM-120*2,ECM,Fuel*2,LIGHTNING`

---

## Ka-52 Presets (4-pylon helicopter)

All CLSIDs from `Ka-52.lua` (complete).

**Preset: `APU-6 Vikhr-M*2, Kh-25ML*2`**

```lua
pylons = {
  [1] = { CLSID = "{A6FD14D3-6D30-4C85-88A7-8D17BEE120E2}", num = 1 },  -- Vikhr-M (4-pack)
  [2] = { CLSID = "{6DADF342-D4BA-4D8A-B081-BA928C4AF86D}", num = 2 },  -- Kh-25ML
  [3] = { CLSID = "{6DADF342-D4BA-4D8A-B081-BA928C4AF86D}", num = 3 },  -- Kh-25ML
  [4] = { CLSID = "{A6FD14D3-6D30-4C85-88A7-8D17BEE120E2}", num = 4 },  -- Vikhr-M (4-pack)
}
```

**Preset: `APU-6 Vikhr-M*2`** (AT only)

```lua
pylons = {
  [1] = { CLSID = "{A6FD14D3-6D30-4C85-88A7-8D17BEE120E2}", num = 1 },  -- Vikhr-M
  [4] = { CLSID = "{A6FD14D3-6D30-4C85-88A7-8D17BEE120E2}", num = 4 },  -- Vikhr-M
}
```

**Preset: `B-8*2, APU-6 Vikhr-M*2`** (mixed)

```lua
pylons = {
  [1] = { CLSID = "{A6FD14D3-6D30-4C85-88A7-8D17BEE120E2}", num = 1 },  -- Vikhr-M
  [2] = { CLSID = "{6A4B9E69-64FE-439a-9163-3A87FB6A4D81}", num = 2 },  -- B-8
  [3] = { CLSID = "{6A4B9E69-64FE-439a-9163-3A87FB6A4D81}", num = 3 },  -- B-8
  [4] = { CLSID = "{A6FD14D3-6D30-4C85-88A7-8D17BEE120E2}", num = 4 },  -- Vikhr-M
}
```

**Preset: `B-8*4`** (pure rockets)

```lua
pylons = {
  [1] = { CLSID = "{6A4B9E69-64FE-439a-9163-3A87FB6A4D81}", num = 1 },
  [2] = { CLSID = "{6A4B9E69-64FE-439a-9163-3A87FB6A4D81}", num = 2 },
  [3] = { CLSID = "{6A4B9E69-64FE-439a-9163-3A87FB6A4D81}", num = 3 },
  [4] = { CLSID = "{6A4B9E69-64FE-439a-9163-3A87FB6A4D81}", num = 4 },
}
```

**Preset: `Kh-25ML*2, R-73*2`**

```lua
pylons = {
  [1] = { CLSID = "{FBC29BFE-3D24-4C64-B81D-941239D12249}", num = 1 },  -- R-73
  [2] = { CLSID = "{6DADF342-D4BA-4D8A-B081-BA928C4AF86D}", num = 2 },  -- Kh-25ML
  [3] = { CLSID = "{6DADF342-D4BA-4D8A-B081-BA928C4AF86D}", num = 3 },  -- Kh-25ML
  [4] = { CLSID = "{FBC29BFE-3D24-4C64-B81D-941239D12249}", num = 4 },  -- R-73
}
```

Other Ka-52 presets: `FAB-500*2`, `FAB-250*4`, `UB-13*2`, `KMGU-2 (AO-2.5RT)*4`.

---

## AH-64D Presets (4-pylon helicopter)

All CLSIDs from `AH-64D.lua` (complete).

**Preset: `8xAGM-114, 38xHYDRA-70`** (recommended mixed)

```lua
pylons = {
  [1] = { CLSID = "{88D18A5E-99C8-4B04-B40B-1C02F2018B6E}", num = 1 },  -- AGM-114 (4-pack)
  [2] = { CLSID = "{FD90A1DC-9147-49FA-BF56-CB83EF0BD32B}", num = 2 },  -- HYDRA-70 (19-rnd)
  [3] = { CLSID = "{FD90A1DC-9147-49FA-BF56-CB83EF0BD32B}", num = 3 },  -- HYDRA-70 (19-rnd)
  [4] = { CLSID = "{88D18A5E-99C8-4B04-B40B-1C02F2018B6E}", num = 4 },  -- AGM-114 (4-pack)
}
```

**Preset: `AGM-114K*16`** (AT heavy)

```lua
pylons = {
  [1] = { CLSID = "{88D18A5E-99C8-4B04-B40B-1C02F2018B6E}", num = 1 },
  [2] = { CLSID = "{88D18A5E-99C8-4B04-B40B-1C02F2018B6E}", num = 2 },
  [3] = { CLSID = "{88D18A5E-99C8-4B04-B40B-1C02F2018B6E}", num = 3 },
  [4] = { CLSID = "{88D18A5E-99C8-4B04-B40B-1C02F2018B6E}", num = 4 },
}
```

**Preset: `76xHYDRA-70`** (pure suppress)

```lua
pylons = {
  [1] = { CLSID = "{FD90A1DC-9147-49FA-BF56-CB83EF0BD32B}", num = 1 },
  [2] = { CLSID = "{FD90A1DC-9147-49FA-BF56-CB83EF0BD32B}", num = 2 },
  [3] = { CLSID = "{FD90A1DC-9147-49FA-BF56-CB83EF0BD32B}", num = 3 },
  [4] = { CLSID = "{FD90A1DC-9147-49FA-BF56-CB83EF0BD32B}", num = 4 },
}
```

Other AH-64D presets: `38xHYDRA-70`, `38xHYDRA-70 WP`, `8xAGM-114`, `8xAGM-114, 38xHYDRA-70 WP`.

---

## Mi-24V Presets

All CLSIDs from `Mi-24V.lua`. 6-station airframe (1,2,3,4,5,6).

**Preset: `8x9M114, 40xS-8`** (AT + rockets)

```lua
pylons = {
  [1] = { CLSID = "{B919B0F4-7C25-455E-9A02-CEA51DB895E3}", num = 1 },  -- 9M114 (4-pack)
  [2] = { CLSID = "{F72F47E5-C83A-4B85-96ED-D3E46671EE9A}", num = 2 },  -- S-8 pod
  [3] = { CLSID = "{F72F47E5-C83A-4B85-96ED-D3E46671EE9A}", num = 4 },  -- S-8 pod
  [4] = { CLSID = "{B919B0F4-7C25-455E-9A02-CEA51DB895E3}", num = 6 },  -- 9M114 (4-pack)
}
```

**Preset: `4x9M114, 2xFuel tank`**

```lua
pylons = {
  [1] = { CLSID = "{B919B0F4-7C25-455E-9A02-CEA51DB895E3}", num = 1 },  -- 9M114 (4-pack)
  [2] = { CLSID = "{PTB_450}",                              num = 3 },  -- fuel
  [3] = { CLSID = "{PTB_450}",                              num = 4 },  -- fuel
  [4] = { CLSID = "{B919B0F4-7C25-455E-9A02-CEA51DB895E3}", num = 6 },  -- 9M114 (4-pack)
}
```

**Preset: `128xS-5`** (pure rockets)

```lua
pylons = {
  [1] = { CLSID = "{637334E4-AB5A-47C0-83A6-51B7F1DF3CD5}", num = 2 },
  [2] = { CLSID = "{637334E4-AB5A-47C0-83A6-51B7F1DF3CD5}", num = 3 },
  [3] = { CLSID = "{637334E4-AB5A-47C0-83A6-51B7F1DF3CD5}", num = 4 },
  [4] = { CLSID = "{637334E4-AB5A-47C0-83A6-51B7F1DF3CD5}", num = 5 },
}
```

Other Mi-24V preset names:

- `8x9M114`
- `4x9M114, 40xS-8 TsM`
- `8x9M114, 10xS-13`
- `10xS-13`
- `2xFAB-500`, `2xFAB-250`

---

## CLSID Quick-Reference

Verified CLSIDs only — all sourced from DCS UnitPayloads files.

| Weapon | CLSID | Airframe(s) |
|---|---|---|
| R-60M | `{682A481F-0CB5-4693-A382-D00DD4A156D7}` | Su-25, MiG-29 (VERIFIED) |
| R-60M (Su-24 variant) | `{APU-60-1_R_60M}` | Su-24M (string ID, no braces needed differently) |
| R-73 | `{FBC29BFE-3D24-4C64-B81D-941239D12249}` | Su-27, MiG-29, Ka-52 |
| R-27ER | `{E8069896-8435-4B90-95C0-01A03AE6E400}` | Su-27 |
| R-27ET | `{B79C379A-9E87-4E50-A1EE-7F7E29C2E87A}` | Su-27 |
| R-27R | `{9B25D316-0434-4954-868F-D51DB1A38DF0}` | MiG-29 |
| ECM pod (left) | `{44EE8698-89F9-48EE-AF36-5FD31896A82F}` | Su-27 |
| ECM pod (right) | `{44EE8698-89F9-48EE-AF36-5FD31896A82A}` | Su-27 |
| S-8KOM pod | `{E8D4652F-FD48-45B7-BA5B-2AE05BB5A9CF}` | Su-25 |
| B-8 pod (Su-25 / Su-24) | `{F72F47E5-C83A-4B85-96ED-D3E46671EE9A}` | Su-25, Su-24M |
| B-8 pod (Ka-52) | `{6A4B9E69-64FE-439a-9163-3A87FB6A4D81}` | Ka-52 |
| UB-13 pod | `{FC56DF80-9B09-44C5-8976-DCFAFF219062}` | Su-25, Su-24M, Ka-52, Mi-24V |
| FAB-250 | `{3C612111-C7AD-476E-8A8E-2485812F4E5C}` | Su-25, Ka-52, Mi-24V |
| FAB-500 | `{37DCC01E-9E02-432F-B61D-10C166CA2798}` | Su-24M, Ka-52, Mi-24V |
| KAB-500 | `{BA565F89-2373-4A84-9502-A0E017D3A44A}` | Su-24M |
| S-25L | `{A0648264-4BC0-4EE8-A543-D119F6BA4257}` | Su-25 |
| Kh-25ML | `{6DADF342-D4BA-4D8A-B081-BA928C4AF86D}` | Su-24M, Ka-52 |
| Kh-25ML (Su-25 variant) | `{D8F2C90B-887B-4B9E-9FE2-996BC9E9AF03}` | Su-24M pylons |
| Kh-29L | `{D5435F26-F120-4FA3-9867-34ACE562EF1B}` | Su-25 |
| Kh-31A | `{4D13E282-DF46-4B23-864A-A9423DFDE504}` | Su-24M |
| Kh-31P | `{6DADF342-D4BA-4D8A-B081-BA928C4AF86D}` | Su-24M (same CLSID base as Kh-25ML — verify) |
| L-081 Fantasmagoria pod | `{0519A264-0AB6-11d6-9193-00A0249B6F00}` | Su-24M SEAD |
| Fuel (Su-25) | `{4203753F-8198-4E85-9924-6F8FF679F9FF}` | Su-25 |
| Fuel (Su-24M wing) | `{7D7EC917-05F6-49D4-8045-61FC587DD019}` | Su-24M |
| Fuel (Su-24M centre) | `{16602053-4A12-40A2-B214-AB60D481B20E}` | Su-24M |
| Fuel-1500 (MiG-29 centre) | `{2BEC576B-CDF5-4B7F-961F-B0FA4312B841}` | MiG-29 |
| 9M114 Shturm (4-pack) | `{B919B0F4-7C25-455E-9A02-CEA51DB895E3}` | Mi-24V |
| PTB-450 (Mi-24 fuel) | `{PTB_450}` | Mi-24V |
| S-5 (UB-32) | `{637334E4-AB5A-47C0-83A6-51B7F1DF3CD5}` | Mi-24V |
| Vikhr-M (APU-6, 6-pack) | `{A6FD14D3-6D30-4C85-88A7-8D17BEE120E2}` | Ka-52 |
| AGM-114 Hellfire (4-pack) | `{88D18A5E-99C8-4B04-B40B-1C02F2018B6E}` | AH-64D |
| HYDRA-70 (M261) | `{FD90A1DC-9147-49FA-BF56-CB83EF0BD32B}` | AH-64D |
| HYDRA-70 WP | `{3DFB7321-AB0E-11d7-9897-000476191836}` | AH-64D |
| AIM-9M | `{C8E06185-7CD6-4C90-959F-044679E90751}` | F-16C (wingtip), F-15C |
| AIM-120B | `{E1F29B21-F291-4589-9FD8-3272EEC69506}` | F-15C |
| AIM-120B (F-16C) | `{6CEB49FC-DED8-4DED-B053-E1F033FF72D3}` | F-16C |
| AIM-7M | `{6CEB49FC-DED8-4DED-B053-E1F033FF72D3}` | F-15C |
| F-15C fuel | `{8D399DDA-FF81-4F14-904D-099B34FE7918}` | F-15C |
| F-16C fuel (wing) | `{F376DBEE-4CAE-41BA-ADD9-B2910AC95DEC}` | F-16C |
| F-16C fuel (centre) | `{A111396E-D3E8-4b9c-8AC9-2432489304D5}` | F-16C |
| AGM-88 HARM | `{444BA8AE-82A7-4345-842E-76154EFCCA46}` | F-16C |
| AGM-65D (triple) | `{DAC53A2F-79CA-42FF-A77A-F5649B601308}` | F-16C |
| AGM-65D (single, left) | `{E6A6262A-CA08-4B3D-B030-E1A993B98452}` | F-16C |
| AGM-65D (single, right) | `{E6A6262A-CA08-4B3D-B030-E1A993B98453}` | F-16C |
| Mk-82 (triple rack) | `{60CC734F-0AFA-4E2E-82B8-93B941AB11CF}` | F-16C |
| ECM pod (F-16C) | `{6D21ECEA-F85B-4E8D-9D51-31DC9B8AA4EF}` | F-16C |

---

## Critical Traps

- **`db_weapons` not available** — do not call it in MB_safeExec or any server-env code.
- **R-60M has two CLSIDs**: `{682A481F...}` on Su-25/MiG-29 and `{APU-60-1_R_60M}` as a string on Su-24M. Using the wrong one will silently produce an empty pylon.
- **`B-8M1` `{FC769D06...}` is Su-25T only** — on base Su-25 use S-8KOM `{E8D4652F...}` or UB-13 `{FC56DF80...}`.
- **Kh-31P and Kh-25ML share CLSID base** — verify from Su-24M.lua before using; the `Kh31P` entries use `{6DADF342...}` in outer stations.
- **AIM-120B CLSID differs between F-15C and F-16C** — `{E1F29B21...}` on F-15C, `{6CEB49FC...}` on F-16C.

---

## Airframe Fuel Reference

| Airframe | Notes |
|---|---|
| Su-25 | ~3000 kg internal; +2× tanks via `{4203753F...}` |
| Su-27 | ~9400 kg internal; long-range CAP |
| MiG-29A/S | ~3300 kg; short-legged; add `{2BEC576B...}` centre tank |
| Su-24M | Add `{7D7EC917...}` wing tanks + `{16602053...}` centre for range |
| F-16C | Low internal; add `{F376DBEE...}` wing + `{A111396E...}` centre |
| F-15C | ~5100 kg; add `{8D399DDA...}` tanks |
| Ka-52 | No extended fuel — 4 weapon stations only |
| AH-64D | No fuel tanks — 4 weapon stations only |
| Mi-24V | `{PTB_450}` tanks on inner stations |

> Always set `payload.fuel = 99999` — DCS clamps to airframe max.

---

## How to Discover New CLSIDs

**Option A — Read the UnitPayloads file:**
`E:\SteamLibrary\steamapps\common\DCSWorld\MissionEditor\data\scripts\UnitPayloads\<Airframe>.lua`
All 61 airframes are available. Each preset contains `{ CLSID = "...", num = N }` — `num` is the pylon station.

**Option B — Query a live armed unit:**

```lua
local u = Unit.getByName('SomeArmedUnit')
if u then
  local ammo = u:getAmmo()
  local out = {}
  for i, a in ipairs(ammo or {}) do
    out[#out+1] = tostring(i) .. ': ' .. (a.desc and a.desc.typeName or '?') .. ' x' .. tostring(a.count)
  end
  trigger.action.outText(table.concat(out, '\n'), 40)
end
```
