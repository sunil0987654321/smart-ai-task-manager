const suggestTasks = async (req, res, next) => {
  try {
    const { userContext } = req.body;
    
    // Mock Response
    const suggestions = [
      {
        title: "Review PR #45",
        description: "Review the authentication pull request from the team.",
        priority: "High"
      },
      {
        title: "Update Documentation",
        description: "Update the README with new API endpoints.",
        priority: "Medium"
      }
    ];

    setTimeout(() => {
      res.json({ suggestions });
    }, 1000); // Simulate network delay

  } catch (error) {
    next(error);
  }
};

export { suggestTasks };
