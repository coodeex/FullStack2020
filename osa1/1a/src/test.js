const t = [1, -1, 3]

t.push(5)

console.log(t.length) // tulostuu 4
console.log(t[1])     // tulostuu -1

t.forEach(value => {
  console.log(value)  // tulostuu 1, -1, 3, 5 omille riveilleen
})       