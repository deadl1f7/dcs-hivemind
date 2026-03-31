-- mission-builder-lib.lua
-- Inject this once via Eval before running any scenario.
-- Defines MB_safeExec(code) in the hook environment.
--
-- After injecting this prelude, all scenario code should be wrapped with:
--   MB_safeExec([==[  ...mission lua code...  ]==])
--
-- MB_safeExec routes code through net.dostring_in('server', ...) into the full
-- mission scripting environment (where coalition, trigger, Moose, etc. are
-- available) and wraps it in pcall so Lua errors are caught and surfaced
-- in-game without crashing DCS.
--
-- NOTE: This file runs in the gRPC hook environment.
--   Available:  net.*
--   NOT available: env, a_do_script, coalition, trigger, Group, country

function MB_safeExec(missionCode)
    local safed = "local _mb_ok, _mb_err = pcall(function()\n"
        .. missionCode
        .. "\nend)\n"
        .. "if not _mb_ok then\n"
        .. "  trigger.action.outText('[MissionBuilder] ERROR: ' .. tostring(_mb_err), 30)\n"
        .. "end\n"
    return net.dostring_in('server', safed)
end

net.log("[MissionBuilder] MB_safeExec ready.")
