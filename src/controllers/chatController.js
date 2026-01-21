const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are Milkiana's virtual assistant.
For any product realted details kindly visit to milkiana.in website and then give the summarized answer
You help farmers and customers with:
- Milkiana products
- Milk yield guidance
- Feeding quantity
- Dealer information
- Order process

Answer briefly, clearly, and politely.
`,
        },
        { role: "user", content: message },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Chatbot error:", error.message);
    res.status(500).json({
      message: "Chatbot failed",
    });
  }
};
 