import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useTrackRoute = () => {
  const location = useLocation();
  const { NODE_ENV } = import.meta.env;
  const isPro = NODE_ENV === 'production';

  useEffect(() => {
    if (!isPro) return;
    window.gtag('event', 'pageview', {
      page_path: location.pathname + location.search + location.hash,
      page_search: location.search,
      page_hash: location.hash
    });
  }, [location]);
};

export default useTrackRoute;
