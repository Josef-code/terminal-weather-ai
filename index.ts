import { ModelMessage, streamText, tool, stepCountIs } from "ai";
import { google } from "@ai-sdk/google";
import "dotenv/config";
import { z } from "zod";
import * as readline from "node:readline/promises";
import { fetchWeatherStackCurrent } from "./tools.js";

// --------------------
// Terminal setup
// --------------------
const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const messages: ModelMessage[] = [];

// --------------------
// Tool definition (clean wrapper)
// --------------------
const weatherTool = tool({
  description: "Get the current weather for a location using Weatherstack API",
  inputSchema: z.object({
    location: z.string().describe("The city or location to get weather for"),
  }),
  execute: async ({ location }) => {
    return await fetchWeatherStackCurrent(location);
  },
});

// --------------------
// Main loop
// --------------------
async function main() {
  while (true) {
    const userInput = await terminal.question("You: ");

    messages.push({ role: "user", content: userInput });

    const result = streamText({
      model: google("gemini-2.5-flash"),
      system:
        `You are a weather-only assistant.` +
        `You can ONLY use the weather tool.` +
        `Ask for the user's name and use it when responding.` +
        `Keep responses short and friendly.`,
      messages,
      tools: {
        weather: weatherTool,
      },
      stopWhen: stepCountIs(5),

      onStepFinish: async ({ toolResults }) => {
        if (toolResults.length) {
          // console.log("\n[Tool Result]");
          // console.log(JSON.stringify(toolResults, null, 2));
          return;
        }
      },
    });

    let fullResponse = "";
    process.stdout.write("\nAssistant: ");

    for await (const delta of result.textStream) {
      fullResponse += delta;
      process.stdout.write(delta);
    }

    process.stdout.write("\n\n");

    messages.push({ role: "assistant", content: fullResponse });
  }
}

main().catch(console.error);
