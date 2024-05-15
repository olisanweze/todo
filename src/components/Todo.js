import React, { useReducer } from 'react';
import TodoForm from './TodoForm';
import { FaCheckCircle } from 'react-icons/fa';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

const initialState = {
  id: null,
  value: ''
};

function editReducer(state, action) {
  switch (action.type) {
    case 'SET_EDIT':
      return { id: action.payload.id, value: action.payload.value };
    case 'CLEAR_EDIT':
      return { id: null, value: '' };
    default:
      return state;
  }
}

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
  const [edit, dispatch] = useReducer(editReducer, initialState);

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    dispatch({ type: 'CLEAR_EDIT' });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div className={
      todo.isComplete ? 'todo-row complete' : 'todo-row'
      } key={todo.id}>
      <section>
        <div key={todo.id} className='todo-text'>
          {todo.text}
        </div>
        <div className='todo-info'>
          <div className='todo-timestamp'>
            {todo.timestamp}
          </div>
          <div className='icons'>
            <FaCheckCircle
              className='complete-icon'
              onClick={() => completeTodo(todo.id)}
            />
            <RiCloseCircleLine 
              onClick={() => removeTodo(todo.id)}
              className='delete-icon'
            />
            <TiEdit 
              onClick={
                () => dispatch({ 
                  type: 'SET_EDIT', payload: { id: todo.id, value: todo.text } 
                })
              }
              className='edit-icon'
            />
          </div>
        </div>
      </section>
    </div>
  ));
}

export default Todo;