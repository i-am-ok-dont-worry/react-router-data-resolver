# React Router Data
Static router data resolver. It allows to prefetch data based on declarative
configured routes.


## Install 
```bash
npm install @iamok/react-router-data --save
```

or

```bash
yarn add @iamok/react-router-data
```


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
                data: () => ({
                    metaTitle: 'Title for page 1',
                    metaDescription: 'Description for page 1'
                })
            },
            {
                path: '/page-2',
                exact: true,
                data: () => ({
                    metaTitle: 'Title for page 2',
                    metaDescription: 'Description for page 2'
                })
            }
        ]
    }
];

          
app.get('*', async (req, res, next) => {
  const seo = await resolveRouterData(req.url, dataRoutes);
  const html = ReactDOMServer.renderToString(
              <PageSeo title=={seo.metaTitle} description={seo.metaDescription}>
                <Router />
              </PageSeo>));
              
  res.send(`<!doctype html>${html}`);
});          
```

Note that `dataRoutes` can be resolved asynchronously. This can be useful if we need generic routes for different components
and those routes can be only determined based on API call.
e.g.: `/:page1` will link to Page1 or Page2 based on API condition
