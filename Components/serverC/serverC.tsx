
'use server'


const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export default async function getCategories(){
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