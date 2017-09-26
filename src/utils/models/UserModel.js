import mongoose from 'mongoose';
import CounterSetModel from './CounterSetModel';
import Comment from './CommentModel';


mongoose.Promise = global.Promise;

const User = new mongoose.Schema({
    surname: { type: String, unique: true },
    favoriteCounterSets: [{type: mongoose.Schema.ObjectId, ref: CounterSetModel}],
    counterSets: [{type: mongoose.Schema.ObjectId, ref: CounterSetModel}],
    comments: [{type: mongoose.Schema.ObjectId, ref: Comment}],
});

module.exports = mongoose.model('UserModel', User);