---
name: dcs-custom
description: "Invoke DCS Custom gRPC methods. Custom/non-standard APIs like DCT integration, mission evaluation, and magnetic declination. Proto: dcs-grpc-wrapper/proto/custom/v0/custom.proto"
---

# dcs-custom Skill

Invoke DCS Custom service gRPC methods for non-standard but useful mission functions.

## Prerequisites

- AppHost started: `aspire start` or `aspire start --isolated`
- `dcs-grpc-wrapper` resource is live and healthy
- `.withMcpServer({ path: "/mcp/dcs-grpc", endpointName: "dcs-grpc" })` is configured in `apphost.ts`

## Available Methods

### DCT (Dynamic Campaign Tools) Integration
- **RequestMissionAssignment** - Request mission assignment from DCT for unit
- **JoinMission** - Join a DCT mission with mission code
- **AbortMission** - Abort current DCT mission
- **GetMissionStatus** - Get current DCT mission status

### Scripting
- **Eval** - Evaluate Lua code inside mission (must be enabled in config)

### Navigation
- **GetMagneticDeclination** - Calculate magnetic declination at position using IGRF model

## Quick Examples

Request mission assignment:
```powershell
aspire mcp call dcs-grpc-wrapper call_grpc_method --input @'
{\"method\":\"RequestMissionAssignment\",\"payload\":{\"unitName\":\"Pilot-1\",\"missionType\":\"CAP\"}}
'@
```

Join DCT mission:
```powershell
aspire mcp call dcs-grpc-wrapper call_grpc_method --input @'
{\"method\":\"JoinMission\",\"payload\":{\"unitName\":\"Pilot-1\",\"missionCode\":12345}}
'@
```

Get magnetic declination:
```powershell
aspire mcp call dcs-grpc-wrapper call_grpc_method --input @'
{\"method\":\"GetMagneticDeclination\",\"payload\":{\"position\":{\"lat\":40.0,\"lon\":0.0,\"alt\":1000}}}
'@
```

Evaluate Lua:
```powershell
aspire mcp call dcs-grpc-wrapper call_grpc_method --input @'
{\"method\":\"Eval\",\"payload\":{\"luaCode\":\"return world.theatre()\"}}
'@
```

## References

- [Proto File](../../proto/custom/v0/custom.proto)
