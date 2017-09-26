export default class mainController {

    constructor()
    {

    }

    indexAction(req, res)
    {
        res.render('mainView');
    }

    userAction(req, res)
    {
        res.render('userView');
    }
}