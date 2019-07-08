import { createContext } from "react";
import { decorate, observable, computed } from "mobx";
export class Todos {
    todos = [
        { id: 1, text: "完成React SSR配置", completed: true },
        { id: 2, text: "完成业务逻辑的基本开发", completed: false }
    ];
    id:number = 0;
    get remainingTodos() {
        return this.todos.filter(t => !t.completed).length;
    }
    test = async () => {
        const data = await fetch("/api/test");
        const result = await data.json();
        this.id = result.id;
    }
    toggleTodo = (index:any) => {
        this.todos[index].completed = !this.todos[index].completed;
    };
}

decorate(Todos, {
    todos: observable,
    id: observable,
    remainingTodos: computed,
});

export default createContext(new Todos());
