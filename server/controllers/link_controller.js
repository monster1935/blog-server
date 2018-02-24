// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 友情链接的相关控制

import Link from '../models/link';
// 添加友链
export async function addLink(ctx) {
    const name = ctx.request.body.name;
    const link = ctx.request.body.link;
    const info = ctx.request.body.info;
    const createTime = new Date();
    const linkModel = new Link({
        name,
        link,
        info,
        createTime,
    });

    let addRes = await linkModel.save().catch(err => {
        ctx.throw(500, 'Internal Error');
    });

    ctx.body = {
        resCode: 100,
        resDesc: '成功',
        dataList: [],
        data: addRes,
    };
};

// 获取友链列表
export async function getLinkList (ctx) {
    // 以友链名进行模糊查询
    const name = ctx.request.body.name;
    if (name) {
        let getRes = await Link.find({name:name},function (err, result) {
            ctx.body = {
                resCode: 100,
                resDesc: '成功',
                dataList: result,
                data: {}
            };
        }).catch(err => {
            ctx.throw(500, 'internal error');
        });
    } else {
        let getRes = await Link.find({},function (err, result) {
            ctx.body = {
                resCode: 100,
                resDesc: '成功',
                dataList: result,
                data: {}
            };
        }).catch(err => {
            ctx.throw(500, 'internal error');
        });
    }
};

// 删除友链
export async function delLink (ctx) {
    const id = ctx.request.body.id;
    if (id) {
        const link = await Link.findByIdAndRemove(id).catch(err => {
            if (err.name === 'CastError') {
                ctx.throw(400, 'id不存在');
            } else {
                ctx.throw(500, '服务器内部错误');
            }
        });
        ctx.body = {
            resCode: 100,
            resDesc: '成功',
            dataList: link,
            data: {}
        };
    }
};


// 更新友链
export async function editLink (ctx) {
    const id = ctx.request.body._id;

    if (id) {
        const link = await Link.findByIdAndUpdate(id, { $set: ctx.request.body}).catch(err => {
            if (err.name === 'CastError') {
                ctx.throw(400, 'id不存在');
            } else {
                ctx.throw(500, '服务器内部错误');
            }
        });
        ctx.body = {
            resCode: 100,
            resDesc: '成功',
            dataList: link,
            data: {}
        };
    }
};
