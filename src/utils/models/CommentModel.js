import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const Comment = new mongoose.Schema({
    body: { type: String },
    dateDeb: { type: Date, default: Date.now() },
    dateFin: { type: Date, default: Date.now() },
});

module.export = mongoose.model('CommentModel', Comment);