import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// function importAll(r) {
//   let images = {};
//   r.keys().forEach((item) => { 
//     images[item.replace('./', '')] = r(item); 
//   });
//   return images;
// }

function importAll(r) {
  let images = {};
  let allkeys = r.keys().map((item) => { 
    let key = item.replace('./', '');
    images[key] = r(item); 
    return key;
  });
  console.log(allkeys)
  return images;
}

const images = importAll(require.context('./images', false, /\.(png)$/));

console.log(images);
// console.log(images["santaclaus.png"]);

class App extends Component {
  render() {
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
}

export default App;
