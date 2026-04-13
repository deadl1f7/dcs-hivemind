---
name: dcs-raw
description: "Invoke DCS gRPC methods via MCP tool calls. USE FOR: calling gRPC methods when specific skills don't exist. INVOKES: MCP call_grpc_method tool."
---

# dcs-raw Skill

Use this skill to invoke DCS gRPC methods directly from VS Code via MCP. Raw payload not preferred if existing skills exist describing the method needed.

## Prerequisites

- AppHost started: `aspire start` or `aspire start --isolated`
- `dcs-grpc-wrapper` resource is live and healthy
- `.withMcpServer({ path: "/mcp/dcs-grpc", endpointName: "dcs-grpc" })` is configured in `apphost.ts`
- Proto file loaded (check health endpoint)

## Available MCP Tools

> **CRITICAL — Tool Invocation**: NEVER use `aspire mcp call` in the terminal to invoke gRPC methods. Always use the MCP tool directly:
> 1. Load deferred tool: `tool_search_tool_regex` with pattern `mcp_dcs-grpc-wrap`
> 2. Call: `mcp_dcs-grpc-wrap_call_grpc_method` with the JSON payload

### call_grpc_method
- **Description**: Invoke a gRPC method with optional payload
- **Input**:
  - `method` (string, required): The gRPC method name
  - `payload` (object, optional): JSON payload for the method

## Quick Commands

Call a gRPC method (pass as JSON to `mcp_dcs-grpc-wrap_call_grpc_method`):
```json
{"method": "ExampleMethod", "payload": {}}
```

## Notes

- Methods must exist in the loaded proto file
- Payloads are passed as-is to the gRPC service
- Errors are returned in the MCP response
- This is a catch-all skill; prefer using specific service skills (dcs-unit, dcs-mission, etc.) when available