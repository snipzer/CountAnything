import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const Counter = new mongoose.Schema({
    date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('CounterModel', Counter);