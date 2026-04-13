---
name: dcs-net
description: "Invoke DCS Net gRPC methods. Service for player management, chat, and slot control. Proto: dcs-grpc-wrapper/proto/net/v0/net.proto"
---

# dcs-net Skill

Invoke DCS Net service gRPC methods for multiplayer server management.

## Prerequisites

- AppHost started: `aspire start` or `aspire start --isolated`
- `dcs-grpc-wrapper` resource is live and healthy
- `.withMcpServer({ path: "/mcp/dcs-grpc", endpointName: "dcs-grpc" })` is configured in `apphost.ts`

## Available Methods

### Chat
- **SendChat** - Send message to all, spectators, or coalition
- **SendChatTo** - Send direct message to specific player

### Player Management
- **GetPlayers** - Get list of connected players
- **KickPlayer** - Kick player with optional message
- **ForcePlayerSlot** - Force player into specific coalition/slot or spectators

## Quick Examples

> **CRITICAL — Tool Invocation**: NEVER use `aspire mcp call` in the terminal to invoke gRPC methods. Always use the MCP tool directly:
> 1. Load deferred tool: `tool_search_tool_regex` with pattern `mcp_dcs-grpc-wrap`
> 2. Call: `mcp_dcs-grpc-wrap_call_grpc_method` with the JSON payload below

Send chat to all:
```json
{"method": "SendChat", "payload": {"message": "Hello everyone!", "coalition": "COALITION_ALL"}}
```

Send direct message:
```json
{"method": "SendChatTo", "payload": {"message": "Hello!", "targetPlayerId": 1}}
```

Get connected players:
```json
{"method": "GetPlayers", "payload": {}}
```

Kick player:
```json
{"method": "KickPlayer", "payload": {"playerId": 1, "message": "You have been kicked"}}
```

Force player into Blue coalition:
```json
{"method": "ForcePlayerSlot", "payload": {"playerId": 1, "coalition": "COALITION_BLUE", "slotId": "Pilot-1"}}
```

Move player to spectators:
```json
{"method": "ForcePlayerSlot", "payload": {"playerId": 1, "coalition": "COALITION_NEUTRAL", "slotId": ""}}
```

## References

- [Chat API Documentation](https://wiki.hoggitworld.com/view/DCS_func_send_chat)
- [Player Info Documentation](https://wiki.hoggitworld.com/view/DCS_func_get_player_info)
- [Kick Documentation](https://wiki.hoggitworld.com/view/DCS_func_kick)
- [Proto File](../../proto/net/v0/net.proto)
