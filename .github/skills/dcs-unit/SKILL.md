---
name: dcs-unit
description: "Invoke DCS Unit gRPC methods. Service for querying unit properties like radar, position, player name, transform, and emissions. Proto: dcs-grpc-wrapper/proto/unit/v0/unit.proto"
---

# dcs-unit Skill

Invoke DCS Unit service gRPC methods for querying and controlling individual units.

## Prerequisites

- AppHost started: `aspire start` or `aspire start --isolated`
- `dcs-grpc-wrapper` resource is live and healthy
- `.withMcpServer({ path: "/mcp/dcs-grpc", endpointName: "dcs-grpc" })` is configured in `apphost.ts`

## Available Methods

### Radar
- **GetRadar** - Get radar active status and target information

### Position & Orientation
- **GetPosition** - Get unit position (lat/lon/alt)
- **GetTransform** - Get unit position, orientation, and velocity in 3D space

### Unit Information
- **GetPlayerName** - Get player name of unit if controlled by player
- **GetDescriptor** - Get unit attributes/descriptor

### Control
- **SetEmission** - Enable/disable unit emissions (radar, etc.)
- **Destroy** - Destroy the unit

### Draw Arguments
- **GetDrawArgumentValue** - Get cockpit draw argument value (for aircraft state visualization)

## Quick Examples

> **CRITICAL — Tool Invocation**: NEVER use `aspire mcp call` in the terminal to invoke gRPC methods. Always use the MCP tool directly:
> 1. Load deferred tool: `tool_search_tool_regex` with pattern `mcp_dcs-grpc-wrap`
> 2. Call: `mcp_dcs-grpc-wrap_call_grpc_method` with the JSON payload below

Get unit position:
```json
{"method": "GetPosition", "payload": {"name": "Pilot-1"}}
```

Get unit transform (position, orientation, velocity):
```json
{"method": "GetTransform", "payload": {"name": "Pilot-1"}}
```

Get radar status:
```json
{"method": "GetRadar", "payload": {"name": "Pilot-1"}}
```

Enable emissions:
```json
{"method": "SetEmission", "payload": {"name": "Pilot-1", "emitting": true}}
```

Get player controlling unit:
```json
{"method": "GetPlayerName", "payload": {"name": "Pilot-1"}}
```

## References

- [Unit Class Documentation](https://wiki.hoggitworld.com/view/DCS_Class_Unit)
- [Proto File](../../proto/unit/v0/unit.proto)
