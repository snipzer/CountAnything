import CounterSetModel from '../models/CounterSetModel';
import Counter from '../models/CounterModel';
import _ from "underscore";


export default class CounterSetHandler
{
    constructor()
    {
        this.CounterSetModel = CounterSetModel;
        this.Counter = Counter;
    }

    getCounterSets()
    {
        return new Promise((resolve, reject) =>
        {
            this.CounterSetModel.find({})
                .then(CounterSet => resolve(CounterSet))
                .catch(err => reject(err));
        });
    }

    getCounterSet(id)
    {
        return new Promise((resolve, reject) =>
        {
            this.CounterSetModel.findOne({"_id": id})
                .then(counterSet => resolve(counterSet))
                .catch(err => reject(err));
        })
    }

    postCounterSet(label)
    {
        return new Promise((resolve, reject) =>
        {
            this.CounterSetModel.create(
                {
                    label: label,
                    creationDate: Date.now(),
                    lastUpdated: Date.now(),
                    counters: []

                }).then(result => resolve(result))
                .catch(err => reject(err))
        })
    }

    putCounterSet(id, label)
    {
        return new Promise((resolve, reject) =>
        {
            this.getCounterSet(id).then(CounterSet =>
            {
                if (!_.isNull(label))
                    CounterSet.label = label;

                CounterSet.save();
                resolve(CounterSet);
            }).catch(e => reject(e));
        })
    }

    killCounterSet(id)
    {
        return new Promise((resolve, reject) =>
        {
            this.CounterSetModel.findOne({"_id": id}, (err, counterSet) =>
            {
                counterSet.remove()
                    .then(obj => resolve(obj))
                    .catch(err => reject(err));
            });
        });
    }

    addCounter(id)
    {
        return new Promise((resolve, reject) =>
        {
            this.getCounterSet(id)
                .then(counterSet =>
                {
                    this.Counter.create({
                        date: Date.now()
                    }).then(counter =>
                        {
                            counterSet.counters.push(counter);
                            counterSet.save();
                            resolve(counterSet);
                        }).catch(err => reject(err));
                }).catch(err => reject(err));
        })
    }
}