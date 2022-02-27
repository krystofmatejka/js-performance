import * as R from 'ramda'

export const imperative = (array) => {
  const result = []

  for (let i = 0; i < array.length; i++) {
    const element = array[i]
    if (element !== undefined && element % 2 === 0) {
      result.push(element * 100)
    }
  }

  return result
}

export const declarative = (array) => array
  .filter((v) => v % 2 === 0)
  .map((v) => v * 100)

const f = (v) => v % 2 === 0
const m = (v) => v * 100

export const declarative2 = (array) => array
  .filter(f)
  .map(m)

export const reduce = (array) => array.reduce((acc, cur) => {
  if (cur % 2 === 0) {
    acc.push(cur * 100)
  }

  return acc
}, [])

export const reduce2 = (array) => array.reduce((acc, cur) => (cur % 2 === 0) ? [...acc, cur * 100] : acc, [])

export const reduce3 = (array) => array.reduce((acc, cur) => (cur % 2 === 0) ? acc.concat(cur * 100) : acc, [])

export const reduce4 = (array) => array.reduce((acc, cur) => (cur % 2 === 0) ? (acc.push(cur * 100) && acc) : acc, [])

const isEven = (n) => !(n % 2)

const arrayPush = (array, element) => {
  array.push(element * 100)
  return array
}

export const reduce5 = (array) => array.reduce((acc, cur) => isEven(cur) ? arrayPush(acc, cur) : acc, [])

export const transducer = R.pipe(
  R.filter((v) => v % 2 === 0),
  R.map((v) => v * 100),
)

export const transducer2 = R.compose(
  R.map((v) => v * 100),
  R.filter((v) => v % 2 === 0),
)
