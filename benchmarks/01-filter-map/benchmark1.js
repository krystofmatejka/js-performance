import Benchmark from 'benchmark'
import {imperative, declarative, reduce, transducer} from './filter-map.js'

const parseArguments = () => {
  const min = parseInt(process.argv[2] ?? '1')
  const max = parseInt(process.argv[3] ?? '7')

  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('Invalid arguments')
  }

  return [min, max]
}

const generateRandomNumberBetween = (min, max) => Math.floor(Math.random() * max) + min

const generateArrays = () => {
  const [min, max] = parseArguments()
  const arrays = []

  for (let i = min; i <= max; i++) {
    arrays.push(new Array(Math.pow(10, i)).fill(0).map(() => generateRandomNumberBetween(0, 1000)))
  }

  return arrays
}

const createSuite = (array) => new Benchmark.Suite(`${array.length} elements`)
  .add('imperative', () => imperative(array))
  .add('declarative', () => declarative(array))
  .add('reduce', () => reduce(array))
  .add('transducer', () => transducer(array))

const runSuiteAsPromise = (suite) => new Promise((resolve, reject) => {
  suite
    .on('cycle', (event) => console.log(String(event.target)))
    .on('complete', (event) => {
      console.log(`${event.currentTarget.name} is done, fastest is ${event.currentTarget.filter('fastest').map('name')}\n`)
      resolve()
    })
    .on('error', () => reject())
    .run({'async': true})
})

const main = async () => {
  const arrays = generateArrays()

  for (const array of arrays) {
    const suite = createSuite(array)
    await runSuiteAsPromise(suite)
  }

  return 'Done!'
}

main()
  .then(console.log)
  .catch(console.error)
