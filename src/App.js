import React, { useState, useRef } from 'react'
import ClassExample from './components/ClassExample';
import HookExample from './components/HookExample';

function App() {
  return (
    <div>
      <h1>React Tasks</h1>
      <ClassExample />
      <HookExample />
    </div>
  );
}

export default App;