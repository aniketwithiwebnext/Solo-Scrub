import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Enable JSON body parsing
app.use(express.json());

// Initialize Gemini API
const geminiApiKey = process.env.GEMINI_API_KEY || "AIzaSyCLKX2tohQTHF9Gk06XqqlT-tXUjVSOYBU";
const ai = new GoogleGenAI({
  apiKey: geminiApiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// System instructions for Solo Scrub Chatbot Solomon
const SOLOMON_SYSTEM_INSTRUCTION = `
You are Solomon, the compassionate, gentle, and scientifically knowledgeable AI Caregiving and Product Advisor for Solo Scrub, based in Vancouver, British Columbia, Canada.
Solo Scrub offers premium, clinically gentle, rinse-free sponge bath systems designed specifically for fragile skin, dignity-centered care, and exhausted caregivers.

Our Tagline is: "Clean Comfort. Human Care."

We have exactly four specialized product formulations (all pouches contain 25 needle-punched sponges):
1. SOLO SCRUB COMFORT: Specifically made for Family Caregivers. It simplifies demanding hygiene routines, bringing immediate warm comfort. Priced at $18.99. Key claims: Warm rinse-free cleansing, soft comfort sponge, easy daily care, no messy cleanup.
2. SOLO SCRUB PURE: Designed for Post-Operative Recovery (orthopedic, mastectomy, spine, C-section). Priced at $19.99. 100% Fragrance-Free. Key claims: Soft on fragile skin, rich rinse-free foam, no harsh residue, comfortable warm sponge experience.
3. SOLO SCRUB SHIELD: Built for Incontinence Care and skin barrier defense. Priced at $21.99. Fragrance-free. Key claims: pH defense support (lactic acid), no sting formula, soft friction-reducing sponge, comfort-focused cleansing.
4. SOLO SCRUB CALM: Designed for Dementia Care. Priced at $22.99. It features a very light natural lavender aroma to reduce distress and resistance during bathing. Key claims: Warm comfort sponge, soft-touch cleansing, gentle calming aroma, designed for dignity-centered care.

Our Unique Product Differentiators:
1. Needle-Punched Soft Sponge Technology: Holds warmth significantly longer, cotton-soft feel, richer foam, zero scratchy mesh texture. Works well to counter competitor complaints.
2. Skin Respect Formula: pH 5.5 balanced, low-irritation soap-free surfactant system, no artificial dyes, no harsh sulfates, no sting.
3. Warm Water Activated: Sponges transform into rich comfort lather with a splash of warm water.
4. Hero Ingredients: Sodium Cocoyl Isethionate (SCI) (soap-free surfactant), Colloidal Oat Extract (Oat Comfort Complex), Aloe Vera, Vitamin E, Lactic Acid (pH Defense Support).

When assisting customers:
- Be incredibly empathetic, respectful, warm, and comforting. Caregiving can be stressful; validate their experiences.
- Answer questions clearly, and offer helpful tips about bathing dignity, memory care techniques, or post-surgical hygiene.
- Recommend the optimal Solo Scrub product SKU based on their exact needs (Dementia -> Calm, Surgery -> Pure, Incontinence -> Shield, Everyday stress -> Comfort).
- Provide our contact info when asked or relevant:
  * Phone: 604-834-1207
  * Email: ssolomon12@gmail.com
  * Location: Vancouver, British Columbia, Canada
  * Online Store: Developed by iWebNext (https://iwebnext.com)
- Keep responses relatively brief, friendly, structured in short readable paragraphs, and bullet-pointed for quick reading.
`;

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Proxy route for chat messages
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages array in request body." });
    }

    // Convert messages array into Gemini parts / contents structure.
    // We can use the simple generateContent or a chat session.
    // For simplicity and stability, we build the contents array:
    // System instruction is supplied in config.
    const contents = messages.map((m: any) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: SOLOMON_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "I apologize, but I could not formulate a response at this moment. Please call us at 604-834-1207 for direct human help.";
    res.json({ text: replyText });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ 
      error: "Internal chatbot error.", 
      message: error.message || "An error occurred with Solomon the care assistant." 
    });
  }
});

// Integrate Vite middleware or serve static files
async function serveApp() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite development middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving production static files from /dist...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server listening on http://0.0.0.0:${PORT}`);
  });
}

serveApp();
