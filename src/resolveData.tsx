import { DataResolverRoute } from './types';
import { matchRoutes } from 'react-router-config';

export const resolveRouterData = async (pathname: string, routes: DataResolverRoute[]) => {
    const route = matchRoutes(routes, pathname);

    if (route instanceof Array) {
        try {
            const match = route[route.length - 1];
            const { route: matchedRoute } = match;
            const dataResolver = (matchedRoute as DataResolverRoute).data;

            if (dataResolver && typeof dataResolver === 'function') {
                const resultPromise = dataResolver();
                if (resultPromise && resultPromise instanceof Promise) {
                    const result = await resultPromise;
                    return result;
                }
            }
        } catch (e) {
            return null;
        }
    } else {
        return null;
    }
};

