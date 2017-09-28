import CounterSetModel from '../models/CounterSetModel';
import Counter from '../models/CounterModel';
import _ from "underscore";


export default class CounterSetHandler
{
    constructor()
    {
        this.CounterSetModel = CounterSetModel;
        this.CounterModel = Counter;
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
                let counterDeletion = new Promise((resolve, reject) =>
                {
                    let messages = {
                        deleted: [],
                        errors: []
                    };

                    counterSet.counters.forEach((counterId) =>
                    {
                        this.CounterModel.remove({_id: counterId})
                            .then(() =>
                            {
                                let deleted = "Confirmation de suppression de : " + counterId;
                                messages.deleted.push(deleted);
                            })
                            .catch(() =>
                            {
                                let error = "Problème lors de la suppression de : " + counterId;
                                messages.errors.push(error);
                            });
                    });

                    resolve(messages.deleted);
                    reject(messages.errors);
                });

                resolve(counterDeletion);
                reject(counterDeletion);

                // counterSet.remove()
                //     .then(obj => resolve(obj))
                //     .catch(err => reject(err));
            });
        });
    }

    killCounterFromCounterSet(counterSetId, counterId)
    {
        return new Promise((resolve, reject) =>
        {
            this.getCounterSet(counterSetId)
                .then(counterSet =>
                {
                    this.CounterModel.findOne({_id: counterId})
                        .then(counter =>
                        {
                            let counterDateInSecond = counter.date.getTime() / 1000;
                            let now = new Date();
                            let nowInSecond = now.getTime() / 1000;

                            let diff = Math.abs(counterDateInSecond - nowInSecond);

                            if (diff <= 15)
                            {
                                counter.remove()
                                    .then(result =>
                                    {
                                        let index = counterSet.counters.indexOf(counterId);

                                        counterSet.counters.splice(index, 1);
                                        counterSet.save();

                                        resolve(result)
                                    }).catch(err => reject(err))
                            }
                            else
                            {
                                resolve("Error, you only have 5 second to change your mind");
                            }
                        }).catch(err => reject(err));
                }).catch(err => reject(err));
        });
    }

    addCounter(id)
    {
        return new Promise((resolve, reject) =>
        {
            this.getCounterSet(id)
                .then(counterSet =>
                {
                    this.CounterModel.create({
                        date: Date.now(),
                        counterSet: id
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