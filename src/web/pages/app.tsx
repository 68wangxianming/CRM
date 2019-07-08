import * as React from "react";

const {useContext} = React;
import Routes from "../routes/index";
import {BrowserRouter} from "react-router-dom";
import YdStore from "../models/index";
import {observer} from "mobx-react-lite";

const App = observer((routes) => {
    const ydstore = useContext(YdStore);
    const token: string = ydstore.token;
    return <>
        {/*{if!=[]}*/}
        {/*<header/>*/}
        <BrowserRouter basename="/">{Routes(token)}</BrowserRouter>
        {/*{if!=[]}*/}
        {/*<footer/>*/}
    </>
});
export default App;
