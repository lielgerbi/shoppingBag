import React, { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";
import ItemTable from "./ItemTable";
import Forms from "./Forms";

function App() {
  const [rows, setRows] = useState([]);
  const [productsInBag, setCount] = useState(rows.length);


  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:5000/",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      var myArr = res.data.rows;
      setRows(myArr);
      setCount(myArr.length);
    })
    .catch(error => {
      console.log(error)
   })
    // eslint-disable-next-line
  }, [])

    return (
      <div className={`frame`}>
        <div className={`data`}>
          <div>
            <h1 className={`title`}>רשימת הקניות שלי ({productsInBag}) ⚛️</h1>
            <ItemTable  rows={rows}/>
          </div>
           <Forms rows = {rows}/>
        </div>
      </div>
    );
}

export default App