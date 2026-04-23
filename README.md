# Vercel AI Weather CLI

A simple terminal-based AI agent that fetches weather reports using natural language.  
Built with the Vercel AI SDK, this tool lets you ask for weather updates directly from your command line.

---

## Features

- Natural language weather queries  
- Runs entirely in the terminal  
- Powered by Vercel AI SDK  
- Supports OpenAI and Google AI providers  
- Lightweight and easy to set up  

---

## Tech Stack

- Vercel AI SDK (`ai`)
- OpenAI provider (`@ai-sdk/openai`)
- Google provider (`@ai-sdk/google`)
- TypeScript
- Zod (for validation)
- Dotenv (for environment variables)

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Josef-code/terminal-weather-ai.git
cd vercel_ai_test
````

### 2. Install dependencies 
```bash
npm install
```

### 3. Set up environment variables
Create a .env file in the root directory:

```bash
OPENAI_API_KEY=your_openai_api_key
# or
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key
```

### 4. Run the CLI
```bash
npx tsx index.ts
```

### 5. Example Usage
```bash
$ npx tsx index.ts
> What's the weather like in London today?

AI > The weather in London, United Kingdom is Sunny with a temperature of 18 degrees Celsius. The wind speed is 18 KPH and the humidity is 37%.
````
