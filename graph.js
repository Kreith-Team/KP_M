"use strict";

const graphStyleStr = `
core {
  active-bg-size: 0;
}
node, edge {
  events: no;
}
edge {
  curve-style: bezier;
  target-arrow-shape: triangle;
}
.flow {
  width: 10px;
}
.bidirectional {
  source-arrow-shape: triangle;
}
.stock {
  shape: round-rectangle;
  background-color: #164C82;
  width: 55%;
}
.constant {
  background-color: #B09225;
  shape: round-rectangle;
}
.variable {
  background-color: #B09225;
  shape: round-diamond;
}
.cloud {
  content: \u2601; 
  color: black;
  size: 60%;
}
.delay {
  shape: round-tag;
}
`

const cy = cytoscape({
  container: document.getElementById('graph'),
  elements: [
    buildStock('s1'),
    buildStock('s2'),
    buildFlow('f1', 's1', 's2', true),
    buildConstant('c1'),
    buildVariable('v1'),
    buildInfluence('i1', 'c1', 'v1'),
    buildCloud('x1'),
    buildDelay('d1')
  ],



  boxSelectionEnabled: false,
  autoungrabify: true,
  autounselectify: true,
  layout: {
    name: 'grid'
  },
  style: graphStyleStr,
  zoom: 1
});

console.log(cy)


/******* ELEMENT FACTORIES *********
 * Functions that return Cytoscape-style
 * objects corresponding to each type of
 * object in the model
************************************/
function buildStock(id) {
  return ({
    group: 'nodes',
    data: {
      id: id
    },
    classes: ['stock']
  });
}

function buildConstant(id) {
  return ({
    group: 'nodes',
    data: {
      id: id
    },
    classes: ['constant']
  });
}

function buildVariable(id) {
  return ({
    group: 'nodes',
    data: {
      id: id
    },
    classes: ['variable']
  });
}

function buildFlow(id, source, target, bidirectional = false) {
  return ({
    group: 'edges',
    data: {
      id: id,
      source: source,
      target: target,
    },
    classes: bidirectional ? ['flow', 'bidirectional'] : ['flow']
  });
}

function buildInfluence(id, source, target) {
  return ({
    group: 'edges',
    data: {
      id: id,
      source: source,
      target: target,
    },
    classes: ['influence']
  });
}

function buildCloud(id) {
  return ({
    group: 'nodes',
    data: {
      id: id
    },
    classes: ['cloud']
  });
}

function buildDelay(id) {
  return ({
    group: 'nodes',
    data: {
      id: id
    },
    classes: ['delay']
  });
}