export interface DataResolverRoute {
    key?: React.Key,
    location?: Location,
    path?: string | string[],
    exact?: boolean,
    strict?: boolean,
    routes?: DataResolverRoute[],
    data?: () => Promise<any>,
    [propName: string]: any;
}
