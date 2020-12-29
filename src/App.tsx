import React from "react";
import "./App.css";
import Sessions from "./components/Sessions";
import { Session } from "./api/Session";
import { gen_story_nodes } from "./test/data-gen";

const session: Session = {
  name: "Test Session",
  dateCreated: new Date(Date.now()),
  tools: [],
};

const nbd = gen_story_nodes();

session.tools.push(nbd);

function App() {
  return (
    <div className="App">
      <Sessions
        name={session.name}
        dateCreated={session.dateCreated}
        tools={session.tools}
      />
    </div>
  );
}

export default App;
