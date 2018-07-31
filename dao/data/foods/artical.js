const mongoose = require("mongoose")
const {unlink}  = require("fs")

// 用品查询
  module.exports.getArtical = async (yongpinggl) => {

    let rows = []
    const data = await mongoose
                 .model('mendianguanli')
                 .find(yongpinggl)
                 if(data[0].yongpingglId[0]){
                  rows = await mongoose.model("yongpinggl")
                  .find({_id:data[0].yongpingglId})
                 }
                 
                const data1=await mongoose
                  .model("shangpinguanli")
                  .find()
                
        return data1
    
  }

  module.exports.articalAdd = async (yongpinggl) => {
    const {mendianId } = yongpinggl
    const { _id:id_s } = await mongoose
      .model("yongpinggl")
      .create(yongpinggl)
      //门店和商品关联
      await mongoose
      .model("mendianguanli")
      .update({
          _id:mendianId
      },{
        $push: {
          yongpingglId: id_s
        } 
      })
//商品和门店关联
      await mongoose
      .model("yongpinggl")
      .update({
          _id:id_s
      },{
        $push: {
          mendianguanliId: mendianId
        } 
      })
      return true
    //  return await mongoose
    //  .model("yongpinggl")
    //  .create(yongpinggl) 
  }

     // 删除
module.exports.articalDelet = async ({id}) => {
    // console.log(id)
    const data= await mongoose
      .model("yongpinggl")
      .find({
        _id:id
      })
    
  await unlink("public"+data[0].articalImg,()=>{})

   await mongoose
    .model("yongpinggl")
    .remove({_id:id})
}

// 修改
module.exports.articalAmend = async (yongpinggl) => {
   await mongoose
  .model("yongpinggl")
  .find({_id:yongpinggl.id})
  .update({
    articlesName:yongpinggl.articlesName,
        goodsMaterial:yongpinggl.goodsMaterial,
        goodsOnlyFor:yongpinggl.goodsOnlyFor,
        goodsSize:yongpinggl.goodsSize,
        articlesDate:yongpinggl.articlesDate,
        goodsSpecial:yongpinggl.goodsSpecial,
        goodsSupplier:yongpinggl.goodsSupplier,
        articlesPrice:yongpinggl.articlesPrice,
        articalImg:yongpinggl.articalImg,
  })
  
}
