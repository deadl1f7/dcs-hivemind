---
name: test-rest-health
description: "Test REST endpoint health. Use when: verifying REST API availability, debugging REST connection issues, checking gRPC client status via REST, validating proto catalogue via REST API."
argument-hint: "Optional base URL (default: http://localhost:3000)"
user-invocable: true
---

# Test REST Endpoint Health

## When to Use

- Verify the REST API server is running and responding
- Check if the gRPC client is connected via REST endpoint
- Debug REST API connection issues
- Monitor REST service health during development

## Procedure

### 1. Start the Aspire AppHost
If not already running, start the Aspire application:
```bash
aspire start
```

This starts the REST API server along with the MCP server.

### 2. Test the Health Endpoint

Make an HTTP GET request to the REST health endpoint:

```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "grpcClientConnected": true,
  "availableMethods": [
    "atmosphere",
    "coalition",
    "controller",
    "custom",
    "group",
    "hook",
    "metadata",
    "mission",
    "net",
    "srs",
    "timer",
    "trigger",
    "unit",
    "world"
  ]
}
```

### 3. Interpret Results

**Healthy Response:**
- `status: "ok"` → Server is running
- `grpcClientConnected: true` → gRPC client successfully connected to DCS
- `availableMethods` → List of available gRPC services

**Issues:**
- No response → REST server not running. Check Aspire logs: `aspire logs`
- `grpcClientConnected: false` → gRPC client not connected. Verify DCS service is accessible.
- Empty `availableMethods` → Proto catalogue failed to load. Check proto files.


### 5. Call a gRPC Method (Optional)

Test dynamic gRPC invocation via REST:

```bash
curl -X POST http://localhost:3000/api/dcs/metadata.version \
  -H "Content-Type: application/json" \
  -d '{"empty": {}}'
```

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Health check successful, service operational |
| 404 | Invalid method name or gRPC method not found |
| 503 | gRPC client not initialized or proto catalogue unavailable |

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Connection refused | Verify Aspire is running with `aspire start` and port 3000 is available |
| Health endpoint returns `grpcClientConnected: false` | Check DCS service status and network connectivity |
| Proto catalogue endpoint returns 503 | Proto definitions failed to load; check `dcs-grpc-wrapper/proto/` |
| gRPC method call fails with 404 | Verify method name exists in proto catalogue via `/api/proto/catalogue` |

## Testing with Node.js

```javascript
// test-rest-health.js
async function testRestHealth() {
  try {
    const response = await fetch('http://localhost:3000/health');
    const health = await response.json();
    console.log('REST Health:', JSON.stringify(health, null, 2));
    
    if (health.grpcClientConnected && health.status === 'ok') {
      console.log('✓ REST endpoint is healthy');
    } else {
      console.log('✗ REST endpoint has issues');
      process.exit(1);
    }
  } catch (err) {
    console.error('✗ REST endpoint unreachable:', err.message);
    process.exit(1);
  }
}

testRestHealth();
```

## References

See [rest.ts](file:///e:/dcs-hivemind/dcs-grpc-wrapper/rest.ts) for REST API implementation.
