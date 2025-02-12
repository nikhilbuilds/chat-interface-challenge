import express, { Request, Response } from "express";
import { WebSocketServer } from "ws";
import dotenv from "dotenv";
import cors from "cors";
import { getAIResponse } from "./aiService";
import { isValidApiKey } from "./utils/validKey";
import { ChatDemoResponse, QuickReplies } from "./utils/constants";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}, ${process.env.OPENAI_API_KEY}`);
});

app.get("/api/quick-replies", async (req: Request, res: Response) => {
  try {
    console.log("api/quick-replies", process.env.OPENAI_API_KEY?.length); //TODO: Use server log functions
    if (!isValidApiKey(process.env.OPENAI_API_KEY)) {
      console.log("Using demo response");
      setTimeout(() => {
        res.json(QuickReplies);
      }, 2000);
      return;
    }

    const prompt =
      "Generate 5 short and natural chat opening suggestions for a user interacting with an AI assistant. Return them as a JSON array of strings";
    const aiResponse = await getAIResponse(prompt);

    res.json(JSON.parse(aiResponse));
  } catch (error) {
    console.error("Error generating quick replies:", error);
    res.status(500).json({ error: "Failed to generate quick replies" });
  }
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", async (message: string) => {
    console.log(`Received: ${message}`);
    if (!isValidApiKey(process.env.OPENAI_API_KEY)) {
      //This if for demo purposes only
      console.log("Using demo response");

      setTimeout(() => {
        ws.send(ChatDemoResponse);
      }, 2000);
      return;
    }
    const aiResponse = await getAIResponse(message);
    ws.send(aiResponse);
  });

  ws.on("close", () => console.log("Client disconnected"));
});
