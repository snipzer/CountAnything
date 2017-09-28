import mongoose from 'mongoose'
import CounterSet from './CounterSetModel';

mongoose.Promise = global.Promise;

const Counter = new mongoose.Schema({
    date: { type: Date, default: Date.now() },
    counterSet: { type: mongoose.Schema.ObjectId, soft_delete_action: null, ref: CounterSet }
});

module.exports = mongoose.model('CounterModel', Counter);