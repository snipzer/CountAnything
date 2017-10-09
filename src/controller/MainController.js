import UserHandler from "../utils/handler/UserHandler";
import CounterSetHandler from "../utils/handler/CounterSetHandler";
import route from "../config/route";


const userHandler = new UserHandler();
const counterSetHandler = new CounterSetHandler();

export default class mainController
{

    constructor()
    {

    }

    indexAction(req, res)
    {
        let routeParam = {
            title: "Page principale",
            route: route,
            user: null,
            counterSet: null,
            counters: null,
            errors: []
        };
        userHandler.getUser("59cd621554c08c76487cf076")
                   .then(user =>
                   {
                       routeParam.user = user;
                       counterSetHandler.getCounterSet(user.counterSets[0])
                                        .then(counterSet =>
                                        {
                                            routeParam.counterSet = counterSet;
                                            res.render('app/mainView', routeParam);
                                        })
                                        .catch(err =>
                                        {
                                            routeParam.errors.push(err);
                                            res.render('app/mainView', routeParam);
                                        });
                   })
                   .catch(err =>
                   {
                       routeParam.errors.push(err);
                       res.render('app/mainView', routeParam);
                   });
    }

    counterSetAction(req, res)
    {
        let routeParam = {
            title: "Page de gestion des compteurs",
            route: route,
            user: null,
            favorites: [],
            errors: []
        };

        userHandler.getUser("59cd621554c08c76487cf076")
                   .then(user =>
                   {
                       let favLength = user.favoriteCounterSets.length;
                       let workingIndex = 0;

                       routeParam.user = user;

                       // if(favLength !== 0)
                       // {
                       //     user.favoriteCounterSets.forEach((favoriteId) =>
                       //     {
                       //         counterSetHandler.getCounterSet(favoriteId)
                       //                          .then((counterSet) =>
                       //                          {
                       //                              routeParam.favorites.push(counterSet);
                       //                              workingIndex++;
                       //                              if(favLength === workingIndex)
                       //                                  res.render('app/manager', routeParam);
                       //                          })
                       //                          .catch((err) =>
                       //                          {
                       //                              routeParam.errors.push(err);
                       //                              workingIndex++;
                       //                              if(favLength === workingIndex)
                       //                                  res.render('app/manager', routeParam);
                       //                          });
                       //     });
                       // }
                       // else
                       // {
                           res.render('app/manager', routeParam);
                       // }
                   })
                   .catch(err =>
                   {
                       routeParam.errors.push(err);
                       res.render('app/manager', routeParam);
                   });
    }

    userAction(req, res)
    {
        res.render('app/userView', {
            title: "Page de gestion des utilisateurs",
        });
    }
}