import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    async function testRequest(){
      const res = await fetch("http://localhost:8000/api/auth/", {
        credentials: 'include'
      })
      
      if(!res.ok){
        return;
      }

      const resData = await res.json()
      console.log(resData)
    } 
    testRequest()

  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
