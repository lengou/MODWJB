const mongoose = require("mongoose")
module.exports.xiugai = async (xiugai_f) => {
  const { _id } = xiugai_f
   await mongoose
    .model("fuwuguanli")
    .find({_id})
    .update(xiugai_f)
    return true
}


//增加
module.exports.addEmp = async (fuwuguanli) => {
  const { mendianGliId  } = fuwuguanli
  let rows = []
    const { _id:funwuId } =
       await mongoose
      .model("fuwuguanli")
      .create(fuwuguanli)

  //和门店关联
  await mongoose.model("mendianguanli")
            // .find({_id:mendianGliId})
            .update( {
              _id:mendianGliId
            },{
              $push:{
                fuwuguanliId:funwuId
              }
            })
    await mongoose.model("fuwuguanli")
                  .update({
                    _id:funwuId
                  },{
                    mendianguanliId:mendianGliId
                  })

          return true
  }


  //查
  module.exports.getFoods = async (fuwuguanli) => {
    let row = []
    const { mendianId:funwuId,eachPage,curPage } = fuwuguanli
       const data = await mongoose
                 .model("mendianguanli")
                 .find({_id:funwuId})
                 const act = data[0]
                //  console.log(act)
                if(act.fuwuguanliId===undefined){
                  console.log("no")
                  return {
                    eachPage,curPage,count:0
                  }
                }else{
                  console.log("yes")
                   row = await mongoose
                  .model("fuwuguanli")
                  .find({_id:act.fuwuguanliId})
                  .skip((curPage-1) * eachPage)
                  .limit(eachPage)
                const count_i = await mongoose
                  .model("fuwuguanli")
                  .find({_id:act.fuwuguanliId})
                  const count = count_i.length
                  console.log(count)
                  let obj =  {row,curPage,eachPage,count}
                  return obj
                }
               
    // const data=await mongoose
    //   .model("fuwuguanli")
    //   .find(fuwuguanli)
  }

  // 删除
module.exports.delet = async ({_id}) => {
    return await mongoose
      .model("fuwuguanli")
      .remove({_id})
  }