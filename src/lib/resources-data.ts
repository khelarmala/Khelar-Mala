// ── Resources & Blog Data ──────────────────────────────────────────────────
// Central data store for all blog articles, videos, and downloadable resources.
// Keeping all content in one file makes it easy to add new posts.
// When you integrate a CMS (Contentful/Sanity), this file becomes the API adapter.

export type ArticleCategory =
  | "Autism"
  | "ADHD"
  | "Speech & Language"
  | "Down Syndrome"
  | "Play Therapy"
  | "Parent Tips"
  | "Success Stories"
  | "Home Activities"
  | "Occupational Therapy"
  | "Behavioral Health";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  author: string;
  authorRole: string;
  readTime: string;
  date: string;
  dateISO: string;
  featured?: boolean;
  emoji: string;
  gradient: string; // Tailwind gradient class for illustration area
  tagColor: string; // Tailwind bg+text combo for category pill
  keywords: string[]; // For SEO meta
  content?: string;   // Full article content (Markdown-ready for CMS integration)
}

export interface VideoResource {
  id: string;
  title: string;
  duration: string;
  description: string;
  thumbnailGradient: string;
  youtubeId?: string;
  emoji: string;
}

export interface DownloadResource {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  downloadUrl: string;
  fileType: "PDF" | "DOC" | "XLSX";
  languages: string[];
}

// ── ARTICLES ────────────────────────────────────────────────────────────────

