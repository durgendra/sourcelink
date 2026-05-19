export const cleanText = (input: string) =>
  input
    .replace(/\s+/g, " ")
    .replace(/\u0000/g, "")
    .trim();
