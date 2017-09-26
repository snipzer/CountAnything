import UserModel from '../models/UserModel';
import CounterSetModel from '../models/CounterSetModel';
import _ from "underscore";


export default class UserHandler
{
    constructor()
    {
        this.UserModel = UserModel;
        this.CounterSetModel = CounterSetModel;
    }

    getUsers()
    {
        return new Promise((resolve, reject) =>
        {
            this.UserModel.find({})
                .then(users => resolve(users))
                .catch(err => reject(err));
        });
    }

    getUser(id)
    {
        return new Promise((resolve, reject) =>
        {
            this.UserModel.findOne({"_id": id})
                .then(user => resolve(user))
                .catch(err => reject(err));
        })
    }

    postUser(surname)
    {
        return new Promise((resolve, reject) =>
        {
            this.UserModel.create(
                {
                    surname: surname,
                    favoriteCounterSets: [],
                    counterSets: [],
                    comments: []

                }).then(result => resolve(result))
                .catch(err => reject(err))
        })
    }

    putUser(id, surname)
    {
        return new Promise((resolve, reject) =>
        {
            this.getUser(id).then(User =>
            {
                if (!_.isNull(surname))
                    User.surname = surname;

                User.save();
                resolve(User);
            }).catch(e => reject(e));
        })
    }

    killUser(id)
    {
        return new Promise((resolve, reject) =>
        {
            this.UserModel.remove({'_id': id})
                .then(result => resolve(result))
                .catch(err => reject(err));
        });
    }

    addCounterSet(id, label)
    {
        return new Promise((resolve, reject) =>
        {
            this.getUser(id).then((user) =>
            {
                this.CounterSetModel.create({
                    label: label,
                }).then(counterSet =>
                {
                    user.counterSets.push(counterSet);
                    user.save();
                    resolve(user);

                }).catch(err => reject(err))
            }).catch(err => reject(err));
        });
    }

    //
    // addComment(id, comments)
    // {
    //     return new Promise((resolve, reject) =>
    //     {
    //         this.getUser(id).then(user =>
    //         {
    //             user.comments.push(comments);
    //             user.save();
    //             resolve(user);
    //         }).catch(err => reject(err));
    //     });
    // }
    //
    // removeComment()
    // {
    //     // TODO: Remove comment from user process
    // }
    //
    // removeCounter()
    // {
    //     // TODO: Remove counter from user process
    // }
}