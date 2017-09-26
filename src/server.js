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
        this._app.get('/', mainController.indexAction);
        this._app.get('/user', mainController.userAction);

        /**
         * Route UserController
         */
        this._app.get('/v1/users', userController.getUsers);
        this._app.post('/v1/user/post', userController.postUser);
        this._app.post('/v1/user/put', userController.putUser);
        this._app.delete('/v1/user', userController.killUser);
        this._app.post('/v1/user/counter_set/post', userController.addCounterSet);


        /**
         * CounterSet: 59ca13b3a899e8447cfd0356
         *
         * Counter1: 59ca72ec4f0823198f26946c
         * Counter2: 59ca72ec4f0823198f26946d
         * Counter3: 59ca72ef4f0823198f26946e
         *
         *
         */

        /**
         * Route CounterSetModel
         */
        this._app.get('/v1/counter_sets', counterSetController.getCounterSets);
        this._app.post('/v1/counter_set/post', counterSetController.postCounterSet);
        this._app.post('/v1/counter_set/put', counterSetController.putCounterSet);
        this._app.delete('/v1/counter_set', counterSetController.killCounterSet);
        this._app.post('/v1/counter_set/counter/post', counterSetController.addCounter);


        /**
         * Route Counter
         */
        this._app.get('/v1/counters', counterController.getCounters);
        this._app.get('/v1/counter/:idCounter', counterController.getCounter);
        this._app.delete('/v1/counter', counterController.killCounter);
    }


    run()
    {
        this._initControllers();

        this._server.listen(this.port, () => console.log(`Server listening on port ${this.port}!`));
    }
}