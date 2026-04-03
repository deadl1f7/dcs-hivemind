-- mission-builder-lib.lua
-- Inject this once via Eval before running any scenario.
-- Defines MB_safeExec(code, description) and MB_setAgent(name) in the hook environment.
--
-- Call MB_setAgent("Commander") once at the start of a session to tag all subsequent
-- log lines and in-game messages with that agent name instead of "MissionBuilder".
--
-- After injecting this prelude, all scenario code should be wrapped with:
--   MB_safeExec([==[  ...mission lua code...  ]==], "description")
--
-- MB_safeExec routes code through net.dostring_in('server', ...) into the full
-- mission scripting environment (where coalition, trigger, Moose, etc. are
-- available) and wraps it in pcall so Lua errors are caught and surfaced
-- in-game without crashing DCS.
--
-- NOTE: This file runs in the gRPC hook environment.
--   Available:  net.*
--   NOT available: env, a_do_script, coalition, trigger, Group, country

local _MB_agent = "MissionBuilder"

function MB_setAgent(name)
    _MB_agent = name or "Unnamed Agent"
    net.log("[" .. _MB_agent .. "] agent registered.")
end

function MB_safeExec(missionCode, description)
    local agent = _MB_agent
    local label = description or "scenario"
    local safed = "env.info('[" .. agent .. "] " .. label .. "')\n"
        .. "local _mb_ok, _mb_err = pcall(function()\n"
        .. missionCode
        .. "\nend)\n"
        .. "if not _mb_ok then\n"
        .. "  trigger.action.outText('[" .. agent .. "] ERROR: ' .. tostring(_mb_err), 30)\n"
        .. "  env.info('[" .. agent .. "] ERROR in " .. label .. ": ' .. tostring(_mb_err))\n"
        .. "end\n"
    return net.dostring_in('server', safed)
end

net.log("[MissionBuilder] MB_safeExec ready.")
