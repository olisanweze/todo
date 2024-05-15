import React from 'react';
import TodoList from './components/TodoList';
function App() {
  return (
    <>
      <main className='container'>
        <section className='todo-app'>
          <TodoList />
        </section>
      </main>
    </>
  );
}

export default App;
