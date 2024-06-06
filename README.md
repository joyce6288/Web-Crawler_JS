# Web Crawler
## Contributors
- Anudari Batsaikhan (https://github.com/anukann)
- Joyce Tang (https://github.com/joyce628)

## Introduction

A web crawler application that creates web-link graphs and finds the Closeness Centrality for each node.

![Graph Image](https://github.com/Web-Crawler_JS/graph2.jpeg)

In today's digital world, there's a growing need for tools that help us understand and navigate the complex connections of the internet. This project aims to create a comprehensive web crawling and analysis tool using JavaScript and Node.js. The primary goal is to gather information from web pages, visualize the connections between them, and analyze the structure of the web graph to identify key pages based on centrality measures.



## Description

Our program is a comprehensive tool designed to delve into web pages, visually represent their relationships, and analyze their connectivity. It begins its journey by scanning a single URL, meticulously weaving a web of connections that encapsulate the website's structure. These connections are transformed into an adjacency matrix, serving as the foundation for the subsequent visualization phase.

Using the adjacency matrix, our program generates a visual graph that vividly portrays the interrelationships between different pages. This graph is not merely static but interactive, empowering users to dynamically explore the intricate web of connections within the website. With intuitive navigation controls, users can traverse through the graph, unraveling the underlying structure and discovering hidden connections.

Moreover, our program goes beyond visualization to provide insightful analysis. It calculates the closeness centrality for each site within the web graph, shedding light on the importance and centrality of individual nodes. By identifying the most central node, users gain valuable insights into the pivotal pages that play a crucial role in shaping the website's connectivity landscape.

In essence, our program offers a powerful blend of exploration, visualization, and analysis, enabling users to unravel the complexities of web structures and uncover the hidden gems within.

## Requirements

- **Node.js Installed**: Ensure that Node.js is installed on your system. You can download and install Node.js from the official website: [Node.js](https://nodejs.org/)
- **Command-Line Interface (CLI) or Terminal**: You will need access to a command-line interface (CLI) or terminal to run commands and execute the program. Most operating systems come with a built-in terminal.
- **Web Browser**: You will need a web browser to view the graphical representation of the graph generated by the program. Any modern web browser such as Google Chrome, Mozilla Firefox, or Microsoft Edge will suffice.


## User Manual

**Instructions for Running the Program**
**Clone the Repository:**
- To get started, clone the repository containing the source code of the program to your local machine. You can do this by executing the following command in your terminal:

```bash
git clone https://github.com/csc3430-winter2024/web-crawler-term-and-graph-9
```
**Navigate to the Source Code Directory:**
- Open a command-line interface (CLI) or terminal.
- Navigate to the directory where you cloned the repository.

**Configure URL for Web Crawling:**
- Locate the `url.txt` file in the source code directory.
- Open the file using a text editor.
- Ensure that the URL of the web page you want to crawl is correctly formatted and present in the file.
- You can modify this URL if desired. Ensure the URL includes the protocol (e.g., `http://` or `https://`).

**Configure Depth and Maximum Links for Web Crawling:**
- Open the `main.js` file in a text editor.
- Locate the `depth` and `maxLinks` variables at the beginning of the file.
- Modify these variables if desired to control the depth of crawling and the maximum number of links to retrieve.

  Example:
```javascript
async function main() {
  try {
    // Start web crawling with a depth of 5 and a maximum of 100 links
    console.log('Starting web crawling...');
    await getLinksFromMultipleUrls('url.txt', 5, 100);
```

**Install Dependencies:**
- Run the following command to install the necessary dependencies:`npm install`
  
**Execute the Web Crawling and Closeness Centrality Calculation:**

- Run the main functionality of the program by executing the following command:
`node main.js`
This command will perform web crawling, closeness centrality calculation, and identification of the most central web page.

**Start the Graph Server:**

- After executing the main functionality, start the server for serving the graphical representation of the graph by executing the following command:
`node server.js`
This command will start the server and serve the graphical representation of the crawled web pages at `http://localhost:3000`.

**View the Graphical Representation:**

- Once the server starts successfully, open a web browser.
- Enter the following URL in the address bar:
`http://localhost:3000`
This will display the graphical representation of the crawled web pages.

**Interact with the Graph:**

- Use the interactive features provided by the graph visualization library to explore the graph.
- You can zoom in/out, pan, and interact with individual nodes and edges.

 **Terminate the Program:**

- To terminate the program, you can press `Ctrl + C` in the terminal where each process is running.

**Additional Notes:**

- Ensure that the `url.txt` file containing the initial URLs to crawl is present in the source code directory.
- Make sure the required files such as `links.csv` and `adjacencyMatrix.json` are generated as expected during the program execution.
  
## Reflection
**Time Complexity**:
We analyze the time complexity of the major functions in project.
1. **Web Crawling (`getLinksFromMultipleUrls`)**:
    - Since fetching links from a page is an I/O bound operation done asynchronously, the time complexity mainly depends on the depth and the number of unique links processed:`O(N)` where `N` is the number of links on a page.
2. **Adjacency Matrix Generation (`createAdjacencyMatrixAndWriteToFile`)**:
    - Reading from the CSV file is linear regarding the number of lines, i.e., `O(N)` where `N` is the number of links.
    - Writing the matrix to a file is `O(V^2)`, where `V` is the number of unique nodes/vertices since it writes an entry for each possible edge between nodes.
3. **Graph Visualization (`createVisGraphFromMatrix`)**:
- **Creating Edges from the Adjacency Matrix `(O(V^2))`:** This part involves iterating through each entry of an adjacency matrix, which has `V^2` entries if V is the number of vertices. This part is `O(V^2)`.
- **Rendering (O(V + E))**: This step is theoretically **`O(V + E)`** since each vertex and edge need to be drawn. However, actual rendering time can be influenced by various factors, such as rendering optimizations within the browser, the complexity of the visual attributes, and the library's internal handling of the Document Object Model (DOM).
Therefore, the overall TC for the complete process using **`vis.js`** is not just determined by the initial setup of **`O(V^2)`** but also includes the complexities introduced by the layout algorithm and the rendering process. The total time complexity can be expressed as a combination of these factors:

**`Total TC = O(V^2) + TC of layout computation + O(V + E)`**


4. **Closeness Centrality Calculation (`calculateClosenessCentralityFromMatrix`)**:
    - Dijkstra's algorithm has a time complexity of `O(V^2)` for a dense graph when implemented with an adjacency matrix or `O((V + E) log V)` when using a priority queue with a sparse graph where `E` is the number of edges.
    - Since we are running Dijkstra's algorithm for every node, the time complexity becomes `O(V^3)` for dense graphs or `O(V * (V + E) log V)` for sparse graphs.
 Combining these factors, the total time complexity for running the entire program from web crawling to centrality calculation is:

**`Total TC = O(N) + O(L) + O(V^2) + O(layout + render) + O(V^3) or O(V * (V + E) log V)`**

**Challenges Faced and Overcoming Them :**
One notable challenge during the assignment was grasping the concept of closeness centrality and implementing it effectively with each node. Initially, understanding the intricacies of this centrality measure posed difficulties, and translating it into functional code was no small feat.

However, through proactive engagement and seeking support, we managed to overcome this challenge. Asking questions, both to our professor and classmates, proved invaluable in clarifying any uncertainties and gaining deeper insights into the concept. Their guidance and explanations helped us to dissect the complexities of closeness centrality and apply it systematically to each node within the network.

This collaborative approach not only enhanced our understanding of the subject but also reinforced the importance of leveraging the knowledge and expertise of others to tackle challenging problems effectively.

**Video link:**
[https://youtu.be/SBAUJ3ewIB4 ](https://youtu.be/SBAUJ3ewIB4 )


## Results

[![Watch the video](https://img.youtube.com/vi/SBAUJ3ewIB4/hqdefault.jpg)](https://youtu.be/SBAUJ3ewIB4)


Here is a graph generated from crawling the website [youtube.com](https://www.youtube.com) with a depth of 100 and a maximum of 10,000 links:

![Graph Image](https://github.com/csc3430-winter2024/web-crawler-term-and-graph-9/raw/main/pictures/graph1.png)


![Graph Image](https://github.com/csc3430-winter2024/web-crawler-term-and-graph-9/blob/main/pictures/program.png)




Here is a graph generated from crawling the website [google.com](https://www.google.com) with a depth of 3 and a maximum of 100 links:

![Graph Image](https://github.com/csc3430-winter2024/web-crawler-term-and-graph-9/blob/main/pictures/graph3.jpeg)

![Graph Image](https://github.com/csc3430-winter2024/web-crawler-term-and-graph-9/blob/main/pictures/AE1FFD8E-2259-4744-BD9F-E3F3AD7D2904.png)


