import UserHandler from "../utils/handler/UserHandler";
import CounterSetHandler from "../utils/handler/CounterSetHandler";
import CounterHandler from "../utils/handler/CounterHandler";
import route from "../config/route";


const userHandler = new UserHandler();
const counterSetHandler = new CounterSetHandler();
const counterHandler = new CounterHandler();

export default class mainController
{

    constructor()
    {

    }

    indexAction(req, res)
    {
        let routeParam = {
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
                   }).catch(err =>
        {
            routeParam.errors.push(err);
            res.render('app/mainView', routeParam);
        });
    }

    userAction(req, res)
    {
        res.render('app/userView');
    }
}