---
name: dcs-group
description: "Invoke DCS Group gRPC methods. Service for managing group units, activation, and destruction. Proto: dcs-grpc-wrapper/proto/group/v0/group.proto"
---

# dcs-group Skill

Invoke DCS Group service gRPC methods for querying and controlling unit groups.

## Prerequisites

- AppHost started: `aspire start` or `aspire start --isolated`
- `dcs-grpc-wrapper` resource is live and healthy
- `.withMcpServer({ path: "/mcp/dcs-grpc", endpointName: "dcs-grpc" })` is configured in `apphost.ts`

## Available Methods

### Units
- **GetUnits** - Get all units in a group with optional filter for active/inactive

### Control
- **Activate** - Activate a group (late-activation groups only)
- **Destroy** - Destroy all units in a group

## Quick Examples

Get all units in group:
```bash
aspire mcp call dcs-grpc call_grpc_method --input '{"method":"GetUnits","payload":{"groupName":"Group-1"}}'
```

Get only active units:
```bash
aspire mcp call dcs-grpc call_grpc_method --input '{"method":"GetUnits","payload":{"groupName":"Group-1","active":true}}'
```

Activate late-activation group:
```bash
aspire mcp call dcs-grpc call_grpc_method --input '{"method":"Activate","payload":{"groupName":"Group-1"}}'
```

Destroy group:
```bash
aspire mcp call dcs-grpc call_grpc_method --input '{"method":"Destroy","payload":{"groupName":"Group-1"}}'
```

## References

- [Group Class Documentation](https://wiki.hoggitworld.com/view/DCS_Class_Group)
- [Proto File](../../proto/group/v0/group.proto)
