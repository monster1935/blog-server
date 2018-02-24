// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 友情链接model
import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const linkSchema = new Schema({
  name: String,
  link: String,
  info: String,
  createTime: String
}, { versionKey: false });

export default mongoose.model('link', linkSchema);
