---
name: dcs-atmosphere
description: "Invoke DCS Atmosphere gRPC methods. Service for querying wind, temperature, and pressure data. Proto: dcs-grpc-wrapper/proto/atmosphere/v0/atmosphere.proto"
---

# dcs-atmosphere Skill

Invoke DCS Atmosphere service gRPC methods for querying environmental conditions.

## Prerequisites

- AppHost started: `aspire start` or `aspire start --isolated`
- `dcs-grpc-wrapper` resource is live and healthy
- `.withMcpServer({ path: "/mcp/dcs-grpc", endpointName: "dcs-grpc" })` is configured in `apphost.ts`

## Available Methods

### Wind
- **GetWind** - Get wind heading and strength at position
- **GetWindWithTurbulence** - Get wind with turbulence data at position

### Temperature & Pressure
- **GetTemperatureAndPressure** - Get temperature and pressure at position

## Quick Examples

Get wind at position (lat/lon/alt required):
```powershell
aspire mcp call dcs-grpc-wrapper call_grpc_method --input @'
{\"method\":\"GetWind\",\"payload\":{\"position\":{\"lat\":40.0,\"lon\":0.0,\"alt\":5000}}}
'@
```

Get wind with turbulence:
```powershell
aspire mcp call dcs-grpc-wrapper call_grpc_method --input @'
{\"method\":\"GetWindWithTurbulence\",\"payload\":{\"position\":{\"lat\":40.0,\"lon\":0.0,\"alt\":5000}}}
'@
```

Get temperature and pressure:
```powershell
aspire mcp call dcs-grpc-wrapper call_grpc_method --input @'
{\"method\":\"GetTemperatureAndPressure\",\"payload\":{\"position\":{\"lat\":40.0,\"lon\":0.0,\"alt\":5000}}}
'@
```

## References

- [Atmosphere Singleton Documentation](https://wiki.hoggitworld.com/view/DCS_singleton_atmosphere)
- [Proto File](../../proto/atmosphere/v0/atmosphere.proto)
