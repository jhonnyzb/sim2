const regexSearch = (name, str) => {
  const pattern = str
    .split('')
    .map((x) => `(?=.*${x})`)
    .join('')
  // eslint-disable-next-line
  const regex = new RegExp(`${pattern}`, 'g')
  return name.match(regex)
}

const fulltextSearch = (data, str) => {
  const array = Object.values(data)
  return array.filter((x) => {
    const text = String(x)
    const xSub = text.substring(0, 3).toLowerCase()
    return text.toLowerCase().includes(str) || regexSearch(xSub, str)
  })
}

export default fulltextSearch
