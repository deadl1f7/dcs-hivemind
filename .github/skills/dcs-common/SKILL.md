---
name: dcs-common
description: "Common type definitions and enums used across DCS gRPC services. Proto: dcs-grpc-wrapper/proto/common/v0/common.proto"
---

# dcs-common Skill

Reference for common data types and enums used across DCS gRPC services.

## Prerequisites

- AppHost started: `aspire start` or `aspire start --isolated`
- `dcs-grpc-wrapper` resource is live and healthy

## Common Types

This proto file contains shared enums and message types used by all other services:

### Enums
- **ObjectCategory** - Object classification (UNIT, WEAPON, STATIC, SCENERY, BASE, CARGO)
- **AirbaseCategory** - Airfield types (AIRDROME, HELIPAD, SHIP)
- **Coalition** - Coalitions (ALL, NEUTRAL, RED, BLUE)
- **Country** - DCS countries
- **GroupCategory** - Group types (PLANE, HELICOPTER, GROUND, SHIP)

### Common Messages
- **Position** - Geographic position with lat/lon/alt
- **InputPosition** - Position input format
- **Orientation** - 3D orientation vectors
- **Velocity** - 2D and 3D velocity vectors
- **Unit** - Unit information structure
- **Group** - Group information structure
- **Target** - Target information
- **Weapon** - Weapon information
- **Initiator** - Event initiator information
- **Contact** - Detected contact/target

## Usage

Use this skill to understand the common data structures and enums when working with other services.

## References

- [DCS Object Class Documentation](https://wiki.hoggitworld.com/view/DCS_Class_Object)
- [Proto File](../../proto/common/v0/common.proto)

## Invocation

While dcs-common itself is not directly invoked, it's used by all other DCS services. Reference the specific service skill (dcs-unit, dcs-mission, etc.) and use the MCP tool call:

```powershell
aspire mcp call dcs-grpc-wrapper call_grpc_method --input @'
{\"method\":\"MethodName\",\"payload\":{}}
'@
```
