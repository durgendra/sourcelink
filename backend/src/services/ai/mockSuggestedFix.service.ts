export const generateMockSuggestedFix = (issueType: string) => {
  const suggestions: Record<string, string> = {
    unsupported_affiliation_language: "Remove or replace with approved reseller language.",
    outdated_logo: "Replace with current approved logo asset.",
    incorrect_product_name: "Replace \"iPhone Pro Maxx\" with approved product name.",
    missing_disclaimer: "Add required trademark disclaimer.",
    unsupported_claim: "Remove unsupported support claim.",
    stale_source_version: "Refresh the embedded source reference to the latest approved version."
  };

  return suggestions[issueType] ?? "Review the source guidance and update the downstream content.";
};
