import { useEffect, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const prevPathnameRef = useRef(location.pathname);
  const prevPageRef = useRef(searchParams.get("currentPage"));

  useEffect(() => {
    const currentPage = searchParams.get("currentPage");
    const jobIdChanged = location.pathname !== prevPathnameRef.current;
    const pageChanged = currentPage !== prevPageRef.current;

    // Scroll if:
    // - Navigating to a new route (but not just switching job detail)
    // - Pagination changes
    if (
      (!location.pathname.startsWith("/jobs") && jobIdChanged) ||
      (location.pathname.startsWith("/jobs") && pageChanged)
    ) {
      window.scrollTo(0, 0);
    }

    // Update refs
    prevPathnameRef.current = location.pathname;
    prevPageRef.current = currentPage;
  }, [location, searchParams]);

  return null;
};

export default ScrollToTop;