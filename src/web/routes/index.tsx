import * as React from "react";
import {Route, Switch, RouteProps, Redirect} from "react-router-dom";

const {lazy, Suspense} = React;
const Login = lazy(() => import(/* webpackChunkName:"Login" */ "@pages/login"));
const Home = lazy(() => import(/* webpackChunkName:"HomePages" */ "@pages/home"));
const Other = lazy(() => import(/* webpackChunkName:"Other" */ "@pages/other"));
const Demo = lazy(() => import(/* webpackChunkName:"Demo" */ "@components/demo"));
const Demo1 = lazy(() => import(/* webpackChunkName:"Demo1" */ "@components/demo1"));
const Layout = lazy(() => import(/* webpackChunkName:"Layout" */ "@pages/layout"));
const NotFound = lazy(() => import(/* webpackChunkName:"NotFound" */ "@components/notFound"));
const Welcome = () => {
    return <span>欢迎使用京程一灯管理系统</span>
};

interface YDProps extends RouteProps {
    auth?: boolean
}

const routes: YDProps[] = [
    {path: "/login", exact: true, component: Login},
    {path: "/other", exact: true, component: Other},
    {path: "/home", exact: false, component: Layout, auth: true},
];

const homeRoutes: YDProps[] = [
    {path: '/home/index', exact: true, component: Home, auth: true},
    {path: '/home/demo', exact: true, component: Demo, auth: true},
    {path: '/home/demo1', exact: true, component: Demo1, auth: true},
];

const generateRoutes = (routes: YDProps[], NotFound: any) => (token: string) => (
    <>
        <Suspense fallback={<span>loading..........</span>}>
            <Switch>
                {routes.map((r, index) => {
                    const {path, exact, component} = r;
                    const LazyCom: any = component;
                    return (
                        <Route
                            key={`${index}`}
                            exact={exact}
                            path={path}
                            render={(props) =>{
                                return !r.auth ? (
                                    <LazyCom {...props}/>
                                ) : token ? (
                                    <LazyCom {...props} />
                                ) : (
                                    <Redirect to={{pathname: "/login", state: {from: props.location}}}/>
                                )
                            }
                            }
                        />
                    );
                })}
                <Route component={NotFound}/>
            </Switch>
        </Suspense>
    </>
);

// 对状态属性进行监听
const Routes = generateRoutes(routes, NotFound);
const HomeRoutes = generateRoutes(homeRoutes, Welcome);
export {HomeRoutes};

export default Routes;
