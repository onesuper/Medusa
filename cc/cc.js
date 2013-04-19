

var g = {
    "nodes": [0, 1, 2, 3, 4, 5, 6],
    "edges": [
        [2, 0], [0, 2],
        [1, 2], [2, 1],
        [2, 6], [6, 2],
        [3, 1], [1, 3],
        [5, 4], [4, 5]

    ]
}




var graph,queue, at, at_color;
var pink = "#FFCCE0";
var white = "#FFFFFF";
var gray = "#EEEEEE";




var restart = function() {

    graph = new Springy.Graph();
    graph.loadJSON(g);

    $('#graph').springy({ graph: graph });

    // clear the queue
    queue = [];

    // initialize the value
    for (var i in graph.nodes) {
        graph.nodes[i].data.level = -1;
        graph.nodes[i].data.ID = i;
        graph.nodes[i].color = white;
    }

    for (var i in graph.edges) {
        graph.edges[i].color = gray;
    }


}

restart();




var step = function() {
   
    if (queue.length == 0) {
        var find_at = false;   // why js doesn't support for/else...#%#$
        for (var i=0; i<graph.nodes.length; i++) {
            if (graph.nodes[i].color == white) {
                at = i;
                find_at = true;
                break;
            }
        } 
        if (find_at==false) return;
        
        queue.push(at);
        graph.nodes[at].data.level = 0;
        at_color = getRandomColor()
        graph.nodes[at].color = at_color;
        graph.notify();
        return;
    } else {
        var u = queue.shift();            //dequeue 
        graph.nodes[u].color = at_color;

        var rcolor = getRandomColor();        

        for (var i in graph.nodes[u].out) {
            var v = graph.nodes[u].out[i];
            if (graph.nodes[v].color == white) {
                graph.setEdgeColor(u, v, rcolor);
                queue.push(v); 
                graph.nodes[v].data.level = graph.nodes[u].data.level + 1;
                graph.nodes[v].data.ID = at;
                graph.nodes[v].color = pink;  // in the frontier
            } else {
                graph.setEdgeColor(u, v, white); // hide the 'useless' edge
            }
        }
        graph.notify();
    }
}


