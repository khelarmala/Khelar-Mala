import React, { useState, useMemo, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import {
  ARTICLES, VIDEO_RESOURCES, DOWNLOAD_RESOURCES, RESOURCE_CATEGORIES,
  type ArticleCategory,
} from "@/lib/resources-data";
import {
  Search, BookOpen, Play, Download, Mail, ChevronRight,
  Clock, User, ArrowRight, Sparkles, FileText, MessageCircle,
} from "lucide-react";
import { fadeUp, scaleIn, inViewOnce } from "@/lib/animations";

// ── Schema.org for the Resources Page ──────────────────────────────────────
const resourcesSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://www.khelarmala.in/resources#blog",
  "url": "https://www.khelarmala.in/resources",
  "name": "Khelar Mala Parent Resource Hub",
  "description": "Expert guidance from 27+ years of experience in special education and therapy for children with special needs in North Bengal.",
  "publisher": { "@id": "https://www.khelarmala.in/#organization" },
  "inLanguage": ["en-IN", "bn-IN"],
  "blogPost": ARTICLES.map((a) => ({
    "@type": "BlogPosting",
    "headline": a.title,
    "description": a.excerpt,
    "keywords": a.keywords.join(", "),
    "url": `https://www.khelarmala.in/resources/${a.slug}`,
    "datePublished": a.dateISO,
    "author": {
      "@type": "Person",
      "name": a.author,
      "jobTitle": a.authorRole,
    },
    "publisher": { "@id": "https://www.khelarmala.in/#organization" },
  })),
};

// ── Category tag styling ──────────────────────────────────────────────────
const categoryColors: Record<ArticleCategory, string> = {
  "Autism":              "bg-teal-light text-primary border-primary/20",
  "ADHD":                "bg-blue-bright/15 text-blue-bright border-blue-bright/20",
  "Speech & Language":   "bg-purple-primary/15 text-purple-primary border-purple-primary/20",
  "Down Syndrome":       "bg-pink-soft/40 text-foreground border-pink-soft",
  "Play Therapy":        "bg-orange-light/60 text-orange-deep border-orange-primary/20",
  "Parent Tips":         "bg-yellow-bright/20 text-foreground border-yellow-bright/30",
  "Success Stories":     "bg-gold/20 text-[hsl(var(--gold))] border-gold/30",
  "Home Activities":     "bg-green-fresh/15 text-green-fresh border-green-fresh/20",
  "Occupational Therapy":"bg-teal-medium/15 text-teal-deep border-teal-medium/20",
  "Behavioral Health":   "bg-accent/10 text-accent border-accent/20",
};

// ── Hero Stats ────────────────────────────────────────────────────────────
const heroStats = [
  { label: "Free Articles", value: "50+", icon: BookOpen },
  { label: "Video Guides", value: "10+", icon: Play },
  { label: "Languages", value: "Bengali & English", icon: FileText },
];

// ── Animation variants ────────────────────────────────────────────────────
const stagger = {
  visible: { transition: { staggerChildren: 0.07 } },
  hidden: {},
};

// ── ArticleCard ───────────────────────────────────────────────────────────
function ArticleCard({ article, delay = 0 }: { article: typeof ARTICLES[0]; delay?: number }) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      custom={delay}
      className="card-elevated rounded-2xl overflow-hidden group card-hover flex flex-col"
      aria-labelledby={`article-${article.id}-title`}
    >
      {/* Illustration area */}
      <div
        className={`h-40 bg-gradient-to-br ${article.gradient} flex items-center justify-center relative overflow-hidden`}
      >
        <span className="text-6xl" role="img" aria-hidden="true">{article.emoji}</span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Category tag */}
        <span className={`self-start text-xs font-body font-bold px-3 py-1 rounded-full border ${categoryColors[article.category]}`}>
          {article.category}
        </span>

        {/* Title */}
        <h3
          id={`article-${article.id}-title`}
          className="font-heading text-lg font-bold text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-200"
        >
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {article.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground font-body pt-1 border-t border-border">
          <span className="flex items-center gap-1"><User className="w-3 h-3" />{article.author.split(" ")[0]} {article.author.split(" ").slice(-1)}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
        </div>

        {/* CTA */}
        <Link
          to={`/resources/${article.slug}`}
          className="flex items-center gap-1 text-sm font-body font-semibold text-primary hover:text-accent transition-colors duration-200 mt-auto"
          aria-label={`Read: ${article.title}`}
        >
          Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
}

