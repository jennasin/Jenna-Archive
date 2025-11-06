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
        mediaUrl: "@assets/davinci-robot.jpg",
        thumbnailUrl: "@assets/davinci-robot.jpg",
        order: "1",
        subheading: "In the quiet rhythm of the operating room, steel and flesh move as one.",
        aboutTheWork: "The Da Vinci Surgical System is a robotic-assisted platform used in operating rooms around the world. It allows surgeons to perform minimally invasive procedures with four robotic arms that mimic human movement but with greater precision and control. The system translates a surgeon's hand motions into micro-movements inside the patient's body, combining human intuition with robotic accuracy.",
        relevanceToTheme: "This machine represents the fusion of human skill and mechanical enhancement. It embodies the posthuman idea that our tools are not separate from us but extensions of our capabilities. The surgeon and robot work together as one body, illustrating how technology can amplify the human experience rather than replace it.",
        source: "https://www.intuitive.com/en-us/products-and-services/da-vinci",
      },
      {
        title: "Neil Harbisson - The Cyborg Artist",
        description: "", // Will be replaced by aboutTheWork and relevanceToTheme
        mediaType: "video",
        mediaUrl: "https://www.youtube.com/watch?v=ygRNoieAnzI",
        thumbnailUrl: "@assets/neil-harbisson.jpg",
        order: "2",
        subheading: "Through frequency and code, he hears what the human eye cannot see.",
        aboutTheWork: "Neil Harbisson is a British artist and activist recognized as the world's first legally acknowledged cyborg. Born colorblind, he implanted an antenna in his skull that translates color frequencies into audible vibrations. Through this extension, Harbisson \"hears\" colors, experiencing a blended form of human and digital perception.",
        relevanceToTheme: "Harbisson's body challenges the boundary between biology and technology. His self-modification shows how technology can enhance human senses and create new forms of awareness. This piece supports the idea that being human now includes merging with machines to extend our perception of reality.",
        source: "https://www.ted.com/talks/neil_harbisson_i_listen_to_color",
      },
      {
        title: "Open Bionics Hero Arm",
        description: "", // Will be replaced by aboutTheWork and relevanceToTheme
        mediaType: "image",
        mediaUrl: "@assets/hero-arm.jpg",
        thumbnailUrl: "@assets/hero-arm.jpg",
        order: "3",
        subheading: "Metal and muscle align to rewrite what it means to be whole.",
        aboutTheWork: "The Hero Arm, developed by Open Bionics, is one of the most advanced prosthetic arms available. Made using lightweight materials and customizable designs, it uses muscle sensors to control its movements. Each arm is built uniquely for the user, blending technology and personality in one device.",
        relevanceToTheme: "This prosthetic represents how technology restores and redefines the human body. It's not only a replacement but an enhancement that turns limitation into empowerment. The Hero Arm reflects the evolution of the body as a customizable, mechanical, and expressive form of identity.",
        source: "https://openbionics.com/hero-arm/",
      },
      {
        title: "Tesla Model S Plaid - The Self-Driving Machine",
        hoverTitle: "Tesla Model S Plaid",
        description: "", // Will be replaced by aboutTheWork and relevanceToTheme
        mediaType: "image",
        mediaUrl: "@assets/tesla-model-s.jpg",
        thumbnailUrl: "@assets/tesla-model-s.jpg",
        order: "4",
        subheading: "In motion without touch, the machine learns what it means to move for us.",
        aboutTheWork: "The Tesla Model S Plaid is a fully electric vehicle equipped with autopilot features and advanced AI systems. Designed for speed, control, and automation, it represents the intersection of engineering and artificial intelligence. Its self-driving technology allows the car to navigate, brake, and steer with minimal human input.",
        relevanceToTheme: "The Tesla shifts the idea of control from human hands to machine intelligence. It explores how technology now acts as both body and mind, performing actions once defined as uniquely human. The car becomes a mechanical extension of the driver, symbolizing how humans and machines share agency in modern life.",
        source: "https://www.tesla.com/models?utm_source=chatgpt.com",
      },
      {
        title: "Stelarc – Third Arm (Robotic Prosthesis Performance, 1980)",
        hoverTitle: "Stelarc - Third Arm",
        description: "", // Will be replaced by aboutTheWork and relevanceToTheme
        mediaType: "image",
        mediaUrl: "@assets/stelarc-third-arm.jpg",
        thumbnailUrl: "@assets/stelarc-third-arm.jpg",
        order: "5",
        subheading: "A new limb grows from circuitry, extending thought into motion.",
        aboutTheWork: "The Third Arm is a robotic extension designed and worn by performance artist Stelarc. Attached to his body and controlled by electrical signals from his muscles, the arm operates independently from his biological limbs. Through live performances, Stelarc uses the arm to question the limitations of the human body.",
        relevanceToTheme: "This piece visualizes the concept of machine flesh directly. By adding a functional robotic limb, Stelarc turns his own body into a hybrid organism—part man, part machine. His work challenges the idea that humanity ends at the skin, presenting the body as a site of technological evolution.",
        source: "http://stelarc.org/_activity-20244.php",
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
        hoverTitle: item.hoverTitle ?? null,
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
      hoverTitle: insertItem.hoverTitle ?? null,
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
