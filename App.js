import React from "react";
import "./App.css";
import NetflixCollection from "./API/requests";
import Row from "./components/Row";
import Banner from "./components/Banner";
import Nav from "./components/Nav";
function App() {
  return (
    <div className="App">
      <Nav/>
      <Banner />
      {NetflixCollection.map((collection) => {
        return (
          <Row
            key={collection.title}
            title={collection.title}
            fetchURL={collection.path}
            isOriginal={collection.isOriginal ?? false}
          />
        );
      })}
    </div>
  );
}

export default App;
