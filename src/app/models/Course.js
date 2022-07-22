const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        slug: { type: String },
        videoId: { type: String },
        level: { type: String },
        slug: { type: String, slug: 'name', unique: true },
        deletedAt: { type: Date },
    },
    { timestamps: true }
);

mongoose.plugin(slug); // Cach 1 de them plugin 
Course.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all' 
}) // Cach 2 de them plugin phải đặt sau khi đã tạo ra schema

module.exports = mongoose.model('Course', Course);
