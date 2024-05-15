import React, { useReducer, useEffect, useRef } from 'react';

const initialState = {
  input: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_INPUT':
      return { ...state, input: action.payload };
    case 'RESET_INPUT':
      return { ...state, input: '' };
    case 'SET_EDIT_INPUT':
      return { ...state, input: action.payload };
    default:
      return state;
  }
}

function TodoForm(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    if (props.edit) {
      dispatch({ type: 'SET_EDIT_INPUT', payload: props.edit.value });
    }
  }, [props.edit]);

  const handleChange = e => {
    dispatch({ type: 'SET_INPUT', payload: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    
    const now = new Date();
    const formatDate = now.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric'
    });
    const formatTime = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });

    const newTodo = {
      id: Math.floor(Math.random() * 10000),
      text: state.input,
      timestamp: `${formatDate}, ${formatTime}`
    };

    props.onSubmit(newTodo);

    dispatch({ type: 'RESET_INPUT' });
  };

  return (
    <form className='todo-form' onSubmit={handleSubmit}>
      {props.edit ? (
        <>
          <input 
            type='text' 
            placeholder='Update your item' 
            value={state.input} 
            name='text'
            className='todo-input edit'
            onChange={handleChange}
            ref={inputRef}
            maxLength={45}
          />
          <button className='todo-button edit'>Update</button>
        </>
      ) : (
        <>
          <input 
            type='text' 
            placeholder='New task' 
            value={state.input} 
            name='text'
            className='todo-input'
            onChange={handleChange}
            ref={inputRef}
            maxLength={45}
          />
          <button className='todo-button'>Add todo</button>
        </>
      )}
    </form>
  );
}

export default TodoForm;