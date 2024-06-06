// Description: This file contains the main function that runs the entire web crawling, graph visualization, and closeness centrality calculation process.

// Import required modules
const getLinksFromMultipleUrls = require('./crawler.js');
const { calculateClosenessCentralityFromMatrix } = require('./closeness.js');
const createAdjacencyMatrixAndWriteToFile = require('./matrix.js');
const createVisGraphFromMatrix  = require('./vis.js');
const fs = require('fs');
const path = require('path');
const app = require('./vis.js');

// Define the main function
async function main() {
  try {
    // Start web crawling
    console.log('Starting web crawling...');
    await getLinksFromMultipleUrls('url.txt', 4, 50);
    console.log('Web crawling completed.');

    // Define input and output file paths for adjacency matrix
    const inputFilePath = 'links.csv';
    const outputFilePath = path.join(__dirname, 'adjacencyMatrix.json');
    
    // Create adjacency matrix and write it to a file
    const { matrixJson, indexToUrl } = await createAdjacencyMatrixAndWriteToFile(inputFilePath, outputFilePath);
    console.log('Adjacency matrix file generated.');

    // Visualize the graph using the adjacency matrix
    console.log('Visualizing graph...');
    await createVisGraphFromMatrix(outputFilePath);
    console.log('Graph visualization completed.');

    // Calculate closeness centrality and find the most central node
    console.log('Calculating closeness centrality...');
    const { mostCentralNode, closenessCentrality } = await calculateClosenessCentralityFromMatrix(outputFilePath);
    console.log(`Most Central Node: ${mostCentralNode}`);
    // Convert the index of the most central node to its corresponding URL
    const mostCentralNodeUrl = indexToUrl.get(parseInt(mostCentralNode)); 
    console.log(`Most Central Node URL: ${mostCentralNodeUrl}`);
    console.log(`Closeness Centrality:`, closenessCentrality);

    // Indicate completion of all tasks
    console.log('Crawling, graph visualization, and closeness centrality calculation completed.');
  } catch (error) {
    // Log any errors that occur
    console.error('An error occurred:', error);
  }
}

// Run the main function
main();