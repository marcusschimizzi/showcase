'use client';
import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { ScaleLinear, scaleLinear } from 'd3-scale';

interface ContributionDay {
    contributionCount: number;
    date: string;
    color?: string;
}

interface Contributions {
    rows: ContributionDay[][];
}

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1.5rem 0;
`;

const Day = styled.td`
    width: 12px;
    outline: 1px solid rgba(27, 31, 35, 0.04);
    outline-offset: -1px;
    border-radius: 2px;
    shape-rendering: geometricPrecision;
    background-color: #ebedf0;
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: scale(1.25);
    }
`;

const Row = styled.tr`
    height: 12px;
    overflow: hidden;
    position: relative;
`;

const TableBody = styled.tbody``;

const Table = styled.table`
    border-spacing: 5px;
    overflow: hidden;
    position: relative;
    width: max-content;
    border-collapse: separate;
`;

const GitActivity = () => {
    const colors = useTheme().colors;
    const [data, setData] = useState<Contributions | null>(null);

    useEffect(() => {
        async function fetchGitActivity() {
            const url = '/api/contributions';
            try {
                const res = await fetch(url);
                const data = await res.json();
                setData(data);
            } catch (e) {
                console.error(e);
            }
        }
        if (!data) fetchGitActivity();
    });

    useEffect(() => {
        if (!data) return;
        const domain = data.rows.map((week: any) => week.map((day: any) => day.contributionCount)).flat();
        console.info({ domain, data });
        const scale: ScaleLinear<any, unknown> = scaleLinear()
            .domain([Math.min(...domain), Math.max(...domain)])
            .range([colors.text1, colors.main1]);
        for (const week of data.rows) {
            for (const day of week) {
                console.info({ color: scale(day.contributionCount) });
                day.color = scale(day.contributionCount) as string;
            }
        }
    }, [colors.main1, colors.text1, data]);

    return (
        <>
            {data && data.rows.length > 0 && (
                <Wrapper>
                    <Table>
                        <TableBody>
                            {data &&
                                (data?.rows || []).map((week: any, i: any) => (
                                    <Row key={i}>
                                        {week.map((day: any, j: any) => (
                                            <Day
                                                key={j}
                                                style={{
                                                    backgroundColor: day.color,
                                                }}
                                                title={`${day.contributionCount} contributions on ${day.date}`}
                                            ></Day>
                                        ))}
                                    </Row>
                                ))}
                        </TableBody>
                    </Table>
                </Wrapper>
            )}
        </>
    );
};

export default GitActivity;
