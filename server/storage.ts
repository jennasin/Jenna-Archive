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
        title: "Da Vinci Surgical Robot",
        description: "", // Will be replaced by aboutTheWork and relevanceToTheme
        mediaType: "image",
        mediaUrl: "@assets/davin_1762396738074.avif",
        thumbnailUrl: "@assets/davin_1762396738074.avif",
        order: "1",
        subheading: "In the quiet rhythm of the operating room, steel and flesh move as one.",
        aboutTheWork: "The Da Vinci Surgical System is a robotic-assisted platform used in operating rooms around the world. It allows surgeons to perform minimally invasive procedures with four robotic arms that mimic human movement but with greater precision and control. The system translates a surgeon's hand motions into micro-movements inside the patient's body, combining human intuition with robotic accuracy.",
        relevanceToTheme: "This machine represents the fusion of human skill and mechanical enhancement. It embodies the posthuman idea that our tools are not separate from us but extensions of our capabilities. The surgeon and robot work together as one body, illustrating how technology can amplify the human experience rather than replace it.",
        source: "https://www.intuitive.com/en-us/products-and-services/da-vinci",
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
      const galleryItem: GalleryItem = {
        ...item,
        id,
        subheading: item.subheading ?? null,
        aboutTheWork: item.aboutTheWork ?? null,
        relevanceToTheme: item.relevanceToTheme ?? null,
        source: item.source ?? null,
      };
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
    const item: GalleryItem = {
      ...insertItem,
      id,
      subheading: insertItem.subheading ?? null,
      aboutTheWork: insertItem.aboutTheWork ?? null,
      relevanceToTheme: insertItem.relevanceToTheme ?? null,
      source: insertItem.source ?? null,
    };
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
