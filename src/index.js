import React from 'react';
import ReactDOM from "react-dom/client";

import App from './App';
const element = document.getElementById("root");
const root = ReactDOM.createRoot(element);


const Appp = () => {
  return (
   <React.StrictMode>
    <App />
   </React.StrictMode>
  );
};
root.render(<Appp />);
