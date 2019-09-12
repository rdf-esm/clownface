# clownface

[![Build Status](https://travis-ci.org/rdf-ext/clownface.svg?branch=master)](https://travis-ci.org/rdf-ext/clownface)
[![NPM Version](https://img.shields.io/npm/v/clownface.svg?style=flat)](https://npm.im/clownface)

Clownface is a graph traversal library inspired by [Gremlin](http://tinkerpop.apache.org/) which allows to query any [RDF dataset](https://rdf.js.org/dataset-spec/) in a concise and readable way.

# Introduction

Querying an RDF graph can be challenging. Apart from trivial queries, e.g. simply listing all the _objects_ connected to a _subject_, it is necessary to write multiple loop and validation routines to retrieve an answer.

If we like to get the given name and family name of all persons known by e.g. Stuart Bloom (from [tbbt-ld](https://github.com/zazuko/tbbt-ld)) we can write:

```javascript
const cf = require('clownface')
# extend the RDF/JS dataset with clownface
const tbbt = cf(dataset)
# get a starting node inside the dataset
const stuartBloom = tbbt.node('http://localhost:8080/data/person/stuart-bloom'))
# query for all people Stuart knows and print their full name
stuartBloom
  .out('http://schema.org/knows') # get all nodes connected through schema:knows 
  .map(person => person # for every result
    .out(['http://schema.org/givenName', 'http://schema.org/familyName']) # get the schema:givenName and schema:familyName
    .values.join(' ') # join them with an empty space
  )
  .join(', ') # join the list of names with a comma
```

Clownface provides a set of chainable functions. The most important are `.in( predicate)` and `.out(predicate)` which allow the traversal through the graph. It is possible to chain as many of these functions to extract a sub-graph from the available dataset.

Finally the result of your query can be accessed with  `.values`.

We use the well known `<subject> <predicate> <object>` nomenclature for a triple in the following description. All examples are based on the toy dataset [tbbt-ld](https://github.com/zazuko/tbbt-ld).

# Functions

All functions are valid on a Clownface context  `cf`. This makes all functions chainable. The first context can be created with the constructor of Clownface by providing a RDF/JS dataset.

```js
const cf = require('clownface')
tbbt = cf(dataset)
```

To define a starting node, or set of starting nodes inside the graph use either `tbbt.node(<subject>|<object>)` or `tbbt.has(<predicate>, <object>)` to get a specific `subject`.

## Access

###  <a name="has" href="#has">#</a>cf.<b> has </b>(<i>predicate</i>, <i>object</i>) [<>](lib/Clownface.js#L227 "Source")

`predicate` The predicate which defines 

`object` The object which defines 

```js
cf.has('http://schema.org/givenName', 'Stuart')
  .values;
```

###  <a name="has" href="#has">#</a>cf.<b> node </b>(<i>predicate</i>, <i>object</i>) [<>](lib/Clownface.js#L227 "Source")

## Navigate

### <a name="in" href="#in">#</a>cf.<b> in </b>(<i>predicate</i>) [<>](lib/Context.js#L20 "Source")

`predicate` The predicate which defines 

```js
cf.in('http://schema.org/streetAddress')
  .values;
```

###  <a name="out" href="#out">#</a>cf.<b> out </b>(<i>predicate</i>) [<>](lib/Context.js#L26 "Source")

`predicate` The predicate which defines 

```js
cf.out('http://schema.org/knows')
  .values;
```

## Output

