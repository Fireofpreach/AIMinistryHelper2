export function bibleApiResponse(data: unknown, reference: string) {
  if (typeof data === "object" && data !== null && "text" in data) {
    return `Bible-API (${reference}):\n${(data as any).text}`;
  }
  return "No response from Bible API.";
}

export function aggregateTheologyData(data: unknown) {
  let answer = "No answer generated.";
  if (Array.isArray(data) && data[0]?.generated_text) {
    answer = data[0].generated_text;
  } else if (typeof data === "object" && data !== null && "generated_text" in data) {
    answer = (data as any).generated_text;
  }
  return answer;
}
