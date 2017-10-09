const route = {
    mainController: {
        main_home: "/",
        main_counter_set: "/manager",
        main_user: "/user"
    },
    counterController: {
        counter_get_all: "/v1/counters",
        counter_get_one: "/v1/counter/:idCounter",
        counter_delete_one: "/v1/counter/delete"
    },
    counterSetController: {
        counter_set_get_all: "/v1/counter_sets",
        counter_set_get_one: "/v1/counter_set/:counterSetId",
        counter_set_put: "/v1/counter_set/put",
        counter_set_delete: "/v1/counter_set/delete",
        counter_set_counter_get_all: "/v1/counter_set/counter/get",
        counter_set_counter_post: "/v1/counter_set/counter/post",
        counter_set_counter_delete: "/v1/counter_set/counter/delete"
    },
    userController: {
        user_get_all: "/v1/users",
        user_get_one:"/v1/user/get/:userId",
        user_post: "/v1/user/post",
        user_put: "/v1/user/put",
        user_delete: "/v1/user/delete",
        user_counter_set_counter_post: "/v1/user/counter_set/post",
        user_counter_set_delete: "/v1/user/counter_set/delete",
        user_favorite_post: "/v1/user/favorite/post",
        user_favorite_delete: "/v1/user/favorite/delete"
    }
};

export default route;