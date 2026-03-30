---
name: dcs-raw
description: "Invoke DCS gRPC methods via MCP tools. USE FOR: calling gRPC methods from VS Code. INVOKES: Aspire MCP tools (call_grpc_method)."
---

# dcs-raw Skill

Use this skill to invoke DCS gRPC methods directly from VS Code via MCP. Raw payload not preferred if existing skills exist describing the method needed.

## Prerequisites

- AppHost started: `aspire start` or `aspire start --isolated`
- `dcs-grpc-wrapper` resource is live and healthy
- `.withMcpServer({ path: "/mcp/dcs-grpc", endpointName: "dcs-grpc" })` is configured in `apphost.ts`
- Proto file loaded (check health endpoint)

## Available MCP Tools

### call_grpc_method
- **Description**: Invoke a gRPC method with optional payload
- **Input**:
  - `method` (string, required): The gRPC method name
  - `payload` (object, optional): JSON payload for the method
- **Usage**: `aspire mcp call dcs-grpc call_grpc_method --input '{"method":"YourMethod","payload":{"key":"value"}}'`

## Quick Commands

List available tools:
```bash
aspire mcp tools --format json
```

Call a gRPC method:
```bash
aspire mcp call dcs-grpc call_grpc_method --input '{"method":"ExampleMethod","payload":{}}'
```

## Notes

- All calls are logged to `grpc-call-log.jsonl` in the wrapper's working directory
- Methods must exist in the loaded proto file
- Payloads are passed as-is to the gRPC service
- Errors are returned in the MCP response

## Alternative: HTTP API

For direct HTTP access:
- Call method: `POST http://localhost:3000/api/dcs/<method>` with JSON body