---
name: test-mcp-health
description: "Test MCP (Model Context Protocol) health. Use when: verifying MCP server connectivity, debugging MCP connection issues, checking gRPC client status, validating proto catalogue loading."
argument-hint: "Optional endpoint URL (default: stdio transport)"
user-invocable: true
---

# Test MCP Health

## When to Use

- Verify the MCP server is running and responsive
- Check if the gRPC client is properly connected
- Debug MCP connection issues
- Monitor MCP service health during development

## Procedure

### 1. Start the Aspire AppHost
If not already running, start the Aspire application:
```bash
aspire start
```

This starts the MCP server via the Aspire orchestrated services.

### 2. Call the MCP Health Check Tool

Use the MCP `check_health` tool to test connectivity:

```
Tools available in chat:
- check_health: Checks the health of the gRPC gateway and connection to DCS
```

The health check will return:
- `status`: Service status (e.g., "ok")
- `grpcClientConnected`: Boolean indicating if gRPC client is connected
- `timestamp`: ISO timestamp of the check
- `mcpVersion`: MCP server version (1.0.0)

### 3. Interpret Results

**Healthy Response:**
```json
{
  "status": "ok",
  "grpcClientConnected": true,
  "timestamp": "2026-03-30T12:00:00.000Z",
  "mcpVersion": "1.0.0"
}
```

**Issues:**
- `grpcClientConnected: false` → gRPC gateway is not connected to DCS. Check DCS service status.
- No response → MCP server not running or unreachable. Check Aspire logs.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MCP not responding | Verify Aspire is running with `aspire start` |
| gRPC client disconnected | Check DCS service is running and accessible |
| Health endpoint times out | Check network connectivity and firewall rules |
| Proto catalogue empty | Verify proto files in `dcs-grpc-wrapper/proto/` load correctly |

## References

See [mcp.ts](file:///e:/dcs-hivemind/dcs-grpc-wrapper/mcp.ts) for health check implementation.
