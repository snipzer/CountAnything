import CounterSetHandler from '../utils/handler/CounterSetHandler';

const counterSet = new CounterSetHandler();

export default class CounterSetController
{
    constructor()
    {

    }

    getCounterSets(req, res)
    {
        counterSet.getCounterSets()
            .then(result => res.json(result))
            .catch(err => res.json(err));
    }

    getCounterSet(req, res)
    {
        counterSet.getCounterSet(req.params.counterSetId)
            .then(result => res.json(result))
            .catch(err => res.json(err));
    }

    postCounterSet(req, res)
    {
        counterSet.postCounterSet(req.body.label)
            .then(result => res.json(result))
            .catch(err => {
                console.log(err);
                res.json(err)
            });
    }

    putCounterSet(req, res)
    {
        counterSet.putCounterSet(req.body.id, req.body.label)
            .then(result => res.json(result))
            .catch(err => res.json(err));
    }

    killCounterSet(req, res)
    {
        counterSet.killCounterSet(req.body.id)
            .then(result => res.json(result))
            .catch(err => res.json(err));
    }

    killCounterFromCounterSet(req, res)
    {
        counterSet.killCounterFromCounterSet(req.body.counterSetId, req.body.counterId)
            .then(result => res.json(result))
            .catch(err => res.json(err));
    }

    addCounter(req, res)
    {
        counterSet.addCounter(req.body.id)
            .then(result => res.json(result))
            .catch(err => res.json(err));
    }
}