import "./css/style.scss";

/**component */
import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

function App() {
  return (
    <div className="app">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

export default App;
