# enrichr

JavaScript module to enrich data.

Its primarily use-case is to enrich Algolia records. Give it a url, and it can
give you back its number of shares on Facebook, or its OpenGraph data. Give it
a city and country and it will give you its coordinates.

## Usage

```javascript
import enrichr from 'enrichr';

enrichr.opengraph('https://www.algolia.com/').then(data => {
  console.info(data);
});
```

## Methods

### opengraph

Takes an url as input, and will resolve with an object of the OpenGraph data.

Example:

```javascript
{ url: 'https://www.algolia.com/',
  site_name: 'Algolia',
  title: 'Algolia | The Most Reliable Platform for Building Search',
  description: 'A powerful hosted search engine API, Algolia provides product teams with the resources & tools they need to create fast, relevant search.',
  image:
   { url: 'https://www.algolia.com/static_assets/images/flat2/algolia/algolia1200x500_15Q2-264406e8.png',
     width: '1200',
     height: '500' } }
```

