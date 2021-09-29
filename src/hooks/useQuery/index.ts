const useQuery = <T extends Record<string, string>>() => {
  const { search } = location
  if (!search) return {} as T
  const searchParams = new URLSearchParams(search)
  const keyValueList = [...(searchParams as any).entries()]

  return keyValueList.reduce((o, [k, v]: [string, string]) => {
    o[k] = v
    return o
  }, {}) as T
}

export default useQuery
