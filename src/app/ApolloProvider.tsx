'use client';

import { ComponentType, ReactNode } from 'react';
import { ApolloClient, ApolloProvider as ApolloClientProvider, InMemoryCache } from '@apollo/client';

interface ApolloProviderProps {
    children: ReactNode;
}

const ApolloProvider: ComponentType<ApolloProviderProps> = ({ children }: ApolloProviderProps) => {
    const client = new ApolloClient({
        uri: 'https://api.github.com/graphql',
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        cache: new InMemoryCache(),
    });

    return <ApolloClientProvider client={client}>{children}</ApolloClientProvider>;
};

export default ApolloProvider;
