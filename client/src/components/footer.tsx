export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground" data-testid="text-footer-tagline">
              Exploring how machines extend, transform, and replace the human body
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-mono" data-testid="text-footer-copyright">
              © 2025 Machine Flesh Archive
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
