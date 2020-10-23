import { useState, useEffect } from 'react';

export const useVisited = (item: string) => {
  const [visited, setVisited] = useState(false);
  useEffect(() => {
    const res = localStorage.getItem(item);
    res
      ? setVisited(true)
      : localStorage.setItem(item, 'visited');
  }, [item])
  return { visited, setVisited };
}