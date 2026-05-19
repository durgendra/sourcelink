import { Link } from "react-router-dom";
import { Link2 } from "lucide-react";
import { Button } from "../ui/Button";

export function PublicNavbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 h-16 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-navy rounded-lg flex items-center justify-center">
            <Link2 className="text-white w-5 h-5" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-brand-navy">
            SourceLink
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-text-secondary lg:flex">
          {/* <a href="#product">Product</a> */}
          {/* <a href="#use-cases">Use Cases</a> */}
          <Link to="/demo">Dashboard</Link>
          {/* <a href="#security">Security</a> */}
          {/* <a href="#pricing">Pricing</a> */}
          {/* <a href="#signin">Sign in</a> */}
        </nav>
        {/* <Link to="/demo">
          <Button size="sm">Run Sample Demo</Button>
        </Link> */}
      </div>
    </header>
  );
}
