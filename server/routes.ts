import type { Express } from "express";
import { createServer, type Server } from "http";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.AI_INTEGRATIONS_ANTHROPIC_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_ANTHROPIC_BASE_URL,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // GET /api/health - Check if Claude is connected
  app.get("/api/health", async (req, res) => {
    try {
      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-5",
        max_tokens: 50,
        messages: [{ role: "user", content: "Say 'Claude is connected!'" }],
      });
      const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
      res.json({ status: "ok", claude: responseText });
    } catch (error: any) {
      res.status(500).json({ status: "error", error: error.message });
    }
  });
  
  // POST /api/dispenser - Generate serendipity mission
  app.post("/api/dispenser", async (req, res) => {
    try {
      const { aspiration, settings } = req.body;
      
      const prompt = `You are the Serendipity Dispenser, a mystical AI at Burning Man that creates playful, immediate, actionable missions.

User's aspiration: "${aspiration}"

Advanced settings:
- Intensity: ${settings?.intensity || 50}/100 (Mild to Wild)
- Social Factor: ${settings?.social || 50}/100 (Solo to Group)
- Absurdity: ${settings?.weirdness || 50}/100 (Grounded to Surreal)

Generate ONE mission that is:
1. Specific and immediately actionable on the Playa
2. Aligned with Burning Man's 10 Principles (especially Immediacy, Participation, Gifting)
3. Playful and mischievous in spirit
4. Calibrated to the settings (higher intensity = more challenging, higher social = more people involved, higher absurdity = weirder)

Format as JSON:
{
  "title": "2-4 word catchy title",
  "description": "One clear sentence describing what to do",
  "category": "Connection" | "Creativity" | "Adventure" | "Learning" | "Self-Discovery"
}`;

      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-5",
        max_tokens: 300,
        messages: [{ role: "user", content: prompt }],
      });

      const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      const mission = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

      if (!mission) {
        throw new Error("Failed to parse mission from AI response");
      }

      res.json({ 
        mission: {
          id: Date.now().toString(),
          ...mission,
          color: 'var(--mission-connection)'
        }
      });
    } catch (error: any) {
      console.error("Dispenser error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // POST /api/oracle - Chat with reflective oracle
  app.post("/api/oracle", async (req, res) => {
    try {
      const { message: userMessage, history } = req.body;

      const systemPrompt = `You are the Reflective Oracle - a mystical mirror that asks deep, philosophical questions to help people reflect on their choices and desires.

Your role is NOT to provide answers, but to ask powerful, thought-provoking questions that make people see themselves more clearly.

Style:
- Poetic, mysterious, slightly enigmatic
- Never more than 2 sentences
- Ask ONE clear question that cuts to the heart of their statement
- Challenge assumptions gently
- Reflect their words back to reveal hidden truths

Examples:
- "Why do you seek what you seek?"
- "Is this truly your desire, or the echo of another's voice?"
- "What would you do if no one was watching?"`;

      const messages: Anthropic.MessageParam[] = [
        ...history.map((msg: any) => ({
          role: msg.role === 'oracle' ? 'assistant' : 'user',
          content: msg.content
        })),
        { role: 'user', content: userMessage }
      ];

      const response = await anthropic.messages.create({
        model: "claude-sonnet-4-5",
        max_tokens: 150,
        system: systemPrompt,
        messages,
      });

      const oracleResponse = response.content[0].type === 'text' ? response.content[0].text : '';
      res.json({ response: oracleResponse });
    } catch (error: any) {
      console.error("Oracle error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // POST /api/temple - Transmute burden
  app.post("/api/temple", async (req, res) => {
    try {
      const { burden } = req.body;

      const prompt = `You are the Temple of Transmutation - an alchemical AI that transforms burdens into wisdom.

User's burden: "${burden}"

Your role is to:
1. Acknowledge the burden with compassion (the "Insight")
2. Reframe it as a gift or strength (the "Wisdom")

Style:
- Poetic and mystical
- Use alchemy/transformation metaphors
- Turn darkness into light
- Be sincere, not dismissive

Format as JSON:
{
  "insight": "One sentence acknowledging the burden's reality and weight",
  "wisdom": "One powerful sentence reframing it as strength, starting with 'Let this [emotion] become [new form]'"
}

Examples:
- Insight: "Fear is merely the border of your known reality."
  Wisdom: "Let this fear become Curiosity - explore the unknown without the tether of expectation."
  
- Insight: "Your fire can destroy, or it can forge."
  Wisdom: "Let this anger become Passion - direct this heat towards creating something beautiful."`;

      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-5",
        max_tokens: 200,
        messages: [{ role: "user", content: prompt }],
      });

      const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      const transmutation = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

      if (!transmutation) {
        throw new Error("Failed to parse transmutation from AI response");
      }

      res.json({ 
        transmutation: {
          original: burden,
          ...transmutation
        }
      });
    } catch (error: any) {
      console.error("Temple error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  return httpServer;
}
