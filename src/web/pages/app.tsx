import * as React from "react";
const {useContext} = React;
import Routes from "../routes/index";
import {BrowserRouter} from "react-router-dom";
import {createHashHistory} from 'history';
import YdStore from "../models/index";
import {observer} from "mobx-react-lite";

const App = observer((routes) => {
    const ydstore = useContext(YdStore);
    const token: string = ydstore.token;
    return <>
        <BrowserRouter basename="/">{Routes(token)}</BrowserRouter>
    </>
});
export default App;