// ── Main Resources Page ───────────────────────────────────────────────────
export default function Resources() {
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const featuredArticle = ARTICLES.find((a) => a.featured);
  const nonFeaturedArticles = ARTICLES.filter((a) => !a.featured);

  const filteredArticles = useMemo(() => {
    let results = nonFeaturedArticles;
    if (activeCategory !== "All") {
      results = results.filter((a) => a.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.keywords.some((k) => k.toLowerCase().includes(q))
      );
    }
    return results;
  }, [activeCategory, searchQuery, nonFeaturedArticles]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.includes("@")) {
      setSubscribed(true);
      // TODO: integrate with email provider (Mailchimp/ConvertKit)
      if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
        (window as any).gtag("event", "newsletter_subscribe", { location: "resources_page" });
      }
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Parent Resource Hub — Free Articles, Videos & Guides | Khelar Mala</title>
        <meta
          name="description"
          content="Free expert articles, video guides, and downloadable resources for parents of children with Autism, ADHD, Down Syndrome & more. By Khelar Mala's therapy team in Siliguri."
        />
        <link rel="canonical" href="https://www.khelarmala.in/resources" />
        <meta property="og:title" content="Parent Resource Hub | Khelar Mala Intervention Centre" />
        <meta property="og:description" content="50+ free articles, video guides, and downloads for North Bengal parents of children with special needs." />
        <meta property="og:url" content="https://www.khelarmala.in/resources" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.khelarmala.in/og-image.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Parent Resource Hub | Khelar Mala" />
        <meta name="twitter:description" content="Free expert articles and guides for parents of children with special needs in North Bengal." />
        <script type="application/ld+json">{JSON.stringify(resourcesSchema)}</script>
      </Helmet>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-br from-teal-deep via-primary to-teal-medium">
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm font-body text-white/70">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true"><ChevronRight className="w-4 h-4" /></li>
              <li className="text-white font-semibold" aria-current="page">Resources</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <motion.span
              variants={scaleIn} initial="hidden" animate="visible" custom={0}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/25 text-white text-sm font-body font-semibold mb-5"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              Expert guidance since 1997
            </motion.span>

            <motion.h1
              variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
              className="text-5xl sm:text-6xl font-heading font-bold text-white mb-5 leading-tight"
            >
              Parent Resource{" "}
              <span className="text-yellow-bright">Hub</span>
            </motion.h1>

            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
              className="text-lg text-white/85 font-body leading-relaxed mb-8 max-w-2xl"
            >
              Free expert articles, video guides, and downloadable resources crafted by
              Sucharita Dasgupta and the Khelar Mala therapy team — for every parent navigating
              a child's special needs journey.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={0.3}
              className="flex flex-wrap gap-4 mb-8"
            >
              {heroStats.map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-2">
                  <Icon className="w-4 h-4 text-yellow-bright shrink-0" aria-hidden="true" />
                  <span className="text-sm font-body font-semibold text-white">
                    <strong>{value}</strong> {label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Search */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={0.4}
              className="relative max-w-lg"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
              <input
                ref={searchRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, topics, conditions…"
                className="w-full bg-white rounded-full pl-12 pr-6 py-4 text-foreground font-body text-sm shadow-large focus:outline-none focus:ring-2 focus:ring-primary/30"
                aria-label="Search resources"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURED ARTICLE ───────────────────────────────────────────────── */}
      {featuredArticle && !searchQuery && activeCategory === "All" && (
        <section className="py-12 bg-background">
          <div className="container-custom">
            <motion.article
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce}
              className="card-elevated rounded-3xl overflow-hidden grid lg:grid-cols-[1fr_380px] group"
              aria-labelledby="featured-article-title"
            >
              {/* Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1.5 rounded-full bg-gold/20 text-[hsl(var(--gold))] text-xs font-body font-bold border border-gold/30 uppercase tracking-wide">
                    ⭐ Editor's Pick
                  </span>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-body font-bold border ${categoryColors[featuredArticle.category]}`}>
                    {featuredArticle.category}
                  </span>
                </div>

                <h2
                  id="featured-article-title"
                  className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4"
                >
                  {featuredArticle.title}
                </h2>

                <p className="font-body text-muted-foreground leading-relaxed mb-6 text-base">
                  {featuredArticle.excerpt}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground font-body mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-heading font-bold shrink-0">
                      SD
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{featuredArticle.author}</p>
                      <p className="text-xs">{featuredArticle.authorRole}</p>
                    </div>
                  </div>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{featuredArticle.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={featuredArticle.dateISO}>{featuredArticle.date}</time>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild variant="hero" size="lg" className="group/btn">
                    <Link to={`/resources/${featuredArticle.slug}`}>
                      Read Full Article
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      Ask Our Expert
                    </a>
                  </Button>
                </div>
              </div>

              {/* Illustration */}
              <div className={`hidden lg:flex items-center justify-center bg-gradient-to-br ${featuredArticle.gradient} p-12 relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-4 right-4 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
                  <div className="absolute bottom-8 left-8 w-20 h-20 bg-primary/20 rounded-full blur-xl" />
                </div>
                <span className="text-9xl relative z-10 drop-shadow-lg" role="img" aria-label={featuredArticle.category}>
                  {featuredArticle.emoji}
                </span>
              </div>
            </motion.article>
          </div>
        </section>
      )}

      {/* ── FILTER + ARTICLE GRID ──────────────────────────────────────────── */}
      <section className="section-padding bg-gradient-to-b from-background to-card">
        <div className="container-custom">
          {/* Section header */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              {activeCategory === "All" ? "All Articles" : activeCategory}
              <span className="ml-3 text-base font-body font-normal text-muted-foreground">
                ({filteredArticles.length} articles)
              </span>
            </h2>
          </motion.div>

          {/* Filter pills */}
          <div className="flex gap-2 flex-wrap mb-10" role="group" aria-label="Filter articles by category">
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-4 py-2 rounded-full text-sm font-body font-semibold transition-all duration-200 ${
                activeCategory === "All"
                  ? "bg-primary text-primary-foreground shadow-medium"
                  : "bg-secondary text-foreground hover:bg-primary/10 hover:text-primary"
              }`}
              aria-pressed={activeCategory === "All"}
            >
              All Topics
            </button>
            {RESOURCE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-body font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-medium"
                    : "bg-secondary text-foreground hover:bg-primary/10 hover:text-primary"
                }`}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Article Grid */}
          <AnimatePresence mode="wait">
            {filteredArticles.length > 0 ? (
              <motion.div
                key={`${activeCategory}-${searchQuery}`}
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredArticles.map((article, i) => (
                  <ArticleCard key={article.id} article={article} delay={i * 0.06} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <span className="text-6xl mb-4 block" role="img" aria-label="Search">🔍</span>
                <h3 className="font-heading text-xl text-foreground mb-2">No articles found</h3>
                <p className="font-body text-muted-foreground mb-6">
                  Try a different search term or browse all topics.
                </p>
                <Button onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}>
                  Show All Articles
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── VIDEO RESOURCES ────────────────────────────────────────────────── */}
      <section className="section-padding bg-gradient-to-br from-teal-deep to-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce}
            className="text-center mb-12"
          >
            <span className="section-badge mb-4 bg-white/15 text-white border border-white/20 hover:bg-white/20">
              <Play className="w-4 h-4" aria-hidden="true" />
              Video Learning
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mt-3">
              Learn Through Video
            </h2>
            <p className="font-body text-white/80 mt-3 max-w-2xl mx-auto">
              Visual guides crafted by our expert team — watch at your own pace
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEO_RESOURCES.map((video, i) => (
              <motion.div
                key={video.id}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce} custom={i * 0.1}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Thumbnail */}
                <div className={`h-48 bg-gradient-to-br ${video.thumbnailGradient} flex items-center justify-center relative`}>
                  <span className="text-6xl" role="img" aria-hidden="true">{video.emoji}</span>

                  {/* Play button overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-14 h-14 bg-yellow-bright rounded-full flex items-center justify-center shadow-large group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-6 h-6 text-foreground fill-foreground ml-0.5" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Duration badge */}
                  <span className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs font-body font-bold rounded">
                    {video.duration}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 bg-white/10 backdrop-blur-sm">
                  <h3 className="font-heading text-base font-bold text-white mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="font-body text-white/75 text-sm line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce}
            className="text-center mt-8 text-white/70 font-body text-sm"
          >
            More videos coming soon. Subscribe to our newsletter to get notified.
          </motion.p>
        </div>
      </section>

      {/* ── DOWNLOADABLE TOOLKIT ───────────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce}
            className="text-center mb-12"
          >
            <span className="section-badge mb-4">
              <Download className="w-4 h-4" aria-hidden="true" />
              Free Downloads
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3">
              Free Parent{" "}
              <span className="text-gradient-teal">Toolkit</span>
            </h2>
            <p className="font-body text-muted-foreground mt-3 max-w-2xl mx-auto">
              Practical resources designed by our therapy team — free to download and share
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DOWNLOAD_RESOURCES.map((resource, i) => (
              <motion.div
                key={resource.id}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce} custom={i * 0.08}
                className="card-elevated rounded-2xl p-6 card-hover flex flex-col gap-4"
              >
                {/* Icon + badge */}
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-body font-bold text-accent bg-accent/10 px-2 py-1 rounded-full">
                    {resource.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-heading text-base font-bold text-foreground mb-1">
                    {resource.title}
                  </h3>
                  <p className="text-xs font-body font-semibold text-primary mb-2">
                    {resource.subtitle}
                  </p>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {resource.description}
                  </p>
                </div>

                {/* Languages */}
                <div className="flex gap-2 flex-wrap">
                  {resource.languages.map((lang) => (
                    <span key={lang} className="text-xs font-body bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">
                      {lang}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={resource.downloadUrl}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-body font-semibold text-sm"
                  aria-label={`Download ${resource.title}`}
                  onClick={() => {
                    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
                      (window as any).gtag("event", "resource_download", { resource_id: resource.id, resource_title: resource.title });
                    }
                  }}
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  Download Free
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ─────────────────────────────────────────────────────── */}
      <section className="section-padding bg-gradient-to-r from-primary via-teal-medium to-accent/80 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
        </div>

        <div className="container-custom relative">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce}
            className="max-w-2xl mx-auto text-center"
          >
            <span className="text-4xl mb-4 block" role="img" aria-label="Mail">📬</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">
              Get Monthly Expert Tips
            </h2>
            <p className="font-body text-white/85 mb-8">
              Join 500+ Siliguri parents getting free guidance from our therapy team every month.
              No spam — unsubscribe anytime.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" aria-label="Newsletter signup">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 bg-white rounded-full px-5 py-3 text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-muted-foreground/80"
                  aria-label="Email address for newsletter"
                />
                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  className="rounded-full whitespace-nowrap"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  Subscribe Free
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white/20 rounded-2xl p-6 text-white"
              >
                <span className="text-3xl block mb-2" role="img" aria-label="Celebration">🎉</span>
                <p className="font-heading text-xl font-bold mb-1">You're subscribed!</p>
                <p className="font-body text-white/85 text-sm">
                  Welcome to the Khelar Mala family. Check your inbox for a welcome message.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── CONSULT CTA ────────────────────────────────────────────────────── */}
      <section className="py-12 bg-background">
        <div className="container-custom">
          <motion.div
            variants={scaleIn} initial="hidden" whileInView="visible" viewport={inViewOnce}
            className="card-elevated rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto"
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
              Have a Question About Your Child?
            </h2>
            <p className="font-body text-muted-foreground mb-8 max-w-xl mx-auto">
              Our team is available Monday–Saturday, 10 AM to 8 PM. Reach out — we're here to listen.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">Book a Consultation</Link>
              </Button>
              <Button asChild variant="whatsapp" size="lg">
                <a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
