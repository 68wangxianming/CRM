// import * as React from 'react';
//
// const login = () =>{
//     return <span>welcome to system!</span>
// }
//
// export default login;
import * as React from 'react';
import { observer, useObservable, useObserver } from "mobx-react-lite"
import {number} from "prop-types";

// const login= () =>{
//     return <span>welcome to login!</span>
// };
//
// export default login;


const Login = () => {
    // const todos = useObservable(new Map<string, number | string | boolean | object>());
    const todos = useObservable({value:'100'});
    const inputRef:any = React.useRef()

    const changeTodo = React.useCallback(() => {
        inputRef.current.value = "2000"
        todos.value += 200;
    }, []);


    const addTodo = React.useCallback(() => {
        inputRef.current.value = "2000"
        todos.value += 200;
    }, []);

    return useObserver(() => (
        <div>
            <input type="text" value={todos.value} ref={inputRef} onChange={e=>todos.value = e.target.value}/>
            <button onClick={addTodo}>点击添加</button>
        </div>
    ))
};

export default Login;