export const ARTICLES: Article[] = [
  {
    id: "1",
    slug: "early-signs-autism-north-bengal",
    title: "Early Signs of Autism: What Every North Bengal Parent Should Know",
    excerpt:
      "Early detection is the most powerful tool in a child's development journey. Learn the 12 key signs parents often miss — and what to do next.",
    category: "Autism",
    author: "Sucharita Dasgupta",
    authorRole: "Special Educator & Founder",
    readTime: "8 min read",
    date: "April 2025",
    dateISO: "2025-04-01",
    featured: true,
    emoji: "🧩",
    gradient: "from-teal-light to-secondary/30",
    tagColor: "bg-teal-light text-primary",
    keywords: ["early signs autism", "autism symptoms children India", "ASD Siliguri", "autism detection toddler"],
    content: `
## Introduction
Autism Spectrum Disorder (ASD) affects 1 in 36 children globally. In North Bengal, awareness remains low — meaning many children miss the critical early intervention window (18 months to 3 years) that makes the biggest difference.

## The 12 Signs to Watch For
1. **By 12 months:** No babbling or pointing
2. **By 12 months:** No back-and-forth gestures (waving)
3. **By 16 months:** No single words spoken
4. **By 24 months:** No 2-word phrases
5. **Any age:** Loss of previously acquired language
6. **Any age:** Avoiding eye contact
7. **Any age:** Seeming indifferent to other children
8. **Any age:** Very attached to routines; distressed by changes
9. **Any age:** Repetitive movements (hand-flapping, rocking)
10. **Any age:** Unusual sensory responses (covers ears, avoids textures)
11. **Any age:** Playing with toys in an unusual, repetitive way
12. **Any age:** Not pointing to share interest with others

## What To Do If You Notice These Signs
Contact Khelar Mala immediately. Early intervention through Play Therapy, Speech Therapy, and Behavioral Therapy can significantly improve outcomes. Do not wait — early help is the most effective help.

## Why Khelar Mala
With 27+ years of experience, Sucharita Dasgupta has guided 950+ families through exactly this journey. Our integrated therapy approach is designed specifically for the North Bengal context.
    `,
  },
  {
    id: "2",
    slug: "play-therapy-activities-home",
    title: "5 Play Therapy Activities You Can Do at Home Today",
    excerpt:
      "Therapy doesn't stop at the centre. These expert-approved activities extend your child's progress every day — no equipment needed.",
    category: "Play Therapy",
    author: "Khelar Mala Therapy Team",
    authorRole: "Certified Therapists",
    readTime: "5 min read",
    date: "March 2025",
    dateISO: "2025-03-15",
    featured: false,
    emoji: "🎨",
    gradient: "from-orange-light/60 to-secondary/20",
    tagColor: "bg-orange-light text-orange-deep",
    keywords: ["play therapy home activities", "special needs activities home", "autism home play"],
  },
  {
    id: "3",
    slug: "adhd-vs-typical-child-behavior",
    title: "ADHD vs. Typical Child Behavior: A Complete Guide for Parents",
    excerpt:
      "Every child is energetic — but how do you know when it's ADHD? This guide breaks down the real differences and when to seek evaluation.",
    category: "ADHD",
    author: "Sucharita Dasgupta",
    authorRole: "Special Educator & Founder",
    readTime: "6 min read",
    date: "February 2025",
    dateISO: "2025-02-20",
    featured: false,
    emoji: "⚡",
    gradient: "from-blue-bright/15 to-secondary/20",
    tagColor: "bg-blue-bright/15 text-blue-bright",
    keywords: ["ADHD symptoms children India", "ADHD vs normal energy", "ADHD diagnosis child"],
  },
  {
    id: "4",
    slug: "speech-milestone-chart-0-5-years",
    title: "Speech Development Milestone Chart: Birth to 5 Years",
    excerpt:
      "Is your child speaking at the right level for their age? Use this complete milestone chart to track development and spot delays early.",
    category: "Speech & Language",
    author: "Khelar Mala Therapy Team",
    authorRole: "Speech Therapists",
    readTime: "4 min read",
    date: "January 2025",
    dateISO: "2025-01-10",
    featured: false,
    emoji: "💬",
    gradient: "from-purple-primary/15 to-secondary/20",
    tagColor: "bg-purple-primary/15 text-purple-primary",
    keywords: ["speech delay milestone chart India", "when do children talk", "speech delay 2 year old"],
  },
  {
    id: "5",
    slug: "music-therapy-success-story",
    title: "How Music Changed My Son's World: A Parent's Story",
    excerpt:
      "Rohan couldn't make eye contact at 3. By 5, he was singing songs and calling his sister by name. This is his journey through Music Therapy.",
    category: "Success Stories",
    author: "Parent, Siliguri",
    authorRole: "Khelar Mala Parent",
    readTime: "5 min read",
    date: "December 2024",
    dateISO: "2024-12-05",
    featured: false,
    emoji: "🎵",
    gradient: "from-gold/20 to-secondary/20",
    tagColor: "bg-gold/20 text-[hsl(var(--gold))]",
    keywords: ["music therapy success story autism", "music therapy children India", "Khelar Mala success"],
  },
  {
    id: "6",
    slug: "daily-routines-down-syndrome",
    title: "Daily Routines That Help Children with Down Syndrome Thrive",
    excerpt:
      "Consistent routines are transformative for children with Down Syndrome. Here are 10 practical, family-tested strategies from our therapists.",
    category: "Down Syndrome",
    author: "Khelar Mala Therapy Team",
    authorRole: "Occupational Therapists",
    readTime: "7 min read",
    date: "November 2024",
    dateISO: "2024-11-18",
    featured: false,
    emoji: "🌈",
    gradient: "from-pink-soft/30 to-secondary/20",
    tagColor: "bg-pink-soft/30 text-foreground",
    keywords: ["Down Syndrome daily routine", "Down Syndrome care India", "DS children activities"],
  },
  {
    id: "7",
    slug: "sensory-processing-disorder-explained",
    title: "Sensory Processing Disorder: When the World Feels Too Loud",
    excerpt:
      "Covering ears in crowds, refusing certain foods, melting down at tags on clothes — SPD is real, common, and highly treatable.",
    category: "Occupational Therapy",
    author: "Sucharita Dasgupta",
    authorRole: "Special Educator & Founder",
    readTime: "6 min read",
    date: "October 2024",
    dateISO: "2024-10-12",
    featured: false,
    emoji: "👂",
    gradient: "from-green-fresh/15 to-secondary/20",
    tagColor: "bg-green-fresh/15 text-green-fresh",
    keywords: ["sensory processing disorder India", "SPD children symptoms", "sensory overload child"],
  },
  {
    id: "8",
    slug: "parent-tips-therapy-at-home",
    title: "7 Things Every Parent Should Know Before Starting Therapy",
    excerpt:
      "Starting a therapy journey can feel overwhelming. These 7 truths from our founder will set your expectations — and your heart — in the right place.",
    category: "Parent Tips",
    author: "Sucharita Dasgupta",
    authorRole: "Special Educator & Founder",
    readTime: "4 min read",
    date: "September 2024",
    dateISO: "2024-09-08",
    featured: false,
    emoji: "💛",
    gradient: "from-yellow-bright/20 to-secondary/20",
    tagColor: "bg-yellow-bright/20 text-foreground",
    keywords: ["starting therapy child India", "parent guide special education", "intervention centre tips"],
  },
];

