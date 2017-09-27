import enrichr from './src';

const url = 'https://www.algolia.com/';
enrichr.opengraph(url).then(data => {
  console.info(data);
});
