const fetcher = (...args) => fetch(args[0], args[1]).then(res => res.json())

export default fetcher;
