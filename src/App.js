import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlaceOrder from "./components/PlaceOrder";
import ChefNav from "./components/ChefNav";
import Cart from "./components/Cart";
import Events from "./components/Events";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Service from "./components/Service";
import Special from "./components/Special";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import Reservation from "./components/Reservation";
import About from "./components/About";
import OrderDetails from "./components/OrderDetails";
import VeiwMenu from "./components/VeiwMenu";

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="preload" data-preaload>
                  <div className="circle"></div>
                  <p className="text">Tanu's</p>
                </div>
                <Navbar />
                <main>
                  <article>
                    <Hero />
                    <Service />
                    <Special />
                    <Events />
                  </article>
                </main>
              </>
            }
          />
          <Route
            path="/viewmenu/*"
            element={
              <div className="chef-page">
                <VeiwMenu />
              </div>
            }
          />
          <Route
            path="/order/*"
            element={
              <div className="chef-page">
                <ChefNav />
                <PlaceOrder />
              </div>
            }
          />
          <Route
            path="/myorder"
            element={
              <div className="chef-page">
                <ChefNav />
                <OrderDetails />
              </div>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
