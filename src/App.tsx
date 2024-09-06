import React, {useState} from 'react';
import './App.css';
import ProjectInfo from './Components/ProjectInfo';
import BackgroundImage from './Components/BackgroundImage';
import ToggleSections from './Components/ToggleSections';
import TextEditor from './Components/TextEditor';
import JSONView from './Components/JSONView';

const App: React.FC = () => {
  // Save the data as a prop pass from <TextEditor>
  // Save the data pass as a prop to <ProjectInfo>
  const [newTitle, setNewTitle] = useState("");

  // Use it to communicate between <TextEditor> and <App>
  const sendDataFromChild = (data: string) => {
    setNewTitle(data);
  }

  return (
    <div className="App">
      <ProjectInfo title= {newTitle} />
      <BackgroundImage />
      <ToggleSections />
      <TextEditor sendDataToParent={sendDataFromChild}/>
      <JSONView/>
    </div>
  );
}

export default App;
