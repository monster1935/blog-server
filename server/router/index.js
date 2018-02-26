import Router from 'koa-router';
import * as $ from '../controllers/users_controller';
import * as article from '../controllers/article_controller';
import * as link from '../controllers/link_controller';
import * as about from '../controllers/about_controller';
import verify from '../middleware/verify.js';

let v1 = new Router();

v1.post('/users', verify, $.getUserList);
v1.post('/addUser', verify, $.addUser);
v1.post('/delUser', verify, $.delUser);
v1.post('/editUser', verify, $.editUser);
v1.post('/login', $.login);



let v2 = new Router();
// 友链
v2.post('/links', link.getLinkList);
v2.post('/addLink', link.addLink);
v2.post('/delLink', link.delLink);
v2.post('/editLink', link.editLink);

// 文章
v2.post('/addArticle', verify, article.addArticle);
v2.post('/articles', article.getIndexList);
v2.post('/articleList', article.getAllArticles);
v2.post('/articleInfo', article.getArticleInfo);
v2.post('/delArticle', verify, article.delArticle);
v2.post('/updateArticle',verify, article.updateArticle);

// 关于信息
v2.post('/aboutInfo', about.aboutInfo);
v2.post('/addAbout', about.addAbout);
v2.post('/updateAbout', about.updateAbout);

// 装载所有子路由
let router = new Router()
router.use('/v1', v1.routes(), v1.allowedMethods());
router.use('/v2', v2.routes(), v2.allowedMethods());

export default router;
