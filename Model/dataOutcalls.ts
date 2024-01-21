const apiKey = process.env.NEXT_PRODUCTION_API_KEY;

export const getCategories = async () => {
  if (typeof apiKey !== "undefined") {
    try {
      const response = await fetch(`https://request.matt-hall.dev/quiz/categories`, {
        headers: {
          "X-API-Key": apiKey,
        },
      });

      return response.json();
    } catch (error) {
      console.error("Error: ", error);
      return [];
    }
  }
};

export const fetchQuestions = async (categoryId: number) => {
  if (typeof apiKey !== "undefined") {
    try {
      const response = await fetch(`https://request.matt-hall.dev/quiz/trivia?category=${categoryId}`, {
        headers: {
          "X-API-Key": apiKey,
        },
      });
      return response.json();
    } catch (error) {
      return [];
    }
  }
};

export const updateScore = async (score: number, name: string) => {
  if (typeof apiKey !== "undefined") {
    try {
      const response = await fetch("https://request.matt-hall.dev/score/setscore", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
        body: JSON.stringify({ score, name }),
      });
      if (!response.ok) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
};
