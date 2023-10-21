'use client';
import { useQuery, gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { scaleSequential } from 'd3-scale';

const GET_GIT_ACTIVITY = gql`
    query GetGitActivity($username: String!) {
        user(login: $username) {
            contributionsCollection {
                contributionCalendar {
                    totalContributions
                    weeks {
                        contributionDays {
                            contributionCount
                            date
                        }
                    }
                }
            }
        }
    }
`;

interface ContributionDay {
    contributionCount: number;
    date: string;
}

interface Contributions {
    rows: ContributionDay[][];
}

const Day = styled.td`
    width: 12px;
    outline: 1px solid rgba(27, 31, 35, 0.04);
    outline-offset: -1px;
    border-radius: 2px;
    shape-rendering: geometricPrecision;
    background-color: #ebedf0;
`;

const Row = styled.tr`
    height: 12px;
    border-spacing: 4px;
    overflow: hidden;
    position: relative;
`;

const TableBody = styled.tbody`
    border-spacing: 4px;
`;

const Table = styled.table`
    border-spacing: 4px;
    overflow: hidden;
    position: relative;
    width: max-content;
    border-collapse: separate;
`;

const GitActivity = () => {
    const [processedData, setProcessedData] = useState<Contributions | null>(null);
    const [colorScale, setColorScale] = useState<string[]>([]);
    const { loading, error, data } = useQuery(GET_GIT_ACTIVITY, {
        variables: { username: 'schimizzimj' },
    });

    useEffect(() => {
        if (!data) return;
        const transposedData = data.user.contributionsCollection.contributionCalendar.weeks.reduce(
            (acc: any, week: any) => {
                week.contributionDays.forEach((day: any, i: any) => {
                    if (!acc[i]) acc[i] = [];
                    acc[i].push(day);
                });
                return acc;
            },
            [],
        );
        const domain = transposedData.reduce((acc: any, week: any) => {
            const weekTotal = week.reduce((acc: any, day: any) => acc + day.contributionCount, 0);
            return [...acc, weekTotal];
        }, []);
        const scale = scaleSequential()
            .domain([Math.min(...domain), Math.max(...domain)])
            .interpolator((t) => `rgb(0, 0, ${t * 255})`);
        setColorScale(domain.map((d: any) => scale(d)));
        setProcessedData({ rows: transposedData });
    }, [data, setProcessedData]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {JSON.stringify(error, null, 2)}</p>;
    if (data) console.log(data.user.contributionsCollection.contributionCalendar);

    return (
        <div>
            <h1>GitActivity</h1>
            <Table>
                <TableBody>
                    {processedData &&
                        (processedData?.rows || []).map((week: any, i: any) => (
                            <Row key={i}>
                                {week.map((day: any, j: any) => (
                                    <Day
                                        key={j}
                                        style={{
                                            backgroundColor: colorScale[day.contributionCount],
                                        }}
                                        title={`${day.contributionCount} contributions on ${day.date}`}
                                    ></Day>
                                ))}
                            </Row>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default GitActivity;
