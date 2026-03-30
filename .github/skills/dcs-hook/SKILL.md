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

Get mission name:
```bash
aspire mcp call dcs-grpc call_grpc_method --input '{"method":"GetMissionName","payload":{}}'
```

Pause mission:
```bash
aspire mcp call dcs-grpc call_grpc_method --input '{"method":"SetPaused","payload":{"paused":true}}'
```

Unpause mission:
```bash
aspire mcp call dcs-grpc call_grpc_method --input '{"method":"SetPaused","payload":{"paused":false}}'
```

Reload mission:
```bash
aspire mcp call dcs-grpc call_grpc_method --input '{"method":"ReloadCurrentMission","payload":{}}'
```

Load next mission:
```bash
aspire mcp call dcs-grpc call_grpc_method --input '{"method":"LoadNextMission","payload":{}}'
```

Load specific mission:
```bash
aspire mcp call dcs-grpc call_grpc_method --input '{"method":"LoadMission","payload":{"filePath":"/path/to/mission.miz"}}'
```

## References

- [Hook Environment Documentation](https://wiki.hoggitworld.com/view/DCS_singleton_hook)
- [Proto File](../../proto/hook/v0/hook.proto)
