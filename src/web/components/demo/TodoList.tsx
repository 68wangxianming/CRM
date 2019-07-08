import * as React from "react";

function TodoList({ todos, toggleTodo }:any) {
  return (
    <ul style={{ listStyle: "none" }}>
      {todos &&
        todos.map((t:any, i:any) => (
          <li
            onClick={() => toggleTodo(i)}
            style={{
              margin: 10,
              opacity: t.completed ? 0.5 : 1,
              cursor: "pointer",
              textDecoration: t.completed ? "line-through" : "none"
            }}
            key={t.id}>
            {t.text}
          </li>
        ))}
    </ul>
  );
}

export default TodoList;
