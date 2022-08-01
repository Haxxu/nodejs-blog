const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
        _id: { type: Number },
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        slug: { type: String },
        videoId: { type: String },
        level: { type: String },
        slug: { type: String, slug: 'name', unique: true },
        deletedAt: { type: Date },
    },
    { 
        _id: false,
        timestamps: true 
    }
);

mongoose.plugin(slug); // Cach 1 de them plugin 

CourseSchema.plugin(AutoIncrement);

CourseSchema.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all' 
}) // Cach 2 de them plugin phải đặt sau khi đã tạo ra schema

module.exports = mongoose.model('Course', CourseSchema);
