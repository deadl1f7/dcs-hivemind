# DCS-HIVEMIND

## Architecture

```mermaid
flowchart LR
    A[Copilot Agent] --> B[MCP Server]
    B --> C[dcs-grpc]
    C --> D[DCS Lua / MOOSE]
```

## Requirements

### aspire (<https://aspire.dev/get-started/install-cli/>)

### dcs-grpc (<https://github.com/DCS-gRPC/rust-server>)

Follow the guide to install and enable: ```eval = true``` (DANGER), in the config at ~/Saved Games/DCS/Config/dcs-grpc.lua

## Getting started

1. Start aspire ```aspire start```
2. Start the DCS mission
