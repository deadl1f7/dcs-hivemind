---
name: dcs-timer
description: "Invoke DCS Timer gRPC methods. Service for querying scenario and absolute time information. Proto: dcs-grpc-wrapper/proto/timer/v0/timer.proto"
---

# dcs-timer Skill

Invoke DCS Timer service gRPC methods for scenario timing information.

## Prerequisites

- AppHost started: `aspire start` or `aspire start --isolated`
- `dcs-grpc-wrapper` resource is live and healthy
- `.withMcpServer({ path: "/mcp/dcs-grpc", endpointName: "dcs-grpc" })` is configured in `apphost.ts`

## Available Methods

### Mission Time
- **GetTime** - Get elapsed time since scenario start in seconds
- **GetAbsoluteTime** - Get absolute time with day/month/year
- **GetTimeZero** - Get mission start time (time zero) with day/month/year

## Quick Examples

> **CRITICAL — Tool Invocation**: NEVER use `aspire mcp call` in the terminal to invoke gRPC methods. Always use the MCP tool directly:
> 1. Load deferred tool: `tool_search_tool_regex` with pattern `mcp_dcs-grpc-wrap`
> 2. Call: `mcp_dcs-grpc-wrap_call_grpc_method` with the JSON payload below

Get elapsed time since mission start:
```json
{"method": "GetTime", "payload": {}}
```

Get absolute mission time with date:
```json
{"method": "GetAbsoluteTime", "payload": {}}
```

Get mission start time:
```json
{"method": "GetTimeZero", "payload": {}}
```

## References

- [Timer Singleton Documentation](https://wiki.hoggitworld.com/view/DCS_singleton_timer)
- [Proto File](../../proto/timer/v0/timer.proto)
