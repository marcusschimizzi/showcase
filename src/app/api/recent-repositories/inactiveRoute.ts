import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const GET_REPOSITORY_CONTRIBUTIONS = gql`
    query GetRepositoryContributions($username: String!, $since: GitTimestamp!, $cursor: String) {
        user(login: $username) {
            repositories(last: 100, after: $cursor) {
                totalCount
                nodes {
                    name
                    url
                    isPrivate
                    description
                    languages(first: 5) {
                        edges {
                            size
                            node {
                                name
                                color
                            }
                        }
                    }
                    master: ref(qualifiedName: "master") {
                        target {
                            ... on Commit {
                                history(since: $since) {
                                    totalCount
                                    nodes {
                                        committedDate
                                    }
                                }
                            }
                        }
                    }
                    main: ref(qualifiedName: "main") {
                        target {
                            ... on Commit {
                                history(since: $since) {
                                    totalCount
                                    nodes {
                                        committedDate
                                    }
                                }
                            }
                        }
                    }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }
    }
`;

interface ResponseData {
    user: {
        repositories: {
            totalCount: number;
            nodes: RawRepository[];
            pageInfo: {
                endCursor: string;
                hasNextPage: boolean;
            };
        };
    };
}

interface RawRepository {
    name: string;
    url: string;
    isPrivate: boolean;
    description: string;
    languages: {
        edges: {
            size: number;
            node: {
                name: string;
                color: string;
            };
        }[];
    };
    master?: {
        target: {
            history: {
                totalCount: number;
                nodes: {
                    committedDate: string;
                }[];
            };
        };
    };
    main?: {
        target: {
            history: {
                totalCount: number;
                nodes: {
                    committedDate: string;
                }[];
            };
        };
    };
}

interface Repository {
    name: string;
    url: string;
    isPrivate: boolean;
    description: string;
    languages: {
        percentage: number;
        name: string;
        color: string;
    }[];
    commits: number;
}

export async function GET() {
    const client = new ApolloClient({
        uri: 'https://api.github.com/graphql',
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        cache: new InMemoryCache(),
    });
    let cursor = null;

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    console.info({
        oneMonthAgo: oneMonthAgo.toISOString(),
        twoWeeksAgo: twoWeeksAgo.toISOString(),
    });

    let repos: Repository[] = [];

    let response = await client.query<ResponseData>({
        query: GET_REPOSITORY_CONTRIBUTIONS,
        variables: { username: 'marcusschimizzi', since: oneMonthAgo.toISOString(), cursor: null },
    });

    function processNodes(repos: RawRepository[]): Repository[] {
        return repos.map((repo) => {
            const mainCount = repo.main?.target.history.totalCount ?? 0;
            const masterCount = repo.master?.target.history.totalCount ?? 0;
            const commits = mainCount > masterCount ? mainCount : masterCount;
            const totalBytes = repo.languages.edges.reduce((total, edge) => total + edge.size, 0);
            return {
                name: repo.name,
                url: repo.url,
                isPrivate: repo.isPrivate,
                description: repo.description,
                languages: repo.languages.edges.map((edge) => ({
                    percentage: (edge.size / totalBytes) * 100,
                    name: edge.node.name,
                    color: edge.node.color,
                })),
                commits,
            };
        });
    }

    repos = [...repos, ...processNodes(response.data.user.repositories.nodes)];
    cursor = response.data.user.repositories.pageInfo.endCursor;

    while (cursor) {
        response = await client.query<ResponseData>({
            query: GET_REPOSITORY_CONTRIBUTIONS,
            variables: { username: 'marcusschimizzi', since: twoWeeksAgo.toISOString(), cursor },
        });

        repos = [...repos, ...processNodes(response.data.user.repositories.nodes)];
        cursor = response.data.user.repositories.pageInfo.endCursor;
        console.log(JSON.stringify(response, null, 2));
    }

    if (response.errors) {
        return Response.json({ errors: response.errors });
    }

    repos = repos.filter((repo) => repo.commits > 0).sort((a, b) => b.commits - a.commits);

    return Response.json(repos);
}
