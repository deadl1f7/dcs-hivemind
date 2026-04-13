# DCS-HIVEMIND

## Purpose

Create an agent integration with dcs.
This is a crude POC of what can be done, theres alot of bugs, missing loadouts for some flights etc.
In the future a agent environment controlled via discord bot would be a viable approach.

## Architecture

```mermaid
flowchart LR
    A[Copilot] --> B[MCP Server]
    B --> C[dcs-grpc]
    C --> D[DCS Lua / MOOSE]
```

## Requirements

- Github Copilot Preferably Premium to leverage more advanced models.

- aspire (<https://aspire.dev/get-started/install-cli/>)

- dcs-grpc (<https://github.com/DCS-gRPC/rust-server>) Follow the guide to install and enable: ```eval = true``` (DANGER MAKE SURE YOU UNDERSTAND WHAT THIS IMPLIES), in the config at ```~/Saved Games/DCS/Config/dcs-grpc.lua```

- Add ```dofile(lfs.writedir()..[[Scripts\DCS-gRPC\grpc-mission.lua]])``` to the ```C:/SteamLibrary/steamapps/common/DCSWorld/Scripts/MissionScripting.lua``` or ED directory.

## Getting started

1. Start aspire ```aspire start```
2. Start the DCS mission

## Using it

### Creating a mission

Chat: ```@Hivemind Lets create a mission!``` and follow the creation procedure to create a scenario.

### Commanding forces

Chat: ```@Hivemind Begin tactical session``` to begin commanding the forces as described by the procedure.

### If failing to interact

Check connection with
Chat: ```/test-mcp-health```
