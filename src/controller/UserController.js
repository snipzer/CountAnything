import UserHandler from '../utils/handler/UserHandler';

const userHandler = new UserHandler();

export default class UserController
{
    constructor()
    {

    }

    getUsers(req, res)
    {
        userHandler.getUsers()
            .then(result => res.json(result))
            .catch(err => res.json(err));
    }

    getUser(req, res)
    {
        userHandler.getUser(req.body.id)
                   .then(result => res.json(result))
                   .catch(err => res.json(err));
    }

    postUser(req, res)
    {
        userHandler.postUser(req.body.surname)
            .then(result => res.json(result))
            .catch(err => res.json(err));
    }

    putUser(req, res)
    {
        userHandler.putUser(req.body.id, req.body.surname)
            .then(result => res.json(result))
            .catch(err => res.json(err));
    }

    killUser(req, res)
    {
        userHandler.killUser(req.body.id)
            .then(result => res.json(result))
            .catch(err => res.json(err));
    }

    addCounterSet(req, res)
    {
        userHandler.addCounterSet(req.body.id, req.body.label)
            .then(result => res.json(result))
            .catch(err => res.json(err));
    }

    killCounterSet(req, res)
    {
        userHandler.killCounterSet(req.body.userId, req.body.counterSetId)
            .then(result => res.json(result))
            .catch(err => res.json(err))
    }

    addCounterSetToFav(req, res)
    {
        userHandler.addCounterSetToFav(req.body.userId, req.body.counterSetId)
            .then(result => res.json(result))
            .catch(err => res.json(err));
    }

    removeCounterSetFromFav(req, res)
    {
        userHandler.removeCounterSetFromFav(req.body.userId, req.body.counterSetId)
            .then(result => res.json(result))
            .catch(err => res.json(err));
    }
}