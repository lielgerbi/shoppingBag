import React ,  {useState, useEffect} from "react"
// import { DataGrid } from '@material-ui/data-grid';
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';
// const request = require('request');
import Axios from "axios";
function App() {
  // const columns = [
  //   { field: 'id', headerName: 'ID', width: 70 },
  //   { field: 'name', sortable: false, headerName: 'name', width: 130 },
  //   { field: 'price', headerName: 'price',type: 'number', width: 130 },
  //   {
  //     field: 'quantity',
  //     headerName: 'quantity',
  //     type: 'number',
  //     width: 160
  //   }
  // ];
  const { register ,handleSubmit} = useForm();
  const categories = ["meat",
                      "milk",
                      "snacks"]
                    
  const products = [{name: "שניצל"  , category: categories[0]},
                    {name: "חלב"    , category: categories[1]},
                    {name: "שוקולד" , category: categories[2]},
                    {name: "מילקי" , category: categories[1]},
                    {name: "שוקו" , category: categories[1]},
                    {name: "גלידה" , category: categories[1]},
                    {name: "יוגורט" , category: categories[1]},
                    {name: "דוריטוס" , category: categories[2]},
                    {name: "במבה" , category: categories[2]},
                    {name: "ציפס" , category: categories[2]},
                    {name: "ביסלי" , category: categories[2]},
                    {name: "פרינגלס" , category: categories[2]},
                    {name: "עוף" , category: categories[0]},
                    {name: "דג" , category: categories[0]},
                    {name: "שווארמה" , category: categories[0]},
                    {name: "צלי" , category: categories[0]},
                    {name: "סטייק" , category: categories[0]}]

  const onSubmitForm = data => {
    // console.log(forms);
    if(forms===true){
      isInList({id: (productsInBag+1).toString() ,name: data.name ,category : data.category, price : data.price , quantity: data.quantity})
    }
   else{
    isInList({id: (productsInBag+1).toString() ,name:data.name1 , category : data.category1, price : data.price1 , quantity: data.quantity1})
   }
  };
   
   const [error] = useState(null);
   const [resp ] = useState();
   const [order] = useState([{name:"catgory" , direction: -1} ,{name:"price" , direction: -1} ,{name:"total" , direction: -1}]);
   const [selectCategory , setCategory] = useState(null);
   const [forms , setForm]= useState(true);
  //  const [rows , setRows]  = useState([{ id :'1',name : 'milk' ,category : 'milk products', price :'5' , quantity: '2'},
  //                                      {id:'2',name : 'coca-cola' ,category : 'drinks', price :'3' , quantity: '3'} ]);
  const [rows , setRows]  = useState([]);
  const [productsInBag , setCount] = useState(rows.length);
  
    // const [productsInBag , setCount] = useState(rows.length);
  
    
    useEffect(() => {
      Axios({
        method: "GET",
        url: "http://localhost:5000/",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        console.log(res.data);
        var myArr= res.data.rows;
        console.log(myArr.rows);
        debugger;
        myArr.forEach(element => {
          rows.push(element);
        });
        setCount(rows.length);
        sortArr(null)
      });
     // eslint-disable-next-line
    }, [])

  function getItemsByCat(category){
    var filterItems = products.filter(product => product.category === category);
    return filterItems;
  }
  function addProdoct (newItem) {
    debugger;
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
         setRows(rows);
        setCount(rows.length);
    }
     
  

  function isInList(newItem){
    debugger;
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
      console.log("liel");
      console.log(res.data.index)
      if(res.data.index === -1){
        addProdoct(newItem)
        reloadRows();
      }
      else{
        swal("product already in list" ,"", "error");
      }
      });
     
  }
  function getsum () {
    return rows.reduce((a, b) => a + ((b.price  || 0)*(b.quantity  || 0)), 0);
  }
  function deleteItem (newItem) {
    debugger;
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
        console.log(res.data.rows);
        setCount(res.data.rows.length);
        setRows(res.data.rows);
        });
    }
    // setRows(rows.filter(item=>item!==newitem));
    // console.log(rows.length);
    // console.log(rows);
    // debugger;
    // setCount(rows.filter(item=>item!==newitem).length);
  
  function changeSort (sortValue) {
    setCategory(sortValue);
    order[(order.findIndex(element => element.name = sortValue))].direction *=-1;
    setCount(rows.length);
    debugger;
  }

  function reloadRows()
  {
    Axios({
      method: "GET",
      url: "http://localhost:5000/",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log(res.data);
      var myArr= res.data.rows;
      console.log(myArr.rows);
      debugger;
      setRows(myArr);
      setCount(rows.length);
      sortArr(selectCategory);
      window.location.reload(false);
    });
  }
  function sortArr(select){
    var sortRows;
    if(select!= null){
      var orederDir = order[(order.findIndex(element => element.name = select))].direction;
      sortRows = rows;
      //desc
      if (orederDir=== 1)
      {
        if(select === "total"){
          sortRows =rows.sort((a,b) => (a.price *a.quantity> b.price *b.quantity) ? 1 : ((b.price *b.quantity > a.price *a.quantity) ? -1 : 0))
        }
        else{
            sortRows =rows.sort((a,b) => (a[select]> b[select]) ? 1 : ((b[select] > a[select]) ? -1 : 0))
        }
        return sortRows;
      }
      //asc
      else{
        if(select === "total"){
          sortRows =rows.sort((a,b) => (a.price *a.quantity< b.price *b.quantity) ? 1 : ((b.price *b.quantity < a.price *a.quantity) ? -1 : 0))
        }
        else{
          sortRows =rows.sort((a,b) => (a[select]< b[select]) ? 1 : ((b[select] < a[select]) ? -1 : 0))
        }
        return sortRows;
      }
    }
    else{
      sortRows = rows;
      // var reso = resp;
      // console.log(reso);
      debugger;
    }
    // debugger;
    // for(const element of sortRows) {
    //   console.log(element.name);
    //   debugger;
    //   element.totalPrice = element.price *element.quantity;
    // }
    
    return sortRows;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } 
   
  else {
    return (
      <div className={`frame`}>
      <div className={`data`}>
        <div>
          <h1 className= {`title`}>רשימת הקניות שלי ({productsInBag}) ⚛️</h1>
          <div id="divInCenter">
            {/* <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection /> */}
            <div  id="table-wrapper">
            <table id="process-manager-table" class="table table-sm">
          <tbody>
            <tr>
              <th scope="col">
                <button type="button"  class="btn btn-outline-secondary">name ⇅</button></th>
              <th scope="col">
              <button type="button" onClick={() => changeSort("category")} class="btn btn-outline-secondary">category ⇅ </button></th>
              <th scope="col">
              <button type="button" onClick={() => changeSort("price")} class="btn btn-outline-secondary">price ⇅ </button></th>
              <th scope="col">
                <button type="button"  class="btn btn-outline-secondary">quantity ⇅</button></th>
              <th scope="col">
                <button type="button" onClick={() => changeSort("total")} class="btn btn-outline-secondary">total price ⇅</button></th>
            </tr>
            {sortArr(selectCategory).map(item => {
              return (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.quantity *item.price}</td>
                   <button className={`pointer`} onClick = {() => deleteItem(item)}>🗑️</button>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        <div  id="totalPrice">
            מחיר סופי:{getsum()}
            {getsum()< 20 &&
            <div>✔</div>
            
            }
            {getsum()>20 &&
            <div>❌</div>
            }
        </div>
        </div>
        </div>
        
        <h1>{resp}</h1> 
      <div id="divInleft">
      <form onSubmit={handleSubmit(onSubmitForm)}>
      <label for="colFormLabel" class="col-sm-2 col-form-label">category</label>
      <select  required name = "category1" id="inputState" ref={register} onChange={e => setCategory(e.currentTarget.value) } class="form-control">
      <option>category </option>
      {categories.map(item => {
            return (
             <option value={item}> {item} </option>
            )
         })}
      </select>
      <label for="colFormLabel" class="col-sm-2 col-form-label" required>name</label>
      <select required name = "name1"  id="inputState" ref={register} class="form-control">
      {getItemsByCat(selectCategory).map(item => {
            return (
             <option value={item.name}> {item.name} </option>
            )
         })}
      </select>
      
      <label for="colFormLabel" class="col-sm-2 col-form-label">quantity</label>
      <input required name="quantity1" type="text" ref={register}  class="form-control form-control-lg" id="colFormLabelLg" placeholder="quantity" />
      <label for="colFormLabel" class="col-sm-2 col-form-label">price</label>
      <input required name="price1" type="text" ref={register} pattern="[1-9]" title="not good" class="form-control form-control-lg" id="colFormLabelLg" placeholder="price"/>
      <button type="submit" onClick={() => setForm(false)} class="btn btn-primary" >add item</button>
      </form>
      </div>

      <div id="divInright">
     
<form onSubmit={handleSubmit(onSubmitForm)}>
      <label for="colFormLabel" class="col-sm-2 col-form-label">name</label>
      <input required name="name" type="text" ref={register} class="form-control form-control-lg" id="colFormLabelLg" placeholder="name"/>
      <label for="colFormLabel" class="col-sm-2 col-form-label">category</label>
      <input required name="category" type="text" ref={register} class="form-control form-control-lg" id="colFormLabelLg" placeholder="category"/>
      <label for="colFormLabel" class="col-sm-2 col-form-label">quantity</label>
      <input required name="quantity" type="text" ref={register}  class="form-control form-control-lg" id="colFormLabelLg" placeholder="quantity" />
      <label for="colFormLabel" class="col-sm-2 col-form-label">price</label>
      <input required name="price" type="text" ref={register} class="form-control form-control-lg" id="colFormLabelLg" placeholder="price"/>
      <button type="submit" onClick={() => setForm(true)} class="btn btn-primary" >add item</button>
    </form>
      </div>
      </div>
      </div>
    );
  }
}

export default App