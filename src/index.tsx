import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Sessions from './components/Sessions'
import reportWebVitals from './reportWebVitals';
import {Session} from "./api/Session";
import {gen_story_nodes} from "./test/data-gen";

const session: Session = {
    name: "Test Session",
    dateCreated: new Date(Date.now()),
    tools: []
}

const nbd = gen_story_nodes();

session.tools.push(nbd);

ReactDOM.render(
  <React.StrictMode>
      <Sessions name={session.name} dateCreated={session.dateCreated} tools={session.tools} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
