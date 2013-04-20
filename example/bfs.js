

var g = {
    "nodes": [0, 1, 2, 3],
    "edges": [
        [0, 1, {weight: 1}], 
        [1, 2, {weight: 2}],
        [2, 3, {weight: 3}]

    ]
}


var graph,queue;
var root = 0;
var pink = "#FFCCE0";
var white = "#FFFFFF";
var gray = "#EEEEEE";
var black = "#BBBBBB"



var restart = function() {

    graph = new Springy.Graph();
    graph.loadJSON(g);
    $('#graph').springy({ graph: graph });

    // clear the queue
    queue = [];
    // initialize the value
    for (var i in graph.nodes) {
        graph.nodes[i].data.cost = undefined;
        graph.nodes[i].color = white;
    }

    for (var i in graph.edges) {
        graph.edges[i].color = gray;
    }

    queue.push(root);
    graph.nodes[root].data.cost = 0;
    graph.nodes[root].color = pink;

    graph.notify();
}

restart();

var step = function() {
    if (queue.length == 0) return;
    
    var u = queue.shift();       
    graph.nodes[u].color = black;  
    var rcolor = "red";

    for (var i in graph.nodes[u].out) {
        var v = graph.nodes[u].out[i];
        if (graph.nodes[v].color == white) {
            graph.setEdgeColor(u, v, rcolor);
            queue.push(v);  // enqueue
            graph.nodes[v].data.cost = graph.nodes[u].data.cost + graph.getEdge(u, v).data.weight;
            graph.nodes[v].color = pink; // in the frontier
        } else {
            graph.setEdgeColor(u, v, white); // hide the 'useless' edge
        }
    }
    graph.notify();
}
