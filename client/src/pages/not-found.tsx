import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 text-primary" data-testid="text-404">
          404
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-muted-foreground" data-testid="text-not-found-message">
          Resource Not Found
        </p>
        <Link href="/" data-testid="link-home">
          <Button variant="default" data-testid="button-return-home">
            Return to Gallery
          </Button>
        </Link>
      </div>
    </div>
  );
}
