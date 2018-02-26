// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 关于信息 控制器
import About from '../models/about';

// 获取关于信息
export async function aboutInfo(ctx) {
    let getRes = await About.find({},function (err, result) {
        ctx.body = {
            resCode: 100,
            resDesc: '成功',
            dataList: result,
            data: {}
        };
    }).catch(err => {
        ctx.throw(500, 'internal error');
    });

};

// 添加关于信息
export async function addAbout(ctx) {
    const content = ctx.request.body.content;
    const createTime = new Date();
    const lastEditTime = new Date();
    const about = new About({
        content,
        createTime,
    });
    let addRes = await about.save().catch(err => {
        ctx.throw(500, 'Internal Error');
    });

    ctx.body = {
        resCode: 100,
        resDesc: '成功',
        dataList: [],
        data: addRes,
    };
};

// 更新关于信息
export async function updateAbout (ctx) {
    const id = ctx.request.body.id;
    if (id) {
        const about = await About.findByIdAndUpdate(id, { $set: ctx.request.body}).catch(err => {
            if (err.name === 'CastError') {
                ctx.throw(400, 'id不存在');
            } else {
                ctx.throw(500, '服务器内部错误');
            }
        });
        ctx.body = {
            resCode: 100,
            resDesc: '成功',
            dataList: about,
            data: {}
        };
    }
};
