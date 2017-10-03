import enrichr from './src';

enrichr.geolocation('London, UK').then(data => {
  console.info(data);
});
