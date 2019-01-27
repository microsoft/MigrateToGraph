# Migrate To Graph
This tool allows you to migrate existing database to a graph database

Conversions supported:
- json to gremlin 
- json to graph
- sql to graph

## Installation (CLI)
> npm i -g migrate-to-graph

## Usage (CLI)
    Usage: migrate-to-graph [options] [command]

    Options:

      -V, --version                           output the version number
      -h, --help                              output usage information

    Commands:

      jsontogremlin <inputFile> <templateFile> <outputFile>
      jsontograph <inputFile> <templateFile> <graphConfigFile>
      sqltograph <sqlConfigFile> <query> <templateFile> <graphConfigFile>

## Installation (Lib)
> npm i --save migrate-to-graph

## Usage (Lib)
```js
  var graphtool = require('migrate-to-graph');
  var result = graphtool.jsonToGraph(json,template);

   //or ES6
  import {jsonToGraph} from 'migrate-to-graph';
```

### SQL Config File
```json5
{
  "dialect":"mssql",  //dialect to use, 'mysql'|'sqlite'|'postgres'|'mssql'
  "username": "test",
  "password": "password",
  "host": "server",
  "database": "database",
    "options": {
        "encrypt": true   //set to true if you need encryption
    }
}
```

### Graph Config File
```json5
{
  "host":"server",
  "password":"password",
  "user": "username",
  "port": "443",
  "ssl": true,
  "batchSize": 10,  //No. of gremlin queries to execute in parallel (Default: 10)
  "upsert": false //Set to true if you want to upsert vertices or edges (Default: false)

}
```

<b>Note: </b>For Azure cosmos graph DB , user is '/dbs/{dbName}/colls/{collectionName}' and password is its secretKey

## Template
To transform data to a graph, you need to transform the data into vertex and edge format. 

Using a template you can convert a single data object into one/many vertexes and edges

We use handlebars to convert input to vertex / edge format

### Example

template:

```hbs
{
  "vertices":[
    {
      "id": "{{myId}}",
      "label": "vertexLabel",
      "properties":{
        "name": "{{myName}}"
      }
    },
    {
      "id": "{{myFriendId}}",
      "label": "vertexLabel",
      "properties":{
        "name": "{{myFriendName}}"
      }
    }
  ],
  "edges":[
    {
      "label": "friend",
      "from": "{{myId}}",
      "to": "{{myFriendId}}",
      "properties": {
        "value" : {{friendshipLvl}}
      }
    }
  ]
}

```

<b>Note: </b> You can specify as many vertices and edges as you want as long as it transforms to Vertex-Edge format

Input Data(a single entity from array of data):

```json
  {
    "myId": "1",
    "myName": "abc",
    "myFriendId": "2",
    "myFriendName": "xyz",
    "friendshipLvl": 3
  }
```

Transformed Data:

```json
{
  "vertices":[
    {
      "id": "1",
      "label": "vertexLabel",
      "properties":{
        "name": "abc"
      }
    },
    {
      "id": "2",
      "label": "vertexLabel",
      "properties":{
        "name": "xyz"
      }
    }
  ],
  "edges":[
    {
      "label": "friend",
      "from": "1",
      "to": "2",
      "properties": {
        "value" : 3
      }
    }
  ]
}
```

## Vertex-Edge Format
This is a custom format inspired from the way Azure Cosmos Graph DB stores data. We use this format to convert it to gremlin queries so you need to provide a template which transforms to vertex-edge format

Model for Vertex and Edge
```ts
export interface Vertex {
  id: string;  
  label: string;   //label for the vertex
  type: 'vertex';
  properties: {
    [key: string]: any;  //Represents all the properties you wish to add to the vertex
  };
}

export interface Edge {
  id?: string;
  label: string;  //label for the edge
  type: 'edge';
  to: string;   //id of vertex from which you want the edge to start
  from: string; //id of vertex to which you want the edge to end
  properties?: {
    [key: string]: any; //Represents all the properties you wish to add to the edge
  };
}

```

Vertex-Edge Format expects you specify an array of vertices and edges

```json
{
  "vertices":[
    {
      "id": "1",
      "label": "vertexLabel",
      "properties":{
        "name": "abc"
      }
    },
    {
      "id": "2",
      "label": "vertexLabel",
      "properties":{
        "name": "xyz"
      }
    }
  ],
  "edges":[
    {
      "label": "friend",
      "from": "1",
      "to": "2",
      "properties": {
        "value" : 3
      }
    }
  ]
}
```
