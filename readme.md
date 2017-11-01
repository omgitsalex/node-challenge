> Node.js challenge solution

## Notes

1. All tests are passing, requested functionality from "project" section below is working
2. I made an attempt at the bonus and changing the COUNT env variable will cause the program to download a different number of packages. However, when more than 20+ packages are downloaded at a time, the program may intermittently fail. 
3. Making heavy use of async series functions appeared to prevent the problem in #2, but came at such a significant tradeoff in speed that it didn't seem worth it to have as the implementation.


## Project

1. Get the 10 [most depended on packages](https://www.npmjs.com/browse/depended) from npm.
2. For each package, download the latest tarball from the npm registry.
3. Extract the tarball into `./packages/${pkg.name}`, e.g. `./packages/lodash`.

## Setup

Start by cloning this repo. Everything you'll need to get started is already configured for you. You'll need to commit your code at least once, but probably more often. Please use whatever commit and code style you like best, but please make sure all syntax is supported by Node v8.

We've already created an `index.js` file as your entry point. Create as many additional files as you'd like.

## Testing

We've created a failing `npm test` command for you. You can add additional tests if you'd like and even bring in a tool other than [`tape`](https://github.com/substack/tape) as long as these initial tests remain and `npm test` sets correct exit codes.

Passing tests don't guarantee that your solution is perfect but a failing test definitely indicates a problem.

## Bonus

How high can you go? Set the `COUNT` environment variable when running your tests to download more than the top 10.
