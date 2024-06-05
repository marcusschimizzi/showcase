import { setRandomInterval } from '@/app/lib/utils';
import { capitalize } from '@/app/utils/utils';
import { ReactNode, useEffect, useMemo, useState } from 'react';

const MIN_INTERVAL = 3000;
const MAX_INTERVAL = 10000;

interface SingleEpithet {
    /** The text content of the epithet. */
    text: string;

    /** The category of epithet. */
    category: string;

    /** An optional emoji or decoration to include with the epithet. */
    emoji?: ReactNode;
}

interface EpithetsProps {
    /** Array of possible epithets to show. */
    epithets: SingleEpithet[];
}

interface EpithetProps {
    epithets: SingleEpithet[];
    formatter: (epithet: SingleEpithet) => ReactNode;
}

function Epithet({ epithets, formatter }: EpithetProps) {
    const [selectedEpithet, setSelectedEpithet] = useState<SingleEpithet>();
    const [previousEpithet, setPreviousEpithet] = useState<SingleEpithet>();
    const [nextEpithet, setNextEpithet] = useState<SingleEpithet>();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        function getEpithetWithWrapping(index: number) {
            if (index < 0) {
                return epithets[epithets.length - 1];
            }
            if (index >= epithets.length) {
                return epithets[0];
            }
            return epithets[index];
        }

        if (index >= epithets.length) {
            setIndex(0);
        }
        setSelectedEpithet(getEpithetWithWrapping(index));
        setPreviousEpithet(getEpithetWithWrapping(index - 1));
        setNextEpithet(getEpithetWithWrapping(index + 1));
    }, [epithets, index]);

    if (!selectedEpithet || !previousEpithet || !nextEpithet) return null;

    return (
        <div>
            <div id={`epithet-${index - 1}-${previousEpithet.text}`}>{formatter(previousEpithet)}</div>
            <div id={`epithet-${index}-${selectedEpithet.text}`}>{formatter(selectedEpithet)}</div>
            <div id={`epithet-${index + 1}-${nextEpithet.text}`}>{formatter(nextEpithet)}</div>
        </div>
    );
}

interface SortedEpithets {
    [key: string]: SingleEpithet[];
}

function sortEpithets(unsortedEpithets: SingleEpithet[]) {
    const sorted: SortedEpithets = {};
    unsortedEpithets.forEach((epithet) => {
        if (epithet.category in sorted) {
            sorted[epithet.category].push(epithet);
        } else {
            sorted[epithet.category] = [epithet];
        }
    });
    return sorted;
}

export default function Epithets({ epithets }: EpithetsProps) {
    const sortedEpithets: SortedEpithets = useMemo(() => sortEpithets(epithets), [epithets]);

    function epithetFormatter(index: number) {
        if (index === 0) {
            return (epithet: SingleEpithet) => `${capitalize(epithet.text)},`;
        }
        if (index === Object.keys(sortedEpithets).length - 1) {
            return (epithet: SingleEpithet) => `and ${epithet.text}.`;
        }
        return (epithet: SingleEpithet) => `${epithet.text},`;
    }

    return (
        <div>
            {Object.keys(sortedEpithets).map((key, index) => {
                return <Epithet epithets={sortedEpithets[key]} key={key} formatter={epithetFormatter(index)} />;
            })}
        </div>
    );
}
