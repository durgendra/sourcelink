import crypto from "node:crypto";

export const createContentHash = (value: string) =>
  crypto.createHash("sha256").update(value.trim()).digest("hex");
