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

Get elapsed time since mission start:
```powershell
aspire mcp call dcs-grpc-wrapper call_grpc_method --input @'
{\"method\":\"GetTime\",\"payload\":{}}
'@
```

Get absolute mission time with date:
```powershell
aspire mcp call dcs-grpc-wrapper call_grpc_method --input @'
{\"method\":\"GetAbsoluteTime\",\"payload\":{}}
'@
```

Get mission start time:
```powershell
aspire mcp call dcs-grpc-wrapper call_grpc_method --input @'
{\"method\":\"GetTimeZero\",\"payload\":{}}
'@
```

## References

- [Timer Singleton Documentation](https://wiki.hoggitworld.com/view/DCS_singleton_timer)
- [Proto File](../../proto/timer/v0/timer.proto)
