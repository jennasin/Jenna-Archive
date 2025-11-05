import { GalleryItem } from "@shared/schema";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface LightboxProps {
  item: GalleryItem;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
}

export default function Lightbox({ item, items, onClose, onNavigate }: LightboxProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate("prev");
      if (e.key === "ArrowRight") onNavigate("next");
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [onClose, onNavigate]);

  const currentIndex = items.findIndex((i) => i.id === item.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < items.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
      data-testid="lightbox-overlay"
    >
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-white hover:bg-white/10"
          data-testid="button-close-lightbox"
        >
          <X className="w-6 h-6" />
        </Button>
      </div>

      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate("prev");
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
          data-testid="button-lightbox-prev"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      )}

      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate("next");
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
          data-testid="button-lightbox-next"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      )}

      <div
        className="max-w-7xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center p-4 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {item.mediaType === "image" ? (
          <img
            src={item.mediaUrl}
            alt={item.title}
            className="max-w-full max-h-[80vh] object-contain rounded-md"
            data-testid="lightbox-image"
          />
        ) : (
          <div className="bg-card border border-card-border rounded-md p-8 max-w-2xl text-center">
            <p className="text-lg text-muted-foreground mb-4" data-testid="lightbox-non-image">
              Lightbox preview is only available for images.
            </p>
            <p className="text-sm text-muted-foreground">
              Click on the item to view the full {item.mediaType} on the detail page.
            </p>
          </div>
        )}

        <div className="mt-6 text-center">
          <h3 className="text-xl font-medium text-white mb-2" data-testid="lightbox-title">
            {item.title}
          </h3>
          <p className="text-sm text-white/70" data-testid="lightbox-count">
            {currentIndex + 1} / {items.length}
          </p>
        </div>
      </div>
    </div>
  );
}
