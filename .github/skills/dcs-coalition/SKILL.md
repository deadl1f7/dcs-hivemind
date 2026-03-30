---
name: dcs-coalition
description: "Invoke DCS Coalition gRPC methods. Service for managing groups, air/ground units, static objects, player units, and bullseye. Proto: dcs-grpc-wrapper/proto/coalition/v0/coalition.proto"
---

# dcs-coalition Skill

Invoke DCS Coalition service gRPC methods for managing and querying coalition-level resources.

## Prerequisites

- AppHost started: `aspire start` or `aspire start --isolated`
- `dcs-grpc-wrapper` resource is live and healthy
- `.withMcpServer({ path: "/mcp/dcs-grpc", endpointName: "dcs-grpc" })` is configured in `apphost.ts`

## Available Methods

### Groups
- **AddGroup** - Add a new group (ground, ship, helicopter, or plane) to coalition
- **GetGroups** - Get all groups in a coalition

### Static Objects
- **GetStaticObjects** - Get all static objects in a coalition
- **AddStaticObject** - Add static object to coalition
- **AddLinkedStatic** - Add linked static object (for linked statics with properties)

### Players
- **GetPlayerUnits** - Get units controlled by players in coalition

### Reference Points
- **GetBullseye** - Get bullseye (main reference point) for coalition

## Quick Examples

Get all groups in coalition:
```powershell
aspire mcp call dcs-grpc-wrapper call_grpc_method --input @'
{\"method\":\"GetGroups\",\"payload\":{\"coalition\":\"COALITION_BLUE\"}}
'@
```

Get player-controlled units:
```powershell
aspire mcp call dcs-grpc-wrapper call_grpc_method --input @'
{\"method\":\"GetPlayerUnits\",\"payload\":{\"coalition\":\"COALITION_BLUE\"}}
'@
```

Get bullseye position:
```powershell
aspire mcp call dcs-grpc-wrapper call_grpc_method --input @'
{\"method\":\"GetBullseye\",\"payload\":{\"coalition\":\"COALITION_BLUE\"}}
'@
```

Get static objects:
```powershell
aspire mcp call dcs-grpc-wrapper call_grpc_method --input @'
{\"method\":\"GetStaticObjects\",\"payload\":{\"coalition\":\"COALITION_BLUE\"}}
'@
```

## References

- [Coalition Singleton Documentation](https://wiki.hoggitworld.com/view/DCS_singleton_coalition)
- [Proto File](../../proto/coalition/v0/coalition.proto)