// ── VIDEO RESOURCES ─────────────────────────────────────────────────────────

export const VIDEO_RESOURCES: VideoResource[] = [
  {
    id: "v1",
    title: "Understanding IEP Plans in Indian Schools",
    duration: "10:23",
    description: "What is an IEP? How to request one, what it should contain, and how to advocate for your child's educational rights in West Bengal.",
    thumbnailGradient: "from-primary to-teal-medium",
    emoji: "📋",
  },
  {
    id: "v2",
    title: "Communication Strategies for Non-Verbal Children",
    duration: "8:45",
    description: "Practical AAC techniques and visual communication tools that parents can implement at home to support non-verbal children.",
    thumbnailGradient: "from-teal-deep to-teal-medium",
    emoji: "🗣️",
  },
  {
    id: "v3",
    title: "Managing Meltdowns: A Complete Parent's Guide",
    duration: "12:18",
    description: "What triggers meltdowns, how to prevent them, and compassionate strategies to help your child regulate when they're overwhelmed.",
    thumbnailGradient: "from-accent to-orange-deep",
    emoji: "🌊",
  },
];

// ── DOWNLOADABLE RESOURCES ──────────────────────────────────────────────────

export const DOWNLOAD_RESOURCES: DownloadResource[] = [
  {
    id: "d1",
    title: "Autism Assessment Checklist",
    subtitle: "Early Detection Guide",
    description: "A comprehensive checklist of ASD indicators for parents — designed with the Indian healthcare system in mind.",
    badge: "MOST DOWNLOADED",
    downloadUrl: "#download-autism-checklist",
    fileType: "PDF",
    languages: ["Bengali", "English"],
  },
  {
    id: "d2",
    title: "Speech Development Milestones",
    subtitle: "0–5 Years Chart",
    description: "Track your child's speech development against age-appropriate milestones. Created by our certified speech therapists.",
    badge: "PRINTABLE",
    downloadUrl: "#download-speech-milestones",
    fileType: "PDF",
    languages: ["English"],
  },
  {
    id: "d3",
    title: "IEP Guide for Indian Schools",
    subtitle: "Know Your Legal Rights",
    description: "Step-by-step guide to requesting, reviewing, and implementing an Individualized Education Program under the RPwD Act 2016.",
    badge: "LEGAL GUIDE",
    downloadUrl: "#download-iep-guide",
    fileType: "PDF",
    languages: ["English"],
  },
  {
    id: "d4",
    title: "Home Activity Guide",
    subtitle: "Weekly Planner for Parents",
    description: "30 therapist-designed home activities to extend your child's progress between sessions. Organized by developmental goal.",
    badge: "FREE",
    downloadUrl: "#download-home-activities",
    fileType: "PDF",
    languages: ["Bengali", "English"],
  },
];

export const RESOURCE_CATEGORIES: ArticleCategory[] = [
  "Autism",
  "ADHD",
  "Speech & Language",
  "Down Syndrome",
  "Play Therapy",
  "Parent Tips",
  "Success Stories",
  "Home Activities",
  "Occupational Therapy",
  "Behavioral Health",
];
