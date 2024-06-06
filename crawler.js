// Description: This module contains the function to fetch all unique links from a given webpage and the function to get links from multiple URLs.
// Import required modules
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { Parser } = require('json2csv');
const readline = require('readline');
const URL = require('url').URL;

// This function fetches all unique links from a given webpage
async function fetchLinksFromPage(baseUrl) {
        try {
            // Use axios to send a GET request to the webpage
            const { data } = await axios.get(baseUrl);

            // Load the webpage HTML into cheerio
            const $ = cheerio.load(data);

            // Create a new URL object from the base URL
            const base = new URL(baseUrl);

            // Create a new Set to store the unique links
            const pageLinks = new Set();
    
            // Use cheerio to select all <a> elements on the webpage
            $('a').each((_, element) => {
                // Get the href attribute of the <a> element
                let link = $(element).attr('href');
                if (link) {
                // If the link is a mailto link, skip it
                if (link.startsWith('mailto:')) {
                 return;
                }
                // If the link is a tel link, skip it
                 if (link.startsWith('tel:')) {
                 return;
                }
                // If the link is a javascript link, skip it
                 if (link.startsWith('javascript:')) {
                return;
                  }
                // If the link is relative (doesn't start with 'http'), resolve it against the base URL
                if (!link.startsWith('http')) {
                     link = new URL(link, base).href;
                 }
                 // Add the link to the Set of unique links
                 pageLinks.add(link);
                }
            });
    
            // Log the number of unique links found and the base URL
            console.log(`Found ${pageLinks.size} unique links on ${baseUrl}`);

            // Return the unique links as an array
            return Array.from(pageLinks);
        } catch (error) {
            // If an error occurs, log the error message and return an empty array
            console.error(`Error fetching links from ${baseUrl}:`, error.message);
            return [];
        }
}
 

// Function to get links from a single page URL (SPU)
async function getLinksFromSpu(startUrl, depth, maxLinks) {
  let links = new Set(); // Using a Set to avoid duplicates
  let queue = [{ url: startUrl, depth: 0 }];
  let graph = [];

  // While there are URLs in the queue and we haven't reached the max number of links
  while (queue.length > 0 && links.size < maxLinks-1) {
    const current = queue.shift();
    // If the current URL's depth is less than the max depth
    if (current.depth < depth) {
      const pageLinks = await fetchLinksFromPage(current.url);
      for (const link of pageLinks) {
        // If we haven't reached the max number of links and the link is not already in the set
        if (links.size < maxLinks-1 && !links.has(link)) {
          links.add(link);
          let parentNode = (current.depth === 0) ? null : current.url;
          queue.push({ url: link, depth: current.depth + 1 });
          graph.push({ link, parent: parentNode });
        }
      }
    }
  }

  // Convert the graph to CSV, handling the potential null parent
  const json2csvParser = new Parser({ fields: ['link', 'parent'] });
  const csv = json2csvParser.parse(graph.map(({ link, parent }) => ({ link, parent: parent || '' })));

  // Write the CSV data to a file
  fs.writeFileSync('links.csv', csv);
  
  return links;
}

// Function to get links from multiple URLs
async function getLinksFromMultipleUrls(file, depth, maxLinks) {
  const fileStream = fs.createReadStream(file);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let allLinks = new Set();

  // For each URL in the file
  for await (const url of rl) {
    console.log(`Fetching links from: ${url}`);
    const links = await getLinksFromSpu(url, depth, maxLinks);
    console.log(`Fetched ${links.size} links from: ${url}`);
    allLinks = new Set([...allLinks, ...links]);
  }

  return allLinks;
}

// Export the function
module.exports = getLinksFromMultipleUrls;

