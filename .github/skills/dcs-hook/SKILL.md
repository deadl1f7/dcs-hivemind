---
name: dcs-hook
description: "Invoke DCS Hook gRPC methods. Service for mission control like pause, reload, load missions, and hook environment evaluation. Proto: dcs-grpc-wrapper/proto/hook/v0/hook.proto"
---

# dcs-hook Skill

Invoke DCS Hook service gRPC methods for mission lifecycle control and hook environment access.

## Prerequisites

- AppHost started: `aspire start` or `aspire start --isolated`
- `dcs-grpc-wrapper` resource is live and healthy
- `.withMcpServer({ path: "/mcp/dcs-grpc", endpointName: "dcs-grpc" })` is configured in `apphost.ts`

## Available Methods

### Mission Information
- **GetMissionName** - Get mission name
- **GetMissionFilename** - Get mission file path
- **GetMissionDescription** - Get mission description
- **GetMissionType** - Get mission type

### Mission Control
- **GetPaused** - Check if mission is paused
- **SetPaused** - Pause/unpause mission
- **StopMission** - Stop and restart current mission
- **ReloadCurrentMission** - Reload currently running mission
- **LoadNextMission** - Load next mission in server mission list
- **LoadMission** - Load specific mission file

### Hook Environment
- **Eval** - Execute Lua in hook environment (must be enabled)
- **ExitProcess** - Exit DCS process
- **IsMultiplayer** - Check if mission in multiplayer

## Quick Examples

> **CRITICAL — Tool Invocation**: NEVER use `aspire mcp call` in the terminal to invoke gRPC methods. Always use the MCP tool directly:
> 1. Load deferred tool: `tool_search_tool_regex` with pattern `mcp_dcs-grpc-wrap`
> 2. Call: `mcp_dcs-grpc-wrap_call_grpc_method` with the JSON payload below

Get mission name:
```json
{"method": "GetMissionName", "payload": {}}
```

Pause mission:
```json
{"method": "SetPaused", "payload": {"paused": true}}
```

Unpause mission:
```json
{"method": "SetPaused", "payload": {"paused": false}}
```

Reload mission:
```json
{"method": "ReloadCurrentMission", "payload": {}}
```

Load next mission:
```json
{"method": "LoadNextMission", "payload": {}}
```

Load specific mission:
```json
{"method": "LoadMission", "payload": {"filePath": "/path/to/mission.miz"}}
```

## References

- [Hook Environment Documentation](https://wiki.hoggitworld.com/view/DCS_singleton_hook)
- [Proto File](../../libs/dcs-grpc/proto/hook/v0/hook.proto)
