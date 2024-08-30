import React from 'react';
// import logo from './logo.svg';
import './App.css';
import ProjectInfo from './Components/ProjectInfo';
import BackgroundImage from './Components/BackgroundImage';
import ToggleSections from './Components/ToggleSections';

const App: React.FC = () => {
  return (
    <div className="App">
      <ProjectInfo />
      <BackgroundImage />
      <ToggleSections />

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
