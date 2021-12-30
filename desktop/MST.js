function mink(key, mstSet)
{
    var min = Number.MAX_VALUE, min_index;

    for (let v = 0; v < V; v++)
        if (mstSet[v] == false && key[v] < min)
            min = key[v], min_index = v;

    return min_index;
}


function getMST(graph)
{
    var parent = [];

    var key = [];

    var mstFindSet = [];

    for (let i = 0; i < V; i++)
        key[i] = Number.MAX_VALUE, mstFindSet[i] = false;


    key[0] = 0;
    parent[0] = -1;
    for (let count = 0; count < V - 1; count++)
    {

        var u = mink(key, mstFindSet);

        mstFindSet[u] = true;

        for (let v = 0; v < V; v++)


            if (graph[u][v] && mstFindSet[v] == false && graph[u][v] < key[v])
                parent[v] = u, key[v] = graph[u][v];
    }

    //printMST(parent, graph);
    return parent;
}









