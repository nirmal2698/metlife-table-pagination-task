import './App.css';
import React from 'react';
import MainComponent from './TableComponent'; //contains the table-pagination component which have data

function App() {
  return (
    <div className='App'>
      <div style={{marginBottom: '20px'}}>
        <img src='https://rmkcdn.successfactors.com/d6383ce6/92e3b586-57c7-4f17-8570-9.png' alt='Metlife-logo'></img>
      </div>
      <div className='blue-box'>
        <div className='jobs-div'>Jobs</div>
      </div>
      <MainComponent />
    </div>
  )
}

export default App;