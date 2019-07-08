import * as React from "react";
import {Route, Switch, RouteProps, Redirect} from "react-router-dom";

const {lazy, Suspense} = React;
// const Demo = lazy(() => import(/* webpackChunkName:"demo" */ "@components/../components/demo"));
const Login = lazy(() => import(/* webpackChunkName:"login" */ "@components/../components/login"));
// const LoginTest = lazy(() => import(/* webpackChunkName:"loginTest" */ "@components/../components/loginTest"));
// const Home = lazy(() => import(/* webpackChunkName:"home" */ "@components/../components/home"));
const HomePages = lazy(() => import(/* webpackChunkName:"layout" */ "../pages/HomePages"));
const other = lazy(() => import(/* webpackChunkName:"other" */ "../pages/other/other"));
interface YDProps extends RouteProps {
    auth?: boolean
}

export const routes: YDProps[] = [
    {path: "/login", exact: true, component: Login},
    // {path: "/loginTest", exact: true, component: LoginTest},
    // {path: "/demo", exact: true, component: Demo, auth: true},
    // {path: "/home", exact: true, component: Home, auth: true},
    {path: "/homePages", exact: true, component: HomePages},
    {path: "/other", exact: true, component: other},
];

const Routes = (token: string) => (
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
                            render={(props) =>
                                !r.auth ? (<LazyCom {...props}/>) : token ? (<LazyCom {...props} />) : (
                                    <Redirect to={{pathname: "/login", state: {from: props.location}}}/>
                                )
                            }
                        />
                    );
                })}
            </Switch>
        </Suspense>
    </>
);

export default Routes;
