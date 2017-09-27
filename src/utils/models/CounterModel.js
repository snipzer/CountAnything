import mongoose from 'mongoose'
import CounterSet from './CounterSetModel';

mongoose.Promise = global.Promise;

const Counter = new mongoose.Schema({
    date: { type: Date, default: Date.now() },
    counterSet: { type: mongoose.Schema.ObjectId, soft_delete_action: null, ref: CounterSet }
});

// Counter.pre('remove', function(next)
// {
//     let value = this.counterSet;
//
//     console.log(value);
//
//     console.log(CounterSet);
//
//     try
//     {
//         CounterSet.findOne({ _id: value }).then(counterSet =>
//         {
//             console.log(counterSet);
//
//             let index = counterSet.counters.indexOf(value);
//
//             console.log(index);
//
//             counterSet.counters.splice(index, 1);
//
//             console.log(counterSet);
//
//             counterSet.save();
//         });
//     }
//     catch(e)
//     {
//         console.log(e);
//     }
//
//
//     next();
// });

module.exports = mongoose.model('CounterModel', Counter);