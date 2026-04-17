import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import { MotionConfig, useReducedMotion } from "framer-motion";
import { Chatbot } from "./components/features/Chatbot";
import ScrollToTop from "./components/ScrollToTop";

// ── Route-level code splitting ─────────────────────────────────────────────
const Index        = lazy(() => import("./pages/Index"));
const About        = lazy(() => import("./pages/About"));
const Approach     = lazy(() => import("./pages/Approach"));
const Therapies    = lazy(() => import("./pages/Therapies"));
const TherapyDetail = lazy(() => import("./pages/TherapyDetail"));
const Children     = lazy(() => import("./pages/Children"));
const Contact      = lazy(() => import("./pages/Contact"));
const NotFound     = lazy(() => import("./pages/NotFound"));
const Resources    = lazy(() => import("./pages/Resources"));

// ── Page-level loading fallback ────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

// ── Root app with motion accessibility config ──────────────────────────────
function AppContent() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion={shouldReduceMotion ? "always" : "never"}>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"                       element={<Index />} />
            <Route path="/about"                  element={<About />} />
            <Route path="/approach"               element={<Approach />} />
            <Route path="/therapies"              element={<Therapies />} />
            <Route path="/therapies/:therapyId"   element={<TherapyDetail />} />
            <Route path="/children"               element={<Children />} />
            <Route path="/contact"                element={<Contact />} />
            <Route path="/resources"              element={<Resources />} />
            <Route path="/resources/:slug"        element={<Resources />} />
            <Route path="*"                       element={<NotFound />} />
          </Routes>
        </Suspense>
        <Chatbot />
      </BrowserRouter>
    </MotionConfig>
  );
}

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </HelmetProvider>
  </ThemeProvider>
);

export default App;
