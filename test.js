const jsc = require('jsverify');
const { hasCycle } = require('./code');

// Helper to generate random undirected graph (adjacency list)
function randomGraph(n) {
    const graph = Array.from({ length: n }, () => []);
    for (let i = 0; i < n; i++) {
        const numEdges = Math.floor(Math.random() * n);
        for (let j = 0; j < numEdges; j++) {
            const target = Math.floor(Math.random() * n);
            if (i !== target && !graph[i].includes(target)) {
                graph[i].push(target);
                graph[target].push(i); // undirected edge
            }
        }
    }
    return graph;
}

// Create property: hasCycle must return boolean for any graph
const prop = jsc.forall(jsc.nat(5), (size) => {
    const n = Math.max(2, size); // at least 2 nodes
    const graph = randomGraph(n);
    const result = hasCycle(graph);
    return typeof result === 'boolean';
});

// Run property-based test manually
try {
    jsc.assert(prop);
    console.log("✅ Property-based test passed: hasCycle always returns boolean");
} catch (err) {
    console.error("❌ Test failed:", err);
}

// Manual test
function manualTest() {
    const cycleGraph = [
        [1],
        [0, 2],
        [1, 3],
        [2, 0]  // This edge creates a cycle
    ];

    const noCycleGraph = [
        [1],
        [0, 2],
        [1, 3],
        [2]
    ];

    console.log("Graph with cycle:", hasCycle(cycleGraph)); // true
    console.log("Graph without cycle:", hasCycle(noCycleGraph)); // false
}

manualTest();
