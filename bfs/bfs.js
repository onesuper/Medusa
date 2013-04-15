

var g = {
    "nodes": [0, 1, 2, 3, 4, 5, 6],
    "edges": [
        [0, 1], [1, 0],
        [0, 2], [2, 0],
        [0, 3], [3, 0],
        [1, 4], [4, 1],
        [4, 5], [5, 4],
        [3, 5], [5, 3],
        [3, 6], [6, 3],
    ]
}


var graph,queue;

var restart = function() {

    graph = new Springy.Graph();
    graph.loadJSON(g);

    $('#graph').springy({ graph: graph });

    // clear the queue
    queue = [];

    // initialize the value
    for (var i in graph.nodes) {
        graph.nodes[i].data.visited = false;
        graph.nodes[i].data.level = -1;
        graph.nodes[i].color = "#FFFFFF";
    }

    for (var i in graph.edges) {
        graph.edges[i].color = "#EEEEEE";
    }

    // make 0 the source node
    queue.push(0);
    graph.nodes[0].data.visited = true;
    graph.nodes[0].data.level = 0;
    graph.nodes[0].color = "#FFCCE0";

    graph.notify();
}

restart();

var step = function() {
    if (queue.length == 0) return;
    
    var source = queue.shift();            //dequeue
    graph.nodes[source].color = "#BBBBBB";  
    var rcolor = getRandomColor();

    // visiting all the outgoing edges 
    for (var i in graph.nodes[source].out) {
        var out = graph.nodes[source].out[i];
        if (!graph.nodes[out.target.id].data.visited) {
            out.color = rcolor;
            var target = out.target.id;
            queue.push(target);  //  enqueue
            graph.nodes[target].data.level = graph.nodes[source].data.level + 1;
            graph.nodes[target].color = "#FFCCE0"; // in the frontier
            graph.nodes[target].data.visited = true;
        } else {
            out.color = "#FFFFFF"; // hide the 'useless' edge
        }
    }
    graph.notify();
}
