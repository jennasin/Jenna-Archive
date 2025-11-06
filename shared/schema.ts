import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Gallery Item Schema
export const galleryItems = pgTable("gallery_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  hoverTitle: text("hover_title"), // Optional shorter title for gallery hover
  description: text("description").notNull(),
  mediaType: text("media_type").notNull(), // 'image', 'video', 'article'
  mediaUrl: text("media_url").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  order: varchar("order").notNull(),
  subheading: text("subheading"),
  aboutTheWork: text("about_the_work"),
  relevanceToTheme: text("relevance_to_theme"),
  source: text("source"),
});

export const insertGalleryItemSchema = createInsertSchema(galleryItems).omit({
  id: true,
});

export const updateGalleryItemSchema = insertGalleryItemSchema.partial();

export type InsertGalleryItem = z.infer<typeof insertGalleryItemSchema>;
export type UpdateGalleryItem = z.infer<typeof updateGalleryItemSchema>;
export type GalleryItem = typeof galleryItems.$inferSelect;
