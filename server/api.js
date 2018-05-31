// 可能是我的node版本问题，不用严格模式使用ES6语法会报错
'use strict'
const fs = require('fs')
// const path = require('path')
var formidable = require('formidable')
const models = require('./db')
const express = require('express')
const router = express.Router()

/** ************ 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建账号接口
router.post('/api/user/register', (req, res) => {
  // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
  models.Login.find({ account: req.body.account }, (err, data) => {
    if (err) {
      console.log(err)
      //   // res.send(err);
      //   let newAccount = new models.Login({
      //     account: req.body.account,
      //     password: req.body.password,
      //     img: 'https://user-gold-cdn.xitu.io/2018/5/3/163263e90accd260?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1'
      //   })
      //   // 保存数据newAccount数据进mongoDB
      //   newAccount.save((err, data) => {
      //     if (err) {
      //       res.send({'status': 1001, 'message': '注册失败!', 'data': err})
      //     } else {
      //       res.send({'status': 1000, 'message': '注册成功!'})
      //     }
      //   })
    } else {
      console.log(data)
      if (data.length > 0) {
        res.send({ status: 1001, message: '帐号已存在!' })
      } else {
        let newAccount = new models.Login({
          account: req.body.account,
          password: req.body.password,
          img: '1'
        })
        // 保存数据newAccount数据进mongoDB
        newAccount.save((err, data) => {
          if (err) {
            res.send({ status: 1001, message: '注册失败!', data: err })
          } else {
            res.send({ status: 1000, message: '注册成功!' })
          }
        })
      }
    }
  })

  // let newAccount = new models.Login({
  //     account : req.body.account,
  //     password : req.body.password
  // });
  // // 保存数据newAccount数据进mongoDB
  // newAccount.save((err,data) => {
  //     if (err) {
  //         res.send(err);
  //     } else {
  //         res.send({'status': 1000, 'message': 'Register successfully!'});
  //     }
  // });
})
// 获取已有账号接口
router.post('/api/user/login', (req, res) => {
  // 通过模型去查找数据库
  models.Login.find(
    { account: req.body.account },
    (err, data) => {
      if (err) {
        // res.send(err);
        res.send({ status: 1001, message: '用户不存在!', data: err })
      } else {
        // console.log(data)
        if (data.length > 0) {
          if (data[0].password === req.body.password) {
            res.send({ status: 1000, message: '登录成功!', data: data })
          } else {
            res.send({ status: 1001, message: '密码错误!', data: err })
          }
        } else {
          res.send({ status: 1001, message: '用户不存在!', data: err })
        }
      }
    }
  )
})
// 获取所有账号接口
router.get('/api/user/all', (req, res) => {
  // 通过模型去查找数据库
  models.Login.find((err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

router.post('/api/user', (req, res) => {
//   console.log(req.body)
  models.Login.find(
    { account: req.body.account },
    { _id: 0, __v: 0 },
    (err, data) => {
      if (err) {
      } else {
        res.send(data)
      }
    }
  )
})

router.post('/api/user/avatar', (req, res) => {
  var form = new formidable.IncomingForm()
  var url = __dirname
  form.uploadDir = url + '/..//src//assets'
  //  form.uploadDir = path.resolve(__dirname, '/../', '/avatar')
  form.parse(req, function (err, fields, files) {
    var oldname = files.tou.path
    var newname = url + '/..//src//assets/' + fields.account + '.jpg'
    if (err) {

    } else {
      console.log(fields.account)
      models.Login.update(
        { account: fields.account },
        { $set: { img: fields.account } },
        (err, data) => {
          if (err) {
          }
        }
      )
      models.Shuo.update(
        { account: fields.account },
        { $set: { img: fields.account } },
        { multi: true },
        (err, data) => {
          if (err) {
          }
        }
      )
      fs.rename(oldname, newname, function (err) {
        if (err) {

        } else {
          res.send('修改成功')
        }
      })
    }
  })
})
router.post('/api/user/all', (req, res) => {
//   console.log(req.body)
  models.Shuo.find(
    {},
    { _id: 0, __v: 0 },
    { sort: { date: -1 } },
    (err, data) => {
      if (err) {
      } else {
        //   res.send(data.sort({date: -1}))
        res.send(data)
      }
    }
  )
})
router.post('/api/user/shuo', (req, res) => {
  //   console.log(req.body)
  let newShuo = new models.Shuo({
    account: req.body.account,
    txt: req.body.txt,
    img: req.body.img,
    date: new Date()
  })
  newShuo.save((err, data) => {
    if (err) {
      res.send('失败')
    } else {
      res.send('发表成功')
    }
  })
})

router.post('/api/user/delete', (req, res) => {
  //   console.log(req.body)
  models.Shuo.find(
    { account: req.body.account, txt: req.body.txt },
    (err, data) => {
      if (err) {
      } else {
        models.Shuo.remove(
          { account: req.body.account, txt: req.body.txt },
          (err, data) => {
            if (err) {
            } else {
              res.send('删除成功')
            }
          }
        )
      }
    }
  )
})
module.exports = router
