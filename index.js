const koa = require('koa');
const Jade = require('koa-jade');
const app = koa();
const mongoose = require('mongoose');
const body = require('koa-better-body');
const config = require('./server/config');
const package = require('./package');

const router = require('koa-router')();

const jade = new Jade({
  viewPath: './views',
  locals: {
    NODE_ENV: process.env.NODE_ENV,
    VERSION: package.version
  }
});

const User = require('./server/model/user');

mongoose.connect(config['mongodb.url']);
const db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('mongodb connected successfully!');
});

jade.use(app);

router
  .get('/', function *(){
    const path = this.path;
    this.render('index', {name: `小菇凉 当前路径:${path}`});
  })
  .get('/login', function *(){
    const user = yield User.findOne({
      username: this.query.username,
      password: this.query.password
    });
    if (user === null) {
      this.throw('没有找到该用户', 400);
    } else {
      this.body = user;
    }
  })
  .post('/register', body(), function *(){
    const reqFields = this.request.fields;
    const newUser = new User({
      username: reqFields.username,
      password: reqFields.password
    });
    try {
      this.body = yield newUser.save();
    } catch (err) {
      if (err.name === 'ValidationError') {
        this.throw('账号或密码录入有误', 400);
      } else {
        this.throw(err);
      }
    }
  })

app
  .use(function *(next){
    try {
      yield next;
    } catch (err) {
      this.status = err.status || 500;
      const res = {
        errMsg: this.status === 500 ? '服务器内部错误' : err.message,
      };
      if (this.status === 500 && process.env.NODE_ENV !== 'production') {
        res.errStack = err.stack;
      }
      this.body = res;
      this.app.emit('error', err, this);
    }
  })
  .use(router.routes())
  .use(router.allowedMethods())
  .use(function *(){
    this.status = 404;
    this.body = {errMsg: '404 Not Found.'};
  })
  .on('error', function(err, ctx){
    console.log('服务器内部出错', err.stack);
  })
  .listen(process.env.PORT || 3000);