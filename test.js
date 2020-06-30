const str = "mongoose client youtube"
const tempArray = str.split(" ")
console.log(tempArray[tempArray.length - 1])
const newArray = tempArray.filter((element) => {
  return element !== "youtube"
})
const newStr = newArray.join(" ")
console.log(newArray)
console.log(newStr)
