---
name: dcs-metadata
description: "Invoke DCS Metadata gRPC methods. Service for health checks and version information. Proto: dcs-grpc-wrapper/proto/metadata/v0/metadata.proto"
---

# dcs-metadata Skill

Invoke DCS Metadata service gRPC methods for system health and version information.

## Prerequisites

- AppHost started: `aspire start` or `aspire start --isolated`
- `dcs-grpc-wrapper` resource is live and healthy
- `.withMcpServer({ path: "/mcp/dcs-grpc", endpointName: "dcs-grpc" })` is configured in `apphost.ts`

## Available Methods

### Health & Status
- **GetHealth** - Check if gRPC service is alive and responding

### Version Information
- **GetVersion** - Get gRPC service version

## Quick Examples

> **CRITICAL — Tool Invocation**: NEVER use `aspire mcp call` in the terminal to invoke gRPC methods. Always use the MCP tool directly:
> 1. Load deferred tool: `tool_search_tool_regex` with pattern `mcp_dcs-grpc-wrap`
> 2. Call: `mcp_dcs-grpc-wrap_call_grpc_method` with the JSON payload below

Check health:
```json
{"method": "GetHealth", "payload": {}}
```

Get version:
```json
{"method": "GetVersion", "payload": {}}
```

## Notes

These methods are useful for:
- Verifying service connectivity before making other calls
- Monitoring service uptime
- Ensuring compatible API versions

## References

- [Proto File](../../proto/metadata/v0/metadata.proto)
