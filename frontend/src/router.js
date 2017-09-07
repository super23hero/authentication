import VueRouter from 'vue-router';
import Auth from './core/Auth'

/*
* FRONT
*/
import Front from './front/front.vue'
import Home from './front/views/home.vue'
import About from './front/views/about.vue'

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
                path: 'quem-somos',
                components: {
                    frontRouter: About,
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
    console.log(to);

    // let pathSplitted = to.path.split('/');
    // console.log(pathSplitted);
    // if(pathSplitted[1] === 'admin' && pathSplitted[2] !== 'login' && !Auth.user.authenticated) {
    //     next(false);
    //     router.push('/admin/login');
    //     console.log('caiu')
    // }

    next();
});



export default router;
