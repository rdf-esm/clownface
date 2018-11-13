/* global describe, it */

const assert = require('assert')
const clownface = require('../..')
const rdf = require('rdf-ext')

describe('.dataset', () => {
  it('should be undefined if there is no context with a dataset', () => {
    const cf = clownface.dataset()

    assert.strictEqual(typeof cf.dataset, 'undefined')
  })

  it('should be the dataset of the context if there is only one dataset', () => {
    const dataset = rdf.dataset()

    const cf = clownface.dataset(dataset)

    assert.strictEqual(cf.dataset, dataset)
  })

  it('should be undefined if there are multiple datasets in the context', () => {
    const termA = rdf.literal('1')
    const termB = rdf.namedNode('http://example.org/')
    const datasetA = rdf.dataset()
    const datasetB = rdf.dataset()

    const cf = clownface.dataset(null, [termA, termB])

    // TODO: should be possible with constructor or static method
    cf._context[0].dataset = datasetA
    cf._context[1].dataset = datasetB

    assert.strictEqual(typeof cf.dataset, 'undefined')
  })
})