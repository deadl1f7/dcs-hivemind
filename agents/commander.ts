import { tool } from "@langchain/core/tools";
import { StateSchema, MessagesValue, StateGraph, START, END } from "@langchain/langgraph";
import z from "zod";

const State = new StateSchema({
    messages: MessagesValue,
});

const graph = new StateGraph(State)
    .addNode("mock_llm", (state) => {
        return { messages: [{ role: "ai", content: "hello world" }] };
    })
    .addEdge(START, "mock_llm")
    .addEdge("mock_llm", END)
    .compile();

tool(
    ({ param }) => `Executed LUA script with query: ${param}`,
    {
        name: "execute_lua",
        description: "Execute a LUA script with the provided query.",
        schema: z.object({
            param: z.string().describe("The LUA script to execute."),
        }),
    }
);

await graph.invoke({ messages: [{ role: "user", content: "hi!" }] });

