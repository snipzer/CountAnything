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
        if(typeof id === "string" && id.length === 24)
        {
            return new Promise((resolve, reject) =>
            {
                this.Counter.findOne({"_id": id})
                    .then(counter => resolve(counter))
                    .catch(err => reject(err));
            })
        }
        else
        {
            return false;
        }

    }
}
