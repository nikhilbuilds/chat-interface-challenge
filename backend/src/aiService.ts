import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export const getAIResponse = async (userMessage: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: `User: ${userMessage}\nAI:` }],
      max_tokens: 300,
      temperature: 0.5,
    });
    console.log(response.choices[0]?.message?.content?.trim());
    return (
      response.choices[0]?.message?.content?.trim() || "Content not available."
    );
  } catch (error) {
    console.error("Error fetching summary from OpenAI:", error); //TODO: Add server log functions
    throw new Error("Failed to generate summary.");
  }
};
