import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || "",
  dangerouslyAllowBrowser: true 
});

// Generate sermon ideas based on topic or scripture
export async function generateSermonIdeas(input: {
  topic?: string;
  scripture?: string;
}) {
  try {
    const prompt = `Please generate 3 sermon ideas ${
      input.topic ? `on the topic of "${input.topic}"` : ""
    } ${
      input.scripture ? `based on the scripture "${input.scripture}"` : ""
    }. For each idea, include:
    1. A compelling title
    2. Scripture reference
    3. A brief outline with 3-4 main points
    
    Return the response in JSON format with an array of objects containing title, scripture, and outline (as an array of strings). Format: { "sermonIdeas": [{ "title": "...", "scripture": "...", "outline": ["...", "..."] }] }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content);
    return result;
  } catch (error) {
    console.error("Error generating sermon ideas:", error);
    throw new Error("Failed to generate sermon ideas. Please try again later.");
  }
}

// Generate sermon outline based on title and scripture
export async function generateSermonOutline(input: {
  title: string;
  scripture: string;
}) {
  try {
    const prompt = `Please create a detailed sermon outline for a sermon titled "${input.title}" based on ${input.scripture}. Include:
    1. Introduction (hook, context, thesis)
    2. 3-4 main points with sub-points
    3. Illustrations or examples for each point
    4. Application suggestions
    5. Conclusion
    
    Return the response in JSON format with the structure: { "introduction": "...", "mainPoints": [{ "title": "...", "subPoints": ["..."], "illustration": "...", "application": "..." }], "conclusion": "..." }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content);
    return result;
  } catch (error) {
    console.error("Error generating sermon outline:", error);
    throw new Error("Failed to generate sermon outline. Please try again later.");
  }
}

// Generate sermon content for a specific section
export async function generateSermonContent(input: {
  title: string;
  scripture: string;
  section: string;
  outline: string;
}) {
  try {
    const prompt = `Please write the ${input.section} section for a sermon titled "${input.title}" based on ${input.scripture}. The sermon outline is: ${input.outline}. The content should:
    1. Be spiritually uplifting and biblically sound
    2. Include appropriate scriptural references
    3. Be conversational in tone
    4. Be about 300-500 words in length
    
    Return just the content as a string.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating sermon content:", error);
    throw new Error("Failed to generate sermon content. Please try again later.");
  }
}
