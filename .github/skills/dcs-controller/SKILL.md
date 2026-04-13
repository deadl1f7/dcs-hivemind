---
name: dcs-controller
description: "Invoke DCS Controller gRPC methods. Service for unit state control like alarm states and target detection. Proto: dcs-grpc-wrapper/proto/controller/v0/controller.proto"
---

# dcs-controller Skill

Invoke DCS Controller service gRPC methods for controlling unit states and querying detected targets.

## Prerequisites

- AppHost started: `aspire start` or `aspire start --isolated`
- `dcs-grpc-wrapper` resource is live and healthy
- `.withMcpServer({ path: "/mcp/dcs-grpc", endpointName: "dcs-grpc" })` is configured in `apphost.ts`

## Available Methods

### Alarm State
- **SetAlarmState** - Set alarm state for group or unit (AUTO, GREEN, RED)

### Detection
- **GetDetectedTargets** - Get detected targets for a unit with optional detection type filter

## Quick Examples

> **CRITICAL — Tool Invocation**: NEVER use `aspire mcp call` in the terminal to invoke gRPC methods. Always use the MCP tool directly:
> 1. Load deferred tool: `tool_search_tool_regex` with pattern `mcp_dcs-grpc-wrap`
> 2. Call: `mcp_dcs-grpc-wrap_call_grpc_method` with the JSON payload below

Set group to red alert:
```json
{"method": "SetAlarmState", "payload": {"groupName": "Group-1", "alarmState": "ALARM_STATE_RED"}}
```

Set unit to green (normal):
```json
{"method": "SetAlarmState", "payload": {"unitName": "Unit-1", "alarmState": "ALARM_STATE_GREEN"}}
```

Get detected targets by unit:
```json
{"method": "GetDetectedTargets", "payload": {"unitName": "Pilot-1"}}
```

Get radar-detected targets only:
```json
{"method": "GetDetectedTargets", "payload": {"unitName": "Pilot-1", "detectionType": "DETECTION_TYPE_RADAR"}}
```

## References

- [Alarm State Documentation](https://wiki.hoggitworld.com/view/DCS_option_alarmState)
- [Target Detection Documentation](https://wiki.hoggitworld.com/view/DCS_func_getDetectedTargets)
- [Proto File](../../proto/controller/v0/controller.proto)
