import React from 'react'
import './App.css';

import Header from './Components/Header/Header.js'
import Sidebar from './Components/Sidebar/Sidebar.js'
import Feed from './Components/Feed/Feed.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <main className="App-main">
        <Feed />
        <Sidebar />
      </main>
    </div>
  );
}

export default App;
