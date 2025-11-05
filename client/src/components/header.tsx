import { Link, useLocation } from "wouter";

export default function Header() {
  const [location] = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" data-testid="link-home">
            <div className="cursor-pointer hover-elevate active-elevate-2 px-2 py-1 -ml-2 rounded-md transition-all">
              <h1 className="text-lg md:text-xl font-bold tracking-tight" data-testid="text-site-title">
                Machine Flesh
              </h1>
              <p className="text-xs text-muted-foreground font-mono" data-testid="text-site-subtitle">
                The Human Body as Technology
              </p>
            </div>
          </Link>

          <nav className="flex items-center gap-6">
            <Link href="/" data-testid="link-nav-archive">
              <button
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === "/" ? "text-foreground" : "text-muted-foreground"
                }`}
                data-testid="button-nav-archive"
              >
                Archive
              </button>
            </Link>
            <Link href="/about" data-testid="link-nav-about">
              <button
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === "/about" ? "text-foreground" : "text-muted-foreground"
                }`}
                data-testid="button-nav-about"
              >
                About
              </button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
