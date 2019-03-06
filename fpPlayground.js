let getObjAttr = (obj, describer) => {
  return describer.split('.').reduce((acc, cur) => acc[cur], obj)
}

let deepAttr = { a: { b: { c: 15 } } };

getObjAttr(deepAttr, 'a.b.c')

let filterByGender = (arr) => {
  const maleArr = arr.filter(item => item.sex === 'male')
  const femaleArr = arr.filter(item => item.sex === 'female')
  return [maleArr, femaleArr]
}
let users = [
  { name: "Adam", age: 30, sex: "male" },
  { name: "Helen", age: 27, sex: "female" },
  { name: "Amy", age: 25, sex: "female" },
  { name: "Anthony", age: 23, sex: "male" },
];
filterByGender(users)

let loopAdd = (arr1, arr2) => {
  arr1.forEach((num, index) => {
    arr2[index] += num
  })
  return arr2
}

let recuseAdd = (fn, arr1, arr2) => {
  if (!arr1.length || !arr2.length) return []

  let [xHead, ...xTail] = arr1
  let [yHead, ...yTail] = arr2

  return [fn(xHead, yHead), ...recuseAdd(fn, xTail, yTail)]
}
