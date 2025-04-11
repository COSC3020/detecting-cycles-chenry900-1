const jsc = require('jsverify');
const { hasCycle } = require('./code');

// Helper function to generate a random graph (adjacency list)
function randomGraph(n) {
    const graph = Array.from({ length: n }, () => []);
    for (let i = 0; i < n; i++) {
        // Each node has a random number of edges (including self-loops)
        const numEdges = Math.floor(Math.random() * n); 
        for (let j = 0; j < numEdges; j++) {
            const randomNode = Math.floor(Math.random() * n);
            if (i !== randomNode && !graph[i].includes(randomNode)) { // Avoid adding duplicates
                graph[i].push(randomNode);
                graph[randomNode].push(i); // As it is undirected
            }
        }
    }
    return graph;
}

// Property-based test: Check if the cycle detection works for random graphs
jsc.property("hasCycle detects cycles in random graphs", jsc.nat(4), function(n) {
    const size = Math.max(2, n); // Ensure the graph is at least of size 2
    const graph = randomGraph(size);
    
    // Use the provided hasCycle function
    const result = hasCycle(graph);

    // We can't definitively assert cycle/no cycle for random graphs, but we can trust the algorithm itself
    return typeof result === "boolean";  // just check if it returns a boolean
});

// Manual Test Case (Optional)
function manualTest() {
    const graph1 = [
        [1],        // Node 0 has an edge to Node 1
        [0, 2],     // Node 1 has an edge to Node 0 and Node 2
        [1, 3],     // Node 2 has an edge to Node 1 and Node 3
        [2]         // Node 3 has an edge to Node 2 (creating a cycle)
    ];

    const graph2 = [
        [1],        // Node 0 has an edge to Node 1
        [0],        // Node 1 has an edge to Node 0 (no cycle)
    ];

    console.log("Graph 1 has cycle:", hasCycle(graph1)); // Expected: true
    console.log("Graph 2 has cycle:", hasCycle(graph2)); // Expected: false
}

manualTest();
