import mongoose from 'mongoose';
import Counter from './CounterModel';

mongoose.Promise = global.Promise;

const CounterSet = new mongoose.Schema({
    label: { type: String },
    creationDate: { type: Date, default: Date.now() },
    lastUpdated: { type: Date, default: Date.now() },
    counters: [{ type: mongoose.Schema.ObjectId, soft_delete_action: null, ref: Counter }],
});

CounterSet.pre('remove', function(next)
{
    this.counters.forEach(counterId =>
    {
        Counter.remove({_id : counterId}).exec();
    });
    next();
});

module.exports = mongoose.model('CounterSetModel', CounterSet);