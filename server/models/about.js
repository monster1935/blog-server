// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 关于信息 model

import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const aboutSchema = new Schema({
  content: String,
  createTime: Date,
  lastEditTime: Date,
}, { versionKey: false });

export default mongoose.model('about', aboutSchema);
