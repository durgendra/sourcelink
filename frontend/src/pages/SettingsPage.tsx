import { Card } from "../components/ui/Card";

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-navy">Settings</h1>
        <p className="mt-2 text-text-secondary">Reserved for future team, integration, policy, and notification controls.</p>
      </div>
      <Card className="p-8">
        <h2 className="text-xl font-bold text-brand-navy">Frontend integration ready</h2>
        <p className="mt-3 text-text-secondary">
          Services are structured so this UI can swap from mock data to the backend API without redesigning page-level state.
        </p>
      </Card>
    </div>
  );
}
