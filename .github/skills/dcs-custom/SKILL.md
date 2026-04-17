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

> **CRITICAL — Tool Invocation**: NEVER use `aspire mcp call` in the terminal to invoke gRPC methods. Always use the MCP tool directly:
> 1. Load deferred tool: `tool_search_tool_regex` with pattern `mcp_dcs-grpc-wrap`
> 2. Call: `mcp_dcs-grpc-wrap_call_grpc_method` with the JSON payload below

Request mission assignment:
```json
{"method": "RequestMissionAssignment", "payload": {"unitName": "Pilot-1", "missionType": "CAP"}}
```

Join DCT mission:
```json
{"method": "JoinMission", "payload": {"unitName": "Pilot-1", "missionCode": 12345}}
```

Get magnetic declination:
```json
{"method": "GetMagneticDeclination", "payload": {"position": {"lat": 40.0, "lon": 0.0, "alt": 1000}}}
```

Evaluate Lua:
```json
{"method": "Eval", "payload": {"luaCode": "return world.theatre()"}}
```

## References

- [Proto File](../../libs/dcs-grpc/proto/custom/v0/custom.proto)
