import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { GalleryItem } from "@shared/schema";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ItemDetail() {
  const [, params] = useRoute("/item/:id");
  const itemId = params?.id;

  const { data: items } = useQuery<GalleryItem[]>({
    queryKey: ["/api/gallery"],
  });

  const { data: item, isLoading } = useQuery<GalleryItem>({
    queryKey: ["/api/gallery", itemId],
    enabled: !!itemId,
  });

  if (isLoading || !item) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 md:px-8 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 h-10 w-32 bg-card animate-pulse rounded-md" />
            <div className="aspect-video bg-card animate-pulse rounded-md mb-8" />
            <div className="h-8 bg-card animate-pulse rounded-md mb-4 w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-card animate-pulse rounded-md" />
              <div className="h-4 bg-card animate-pulse rounded-md" />
              <div className="h-4 bg-card animate-pulse rounded-md w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentIndex = items?.findIndex((i) => i.id === item.id) ?? -1;
  const prevItem = currentIndex > 0 ? items?.[currentIndex - 1] : null;
  const nextItem =
    currentIndex < (items?.length ?? 0) - 1 ? items?.[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-16">
        <div className="max-w-5xl mx-auto">
          <Link href="/" data-testid="link-back">
            <Button
              variant="ghost"
              size="sm"
              className="mb-8 -ml-2"
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Gallery
            </Button>
          </Link>

          <h1
            className="text-3xl md:text-5xl font-bold mb-8 leading-tight tracking-tight"
            data-testid="text-item-title"
          >
            {item.title}
          </h1>

          <div className="mb-12">
            <MediaViewer item={item} />
          </div>

          <div className="prose prose-invert max-w-none">
            <p
              className="text-base md:text-lg leading-relaxed text-muted-foreground"
              data-testid="text-item-description"
            >
              {item.description}
            </p>
          </div>

          <div className="mt-16 pt-8 border-t border-border flex items-center justify-between gap-4">
            {prevItem ? (
              <Link href={`/item/${prevItem.id}`} data-testid="link-prev">
                <Button variant="outline" data-testid="button-prev">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Previous</span>
                </Button>
              </Link>
            ) : (
              <div />
            )}

            {nextItem ? (
              <Link href={`/item/${nextItem.id}`} data-testid="link-next">
                <Button variant="outline" data-testid="button-next">
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MediaViewer({ item }: { item: GalleryItem }) {
  if (item.mediaType === "video") {
    const getYouTubeEmbedUrl = (url: string) => {
      const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
      if (videoIdMatch && videoIdMatch[1]) {
        return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
      }
      return url;
    };

    const embedUrl = getYouTubeEmbedUrl(item.mediaUrl);

    return (
      <div className="relative w-full aspect-video bg-black rounded-md overflow-hidden">
        <iframe
          src={embedUrl}
          title={item.title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          data-testid="video-player"
        />
      </div>
    );
  }

  if (item.mediaType === "article") {
    return (
      <div className="relative w-full bg-card border border-card-border rounded-md overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                Article Resource
              </p>
            </div>
          </div>
          <a
            href={item.mediaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
            data-testid="link-article"
          >
            <Button variant="default" data-testid="button-view-article">
              View Article
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <img
        src={item.mediaUrl}
        alt={item.title}
        className="w-full h-auto rounded-md"
        data-testid="img-full"
      />
    </div>
  );
}
