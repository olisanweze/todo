import React, { useReducer, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

const initialState = JSON.parse(localStorage.getItem('todos')) || [];

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      if (!action.payload.text || /^\s*$/.test(action.payload.text)) {
        return state;
      }
      return [action.payload, ...state];
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    case 'UPDATE_TODO':
      if (
        !action.payload.newValue.text || 
        /^\s*$/.test(action.payload.newValue.text)
      ) {
        return state;
      }
      return state.map(todo =>
        todo.id === action.payload.todoId ? { 
          ...todo, text: action.payload.newValue.text 
        } : todo
      );
    case 'COMPLETE_TODO':
      return state.map(todo => {
        if (todo.id === action.payload) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    default:
      return state;
  }
}

function TodoList() {
  const [todos, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = todo => {
    dispatch({ type: 'ADD_TODO', payload: todo });
  };

  const removeTodo = id => {
    dispatch({ type: 'REMOVE_TODO', payload: id });
  };

  const updateTodo = (todoId, newValue) => {
    dispatch({ type: 'UPDATE_TODO', payload: { todoId, newValue } });
  };

  const completeTodo = id => {
    dispatch({ type: 'COMPLETE_TODO', payload: id });
  };

  return (
    <div>
      <h1>What's the plan for today?</h1>
      <TodoForm onSubmit={addTodo} />
      <section className='todo-grid'>
        <Todo 
          todos={todos}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      </section>
    </div>
  );
}

export default TodoList;