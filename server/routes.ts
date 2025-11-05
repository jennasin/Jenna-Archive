import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { updateGalleryItemSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/gallery", async (_req, res) => {
    try {
      const items = await storage.getAllGalleryItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery items" });
    }
  });

  app.get("/api/gallery/:id", async (req, res) => {
    try {
      const item = await storage.getGalleryItem(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Gallery item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery item" });
    }
  });

  app.patch("/api/gallery/:id", async (req, res) => {
    try {
      const validation = updateGalleryItemSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: "Invalid update data", details: validation.error });
      }

      const updatedItem = await storage.updateGalleryItem(req.params.id, validation.data);
      if (!updatedItem) {
        return res.status(404).json({ error: "Gallery item not found" });
      }

      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: "Failed to update gallery item" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
