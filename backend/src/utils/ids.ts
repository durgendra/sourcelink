import crypto from "node:crypto";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const createPublicId = (prefix: string) => `${prefix}_${crypto.randomBytes(6).toString("hex")}`;

export const createSourceId = (ownerDomain: string, name: string) => {
  const domainPart = slugify(ownerDomain.replace(/^https?:\/\//, "").split(".")[0] || "source");
  const namePart = slugify(name).slice(0, 40) || "object";
  return `sl:${domainPart}:${namePart}`;
};
