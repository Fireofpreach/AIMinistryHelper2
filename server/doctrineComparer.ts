export class DoctrineComparer {
  static async compare(a: string, b: string) {
    // For now, this is a simple hardcoded demo.
    // You can later use OpenAI or a database for more dynamic answers.
    // Replace with your own doctrine data as needed.
    if (
      a.toLowerCase().includes("amillennial") &&
      b.toLowerCase().includes("first church of god")
    ) {
      return {
        doctrine1: "Amillennialism",
        doctrine2: "First Church of God",
        similarities: [
          "Both affirm the sovereignty of God.",
          "Both affirm the authority of Scripture.",
        ],
        differences: [
          "Amillennialism interprets the 'millennium' in Revelation 20 as symbolic; First Church of God may hold a different eschatological view.",
          "First Church of God doctrine includes distinctive teachings about holiness and unity not central to amillennialism.",
        ],
        sources: [
          { title: "Amillennialism Overview", url: "https://www.ligonier.org/learn/articles/what-amillennialism" },
          { title: "First Church of God Beliefs", url: "https://www.jesusisthesubject.org/about/" }
        ]
      };
    }
    // Default fallback:
    return {
      doctrine1: a,
      doctrine2: b,
      similarities: ["(Similarities TBD)"],
      differences: ["(Differences TBD)"],
      sources: []
    };
  }
}
