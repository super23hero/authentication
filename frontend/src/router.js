import VueRouter from 'vue-router';
import {Auth as Auth} from './core/Auth';

/*
* FRONT
*/
import Front from './front/front.vue'
import Home from './front/views/home.vue'
import PreviousYears from './front/views/previous-years.vue'
import Children from './front/views/children.vue'

/*
* MANAGER
*/
import Manager from './manager/manager.vue'
import Login from './manager/views/login/login.vue'
import Panel from './manager/views/panel.vue'
import Users from './manager/views/users/users.vue'
import UsersList from './manager/views/users/users.list.vue'
import UsersNew from './manager/views/users/users.new.vue'
import UsersEdit from './manager/views/users/users.edit.vue'

/*
* ERRORS PAGES
 */
import PageNotFound from './components/pageNotFound.vue'

let routes = [
    {
        path: '/',
        component: Front,
        children: [
            {
                path: '',
                components: {
                    frontRouter: Home,
                }
            },
            {
                path: 'edicoes-anteriores',
                components: {
                    frontRouter: PreviousYears ,
                }
            },
            {
                path: 'criancas',
                components: {
                  frontRouter: Children,
                }
            }
        ]
    },
    {
        path: '/admin',
        component: Manager,
        children: [
            {
                path: '',
                components: {
                    managerRouter: Panel,
                }
            },
            {
                path: 'login',
                components: {
                    managerRouter: Login,
                }
            },
            {
                path: 'users',
                components: {
                    managerRouter: Users,
                },
                children: [
                    {
                        path: '',
                        component: UsersList
                    },
                    {
                        path: 'new',
                        component: UsersNew,
                    },
                    {
                      path: ':id',
                      component: UsersEdit,
                    }
                ]
            }
        ]
    },
    {
        path: "*",
        component: PageNotFound
    }
];

let router = new VueRouter({
    routes,
    linkActiveClass: 'is-active'
});

router.beforeEach((to, from, next) => {
    // let pathSplitted = to.path.split('/');
    // if(pathSplitted[1] === 'admin' && pathSplitted[2] !== 'login' && !Auth.checkAuth()) {
    //     next(false);
    //     router.push('/admin/login');
    // }

    next();
});



export default router;
