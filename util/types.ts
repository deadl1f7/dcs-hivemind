export type BaseMesssage = {
    sender: string;
    messageType: string;
}
export type DcsLuaMessage = BaseMesssage & {
    lua: string;
}

export type LaneOrder = "high" | "medium" | "low";
