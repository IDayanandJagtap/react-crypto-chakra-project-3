import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./Components/Home";
import Exchanges from "./Components/Exchanges";
import Coins from "./Components/Coins";
import CoinDetails from "./Components/CoinDetails";
import Header from "./Components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/coins' element={<Coins />}></Route>
        <Route path='/coins/:id' element={<CoinDetails />}></Route>
        <Route path='/exchanges' element={<Exchanges />}></Route>
      </Routes>
    </BrowserRouter>      
  );
}

export default App;
