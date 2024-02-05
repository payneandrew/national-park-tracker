import { useEffect, useState } from 'react';

const useVisitedParks = () => {
  const [visited, setVisited] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storageVisited = localStorage.getItem('visited');

      if (!storageVisited) {
        localStorage.setItem('visited', JSON.stringify([]));
      } else {
        setVisited(JSON.parse(storageVisited));
      }
    }
  }, []);

  const isParkVisited = (parkCode: string) => {
    return visited.includes(parkCode);
  };

  const toggleVisited = (
    parkCode: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    let newVisited: string[];

    if (visited.includes(parkCode)) {
      newVisited = visited.filter((id) => id !== parkCode);
    } else {
      newVisited = [...visited, parkCode];
    }

    setVisited(newVisited);
    localStorage.setItem('visited', JSON.stringify(newVisited));
  };

  return { isParkVisited, toggleVisited };
};

export default useVisitedParks;
