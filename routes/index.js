var express = require('express');
var router = express.Router();
const md5 = require('md5');
const models = require('../db/models');
const UserModel = models.getModel('user');
const BillModel = models.getModel('bill');
const PeriodModel = models.getModel('period');
const api = require('../api');

const billList = [
  {
    date: "2020/1/1",
    type: "スーパー",
    income: "0",
    spend: "1500",
    memo: "業務スーパー"
  },
  {
    date: "2020/1/1",
    type: "給与",
    income: "150000",
    spend: "0",
    memo: "ボーナス"
  }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res){
  UserModel.findOne({name: req.body.name}, function(err, user){
    if (user) {
      if (user.pwd !== md5(req.body.pwd)) {
        res.send({code: 1, msg: 'ユーザ名またはパスワードが不正です。'})
      } else {
        req.session.userid = user._id
        res.send({code: 0, data: {_id: user._id, name: user.name}})
      }
    } else {
      const userModel = new UserModel({name: req.body.name, pwd: md5(req.body.pwd)});
      userModel.save(function(err, user) {
        req.session.userid = user._id;
        const data = {_id: user._id, name: user.name};
        res.send({code: 0, data});
      });
    }
  });
})

router.get('/userinfo', function(req, res){
  const userid = req.session.userid;
  UserModel.findOne({_id: userid}, function(err, user){
    if(!user) {
      delete req.session.userid;
      res.send({code: 1, msg: 'ログインしてください。'});
    } else {
      res.send({code: 0, data: user});
    }
  })
});

router.post('/saveBill', function(req, res){
  const {_id, date, type, spend, income, memo} = req.body;
  const billModel = new BillModel({_id, date, type, spend, income, memo});
  if (req.body._id) {
    billModel.update({_id}, function(err, bill) {
      res.send({code: 0, bill});
    });
  } else {
    const billModel = new BillModel({date, type, spend, income, memo});
    billModel.save(function(err, bill) {
        res.send({code: 0});
    });
  }
})

router.get('/billList', function(req, res){
  BillModel.find(function(err, billList) {
    res.send(billList);
  });
});

module.exports = router;
