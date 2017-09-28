import mongoose from 'mongoose';
import CounterSetModel from './CounterSetModel';
import Comment from './CommentModel';


mongoose.Promise = global.Promise;

const User = new mongoose.Schema({
    surname: { type: String, unique: true },
    favoriteCounterSets: [{type: mongoose.Schema.ObjectId, soft_delete_action: null, ref: CounterSetModel}],
    counterSets: [{type: mongoose.Schema.ObjectId, soft_delete_action: null, ref: CounterSetModel}],
    comments: [{type: mongoose.Schema.ObjectId, soft_delete_action: null, ref: Comment}],
});

User.pre('remove', next =>
{
    this.counterSets.forEach(counterSetId =>
    {
        CounterSetModel.remove({ _id: counterSetId }).exec();
    });

    next();
});

module.exports = mongoose.model('UserModel', User);