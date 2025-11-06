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
        title: "ReWalk Robotics Exoskeleton Suit – Redefining Mobility",
        hoverTitle: "ReWalk Robotics Exoskeleton Suit",
        description: "", // Will be replaced by aboutTheWork and relevanceToTheme
        mediaType: "image",
        mediaUrl: "@assets/rewalk-exoskeleton.jpg",
        thumbnailUrl: "@assets/rewalk-exoskeleton.jpg",
        order: "6",
        subheading: "In each powered step, machine and body remember how to move together.",
        aboutTheWork: "The ReWalk Exoskeleton is a wearable robotic suit that helps people with spinal cord injuries walk again. Using sensors and battery-powered motors, it mimics natural leg movements and supports standing, walking, and climbing. Developed by ReWalk Robotics, it transforms the wearer's movement from dependent to autonomous.",
        relevanceToTheme: "This exoskeleton represents the body's partnership with technology to regain independence. It blurs the boundary between organic and mechanical movement, showing how machines can extend human ability rather than replace it. In this union, mobility becomes a shared act between human intention and robotic strength.",
        source: "https://rewalk.com/",
      },
      {
        title: "Cochlear Nucleus 8 – Hearing Through Technology",
        hoverTitle: "Cochlear Nucleus 8 Implant",
        description: "", // Will be replaced by aboutTheWork and relevanceToTheme
        mediaType: "image",
        mediaUrl: "@assets/cochlear-implant.jpg",
        thumbnailUrl: "@assets/cochlear-implant.jpg",
        order: "7",
        subheading: "Sound becomes electricity, and technology speaks the language of the body.",
        aboutTheWork: "The Cochlear Nucleus 8 is an advanced hearing implant that converts sound into electrical signals directly transmitted to the auditory nerve. It allows individuals with profound hearing loss to perceive sound in new, digitally mediated ways. Through its mix of biological and electronic processes, it creates a unique sensory experience.",
        relevanceToTheme: "This implant demonstrates how technology merges seamlessly with the human nervous system. It redefines hearing as both a biological and technological act, expanding what \"natural\" senses mean. The Cochlear implant shows that being human can include mechanical perception and digital sensation.",
        source: "https://www.cochlear.com/us/en/home/products-and-accessories/cochlear-nucleus-system/nucleus-sound-processors/compare-nucleus-sound-processors",
      },
      {
        title: "Stelarc – Prosthetic Head (AI Self-Portrait Project, 2003)",
        hoverTitle: "Stelarc: Prosthetic Head",
        description: "", // Will be replaced by aboutTheWork and relevanceToTheme
        mediaType: "image",
        mediaUrl: "@assets/prosthetic-head.jpg",
        thumbnailUrl: "@assets/prosthetic-head.jpg",
        order: "8",
        subheading: "When a machine learns to speak in your voice, where does the self end?",
        aboutTheWork: "The Prosthetic Head is an interactive robotic sculpture created by artist Stelarc. The work features a life-sized 3D model of the artist's own head that can speak and respond to human input through artificial intelligence. It blurs the distinction between the artist's physical self and his digital double. The Prosthetic Head combines performance, robotics, and AI, creating an uncanny conversation between flesh and software.",
        relevanceToTheme: "This piece embodies the posthuman condition where identity extends beyond the biological body. By replicating his own head through technology, Stelarc challenges ideas of consciousness, autonomy, and existence. It raises questions about what remains 'human' when the body and mind can be re-created by machines. Within the theme Machine Flesh: The Human Body as Technology, this artifact perfectly captures the merging of human identity and artificial intelligence as a living dialogue between self and system.",
        source: "http://stelarc.org/_activity-20244.php",
      },
      {
        title: "Sophia the Robot – The Face of Artificial Empathy",
        hoverTitle: "Sophia the Robot",
        description: "", // Will be replaced by aboutTheWork and relevanceToTheme
        mediaType: "image",
        mediaUrl: "@assets/sophia-robot.jpg",
        thumbnailUrl: "@assets/sophia-robot.jpg",
        order: "9",
        subheading: "Her silicon smile reflects our search for emotion within the mechanical.",
        aboutTheWork: "Sophia is a humanoid robot created by Hanson Robotics in 2016, designed to simulate conversation and facial expressions. She uses artificial intelligence and machine learning to interact naturally with people, responding with realistic gestures and tone. Sophia has become a cultural icon for AI and robotics, often appearing at global conferences and interviews. Her design challenges traditional ideas of interaction by giving human-like communication to a machine.",
        relevanceToTheme: "Sophia represents how human qualities like emotion, empathy, and intelligence can be replicated through technology. She questions what defines humanity when machines can mimic our faces, voices, and responses. Within the theme Machine Flesh: The Human Body as Technology, Sophia stands as both mirror and creation—showing that as we design machines in our image, we also redefine what it means to be human.",
        source: "https://www.hansonrobotics.com/sophia/",
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
