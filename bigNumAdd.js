function bigNumAdd(num1, num2) {
  const numLooper = (num1.length > num2.length) ? num1 : num2
  const result = []
  let otherNums = (num1.length > num2.length) ? num2 : num1

  otherNums = otherNums.split('').reverse().map(Number)

  numLooper.split('')
    .map(Number)
    .reverse()
    .forEach((cha, index) => {
      if (!otherNums[index]) {
        otherNums[index] = 0
      }

      let added = cha + otherNums[index]

      if (added > 10) {
        added -= 10
        numLooper[index + 1] += 1
      }

      result[index] = added
    })

  return result.reverse().join('')
}

bigNumAdd('1231231313123131231313', '12312313131231312313132')