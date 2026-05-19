export interface SourceVersion {
  id: string;
  sourceObjectId: string;
  version: string;
  title: string;
  sourceText: string;
  createdAt: string;
  status: "Current" | "Previous";
}
