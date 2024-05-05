import { capitalize } from "@/app/utils/utils";
import { useEffect, useState } from "react";

interface EpithetsProps {

  /** The number of epithets to display at once. */
  numEpithets: number;

  /** Array of possible epithets to show. */
  epithets: string[];

  /** Time (ms) to wait between changing an epithet. */
  interval: number;
}

export default function Epithets({ numEpithets, epithets, interval }: EpithetsProps) {
  const [selectedEpithets, setSelectedEpithets] = useState<string[]>([]);

  useEffect(() => {
      
    function initializeEpithets() {
      const initialEpithets = [];
      for (let i = 0; i < numEpithets; i++) {
        initialEpithets.push(epithets[i]);
      }
      return initialEpithets;
    }
    setSelectedEpithets(initializeEpithets());
  }, [numEpithets, epithets]);

  // we should change one selected epithet each interval
  // we should not change the selected epithets if the interval is 0
  useEffect(() => {
    if (interval === 0) {
      return;
    }

    function chooseRandomEpithet() {
      return epithets[Math.floor(Math.random() * epithets.length)];
    }

    const intervalId = setInterval(() => {
      setSelectedEpithets((prevEpithets) => {
        const newEpithets = [...prevEpithets];
        const randomIndex = Math.floor(Math.random() * numEpithets);
        let randomEpithet = chooseRandomEpithet();
        while (epithets.length > numEpithets && newEpithets.includes(randomEpithet)) {
          randomEpithet = chooseRandomEpithet();
        }
        newEpithets[randomIndex] = randomEpithet;
        return newEpithets;
      });
    }, interval);

    return () => clearInterval(intervalId);
  }, [numEpithets, epithets, interval]);


  function formatEpithet(epithet: string, index: number) {
    if (index === 0) {
      return `${capitalize(epithet)},`;
    }
    if (index === numEpithets - 1) {
      return `and ${epithet}.`;
    }
    return `${epithet},`;
  }

  return (
    <div>
      {selectedEpithets.map((epithet, index) => (
        <div key={index}>{formatEpithet(epithet, index)}</div>
      ))}
    </div>
  );
}
