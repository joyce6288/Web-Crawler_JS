// Description: This file contains the code to calculate the closeness centrality of a graph from an adjacency matrix.

// Import required modules
const fs = require('fs');
const { Graph, alg } = require('graphlib');

// Helper function to calculate all distances using Dijkstra's algorithm
function calculateAllDistances(graph) {
  const distances = {};
  // Iterate over each node and calculate the distances using Dijkstra's algorithm
  graph.nodes().forEach((sourceNode) => {
    distances[sourceNode] = alg.dijkstra(graph, sourceNode);
  });

  return distances;
}

// Function to calculate closeness centrality
function calculateCloseness(distances, node, totalNodes) {
  let sumDistances = 0;
  let reachableNodes = 0;

  // Sum up all distances for the given node
  Object.values(distances[node]).forEach((distance) => {
    if (distance.distance !== Infinity) { // Ensure only reachable nodes are counted
      sumDistances += distance.distance;
      reachableNodes++;
    }
  });

  // Calculate closeness centrality
  // Avoid division by zero by checking if sumDistances is more than 0
  // Normalize closeness centrality to account for reachable nodes
  const closenessCentrality = sumDistances > 0 ? (reachableNodes - 1) / sumDistances : 0;

  return closenessCentrality;
}

// Function to calculate closeness centrality from an adjacency matrix
async function calculateClosenessCentralityFromMatrix(matrixFilePath) {
  // Read the adjacency matrix from the file
  const matrix = JSON.parse(fs.readFileSync(matrixFilePath, 'utf8'));
  const g = new Graph();

  // Build the graph from the adjacency matrix
  matrix.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      if (value === 1) {
        // Assuming nodes are labeled from 0 to n-1
        g.setEdge(`${rowIndex+1}`, `${colIndex+1}`);
      }
    });
  });

  // Calculate all distances using Dijkstra's algorithm
  const distances = calculateAllDistances(g);

  // Calculate closeness centrality for each node
  const totalNodes = g.nodes().length;
  const closenessCentrality = {};
  g.nodes().forEach((node) => {
    closenessCentrality[node] = calculateCloseness(distances, node, totalNodes);
  });

  // Find the most central node
  const mostCentralNode = Object.keys(closenessCentrality).reduce((a, b) =>
    closenessCentrality[a] > closenessCentrality[b] ? a : b
  );

  // Output the results to a JSON file
  fs.writeFileSync('closeness_results.json', JSON.stringify({ distances, closenessCentrality, mostCentralNode }, null, 2));

  return { distances, mostCentralNode, closenessCentrality };
}

// Export the function
module.exports = { calculateClosenessCentralityFromMatrix };
