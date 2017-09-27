import Counter from '../models/CounterModel';
import _ from "underscore";


export default class CounterHandler
{
    constructor()
    {
        this.Counter = Counter;
    }

    getCounters()
    {
        return new Promise((resolve, reject) =>
        {
            this.Counter.find({})
                .then(Counter => resolve(Counter))
                .catch(err => reject(err));
        });
    }

    getCounter(id)
    {
        return new Promise((resolve, reject) =>
        {
            this.Counter.findOne({"_id": id})
                .then(counter => resolve(counter))
                .catch(err => reject(err));
        })
    }

    killCounter(id)
    {
        return new Promise((resolve, reject) =>
        {
            this.getCounter(id).then(counter =>
            {
                /**
                 * TODO: Si date.now() - counter.date <= 5 minute alors on supprime
                 */
                counter.remove({'_id': id})
                    .then(result => resolve(result))
                    .catch(err => reject(err));
            }).catch(err => reject(err));
        });
    }
}
