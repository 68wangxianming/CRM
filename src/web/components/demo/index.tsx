import "./demo.css";
import * as React from "react";
import {observer} from "mobx-react-lite";
import TodoStore from "./Store";
import YdStore from "../../models/index";
import TodoList from "./TodoList";
import Footer from "./Footer";
import {useFetch} from "react-hooks-fetch";

const {useContext, Suspense} = React;
const DisplayRemoteData = () => {
    // const {error, data} = useFetch("http://...");
    // if (error) return <span>Error:{error.message}</span>;
    // if (!data) return null; // this is important
    // return <span>RemoteData:{data}</span>;
    return <span>error</span>;
};

const demo = observer(() => {
    const store = useContext(TodoStore);
    const ydstore = useContext(YdStore);
    const todoRef = React.useRef();
    return (
        <div>
            <Suspense fallback={<span>Loading...</span>}>
                <DisplayRemoteData/>
            </Suspense>
            <h2 className="nav">{ydstore.str}</h2>
            <TodoList todos={store.todos} toggleTodo={store.toggleTodo}/>
            <Footer remaining={store.remainingTodos} total={store.todos.length}/>
            <h3>{store.id}</h3>
            <input type="button" value="测试异步加载" onClick={() => store.test()}/>
        </div>
    );
});
export default demo;
