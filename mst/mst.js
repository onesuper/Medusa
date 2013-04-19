

var g = {
    "nodes": [0, 1, 2, 3, 4, 5],
    "edges": [
        [0, 1, {w: 32}],
        [1, 0, {w: 32}],
        [3, 5, {w: 60}],
        [5, 3, {w: 60}],
        [0, 2, {w: 31}],
        [2, 0, {w: 31}],
        [0, 3, {w: 51}],
        [3, 0, {w: 51}],
        [2, 4, {w: 46}],
        [4, 2, {w: 46}],
        [3, 4, {w: 50}],
        [4, 3, {w: 50}],

    ]
}




var graph, Q;
var INF = 100000;

var restart = function() {

    graph = new Springy.Graph();
    graph.loadJSON(g);
    $('#graph').springy({ graph: graph });



    // Q is the nodes set for traversing
    Q = [];

    // initialize the values in each nodes
    for (var i in graph.nodes) {
        graph.nodes[i].data.cost = INF;
        graph.nodes[i].data.prev = undefined;
        graph.nodes[i].color = "#FFCCE0";
        Q.push(i);   
    }

    // colorize the edges
    for (var i in graph.edges) {
        graph.edges[i].color = "#EEEEEE";
    }

    // make 0 the source node
    graph.nodes[0].data.cost = 0;

    graph.notify();
}

restart();


// simulate a priority queue with sorting
var reorder = function() {
    Q.sort(function compare(a, b){ return graph.nodes[a].data.cost-graph.nodes[b].data.cost });
}


function contains(a, n) {
    var i = a.length;
    while (i--) {
       if (a[i] == n) {
           return true;
       }
    }
    return false;
}

var step = function() {
    if (Q.length == 0) return; // no more nodes
    var u = Q.shift();         // dequeue

    graph.nodes[u].color = "#BBBBBB";  
    var rcolor = getRandomColor();


    // visiting all the outgoing edges 
    for (var i in graph.nodes[u].out) {
        var v = graph.nodes[u].out[i];
        if (contains(Q, v) && graph.getEdge(u, v).data.w < graph.nodes[v].data.cost) {
            graph.setEdgeColor(u, v, rcolor);
            graph.nodes[v].data.cost = graph.getEdge(u, v).data.w;

            //kill loser
            if (graph.nodes[v].data.prev != undefined) {
                var prev = graph.nodes[v].data.prev;
                graph.setEdgeColor(prev, v, "#FFFFFF");
            }
            graph.nodes[v].data.prev = u;
            // reorder the value in Q by decreasing dist[]
            reorder();
        } else {
            graph.setEdgeColor(u, v, "#FFFFFF");
        }
    }
    graph.notify();
}
