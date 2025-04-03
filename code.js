function hasCycle(graph) {
    var visited = [];
    var cycle = [];
    for (var i = 0; i < graph.length;i++) {
        visited[i] = false;
    }
    for (var i = 0; i < graph.length;i++) {
        visited[i] = false;
    }

    for (var i = 0; i < graph.length;i++) {
        if (visited[i] == false) {
            if (search(i, visited, graph, cycle)) {
                return true;
            }
        }
    }
    return false;
}

function search(node,visited,graph,cycle) {
    if (visited[node] == false) {
        visited[node] = true;
        cycle[node] = true;

        for (var x of graph[node]) {
            if (visited[node] == false) {
                if (search(x, visited, graph, cycle) == true) {
                    return true;
                }
                else if (cycle[x] == true) {
                    return true;
                }
            }
        }
        cycle[node] = false;
        return false;
}
