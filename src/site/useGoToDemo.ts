import { useCallback } from 'react';
import { scrollToDemo, useSite } from './SiteContext';

/** "Request a demo" from anywhere: the form only exists on the overview, so
    from the specifications view it switches back first, then scrolls. */
export function useGoToDemo() {
  const { view, setView } = useSite();
  return useCallback(() => {
    if (view === 'overview') scrollToDemo();
    else setView('overview', 'demo');
  }, [view, setView]);
}
