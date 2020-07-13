import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Firebase, { FirebaseContext } from './components/FIrebase';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
