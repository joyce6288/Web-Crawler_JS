//This is the file that will be used to create the adjacency matrix from the CSV file.

// Import required modules
const fs = require('fs');
const csvParser = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Function to read links from a CSV file
function readCsvLinks(filePath) {
    return new Promise((resolve, reject) => {
        let links = [];
        // Create a read stream and pipe it through the CSV parser
        fs.createReadStream(filePath)
            .pipe(csvParser())
            // For each row in the CSV, add an object to the links array
            .on('data', (data) => links.push({ source: data.parent, target: data.link }))
            // When the stream ends, resolve the promise with the links array
            .on('end', () => resolve(links))
            // If an error occurs, reject the promise with the error
            .on('error', (error) => reject(error));
    });
}

// Function to create an adjacency matrix from a list of links
async function createAdjacencyMatrix(filePath) {
    // Read the links from the CSV file
    const links = await readCsvLinks(filePath);
    const urlToIndex = new Map();
    let index = 0;

    // Map each unique URL to an index
    links.forEach(link => {
        if (!urlToIndex.has(link.source)) urlToIndex.set(link.source, index++);
        if (!urlToIndex.has(link.target)) urlToIndex.set(link.target, index++);
    });

    // Create the adjacency matrix
    const size = urlToIndex.size;
    const matrix = Array.from({ length: size }, () => Array(size).fill(0));

    // Populate the matrix
    links.forEach(link => {
        const sourceIndex = urlToIndex.get(link.source);
        const targetIndex = urlToIndex.get(link.target);
        matrix[sourceIndex][targetIndex] = 1; // Set to 1 where there's a link
    });

    return matrix;
}

// Function to create an adjacency matrix and write it to a file
async function createAdjacencyMatrixAndWriteToFile(filePath, outputFilePath) {
    // Read the links from the CSV file
    const links = await readCsvLinks(filePath);
    const urlToIndex = new Map();
    let index = 0;

    // Map each unique URL to an index
    links.forEach(link => {
        if (!urlToIndex.has(link.source)) urlToIndex.set(link.source, index++);
        if (!urlToIndex.has(link.target)) urlToIndex.set(link.target, index++);
    });

    // Create the adjacency matrix
    const size = urlToIndex.size;
    const matrix = Array.from({ length: size }, () => Array(size).fill(0));

    // Populate the matrix
    links.forEach(link => {
        const sourceIndex = urlToIndex.get(link.source);
        const targetIndex = urlToIndex.get(link.target);
        matrix[sourceIndex][targetIndex] = 1; // Set to 1 where there's a link
    });

    // Convert the matrix to JSON
    const matrixJson = JSON.stringify(matrix);

    // Write the JSON to a file
    fs.writeFileSync(outputFilePath, matrixJson, 'utf8');

    const indexToUrl = new Map();
    urlToIndex.forEach((index, url) => {
    indexToUrl.set(index + 1, url); // Increment index by 1 to match with 1-based indexing
});

    // Create an inverse map (index to URL) for reverse lookup
    console.log(`Adjacency matrix written to ${outputFilePath}`);
    return {matrix, indexToUrl};
}

// Export the function
module.exports = createAdjacencyMatrixAndWriteToFile;
