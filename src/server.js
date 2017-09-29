import path from 'path';
import _ from 'underscore';
import express from 'express';
import http from "http";
import bodyParser from 'body-parser';
import MainController from './controller/MainController';
import UserController from './controller/UserController';
import CounterSetController from './controller/CounterSetController';
import CounterController from './controller/CounterController';
import MongooseConnector from './utils/bdd/MongooseConnector';
import config from './config/config';
import route from './config/route';

export default class Server {
    constructor()
    {
        this._app = express();
        this._server = http.createServer(this._app);

        this._app.use(bodyParser.urlencoded({
                extended: true
        }));

        this._app.use("/public", express.static(path.join(__dirname, '../public')));

        this._app.set('view engine', 'twig');
        this._app.set('views', path.join(__dirname, '../src/views'));
    }

    setPort(port)
    {
        if (_.isEmpty(port))
            port = 3000;

        this.port = port;
    }

    _initControllers()
    {
        const mongooseConnector = new MongooseConnector(config.host, config.port, config.database);
        mongooseConnector.run();
        const mainController = new MainController();
        const userController = new UserController();
        const counterSetController = new CounterSetController();
        const counterController = new CounterController();

        /**
         * Route mainController
         */
        this._app.get(route.mainController.main_home, mainController.indexAction);
        this._app.get(route.mainController.main_user, mainController.userAction);

        /**
         * Route UserController
         */
        this._app.get(route.userController.user_get_all, userController.getUsers);
        this._app.get(route.userController.user_get_one, userController.getUser);
        this._app.post(route.userController.user_post, userController.postUser);
        this._app.post(route.userController.user_put, userController.putUser);
        this._app.delete(route.userController.user_delete, userController.killUser);
        this._app.post(route.userController.user_counter_set_counter_post, userController.addCounterSet);
        this._app.delete(route.userController.user_counter_set_delete, userController.killCounterSet);
        this._app.post(route.userController.user_favorite_post, userController.addCounterSetToFav);
        this._app.delete(route.userController.user_favorite_delete, userController.removeCounterSetFromFav);


        /**
         * Route CounterSetModel
         */
        this._app.get(route.counterSetController.counter_set_get_all, counterSetController.getCounterSets);
        this._app.post(route.counterSetController.counter_set_put, counterSetController.putCounterSet);
        this._app.delete(route.counterSetController.counter_set_delete, counterSetController.killCounterSet);
        this._app.delete(route.counterSetController.counter_set_counter_delete, counterSetController.killCounterFromCounterSet);
        this._app.post(route.counterSetController.counter_set_counter_post, counterSetController.addCounter);
        this._app.post(route.counterSetController.counter_set_counter_get_all, counterController.getCountersFromCounterSet);


        /**
         * Route Counter
         */
        this._app.get(route.counterController.counter_get_all, counterController.getCounters);
        this._app.get(route.counterController.counter_get_one, counterController.getCounter);
        this._app.delete(route.counterController.counter_delete_one, counterController.killCounter);
    }


    run()
    {
        this._initControllers();

        this._server.listen(this.port, () => console.log(`Server listening on port ${this.port}!`));
    }
}