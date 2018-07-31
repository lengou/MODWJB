var express = require('express');
var router = express.Router();

const {addEmp,getFoods,delet,xiugai }=require("../service/goods/goodsService.js")


router.post('/xiugai', async function (req, res, next) {
 res.send(await xiugai(req.body))
});
// 添加
router.post('/addEmp', async function (req, res, next) {
    //  console.log(req.body)
    res.send(await addEmp(req.body))
  });

  // 删除
  router.post('/delet', async function (req, res, next) {
    // console.log(req.body)
    res.send(await delet(req.body))
  });

  // 查询
  router.post('/getFoods', async function (req, res, next) {
    res.send(await getFoods(req.body))
  });

  module.exports = router;