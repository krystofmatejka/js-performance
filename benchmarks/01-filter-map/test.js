import assert from 'assert/strict'
import {
  imperative,
  declarative,
  declarative2,
  reduce,
  reduce2,
  reduce3,
  reduce4,
  reduce5,
  transducer,
  transducer2,
} from './filter-map.js'

const input = [1, 2, 3, 4]
const output = [200, 400]

assert.deepEqual(imperative(input), output)
assert.deepEqual(declarative(input), output)
assert.deepEqual(declarative2(input), output)
assert.deepEqual(reduce(input), output)
assert.deepEqual(reduce2(input), output)
assert.deepEqual(reduce3(input), output)
assert.deepEqual(reduce4(input), output)
assert.deepEqual(reduce5(input), output)
assert.deepEqual(transducer(input), output)
assert.deepEqual(transducer2(input), output)
