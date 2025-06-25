import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Rules from "./pages/Rules";
import Table from "./pages/Table";
import Navbar from "./components/Navbar";
import CustomFooter from "./components/CustomFooter";

function App() {
  const path = window.location.pathname;

  return (
    <>
      <Navbar />
      {path === "/Home" && <Home />}
      {path === "/Rules" && <Rules />}
      {path === "/Table" && <Table />}
      <CustomFooter />
    </>
  );
}

// function App() {
//   const [backendData, setBackendData] = useState(null)
// useEffect(() => {
//   fetch('http://localhost:5000/api') // if proxy is set
//     .then(response => response.json())
//     .then(data => setBackendData(data));
// }, []);
//   return (
//     <div>
//     {!backendData ? (
//       <p >Loading...</p>
//     ) : (
//       <div>
//         <h1 className=''>Users:</h1>
//         <ul>
//           {backendData.users && backendData.users.map((user, index) => (
//             <li key={index}>{user}</li>
//           ))}
//         </ul>
//       </div>
//     )}
//   </div>
//   )
// }

export default App;
