import React, { useEffect } from 'react'
import './App.css';

import Header from './Components/Header/Header.js'
import Sidebar from './Components/Sidebar/Sidebar.js'
import Feed from './Components/Feed/Feed.js'
import { useSelector } from 'react-redux';
import FeedSlice from './Components/Feed/FeedSlice';

function App() {
  const backgroundColor = useSelector((state) => state.feed.bannerColor);

  useEffect(() => {

  }, [backgroundColor])
  
  return (
    <div className="App" style={{ backgroundColor: backgroundColor }}>
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
