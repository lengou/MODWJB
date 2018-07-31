const { addEmp ,getFoods,delet,xiugai } = require("../../dao/data/goods/goods.js")

module.exports.addEmp = async movie => {
  return await addEmp(movie)
}

module.exports.getFoods = async movie => {
    return await getFoods(movie)
  }

  module.exports.delet = async movie => {
    return await delet(movie)
  }

  module.exports.xiugai = async xiugai1 => {
    return await xiugai(xiugai1)
  }