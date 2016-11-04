const koa = require('koa');
const Jade = require('koa-jade');
const route = require('koa-route');
const app = koa();
const jade = new Jade({
  viewPath: './src/views'
});

jade.use(app);

app.use(route.get('/', function *(){
  const path = this.path;
  this.render('index', {name: `小菇凉 ${path}`});
}));

app.use(function *(){
  this.body = '404 Not Found.';
});

app.listen(process.env.PORT || 3000);