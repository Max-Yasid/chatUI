import './App.css';
import Cellphone from './components/cellphone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

import io from "socket.io-client";
import { useState } from 'react/cjs/react.development';

const socket = io.connect('http://localhost:4000');
function App() {
  const [userCounter, setUserCounter] = useState(1);
  socket.on("newUserConnected", (users_quantity) => {
    setUserCounter(users_quantity);
  });
  socket.on("AUserDisconnected", (users_quantity) => {
    setUserCounter(users_quantity);
  });
  return (
    <main className="App">
      <section className="ilustration">
        <div className="background-figure"></div>
        <div className="ilustration__cellphone-container">
          <Cellphone socket={socket} />
        </div>
      </section>
      <section className="app-description">
        <div className="app-description__text">
          <h1 className="app-description__title">Simple booking</h1>
          <p className="app-description__description">
            Stay in touch with our dog walkers through the chat interface. This makes it easy to 
            discuss arrangements and make bookings. Once the walk has been completed you can rate 
            your walker and book again all through the chat.
          </p>
          <p className="users-counter-container">
            <FontAwesomeIcon icon={faUsers} className="users-counter"/> <strong>{userCounter} online</strong>
          </p>
        </div>
        <div className="background-figure background-figure--inverted-grey"></div>
      </section>
    </main>
  );
}

export default App;
