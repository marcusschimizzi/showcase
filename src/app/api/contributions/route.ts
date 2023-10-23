import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

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

interface ResponseData {
    user: {
        contributionsCollection: {
            contributionCalendar: {
                totalContributions: number;
                weeks: {
                    contributionDays: ContributionDay[];
                }[];
            };
        };
    };
}

interface Response {
    data: Contributions;
}

interface ContributionDay {
    contributionCount: number;
    date: string;
}

interface Contributions {
    rows: ContributionDay[][];
}

export async function GET() {
    console.log(process.env.GITHUB_TOKEN);

    const client = new ApolloClient({
        uri: 'https://api.github.com/graphql',
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        cache: new InMemoryCache(),
    });

    const response = await client.query<ResponseData>({
        query: GET_GIT_ACTIVITY,
        variables: { username: 'schimizzimj' },
    });

    if (response.errors) {
        return Response.json({ errors: response.errors });
    }

    const contributions: Contributions = {
        rows: [],
    };

    contributions.rows = response.data.user.contributionsCollection.contributionCalendar.weeks.reduce(
        (acc: any, week: any) => {
            week.contributionDays.forEach((day: any, i: any) => {
                if (!acc[i]) acc[i] = [];
                acc[i].push(day);
            });
            return acc;
        },
        [],
    );

    return Response.json(contributions);
}
