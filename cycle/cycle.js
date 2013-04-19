

var g = {
    "nodes": [0, 1, 2, 3, 4, 5],
    "edges": [
        [2, 1], [1, 2],
        [0, 2], [2, 0],
        [2, 3], [3, 2],
        [1, 4], [4, 1],
        [3, 4], [4, 3],
        [4, 5], [5, 4]

    ]
}


var graph,stack;
var root = 0;
var pink = "#FFCCE0";
var white = "#FFFFFF";
var gray = "#EEEEEE";
var black = "#BBBBBB"


var restart = function() {

    graph = new Springy.Graph();
    graph.loadJSON(g);
    $('#graph').springy({ graph: graph });

    // clear the stack
    stack = [];

    // initialize the value
    for (var i in graph.nodes) {
        graph.nodes[i].data.prev = undefined;
        graph.nodes[i].color = white;
    }

    for (var i in graph.edges) {
        graph.edges[i].color = gray;
    }

    stack.push(root);
    graph.nodes[root].color = pink;
    

    graph.notify();
}

restart();

var step = function() {
    if (stack.length == 0) return;
    
    var u = stack.pop();           
    graph.nodes[u].color = black;  

    var rcolor = getRandomColor();

    for (var i in graph.nodes[u].out) {
        var v = graph.nodes[u].out[i];
        if (graph.nodes[v].color == white) {
            graph.setEdgeColor(u, v, rcolor);
            stack.push(v);  
            graph.nodes[v].data.prev = u;
            graph.nodes[v].color = pink; // in the frontier
        } else {
            if (graph.nodes[u].data.prev != v) alert(u + '\'s parent is not ' + v + " ==> cycle detected!");
            graph.setEdgeColor(u, v, "#FFFFFF"); // hide the 'useless' edge
        }
    }

    graph.notify();
}
