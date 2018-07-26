# enrichr

Quickly enrich your Algolia record with more data.

The primary goal of this module is to enrich Algolia records with more data or
data in a different format before pushing them. 

Common use-cases might be getting the popularity of a url as a numeric value to
use in `customRanking`, grabbing a screenshot of a webpage to use as part of the
display, etc.

Those small tweaks we do often in various projects and demos. Having them all
easy to access in one module will help us not duplicate the code on each project
and build demos more quickly.

The project is still very much a WIP, but all feedback, issues, suggestions are
more than welcome.

## Methods

### opengraph

```javascript
const data = await enrich.opengraph('http://www.algolia.com');

{ url: 'https://www.algolia.com/',
  site_name: 'Algolia',
  title: 'Algolia | The Most Reliable Platform for Building Search',
  description: 'A powerful hosted search engine API, Algolia provides product teams with the resources & tools they need to create fast, relevant search.',
  image:
   { url: 'https://www.algolia.com/static_assets/images/flat2/algolia/algolia1200x500_15Q2-264406e8.png',
     width: '1200',
     height: '500' } }
```


## TODO

- Get share count from https://my.donreach.com/
- Get number of followers on Twitter
- Get first Google Image result for keyword
- Get screenshot of website
