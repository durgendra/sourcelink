import { CreateSourceLinkForm } from "../components/sourcelink/CreateSourceLinkForm";
import { EmbedCodeGenerator } from "../components/sourcelink/EmbedCodeGenerator";

export function CreateSourceLinkPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_420px]">
      <div className="min-w-0">
        <CreateSourceLinkForm />
      </div>
      <div className="min-w-0 lg:justify-self-end lg:w-[380px] xl:w-[420px]">
        <EmbedCodeGenerator />
      </div>
      </div>
    </div>
  );
}
