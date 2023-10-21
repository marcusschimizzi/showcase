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
            Authorization: `Bearer ${'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'}`,
        },
        cache: new InMemoryCache(),
    });

    return <ApolloClientProvider client={client}>{children}</ApolloClientProvider>;
};

export default ApolloProvider;
