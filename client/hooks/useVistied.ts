import {useState,useEffect } from 'react';

export const useVistied = (item:string) => {
  const [visited, setVisited] = useState(true);
  useEffect(() => {
    const res = localStorage.getItem(item);
    if (!res) {
      setVisited(false);
      localStorage.setItem(item, 'visited');
    }
  }, [])
  return { visited, setVisited };
}