import {reduce, reduce2, reduce3, reduce4, reduce5, transducer, transducer2} from './filter-map.js'

import Benchmark from 'benchmark'

const suite = new Benchmark.Suite('Filter & Map')

const imperative = (array) => {
  const result = []

  for (let i = 0; i < array.length; i++) {
    const element = array[i]
    if (element !== undefined && element % 2 === 0) {
      result.push(element * 100)
    }
  }

  return result
}

const imperative2 = (array) => {
  const result = new Array(array.length)

  for (let i = 0; i < array.length; i++) {
    const element = array[i]
    if (element !== undefined && element % 2 === 0) {
      result.push(element * 100)
    }
  }

  return result
}

const imperativeTwoSteps = (array) => {
  const filtered = []

  for (let i = 0; i < array.length; i++) {
    const element = array[i]
    if (element !== undefined && element % 2 === 0) {
      filtered.push(element)
    }
  }

  const mapped = []

  for (let i = 0; i < filtered.length; i++) {
    const element = filtered[i]
    if (element !== undefined) {
      mapped.push(element * 100)
    }
  }

  return mapped
}

const declarative = (array) => array
  .filter((e) => e % 2 === 0)
  .map((e) => e * 100)

const f = (e) => e % 2 === 0
const m = (e) => e * 100

const declarativeNoArrow = (array) => array
  .filter(f)
  .map(m)

const f2 = (e) => e % 2 === 0
const m2 = (e) => e * 100

const declarativeHalfArrow = (array) => array
  .filter((e) => f2(e))
  .map((e) => m2(e))

const generateRandomNumberBetween = (min, max) => Math.floor(Math.random() * max) + min

const array = new Array(1_000_000).fill(0).map(() => generateRandomNumberBetween(0, 1000))

suite
  .add('imperative', () => imperative(array))
  .add('declarative', () => declarative(array))
  .add('reduce', () => reduce(array))
  .add('transducer', () => transducer(array))
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({'async': true})
