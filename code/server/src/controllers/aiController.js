const suggestTasks = async (req, res, next) => {
  try {
    const { userContext } = req.body;
    
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'mock_key_for_now') {
      const suggestions = [
        {
          title: "Setup Gemini API Key",
          description: "Add your real GEMINI_API_KEY to the server/.env file.",
          priority: "High"
        },
        {
          title: "Explore Dashboard",
          description: "Test out creating, updating, and deleting tasks.",
          priority: "Medium"
        }
      ];
      return res.json({ suggestions });
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are an AI task assistant. Based on this context: "${userContext || 'planning my day'}", suggest 2 actionable tasks. Return ONLY a raw JSON array of objects with 'title', 'description', and 'priority' (Low, Medium, or High). Do not include markdown codeblocks, just the JSON array.`
          }]
        }]
      })
    });

    const data = await response.json();
    
    if (data.candidates && data.candidates[0].content.parts[0].text) {
      const rawText = data.candidates[0].content.parts[0].text;
      const cleanJsonStr = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      const suggestions = JSON.parse(cleanJsonStr);
      res.json({ suggestions });
    } else {
      throw new Error("Invalid response from Gemini API");
    }

  } catch (error) {
    console.error("AI Error:", error);
    next(new Error("Failed to generate AI suggestions"));
  }
};

export { suggestTasks };
