var koa = require('koa');
var app = koa();

app.use(function *(){
  var path = this.path;
  this.body = `卖零食的小姑凉 ${path}`;
});

app.listen(process.env.PORT || 3000);