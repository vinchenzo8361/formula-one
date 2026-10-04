import { useState, useEffect } from 'react';

export function useScrollSpy(ids: string[], offset: number = 0) {
  const [activeId, setActiveId] = useState<string>(ids[0] || "");

  useEffect(() => {
    const elements = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `-${offset}px 0px -40% 0px` }
    );

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [ids, offset]);

  return activeId;
}
