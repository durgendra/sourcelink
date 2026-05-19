export const formatPercent = (value: number) => `${value}%`;

export const titleToRef = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
