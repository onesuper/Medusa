

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



var graph, stack, at, at_color;
var time = 0;
var pink = "#FFCCE0";
var white = "#FFFFFF";
var gray = "#EEEEEE";
var black = "#BBBBBB"


var restart = function() {

    graph = new Springy.Graph();
    graph.loadJSON(g);
    $('#graph').springy({ graph: graph });

    stack = [];

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

    if (stack.length == 0) {
        var find_at = false; 
        for (var i=0; i<graph.nodes.length; i++) {
            if (graph.nodes[i].color == white) {
                at = i;
                find_at = true;
                break;
            }
        } 
        if (find_at==false) return;
        
        stack.push(at);
        at_color = getRandomColor()
        graph.nodes[at].color = at_color;
        graph.nodes[at].data.time = time;

        graph.notify();
        return;
    } else {
        var u = stack.pop();    
        graph.nodes[u].data.time = time;
        graph.nodes[u].color = at_color;  

        var rcolor = getRandomColor();

        for (var i in graph.nodes[u].out) {
            var v = graph.nodes[u].out[i];
            if (graph.nodes[v].color == white) {
                graph.setEdgeColor(u, v, rcolor);
                stack.push(v);  
                graph.nodes[v].color = pink;
               
            } else {
                graph.setEdgeColor(u, v, "#FFFFFF"); // hide the 'useless' edge
            }
           
        }

        graph.notify();
    }

    time += 1
}


