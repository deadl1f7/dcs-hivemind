---
name: dcs-mission
description: "Invoke DCS Mission gRPC methods. Service for streaming events, units, scenario time, and managing mission commands. Proto: dcs-grpc-wrapper/proto/mission/v0/mission.proto"
---

# dcs-mission Skill

Invoke DCS Mission service gRPC methods for streaming events and units, managing scenario time, and mission/coalition/group commands.

## Prerequisites

- AppHost started: `aspire start` or `aspire start --isolated`
- `dcs-grpc-wrapper` resource is live and healthy
- `.withMcpServer({ path: "/mcp/dcs-grpc", endpointName: "dcs-grpc" })` is configured in `apphost.ts`

## Available Methods

### Streaming Methods
- **StreamEvents** - Streams DCS game generated Events
- **StreamUnits** - Streams unit updates (Tacview-like functionality at lower update rate)

### Time Methods
- **GetScenarioStartTime** - Returns mission start time as ISO 8601 string
- **GetScenarioCurrentTime** - Returns current in-game time as ISO 8601 string

### Mission Commands
- **AddMissionCommand** - Adds a new mission command
- **AddMissionCommandSubMenu** - Adds a mission command sub menu
- **RemoveMissionCommandItem** - Removes a mission command

### Coalition Commands
- **AddCoalitionCommand** - Adds a coalition command
- **AddCoalitionCommandSubMenu** - Adds a coalition command sub menu
- **RemoveCoalitionCommandItem** - Removes a coalition command

### Group Commands
- **AddGroupCommand** - Adds a group command
- **AddGroupCommandSubMenu** - Adds a group command sub menu
- **RemoveGroupCommandItem** - Removes a group command

### Session
- **GetSessionId** - Returns current session ID (changes on mission change or server restart)

## Quick Examples

> **CRITICAL — Tool Invocation**: NEVER use `aspire mcp call` in the terminal to invoke gRPC methods. Always use the MCP tool directly:
> 1. Load deferred tool: `tool_search_tool_regex` with pattern `mcp_dcs-grpc-wrap`
> 2. Call: `mcp_dcs-grpc-wrap_call_grpc_method` with the JSON payload below

Stream events:
```json
{"method": "StreamEvents", "payload": {}}
```

Get scenario current time:
```json
{"method": "GetScenarioCurrentTime", "payload": {}}
```

Add mission command:
```json
{"method": "AddMissionCommand", "payload": {"path": ["MyCommand"], "name": "Click Me", "func": {"name": "myFunc"}}}
```

## References

- [Mission Service Documentation](https://wiki.hoggitworld.com/view/DCS_Class_Mission)
- [Proto File](../../proto/mission/v0/mission.proto)
