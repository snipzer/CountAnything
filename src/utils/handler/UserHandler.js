import UserModel from '../models/UserModel';
import CounterSetModel from '../models/CounterSetModel';
import CounterModel from '../models/CounterModel';
import _ from "underscore";


export default class UserHandler
{
    constructor()
    {
        this.UserModel = UserModel;
        this.CounterSetModel = CounterSetModel;
        this.CounterModel = CounterModel;
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
            this.getUser(id)
                .then(user =>
                {
                    user.counterSets.forEach(counterSetId =>
                    {
                        this.CounterSetModel.findOne({"_id": counterSetId})
                            .then((counterSet) =>
                            {
                                new Promise((resolve, reject) =>
                                {
                                    try
                                    {
                                        counterSet.counters.forEach((counterId) =>
                                        {
                                            this.CounterModel.remove({_id: counterId}).exec();
                                        });

                                        resolve({message: "The counters has been deleted."});
                                    }
                                    catch (e)
                                    {
                                        reject(e);
                                    }
                                });

                                this.CounterSetModel.remove({_id: counterSetId})
                                    .then(() =>
                                    {
                                        this.UserModel.remove({_id: id})
                                            .then(userDeletion => resolve(userDeletion))
                                            .catch(err => reject(err));
                                    }).catch(err => reject(err))
                            });
                    });
                }).catch(err => reject(err));
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
                    user: user._id
                }).then(counterSet =>
                {
                    user.counterSets.push(counterSet);
                    user.save();
                    resolve(user);

                }).catch(err => reject(err))
            }).catch(err => reject(err));
        });
    }

    killCounterSet(userId, counterSetId)
    {
        return new Promise((resolve, reject) =>
        {
            this.getUser(userId)
                .then(user =>
                {
                    this.CounterSetModel.findOne({"_id": counterSetId})
                        .then((counterSet) =>
                        {
                            new Promise((resolve, reject) =>
                            {
                                counterSet.counters.forEach((counterId) =>
                                {
                                    this.CounterModel.remove({_id: counterId})
                                });

                                resolve();
                                reject();
                            });

                            this.CounterSetModel.remove({_id: counterSetId})
                                .then(result =>
                                {
                                    let index = user.counterSets.indexOf(counterSetId);

                                    user.counterSets.splice(index, 1);
                                    user.save();

                                    resolve(result)
                                }).catch(err => reject(err))
                        });
                }).catch(err => reject(err));
        });
    }

    addCounterSetToFav(userId, counterSetId)
    {
        return new Promise((resolve, reject) =>
        {
            this.getUser(userId)
                .then(user =>
                {
                    try
                    {
                        if(user.favoriteCounterSets.length <= 4)
                        {
                            let bool = false;
                            let index = user.favoriteCounterSets.indexOf(counterSetId);

                            if (index !== -1)
                                bool = true;

                            if(bool)
                            {
                                resolve({
                                    msg: "Error favorite already added",
                                    user: user,
                                    error: true
                                });
                            }
                            else
                            {
                                user.favoriteCounterSets.push(counterSetId);
                                user.save();

                                resolve(user);
                            }
                        }
                        else
                        {
                            /**
                             * Ici soit on change le premier
                             */
                            // user.favoriteCounterSets.splice(0, 1, counterSetId);
                            // user.save();

                            /**
                             * Soit on ne fait rien puis on remplace le dernier
                             */

                            resolve({
                                msg: "Favorite limit is 5, replacement of the last favorite",
                                user: user,
                                error: true
                            });
                        }
                    }
                    catch (e)
                    {
                        reject(e)
                    }

                }).catch(err => reject(err))
        });
    }

    removeCounterSetFromFav(userId, counterSetId)
    {
        return new Promise((resolve, reject) =>
        {
            this.getUser(userId)
                .then(user =>
                {
                    let index = user.favoriteCounterSets.indexOf(counterSetId);

                    if (index !== -1)
                    {
                        user.favoriteCounterSets.splice(index, 1);
                        user.save();
                    }

                    resolve(user);
                }).catch(err => reject(err))
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