// import container from './config/index';
// import TYPES from './types/index';
// import {Classroom} from './interface/index';
//
// const classroom = container.get<Classroom>(TYPES.Classroom);
// console.log(classroom.study());

import {context} from "inversify-koa-utils/dts/decorators";
import {Context} from "koa";

const Koa = require('koa');
const {join, path} = require('path');
const {historyApiFallback} = require('koa2-connect-history-api-fallback');
const serve = require('koa-static');
const render = require('koa-swig');
const co = require('co');
const Router = require('koa-router');
const router = new Router();
const app = new Koa();

let config = {
    viewDir: join(__dirname, "../../dist", "views"),
    staticDir: join(__dirname, "../../dist", "assets"),
    port: 8081
};

app.context.render = co.wrap(
    render({
        root: config.viewDir,
        autoescape: true,
        cache: 'memory', // disable, set to false
        ext: 'html',
        writeBody: false
    })
);


router.get('/',async (ctx:Context)=>{
    ctx.body = await ctx.render("index");
})

app.use(historyApiFallback({index: "/", whiteList: ["/api"]}));
app.use(router.routes());
app.use(serve(config.staticDir)); // 静态资源文件


app.listen(config.port, () => {
    console.log("🍺🍺🍺🍺🍺");
});
