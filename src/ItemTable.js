import React ,  {} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./table.css"
import Axios from "axios";
function ItemTable({rows}) {

    function getsum() {
        return rows.reduce((a, b) => a + ((b.price || 0) * (b.quantity || 0)), 0);
      }
      function deleteItem(newItem) {
        Axios({
          method: "get",
          url: "http://localhost:5000/removeitem",
          headers: {
            "Content-Type": "application/json"
          },
          params: {
            items: newItem
          }
        }).then(res => {
        //   setCount(res.data.rows.length);
         // setRows(res.data.rows);
         window.location.reload(false);
        });
      }
   React.useEffect(() => {
   });
     return (
        <div>
          <div id="divInCenter">
              <div id="table-wrapper">
                <table id="process-manager-table" class="table table-sm">
                  <tbody>
                    <tr>
                      <th scope="col">
                        <button type="button" class="btn btn-outline-secondary">name ⇅</button></th>
                      <th scope="col">
                        <button type="button"  class="btn btn-outline-secondary">category ⇅ </button></th>
                      <th scope="col">
                        <button type="button"  class="btn btn-outline-secondary">price ⇅ </button></th>
                      <th scope="col">
                        <button type="button" class="btn btn-outline-secondary">quantity ⇅</button></th>
                      <th scope="col">
                        <button type="button" class="btn btn-outline-secondary">total price ⇅</button></th>
                    </tr>
                    {rows.map(item => {
                      return (
                        <tr>
                          <td>{item.name}</td>
                          <td>{item.category}</td>
                          <td>{item.price}</td>
                          <td>{item.quantity}</td>
                          <td>{item.quantity * item.price}</td>
                          <button className={`pointer`} onClick={() => deleteItem(item)}>🗑️</button>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div id="totalPrice">
                מחיר סופי:{getsum()}
                {getsum() < 20 &&
                  <div>✔</div>

                }
                {getsum() > 20 &&
                  <div>❌</div>
                }
              </div>
            </div>
        </div>
      );
  }
  export default ItemTable;