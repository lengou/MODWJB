const mongoose = require("mongoose")
const {unlink}  = require("fs")


module.exports.addEmp = async (shangpinguanli) => {
  const {userId,mendianId } = shangpinguanli
    const { _id:id_s } = await mongoose
      .model("shangpinguanli")
      .create(shangpinguanli)
      //门店和商品关联
      await mongoose
      .model("mendianguanli")
      .update({
          _id:mendianId
      },{
        $push: {
          shangpinguanliId: id_s
        } 
      })
//商品和门店关联
      await mongoose
      .model("shangpinguanli")
      .update({
          _id:id_s
      },{
        $push: {
          mendianguanliId: mendianId
        } 
      })

return true
      // await mongoose
      // .model("user")
      // .update({
      //   _id:userId
      // },{
      //   $push: {
      //     chognwuguanliId: id_cw
      //   } 
      // })  
  }


    // 删除
module.exports.delet = async ({id}) => {
      const data=await mongoose
      .model("shangpinguanli")
      .find({_id:id})
      await unlink("public"+data[0].foodsImg,()=>{})

     await mongoose
    .model("shangpinguanli")
    .remove({_id:id})
}

// 食品查询
  module.exports.getFoods = async (shangpinguanli) => {
  let rows = []
  const data = await mongoose
               .model('mendianguanli')
               .find(shangpinguanli)
               if(data[0].shangpinguanliId[0]){
                rows = await mongoose.model("shangpinguanli")
                .find({_id:data[0].shangpinguanliId})
               }
               
          const data1=await mongoose
            .model("shangpinguanli")
            .find()
              // console.log(rows)
      return data1
  }

  // 修改
  module.exports.amend = async (shangpinguanli) => {
     await mongoose
      .model("shangpinguanli")
      .find({_id:shangpinguanli.id})
      .update({
        goodsName:shangpinguanli.goodsName,
        goodsCanFor:shangpinguanli.goodsCanFor,
        goodsTaste:shangpinguanli.goodsTaste,
        goodsRegion:shangpinguanli.goodsRegion,
        goodsDate:shangpinguanli.goodsDate,
        goodsTime:shangpinguanli.goodsTime,
        goodsIntro:shangpinguanli.goodsIntro,
        goodsPrice:shangpinguanli.goodsPrice,
        foodsImg:shangpinguanli.foodsImg
      })
  }


