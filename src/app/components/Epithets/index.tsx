import { setRandomInterval } from '@/app/lib/utils';
import { capitalize } from '@/app/utils/utils';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import styled, { useTheme } from 'styled-components';


const MIN_INTERVAL = 7000;
const MAX_INTERVAL = 100000;

const GradientSpan = styled.span<{ $color1: string; $color2: string; $color3: string }>`
    background-clip: text;
    background-image: ${(props) =>
        `linear-gradient(160deg, ${props.$color1} 0, ${props.$color2} 50%, ${props.$color3} 100%)`};
    display: inline-block;
    position: relative;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    z-index: 2;
`;

const StyledEpithetWrapper = styled.div`
  display: block;
  position: relative;
  height: 3.5rem;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  align-items: center;
  margin: 1rem 0;

  @media screen and (min-width: 1024px) {
        height: 4.5rem;
}
`;

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
    const { colors } = useTheme();
    const [index, setIndex] = useState(0);

    function getTrueIndex(index: number) {
        if (index < 0) {
            return epithets.length - 1;
        }
        if (index >= epithets.length) {
            return 0;
        }
        return index;
    }

    function getEpithetClass(i: number) {
        let baseClass = 'epithet-item text-3xl lg:text-5xl font-bold';
        if (i === index) {
            baseClass += ' epithet-item-current';
        } else if (i === getTrueIndex(index - 1)) {
            baseClass += ' epithet-item-previous';
        } else if (i === getTrueIndex(index + 1)) {
            baseClass += ' epithet-item-next';
        }
        return baseClass;
    }

    useEffect(() => {
        const interval = setRandomInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % epithets.length);
        }, MIN_INTERVAL, MAX_INTERVAL);

        return () => interval.clear();
    }, [epithets.length]);

    return (
        <StyledEpithetWrapper>
          {epithets.map((epithet, i) => {
            if (i === index || i === getTrueIndex(index - 1) || i === getTrueIndex(index + 1)) {
              return (
                <div key={`epithet-${i}`} className={getEpithetClass(i)} id={`epithet-${i}-${epithet.text}`}>
                                                  <GradientSpan $color1={colors.main1} $color2={colors.main2} $color3={colors.main3}>

                  {formatter(epithet)}
                  </GradientSpan>
                </div>
              );
            }
            return null;
          })}
        </StyledEpithetWrapper>
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
