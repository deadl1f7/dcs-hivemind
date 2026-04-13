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

> **CRITICAL — Tool Invocation**: NEVER use `aspire mcp call` in the terminal to invoke gRPC methods. Always use the MCP tool directly:
> 1. Load deferred tool: `tool_search_tool_regex` with pattern `mcp_dcs-grpc-wrap`
> 2. Call: `mcp_dcs-grpc-wrap_call_grpc_method` with the JSON payload below

Get Blue coalition airbases:
```json
{"method": "GetAirbases", "payload": {"coalition": "COALITION_BLUE"}}
```

Get all mark panels:
```json
{"method": "GetMarkPanels", "payload": {}}
```

Get theatre/map name:
```json
{"method": "GetTheatre", "payload": {}}
```

## References

- [World Singleton Documentation](https://wiki.hoggitworld.com/view/DCS_singleton_world)
- [Airbases Documentation](https://wiki.hoggitworld.com/view/DCS_func_getAirbases)
- [Proto File](../../proto/world/v0/world.proto)
