import './App.css';

function App() {
  return (
    <main className="App">
      <section className="ilustration">
        <div className="background-figure"></div>
        <div className="ilustration__cellphone"></div>
      </section>
      <section className="app-description">
        <div className="app-description__text">
          <h1 className="app-description__title">Simple booking</h1>
          <p className="app-description__description">
            Stay in touch with our dog walkers through the chat interface. This makes it easy to 
            discuss arrangements and make bookings. Once the walk has been completed you can rate 
            your walker and book again all through the chat.
          </p>
        </div>
        <div className="background-figure background-figure--inverted-grey"></div>
      </section>
    </main>
  );
}

export default App;
