const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const Generate = async (generateValue:any, generateAnswer:any) => {
  
  if (typeof apiKey !== "undefined") {
    try {
      const response = await fetch(`https://request.matt-hall.dev/generate/generate-quiz`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
        body: JSON.stringify({ topic: generateValue, answer: generateAnswer }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error: ", error);
      return [];
    }
  }
}