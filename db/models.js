const mngoose = require('mongoose');
mngoose.connect('mongodb://localhost:27017/myApp');
const conn = mngoose.connection.on('connected', function(){
  console.log('DB connected!');
})

const userSchema = new mngoose.Schema({
  name: {type: String},
  pwd: {type: String},
  // registerUser: {type: String},
  // registerDate: {type: Date},
  // updateUser: {type: String},
  // updateDate: {type: Date}
})
UserModel = mngoose.model('user', userSchema);

const billSchema = new mngoose.Schema({
  date: {type: Date},
  type: {type: String},
  income: {type: Number},
  spend: {type: Number},
  memo: {type: String},
  registerUser: {type: String},
  registerDate: {type: Date},
  updateUser: {type: String},
  updateDate: {type: Date}
});
UserModel = mngoose.model('bill', billSchema);

const periodSchema = new mngoose.Schema({
  date: {type: Date},
  memo: {type: String},
  registerUser: {type: String},
  registerDate: {type: Date},
  updateUser: {type: String},
  updateDate: {type: Date}
});
UserModel = mngoose.model('period', periodSchema);

module.exports = {getModel(name) {
  return mngoose.model(name);
}};