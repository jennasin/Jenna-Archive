# Design Guidelines: Machine Flesh Archive

## Design Approach

**System Foundation:** Material Design principles adapted for a biomechanical aesthetic
**Primary Inspiration:** Clean technical interfaces (Linear, Behance) with dark, gallery-focused presentation

**Core Philosophy:** Balance clinical precision with human warmth - technical typography and grid systems softened by thoughtful spacing and careful content presentation.

## Typography

**Primary Font:** Inter or Roboto Mono (Google Fonts) - technical, precise, readable
- Page titles: 48px, font-weight 700, tracking tight
- Section headers: 32px, font-weight 600
- Grid item titles: 18px, font-weight 500
- Body text (detail pages): 16px, font-weight 400, line-height 1.7
- Metadata/captions: 14px, font-weight 300, uppercase, letter-spacing wide

**Secondary Font:** System-ui fallback for UI elements

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16, 24
- Grid gaps: gap-6 (desktop), gap-4 (mobile)
- Section padding: py-16 to py-24
- Content margins: mb-8 between major elements
- Detail page containers: px-4 md:px-8 max-w-5xl

**Grid Gallery:**
- Desktop: 3-column grid (grid-cols-3)
- Tablet: 2-column grid (md:grid-cols-2)
- Mobile: 1-column (grid-cols-1)
- Square aspect ratio for all preview images (aspect-square)
- Consistent thumbnail sizing across all media types

## Component Library

### Navigation Header
- Fixed top navigation with backdrop blur
- Site title/logo left-aligned
- Minimal navigation links (About, Archive, Contact) right-aligned
- Thin bottom border (1px) for subtle separation
- Height: h-16

### Gallery Grid Cards
Each card contains:
- Square preview image container with object-cover
- Overlay gradient on hover (bottom-to-top fade)
- Title overlay at bottom of card, appearing on hover
- Media type indicator badge (top-right corner: "VIDEO", "IMAGE", "ARTICLE")
- Smooth transition on hover (scale: 1.02)

### Detail Page Layout
Single-column centered layout:
- Back navigation button (top-left, subtle)
- Full-width media container (max-w-4xl centered)
  - Images: Full resolution display
  - Videos: Embedded video player with controls
  - Articles: PDF embed or styled article view
- Title above media (mb-4)
- Description section below media (mt-8)
  - Body text with generous line-height
  - Metadata line (date, category, medium)
- Next/Previous navigation at bottom (flex layout, space-between)

### Footer
Minimal footer with:
- Project title and tagline
- Copyright/attribution
- Social links if applicable
- height: py-8, subtle top border

## Visual Design Elements

**Borders & Lines:**
- Thin borders (1px) for subtle separation
- Use borders sparingly - only for header/footer separation
- No card borders on grid items (let images create natural separation)

**Effects:**
- Subtle backdrop blur on navigation (backdrop-blur-sm)
- Smooth transitions on interactive elements (duration-300)
- Gentle hover states - avoid dramatic transformations
- No parallax or scroll-driven animations

**Iconography:**
- Heroicons (outline style) via CDN
- Used for: Navigation arrows, back buttons, media type indicators, external links
- Size: w-5 h-5 for inline icons, w-6 h-6 for standalone buttons

## Interactions

**Grid Hover State:**
- Subtle scale increase (scale-102)
- Overlay gradient reveal
- Title fade-in
- Cursor: pointer

**Detail Page Media:**
- Videos: Custom controls, click to play
- Images: Click to view full-screen lightbox (simple overlay)
- Articles: Scroll within embedded frame

**Navigation Flow:**
- Grid → Detail page (full page transition)
- Detail page → Back to grid (preserves scroll position)
- Detail page → Next/Previous piece (lateral navigation)

## Responsive Behavior

**Mobile Optimization:**
- Single column grid
- Larger touch targets (min h-12 for buttons)
- Reduced padding (py-8 instead of py-16)
- Full-width media on detail pages

**Tablet:**
- 2-column grid
- Slightly reduced spacing
- Maintained readability and touch targets

## Images

**No hero image needed** - this is an archive/gallery where content is the hero.

**Grid Thumbnails:**
- Static preview images for all media types
- Square crop (1:1 aspect ratio)
- High quality but optimized for web
- Consistent visual treatment across all thumbnails
- For videos: Use representative still frame
- For articles: Create custom preview graphic or use article cover

**Detail Page Media:**
- Full resolution images (max-w-4xl container)
- Videos: 16:9 aspect ratio preferred
- Articles: Embedded or linked

## Accessibility

- Semantic HTML throughout
- Alt text for all images
- ARIA labels for navigation
- Keyboard navigation support
- Focus states on all interactive elements
- Sufficient contrast ratios (minimum WCAG AA)