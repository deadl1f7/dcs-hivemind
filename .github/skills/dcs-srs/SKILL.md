---
name: dcs-srs
description: "Invoke DCS SRS (Simple Radio Standalone) gRPC methods. Service for text-to-speech radio transmissions and client management. Proto: dcs-grpc-wrapper/proto/srs/v0/srs.proto"
---

# dcs-srs Skill

Invoke DCS SRS (Simple Radio Standalone) service gRPC methods for radio transmissions and client management.

## Prerequisites

- AppHost started: `aspire start` or `aspire start --isolated`
- `dcs-grpc-wrapper` resource is live and healthy
- `.withMcpServer({ path: "/mcp/dcs-grpc", endpointName: "dcs-grpc" })` is configured in `apphost.ts`
- SRS server running and connected
- Proper frequency and coalition settings for SRS server configuration

## Available Methods

### Radio Transmission
- **Transmit** - Synthesize text-to-speech and transmit on SRS frequency

### Client Management
- **GetClients** - Get list of SRS clients and their active frequencies

## Quick Examples

Transmit radio message (English):
```bash
aspire mcp call dcs-grpc-wrapper call_grpc_method --input '{"method":"Transmit","payload":{"ssml":"Check six position, bandits at twelve o clock","plaintext":"Check six position, bandits at twelve o clock","frequency":251000000,"coalition":"COALITION_BLUE","position":{"lat":40.0,"lon":0.0,"alt":5000}}}'
```

Transmit with SSML (prosody control):
```bash
aspire mcp call dcs-grpc-wrapper call_grpc_method --input '{"method":"Transmit","payload":{"ssml":"<prosody rate=\"0.9\">Roger, low fuel state</prosody>","plaintext":"Roger, low fuel state","frequency":251000000,"coalition":"COALITION_BLUE","position":{"lat":40.0,"lon":0.0,"alt":5000}}}'
```

Async transmission (non-blocking):
```bash
aspire mcp call dcs-grpc-wrapper call_grpc_method --input '{"method":"Transmit","payload":{"ssml":"Contact visual","frequency":251000000,"async":true,"coalition":"COALITION_BLUE","position":{"lat":40.0,"lon":0.0,"alt":5000}}}'
```

Get SRS clients:
```bash
aspire mcp call dcs-grpc-wrapper call_grpc_method --input '{"method":"GetClients","payload":{}}'
```

## Notes

- **Blocking vs Async**: By default, Transmit blocks until transmission completes. Use `async:true` for non-blocking calls
- **Frequencies**: Use Hz format (e.g., 251000000 for 251.00 MHz)
- **SSML Support**: Use SSML tags for prosody control (rate, pitch, volume, etc.)
- **Position**: Required for line-of-sight and distance calculations
- **Coalition**: Only Blue and Red supported; others fallback to Spectator

## References

- [SRS Documentation](https://github.com/ciribob/DCS-SimpleRadioStandalone)
- [SSML Tags Documentation](https://www.w3.org/TR/speech-synthesis/)
- [Proto File](../../proto/srs/v0/srs.proto)
