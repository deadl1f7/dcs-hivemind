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

Set group to red alert:
```bash
aspire mcp call dcs-grpc-wrapper call_grpc_method --input '{"method":"SetAlarmState","payload":{"groupName":"Group-1","alarmState":"ALARM_STATE_RED"}}'
```

Set unit to green (normal):
```bash
aspire mcp call dcs-grpc-wrapper call_grpc_method --input '{"method":"SetAlarmState","payload":{"unitName":"Unit-1","alarmState":"ALARM_STATE_GREEN"}}'
```

Get detected targets by unit:
```bash
aspire mcp call dcs-grpc-wrapper call_grpc_method --input '{"method":"GetDetectedTargets","payload":{"unitName":"Pilot-1"}}'
```

Get radar-detected targets only:
```bash
aspire mcp call dcs-grpc-wrapper call_grpc_method --input '{"method":"GetDetectedTargets","payload":{"unitName":"Pilot-1","detectionType":"DETECTION_TYPE_RADAR"}}'
```

## References

- [Alarm State Documentation](https://wiki.hoggitworld.com/view/DCS_option_alarmState)
- [Target Detection Documentation](https://wiki.hoggitworld.com/view/DCS_func_getDetectedTargets)
- [Proto File](../../proto/controller/v0/controller.proto)
