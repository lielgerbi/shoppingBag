import React ,  {useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from "react-hook-form";
import swal from 'sweetalert';
import "./forms.css"
import Axios from "axios";
function Forms({rows}) {
    
    const [forms, setForm] = useState(true);
    const { register, handleSubmit } = useForm();
    const [selectCategory, setCategory] = useState(null);
    const categories = ["meat",
      "milk",
      "snacks"]
  
    const products = [{ name: "שניצל", category: categories[0] },
    { name: "חלב", category: categories[1] },
    { name: "שוקולד", category: categories[2] },
    { name: "מילקי", category: categories[1] },
    { name: "שוקו", category: categories[1] },
    { name: "גלידה", category: categories[1] },
    { name: "יוגורט", category: categories[1] },
    { name: "דוריטוס", category: categories[2] },
    { name: "במבה", category: categories[2] },
    { name: "ציפס", category: categories[2] },
    { name: "ביסלי", category: categories[2] },
    { name: "פרינגלס", category: categories[2] },
    { name: "עוף", category: categories[0] },
    { name: "דג", category: categories[0] },
    { name: "שווארמה", category: categories[0] },
    { name: "צלי", category: categories[0] },
    { name: "סטייק", category: categories[0] }]
    function getItemsByCat(category) {
        var filterItems = products.filter(product => product.category === category);
        return filterItems;
      }
      function addProdoct(newItem) {
        Axios({
          method: "get",
          url: "http://localhost:5000/additem",
          headers: {
            "Content-Type": "application/json"
          },
          params: {
            items: newItem
          }
        }).then(res => {
          console.log(res)
        });
        // setRows(rows);
        // setCount(rows.length);
      }
    
      const onSubmitForm = data => {
        if (forms === true) {
          isInList({ id: (rows.length + 1).toString(), name: data.name, category: data.category, price: data.price, quantity: data.quantity })
        }
        else {
          isInList({ id: (rows.length + 1).toString(), name: data.name1, category: data.category1, price: data.price1, quantity: data.quantity1 })
        }
      };

      function reloadRows() {
        Axios({
          method: "GET",
          url: "http://localhost:5000/",
          headers: {
            "Content-Type": "application/json"
          }
        }).then(res => {
          // sortArr(selectCategory);
          window.location.reload(false);
        });
      }
      function isInList(newItem) {
        Axios({
          method: "get",
          url: "http://localhost:5000/getItemIndex",
          headers: {
            "Content-Type": "application/json"
          },
          params: {
            items: newItem
          }
        }).then(res => {
          if (res.data.index === -1) {
            addProdoct(newItem)
            reloadRows();
          }
          else {
            swal("product already in list", "", "error");
          }
        });
    
      }

   React.useEffect(() => {
   });
     return (
        <div>
            <div id="divInleft">
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <label for="colFormLabel" class="col-sm-2 col-form-label">category</label>
              <select required name="category1" id="inputState" ref={register} onChange={e => setCategory(e.currentTarget.value)} class="form-control">
                <option>category </option>
                {categories.map(item => {
                  return (
                    <option value={item}> {item} </option>
                  )
                })}
              </select>
              <label for="colFormLabel" class="col-sm-2 col-form-label" required>name</label>
              <select required name="name1" id="inputState" ref={register} class="form-control">
                {getItemsByCat(selectCategory).map(item => {
                  return (
                    <option value={item.name}> {item.name} </option>
                  )
                })}
              </select>

              <label for="colFormLabel" class="col-sm-2 col-form-label">quantity</label>
              <input required name="quantity1" type="text" ref={register} pattern="[0-9]{1,2}" title="not good" class="form-control form-control-lg" id="colFormLabelLg" placeholder="quantity" />
              <label for="colFormLabel" class="col-sm-2 col-form-label">price</label>
              <input required name="price1" type="text" ref={register} pattern="[0-9]{1,3}" title="not good" class="form-control form-control-lg" id="colFormLabelLg" placeholder="price" />
              <button type="submit" onClick={() => setForm(false)} class="btn btn-primary" >add item</button>
            </form>
          </div>

          <div id="divInright">

            <form onSubmit={handleSubmit(onSubmitForm)}>
              <label for="colFormLabel" class="col-sm-2 col-form-label">name</label>
              <input required name="name" type="text" ref={register}  pattern="[A-Za-z0-9]{1,15}" title="not good" class="form-control form-control-lg" id="colFormLabelLg" placeholder="name" />
              <label for="colFormLabel" class="col-sm-2 col-form-label">category</label>
              <input required name="category" type="text" ref={register} pattern="[A-Za-z0-9]{1,15}" title="not good" class="form-control form-control-lg" id="colFormLabelLg" placeholder="category" />
              <label for="colFormLabel" class="col-sm-2 col-form-label">quantity</label>
              <input required name="quantity" type="text" ref={register} pattern="[0-9]{1,2}" title="not good" class="form-control form-control-lg" id="colFormLabelLg" placeholder="quantity" />
              <label for="colFormLabel" class="col-sm-2 col-form-label">price</label>
              <input required name="price" type="text" ref={register} pattern="[0-9]{1,3}" title="not good"  class="form-control form-control-lg" id="colFormLabelLg" placeholder="price" />
              <button type="submit" onClick={() => setForm(true)} class="btn btn-primary" >add item</button>
            </form>
          </div>
        </div>
      );
  }
  export default Forms;