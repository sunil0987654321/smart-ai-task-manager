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

const getTaskSuggestions = async (req, res, next) => {
  try {
    const { selectedTaskIds, allTasks } = req.body;

    if (!selectedTaskIds || selectedTaskIds.length === 0) {
      return res.status(400).json({ error: "No tasks selected." });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'mock_key_for_now') {
      const mockResponse = {
        warnings: [
          {
            task: "Mock Warning",
            message: "Setup GEMINI_API_KEY in server/.env to get real suggestions."
          }
        ],
        selectedTaskSuggestions: selectedTaskIds.map(id => {
          const task = allTasks.find(t => t.id === id || t._id === id);
          return {
            task: task ? task.title : "Unknown Task",
            steps: ["Mock step 1", "Mock step 2"],
            tips: ["Mock tip 1", "Mock tip 2"],
            estimatedTime: "1 hour",
            priorityRecommendation: "Complete mock steps soon."
          };
        }),
        motivation: "Mock motivation message. Add your API key!"
      };
      return res.json(mockResponse);
    }

    const selectedTasks = allTasks.filter(task => selectedTaskIds.includes(task.id || task._id));
    
    const prompt = `You are an intelligent productivity assistant for a task management platform.

You will receive:
1. All user tasks
2. Selected tasks

Your responsibilities:
1. Detect tasks that:
   * are near deadline
   * already crossed deadline
   * high priority but not started
2. Warn the user about risky tasks.
3. Give practical suggestions for completing ONLY the selected tasks.
4. Break tasks into actionable steps.
5. Suggest time management techniques.
6. Provide short motivational guidance.

Rules:
* Keep response concise and practical.
* Avoid generic motivational messages.
* Prioritize urgent tasks first.
* Suggestions must be task-specific.
* Mention overdue tasks clearly.
* Mention estimated effort if possible.
* If task is technical, provide technical implementation guidance.
* Output must be valid JSON only.
* Never return markdown.

Current Date: ${new Date().toISOString()}

Selected Tasks:
${JSON.stringify(selectedTasks, null, 2)}

All Tasks:
${JSON.stringify(allTasks, null, 2)}

EXPECTED GEMINI RESPONSE FORMAT:
{
  "warnings": [
    {
      "task": "Task Title",
      "message": "Warning message"
    }
  ],
  "selectedTaskSuggestions": [
    {
      "task": "Task Title",
      "steps": ["Step 1", "Step 2"],
      "tips": ["Tip 1", "Tip 2"],
      "estimatedTime": "1-2 hours",
      "priorityRecommendation": "Reasoning"
    }
  ],
  "motivation": "Motivation message"
}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    const data = await response.json();

    if (data.candidates && data.candidates[0].content.parts[0].text) {
      const rawText = data.candidates[0].content.parts[0].text;
      const cleanJsonStr = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      const suggestionsResponse = JSON.parse(cleanJsonStr);
      res.json(suggestionsResponse);
    } else {
      throw new Error("Invalid response from Gemini API");
    }

  } catch (error) {
    console.error("AI Error:", error);
    next(new Error("Failed to generate AI task suggestions"));
  }
};

export { suggestTasks, getTaskSuggestions };
