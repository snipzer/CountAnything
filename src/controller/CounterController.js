import CounterHandler from '../utils/handler/CounterHandler';

const counter = new CounterHandler();

export default class CounterController
{
    constructor()
    {

    }

    getCounters(req, res)
    {
        counter.getCounters()
               .then(result => res.json(result))
               .catch(err => res.json(err));
    }

    getCounter(req, res)
    {
        counter.getCounter(req.params.idCounter)
               .then(result => res.json(result))
               .catch(err => res.json(err));
    }

    getCounterFromCounterSet(req, res)
    {
        counter.getCounterFromCounterSet(req.body.counterSetId)
               .then(counters => res.json(counters))
               .catch(err => res.json(err));
    }

    killCounter(req, res)
    {
        counter.killCounter(req.body.id)
               .then(result => res.json(result))
               .catch(err => res.json(err));
    }
}