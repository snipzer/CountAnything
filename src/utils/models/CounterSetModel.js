import mongoose from 'mongoose';
import CounterModel from './CounterModel';
import UserModel from './UserModel';

mongoose.Promise = global.Promise;

const CounterSet = new mongoose.Schema({
    label: { type: String },
    creationDate: { type: Date, default: Date.now() },
    lastUpdated: { type: Date, default: Date.now() },
    counters: [{ type: mongoose.Schema.ObjectId, soft_delete_action: null, ref: CounterModel }],
    user: { type: mongoose.Schema.ObjectId, soft_delete_action: null, ref: UserModel }
});

CounterSet.pre('remove', next =>
{
    this.counters.forEach(counterId =>
    {
        CounterModel.remove({_id : counterId}).exec();
    });

    next();
});

module.exports = mongoose.model('CounterSetModel', CounterSet);