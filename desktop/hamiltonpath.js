    var V = 4;
    var ans = 1000000000;
    var v = Array(n).fill(false);
    v[0] = true;


    function tsp(graph, currPos, n, count, cost)
    {

        if (count == n && graph[currPos][0]) {
        ans = Math.min(ans, cost + graph[currPos][0]);
        return;
    }

        for (var i = 0; i < n; i++) {
        if (!v[i] && graph[currPos][i]) {

        v[i] = true;
        tsp(graph, i, n, count + 1,
        cost + graph[currPos][i]);

        v[i] = false;
    }
    }
    };


    //tsp(graph, 0, 4, 1, 0);
