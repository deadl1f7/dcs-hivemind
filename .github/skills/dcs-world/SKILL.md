---
name: dcs-world
description: "Invoke DCS World gRPC methods. Service for querying airbases, marks, and theatre information. Proto: dcs-grpc-wrapper/proto/world/v0/world.proto"
---

# dcs-world Skill

Invoke DCS World service gRPC methods for querying world state and geography information.

## Prerequisites

- AppHost started: `aspire start` or `aspire start --isolated`
- `dcs-grpc-wrapper` resource is live and healthy
- `.withMcpServer({ path: "/mcp/dcs-grpc", endpointName: "dcs-grpc" })` is configured in `apphost.ts`

## Available Methods

### Airbases
- **GetAirbases** - Get list of airbases for coalition (aerodromes, helipads, ships)

### Marks
- **GetMarkPanels** - Get all mark panels with marks placed on them

### Theatre/Map
- **GetTheatre** - Get current mission theatre (map name)

## Quick Examples

Get Blue coalition airbases:
```bash
aspire mcp call dcs-grpc call_grpc_method --input '{"method":"GetAirbases","payload":{"coalition":"COALITION_BLUE"}}'
```

Get all mark panels:
```bash
aspire mcp call dcs-grpc call_grpc_method --input '{"method":"GetMarkPanels","payload":{}}'
```

Get theatre/map name:
```bash
aspire mcp call dcs-grpc call_grpc_method --input '{"method":"GetTheatre","payload":{}}'
```

## References

- [World Singleton Documentation](https://wiki.hoggitworld.com/view/DCS_singleton_world)
- [Airbases Documentation](https://wiki.hoggitworld.com/view/DCS_func_getAirbases)
- [Proto File](../../proto/world/v0/world.proto)
