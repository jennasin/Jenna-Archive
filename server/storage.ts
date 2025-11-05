import { type User, type InsertUser, type GalleryItem, type InsertGalleryItem, type UpdateGalleryItem } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllGalleryItems(): Promise<GalleryItem[]>;
  getGalleryItem(id: string): Promise<GalleryItem | undefined>;
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;
  updateGalleryItem(id: string, updates: UpdateGalleryItem): Promise<GalleryItem | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private galleryItems: Map<string, GalleryItem>;

  constructor() {
    this.users = new Map();
    this.galleryItems = new Map();
    this.seedGalleryItems();
  }

  private seedGalleryItems() {
    const sampleItems: InsertGalleryItem[] = [
      {
        title: "Prosthetic Limbs and Human Enhancement",
        description: "Modern prosthetics have evolved beyond simple replacement devices. Today's advanced prosthetics incorporate sensors, AI, and neural interfaces that can restore—and in some cases exceed—natural human capabilities. This raises profound questions about the boundaries between human and machine, and whether enhanced abilities fundamentally alter what it means to be human. As technology advances, we must consider: at what point does augmentation become transformation?",
        mediaType: "image",
        mediaUrl: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=600&q=80",
        order: "1",
      },
      {
        title: "Neural Interfaces: Bridging Mind and Machine",
        description: "Brain-computer interfaces represent one of the most direct integrations of human biology with technology. From helping paralyzed individuals regain mobility to enabling new forms of communication, these devices create unprecedented connections between neural activity and digital systems. The implications extend beyond medical applications—these technologies challenge our understanding of consciousness, identity, and the nature of thought itself. What happens to human agency when our thoughts can directly control machines?",
        mediaType: "image",
        mediaUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80",
        order: "2",
      },
      {
        title: "The Cyborg Manifesto",
        description: "Donna Haraway's groundbreaking 1985 essay explores the concept of the cyborg as a hybrid of machine and organism. This seminal work in feminist theory and science studies examines how technology blurs traditional boundaries between human and animal, organism and machine, physical and non-physical. Haraway argues that we are all cyborgs in a fundamental sense, already deeply integrated with our technologies. Read the full essay to explore these revolutionary ideas.",
        mediaType: "article",
        mediaUrl: "https://faculty.georgetown.edu/irvinem/theory/Haraway-CyborgManifesto-1.pdf",
        thumbnailUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80",
        order: "3",
      },
      {
        title: "Robotic Surgery: Precision Beyond Human Capability",
        description: "Surgical robots like the da Vinci system demonstrate how machines can extend human capabilities in medical contexts. These systems provide surgeons with enhanced precision, stability, and vision far beyond what human hands alone can achieve. The paradox is striking: to heal human bodies, we increasingly rely on mechanical precision that surpasses our own biological limitations. This technological mediation raises questions about the role of human skill and judgment in an age of automated precision.",
        mediaType: "video",
        mediaUrl: "https://www.youtube.com/watch?v=0XdC1HUp-rU",
        thumbnailUrl: "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=600&q=80",
        order: "4",
      },
      {
        title: "Exoskeletons and Physical Augmentation",
        description: "Industrial and medical exoskeletons represent a new category of wearable machines that amplify human strength and endurance. These devices blur the line between tool and extension of the body, creating a hybrid entity that is neither purely human nor purely machine. Workers can lift hundreds of pounds; paralyzed individuals can walk. These technologies force us to reconsider: where does the body end and the tool begin?",
        mediaType: "image",
        mediaUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
        order: "5",
      },
      {
        title: "Artificial Organs: Mechanical Life Support",
        description: "From pacemakers to artificial hearts, mechanical devices now perform functions once exclusive to biological organs. These life-sustaining technologies challenge traditional definitions of life and death. When vital functions are maintained by machines, questions arise about the essence of human life. Are we still 'ourselves' when our heartbeat is regulated by circuitry rather than biology? The integration of artificial organs into the body reveals the increasingly mechanical nature of biological existence.",
        mediaType: "image",
        mediaUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
        order: "6",
      },
      {
        title: "Wearable Technology and Quantified Self",
        description: "Fitness trackers, smartwatches, and health monitors transform the body into a source of data. Every heartbeat, step, and sleep cycle becomes quantifiable information. This technological mediation of bodily experience represents a fundamental shift in how we understand and relate to our own biology. The body becomes an object of measurement and optimization, a machine to be monitored and improved through technological intervention.",
        mediaType: "image",
        mediaUrl: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=600&q=80",
        order: "7",
      },
      {
        title: "CRISPR and Genetic Engineering",
        description: "Gene editing technologies like CRISPR-Cas9 enable direct modification of human DNA. This represents perhaps the most fundamental way that technology can transform the human body—not by adding external devices, but by rewriting the biological code itself. The ability to edit genes raises unprecedented ethical questions about human enhancement, designer babies, and the future of human evolution. When we can engineer our own biology, what remains of 'natural' humanity?",
        mediaType: "image",
        mediaUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80",
        order: "8",
      },
      {
        title: "Virtual Reality and Embodied Experience",
        description: "VR technology creates immersive experiences that can override our physical senses. In virtual environments, we can inhabit different bodies, experience impossible physics, and transcend the limitations of our biological form. This technological mediation of perception challenges our understanding of embodiment and presence. If we can feel present in a virtual body, what does this reveal about the relationship between consciousness and physical form?",
        mediaType: "image",
        mediaUrl: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&q=80",
        order: "9",
      },
    ];

    sampleItems.forEach((item) => {
      const id = randomUUID();
      const galleryItem: GalleryItem = { ...item, id };
      this.galleryItems.set(id, galleryItem);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllGalleryItems(): Promise<GalleryItem[]> {
    const items = Array.from(this.galleryItems.values());
    return items.sort((a, b) => a.order.localeCompare(b.order));
  }

  async getGalleryItem(id: string): Promise<GalleryItem | undefined> {
    return this.galleryItems.get(id);
  }

  async createGalleryItem(insertItem: InsertGalleryItem): Promise<GalleryItem> {
    const id = randomUUID();
    const item: GalleryItem = { ...insertItem, id };
    this.galleryItems.set(id, item);
    return item;
  }

  async updateGalleryItem(id: string, updates: UpdateGalleryItem): Promise<GalleryItem | undefined> {
    const existingItem = this.galleryItems.get(id);
    if (!existingItem) {
      return undefined;
    }
    const updatedItem: GalleryItem = { ...existingItem, ...updates };
    this.galleryItems.set(id, updatedItem);
    return updatedItem;
  }
}

export const storage = new MemStorage();
