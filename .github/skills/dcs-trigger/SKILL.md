---
name: dcs-trigger
description: "Invoke DCS Trigger gRPC methods. Service for UI notifications, marks, flags, and text output. Proto: dcs-grpc-wrapper/proto/trigger/v0/trigger.proto"
---

# dcs-trigger Skill

Invoke DCS Trigger service gRPC methods for UI notifications, screen text, marks, and flags.

## Prerequisites

- AppHost started: `aspire start` or `aspire start --isolated`
- `dcs-grpc-wrapper` resource is live and healthy
- `.withMcpServer({ path: "/mcp/dcs-grpc", endpointName: "dcs-grpc" })` is configured in `apphost.ts`

## Available Methods

### Text Output
- **OutText** - Display text on screen for all players
- **OutTextForCoalition** - Display text for specific coalition
- **OutTextForGroup** - Display text for specific group
- **OutTextForUnit** - Display text for specific unit

### User Flags
- **GetUserFlag** - Get user flag value
- **SetUserFlag** - Set user flag value

### Map Marks
- **MarkToAll** - Add mark visible to all
- **MarkToCoalition** - Add mark visible to coalition
- **MarkToGroup** - Add mark visible to group
- **RemoveMark** - Remove mark by ID

### Advanced Marks (Markup)
- **MarkupToAll** - Add advanced markup visible to all (arrows, lines, text)
- **MarkupToCoalition** - Add advanced markup to coalition

## Quick Examples

> **CRITICAL — Tool Invocation**: NEVER use `aspire mcp call` in the terminal to invoke gRPC methods. Always use the MCP tool directly:
> 1. Load deferred tool: `tool_search_tool_regex` with pattern `mcp_dcs-grpc-wrap`
> 2. Call: `mcp_dcs-grpc-wrap_call_grpc_method` with the JSON payload below

Display text to all:
```json
{"method": "OutText", "payload": {"text": "Mission briefing: Proceed to checkpoint Alpha", "displayTime": 10, "clearPrevious": false}}
```

Display text to coalition:
```json
{"method": "OutTextForCoalition", "payload": {"coalition": "COALITION_BLUE", "text": "All units, check in", "displayTime": 5}}
```

Display text to group:
```json
{"method": "OutTextForGroup", "payload": {"groupName": "Group-1", "text": "Group instruction", "displayTime": 5}}
```

Add mark on map:
```json
{"method": "MarkToAll", "payload": {"text": "Checkpoint A", "position": {"lat": 40.0, "lon": 0.0, "alt": 0}, "readonly": false}}
```

Set user flag:
```json
{"method": "SetUserFlag", "payload": {"flag": 1, "value": 42}}
```

Get user flag:
```json
{"method": "GetUserFlag", "payload": {"flag": 1}}
```

Remove mark:
```json
{"method": "RemoveMark", "payload": {"markId": 5}}
```

## References

- [Trigger Singleton Documentation](https://wiki.hoggitworld.com/view/DCS_singleton_trigger)
- [OutText Documentation](https://wiki.hoggitworld.com/view/DCS_func_outText)
- [Mark Documentation](https://wiki.hoggitworld.com/view/DCS_func_markToAll)
- [Proto File](../../proto/trigger/v0/trigger.proto)
