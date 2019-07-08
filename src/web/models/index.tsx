import {createContext} from "react";
import {decorate, observable, computed} from "mobx";

export class Ydstore {
    str = "京程一灯";
    token: string = localStorage.getItem('token') || "";
}

decorate(Ydstore, {
    token: observable
});

export default createContext(new Ydstore());
