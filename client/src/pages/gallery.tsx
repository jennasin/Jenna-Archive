import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { GalleryItem } from "@shared/schema";
import { Film, FileText, Image } from "lucide-react";

export default function Gallery() {
  const { data: items, isLoading } = useQuery<GalleryItem[]>({
    queryKey: ["/api/gallery"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-card animate-pulse rounded-md"
                data-testid={`skeleton-card-${i}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        {!items || items.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground text-lg">
              No items in the archive yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {items.map((item) => {
              const thumbnailSrc = item.thumbnailUrl.startsWith('@assets/')
                ? item.thumbnailUrl.replace('@assets/', '/attached_assets/')
                : item.thumbnailUrl;

              return (
                <Link
                  key={item.id}
                  href={`/item/${item.id}`}
                  data-testid={`link-item-${item.id}`}
                >
                  <div
                    className="group relative aspect-square overflow-hidden rounded-md bg-card cursor-pointer hover-elevate active-elevate-2 transition-transform duration-300"
                    data-testid={`card-item-${item.id}`}
                  >
                    <img
                      src={thumbnailSrc}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      data-testid={`img-thumbnail-${item.id}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3
                          className="text-white font-medium text-lg leading-tight"
                          data-testid={`text-title-${item.id}`}
                        >
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <MediaTypeBadge type={item.mediaType} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function MediaTypeBadge({ type }: { type: string }) {
  const icons = {
    image: Image,
    video: Film,
    article: FileText,
  };

  const Icon = icons[type as keyof typeof icons] || Image;

  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/70 backdrop-blur-sm rounded-md border border-white/10"
      data-testid={`badge-media-type-${type}`}
    >
      <Icon className="w-3.5 h-3.5 text-primary" />
      <span className="text-xs font-mono font-medium text-white uppercase tracking-wider">
        {type}
      </span>
    </div>
  );
}
