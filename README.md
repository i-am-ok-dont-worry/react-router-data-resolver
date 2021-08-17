# React Router Data
Static router data resolver. It allows to prefetch data based on declarative
configured routes.


## Install 
npm install @iamok/react-router-data --save

or

yarn add @iamok/react-router-data


## Usage

Router configuration is the same configuration used in [`react-router-config`](https://github.com/remix-run/react-router/tree/main/packages/react-router-config).
Configuration uses extra `data` property which serves as a data resolver - specific
for each route. This data resolver can serve preloaded data or preconfigure
seo data for SSR.

#### Server side
Use `react-router-data` on SSR to preload SEO data.
```js
import { resolveRouterData } from '@iamok/react-router-data';


const dataRoutes = [
    {
        routes: [
            {
                path: '/page-1',
                exact: true,
                data: () => Promise.resolve('Data for page 1')
            },
            {
                path: '/page-2',
                exact: true,
                data: () => Promise.resolve('Data for page 2')
            }
        ]
    }
];

const data = await resolveData(req.url, dataRoutes);
```
