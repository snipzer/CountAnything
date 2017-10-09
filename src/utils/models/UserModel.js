import mongoose from 'mongoose';
import CounterSetModel from './CounterSetModel';
import Comment from './CommentModel';


mongoose.Promise = global.Promise;

const User = new mongoose.Schema({
    surname: { type: String, unique: true },
    favoriteCounterSets: {
        type: [{type: mongoose.Schema.ObjectId, soft_delete_action: null, ref: CounterSetModel}],
        validate: [arrayLimit, '{PATH} exceeds the limit of 5']
    },
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

function arrayLimit(val) {
    return val.length <= 5;
}

module.exports = mongoose.model('UserModel', User);