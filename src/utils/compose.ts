type Func = (...args: any[]) => any

const compose = (...fns: Func[]) =>
  fns.reduce(
    (f, g) =>
      (...args: any[]) =>
        f(g(...args))
  )

export default compose
