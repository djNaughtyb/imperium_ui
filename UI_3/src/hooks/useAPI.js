export function useAPI() {
  const call = async (endpoint, payload = {}, method = "POST") => {
    try {
      const response = await fetch(`https://empire-comics-1.onrender.com/${endpoint}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: method === "GET" ? null : JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      console.error("API Error:", err);
      return { error: true, message: err.message };
    }
  };

  return {
    call,
    generateComic: (prompt) => call("generate/comic", { prompt }),
    generateManga: (prompt) => call("generate/manga", { prompt }),
    generateAnime: (prompt) => call("generate/anime", { prompt }),
    generateStoryboard: (prompt) => call("generate/storyboard", { prompt }),
  };
}