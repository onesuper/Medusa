

var g = {
    "nodes": [
        0, 1, 2, 3, 4, 5, 6, 7
    ],
    "edges": [
        [0, 1],
        [0, 4],
        [3, 4],
        [1, 4],
        [1, 2],
        [5, 2],
        [5, 6],
        [6, 7],
        [2, 7],
    ]
}


things = ["undershorts", "pants", "belt", "socks", "shoes", "shirt", "tie", "jacket", "watch"]



var graph, S, at;
var time = 0;
var pink = "#FFCCE0";
var white = "#FFFFFF";
var gray = "#EEEEEE";
var black = "#BBBBBB"


var restart = function() {

    graph = new Springy.Graph();
    graph.loadJSON(g);
    $('#graph').springy({ graph: graph });

    S = [];

    // initialize the value
    for (var i in graph.nodes) {
        graph.nodes[i].data.obj = things[i];
        graph.nodes[i].data.time = undefined;
        graph.nodes[i].color = white;
    }

    for (var i in graph.edges) {
        graph.edges[i].color = gray;
    }
    time = 0;

}

restart();




var step = function() {

    if (S.length == 0) {
        var find_at = false; 
        for (var i=0; i<graph.nodes.length; i++) {
            if (graph.nodes[i].color == white) {
                at = i;
                find_at = true;
                break;
            }
        } 
        if (find_at==false) return;
        
        S.push(at);
        graph.nodes[at].color = pink;
        graph.notify();

        return;
    } else {

        var u = S[S.length-1];   // peek   
    
        
        var rcolor = getRandomColor();
        var has_unvisited_children = false;

        for (var i in graph.nodes[u].out) {
            var v = graph.nodes[u].out[i];
            if (graph.nodes[v].color == white) {
                graph.setEdgeColor(u, v, rcolor);
                S.push(v);  
                graph.nodes[v].color = pink;
                has_unvisited_children = true;
            } else {
                e = graph.getEdge(u, v);
                if (e.color == gray) e.color = white;
            }
           
        }
        
        
        if (has_unvisited_children == false) {
            graph.nodes[u].color = black;
            graph.nodes[u].data.time = time;
            S.pop();
        }
        
        graph.notify();
    }

    time += 1;
   
}


