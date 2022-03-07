import axios from "axios";
import { load } from "cheerio";
import { writeFileSync } from "fs"

// Config
const SourceURL = 'https://www.climate.gov/data/SevereWeather--Daily--Historic-Probability-of-Severe-Weather--CONUS/02-large/';
const Filter = 'large.png';

GetImageURLs(SourceURL, Filter);

// Scrape image URLs
async function GetImageURLs(sourceUrl: string, filter: string) {
  // Fetch data
  const res = await axios.get(sourceUrl);

  // Parse links from HTML response, filtering out non-important ones
  const $ = load(res.data);
  const links: string[] = [];
  $('a').each((i, element) => {
    const link = $(element).attr('href');
    if (link?.includes(filter)) links.push(sourceUrl + link);
  });

  StoreLinks(links.slice(1));
}

// Write link array to data/links.json
function StoreLinks(links: string[]) {
  writeFileSync('./data/links.json', JSON.stringify(links), { encoding: 'utf-8' });
}