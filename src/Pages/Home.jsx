import React from "react";
import NavBar from "../Components/NavBar";
import Numbers from "../Components/Numbers";
import Categorii from "../Components/Categorii";
import Footer from "../Components/Footer";
function Home() {
  return (
    <div>
      <NavBar />
      <Numbers />
      <Categorii />
      <Footer />
    </div>
  );
}
export default Home;
