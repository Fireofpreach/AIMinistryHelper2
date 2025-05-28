export class ApologeticsResponder {
  static async getAnswer(question: string) {
    // You can later use OpenAI or another LLM here.
    // This is a placeholder.
    if (question.toLowerCase().includes("amillennial")) {
      return "Amillennialism teaches that the 'thousand years' in Revelation 20 is symbolic of Christ's current reign from heaven, not a future literal millennium on earth.";
    }
    if (question.toLowerCase().includes("first church of god")) {
      return "The First Church of God emphasizes holiness, unity, and the centrality of Jesus Christ in their doctrine.";
    }
    return "Sorry, I don't have an answer for that yet. Please be more specific or try another question!";
  }
}
