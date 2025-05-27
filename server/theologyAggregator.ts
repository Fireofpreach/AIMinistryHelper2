import fetch from "node-fetch";

// REMOVED OpenAI and OpenRouter imports and setup

export class TheologyAggregator {
  /**
   * Fetches a Bible verse using Bible-API.
   * @param reference - Bible reference, e.g. "John 3:16"
   */
  static async getBibleVerse(reference: string): Promise<string> {
    try {
      const response = await fetch(`https://bible-api.com/${encodeURIComponent(reference)}`);
      const data = await response.json();
      if (data.text) {
        return `Bible-API (${reference}):\n${data.text}`;
      }
      return `Bible-API: Verse not found for "${reference}".`;
    } catch (error) {
      // Log error for debugging
      console.error("Bible-API error:", error);
      return "Bible-API: Error fetching verse.";
    }
  }

  /**
   * Fetches topical Bible results from OpenBible.info.
   * @param topic - Topic or question, e.g. "forgiveness"
   */
  static getTopicalBibleAnswer(topic: string): string {
    return `Topical Bible results: https://www.openbible.info/topics/${encodeURIComponent(topic)}`;
  }

  /**
   * STEP Bible resource link.
   * @param query - Subject or passage to lookup
   */
  static getStepBibleResource(query: string): string {
    return `STEP Bible search: https://www.stepbible.org/?q=search&q=${encodeURIComponent(query)}`;
  }

  /**
   * Calls Hugging Face Inference API to generate an apologetics answer.
   */
  static async getHuggingFaceApologeticsAnswer(question: string): Promise<string> {
    const endpoint = "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HUGGINGFACEHUB_API_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: question,
          parameters: {
            max_new_tokens: 600,
            temperature: 0.7
          }
        })
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Hugging Face API error:", errorText);
        return "AI: Error generating apologetics answer.";
      }
      const data = await response.json();
      // The response is usually an array with 'generated_text'
      const answer = data?.[0]?.generated_text || data?.generated_text || "No answer generated.";
      return answer;
    } catch (error) {
      console.error("Hugging Face general error:", error);
      return "AI: Error generating apologetics answer.";
    }
  }

  /**
   * Aggregates a full apologetics answer (AI + links).
   * @param query - User's question or Bible reference
   */
  static async getAggregatedAnswer(query: string): Promise<string[]> {
    const bibleRefPattern = /^[A-Za-z ]+\d+:\d+(-\d+)?$/;
    const isBibleRef = bibleRefPattern.test(query.trim());

    const results: string[] = [];

    // 1. Main apologetics answer (AI)
    results.push(await this.getHuggingFaceApologeticsAnswer(query));

    // 2. Optionally add Bible verse if the query looks like a reference
    if (isBibleRef) {
      results.push(await this.getBibleVerse(query));
    }

    // 3. Add topical and STEP Bible resource links
    results.push(this.getTopicalBibleAnswer(query));
    results.push(this.getStepBibleResource(query));
    return results;
  }
}
