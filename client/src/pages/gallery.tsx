import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { GalleryItem } from "@shared/schema";
import { Film, FileText, Image, Search, X } from "lucide-react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Lightbox from "@/components/lightbox";

export default function Gallery() {
  const { data: items, isLoading } = useQuery<GalleryItem[]>({
    queryKey: ["/api/gallery"],
  });

  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filteredItems = useMemo(() => {
    if (!items) return [];

    let result = items;

    if (selectedFilter !== "all") {
      result = result.filter((item) => item.mediaType === selectedFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    return result;
  }, [items, selectedFilter, searchQuery]);

  const filterOptions = [
    { value: "all", label: "All", icon: null },
    { value: "image", label: "Images", icon: Image },
    { value: "video", label: "Videos", icon: Film },
    { value: "article", label: "Articles", icon: FileText },
  ];

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
        <div className="mb-8 md:mb-12 space-y-6">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
              data-testid="input-search"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-clear-search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {filterOptions.map((option) => {
              const Icon = option.icon;
              const isActive = selectedFilter === option.value;
              return (
                <Button
                  key={option.value}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(option.value)}
                  data-testid={`button-filter-${option.value}`}
                  className="gap-2"
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {option.label}
                </Button>
              );
            })}
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-16" data-testid="text-no-results">
            <p className="text-lg text-muted-foreground">
              No items found matching your criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredItems.map((item) => {
              const handleClick = () => {
                if (item.mediaType === "image") {
                  setLightboxItem(item);
                }
              };

              return (
                <Link
                  key={item.id}
                  href={`/item/${item.id}`}
                  onClick={(e) => {
                    if (item.mediaType === "image") {
                      e.preventDefault();
                      handleClick();
                    }
                  }}
                  data-testid={`link-item-${item.id}`}
                >
                  <div
                    className="group relative aspect-square overflow-hidden rounded-md bg-card cursor-pointer hover-elevate active-elevate-2 transition-transform duration-300"
                    data-testid={`card-item-${item.id}`}
                  >
                    <img
                      src={item.thumbnailUrl}
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

        {lightboxItem && items && (
          <Lightbox
            item={lightboxItem}
            items={items}
            onClose={() => setLightboxItem(null)}
            onNavigate={(direction) => {
              const currentIndex = items.findIndex((i) => i.id === lightboxItem.id);
              const newIndex =
                direction === "prev" ? currentIndex - 1 : currentIndex + 1;
              if (newIndex >= 0 && newIndex < items.length) {
                setLightboxItem(items[newIndex]);
              }
            }}
          />
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
