// Purpose: Create a graph from an adjacency matrix using vis.js.

const fs = require('fs');
const vis = require('vis-network');

// Function to read the adjacency matrix and convert it to a format usable by vis.js
function createVisGraphFromMatrix(matrixFilePath) {
    // Read the adjacency matrix from file
    const matrixJson = fs.readFileSync(matrixFilePath, 'utf8');
    const matrix = JSON.parse(matrixJson);

    // Initialize nodes and edges arrays
    let nodes = [];
    let edges = [];

    // Create nodes based on the matrix size
    for (let i = 0; i < matrix.length; i++) {
       // nodes.push({ id: i+1, label: `${i}` });
       nodes.push({ id: i, label: `${i}` });
    }

    // Create edges based on non-zero entries in the matrix
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 1) {
                edges.push({ from: i, to: j });
            }
        }
    }

    // Return the graph data in the format expected by vis.js
    return { nodes, edges };
}

module.exports = createVisGraphFromMatrix;
