export const EMBED_TYPES = ["inline_html", "json_ld", "badge_widget"] as const;
export const UPDATE_MODES = ["auto-update", "review-required", "alert-only"] as const;

export type EmbedType = (typeof EMBED_TYPES)[number];
export type UpdateMode = (typeof UPDATE_MODES)[number];
