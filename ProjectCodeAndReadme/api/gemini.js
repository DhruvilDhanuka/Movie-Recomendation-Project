module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Missing query" });
  }

  const API_KEY = process.env.GEMINI_API_KEY; // safe here — this runs on Vercel's server

  const prompt = `Now I am making movie search recomendation tool, Now I am going to 
        give you what user typed into the searchField you identify if it is a actor/actoress name 
        or a search with a mood or just a plain movie/series title 
        if it is a movie/series title only and only return only a string "False" 
        if the user types gibberish or some garbage just return only and only the same string "False"
        otherwise give me a list of the movie titles by those actors/actresses or on the basis of the mood that user types
        return ONLY a valid JSON array of movie titles. 
        ALSO DO NOT PUT ANY MARKDOWNS AUR BREAKLINE THINGS JUST GIVE ONLY AND ONLY A CLEARN JSON ARRAY  Do Not explain anything. now the user Query is 
        ${query}`;

  try {
    const geminiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": API_KEY,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      },
    );

    const data = await geminiRes.json();
    const geminiText = data.candidates[0].content.parts[0].text;

    const result = geminiText !== "False" ? JSON.parse(geminiText) : geminiText;

    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
