import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      let attempts = 0;
      
      // Poll every 100ms for up to 3 seconds (to allow for lazy-loaded chunks to mount)
      const interval = setInterval(() => {
        attempts++;
        const el = document.getElementById(id);
        if (el) {
          clearInterval(interval);
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (attempts > 30) {
          // Stop polling after 30 attempts (3 seconds)
          clearInterval(interval);
        }
      }, 100);
      
      return () => clearInterval(interval);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
