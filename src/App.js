import React ,  {useState, useEffect} from "react"
import { DataGrid } from '@material-ui/data-grid';
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', sortable: false, headerName: 'name', width: 130 },
    { field: 'price', headerName: 'price',type: 'number', width: 130 },
    {
      field: 'quantity',
      headerName: 'quantity',
      type: 'number',
      width: 160
    }
  ];
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
    console.log(forms);
    debugger;
    if(forms===true){
      addProdoct({id: (productsInBag+1).toString() ,name: data.name ,category : data.category, price : data.price , quantity: data.quantity})
    }
   else{
    addProdoct({id: (productsInBag+1).toString() ,name:data.name1 , category : data.category1, price : data.price1 , quantity: data.quantity1})
   }
  };
  
   const [error] = useState(null);
   const [selectCategory , setCategory] = useState(null);
   const [forms , setForm]= useState(true);
   const [rows , setRows]  = useState([{ id :'1',name : 'milk' ,category : 'milk products', price :'5' , quantity: '2'},
                                       {id:'2',name : 'coca-cola' ,category : 'drinks', price :'3' , quantity: '3'} ]);

    const [productsInBag , setCount] = useState(rows.length);
  
    
    useEffect(() => {
        
    }, [])

  function getItemsByCat(category){
    var filterItems = products.filter(product => product.category === category);
    console.log(filterItems)
    debugger;
    return filterItems;
  }
  function addProdoct (newItem) {
    if(forms){
      console.log("a")
    }
    rows.push(newItem);
    setRows(rows);
    setCount(rows.length);
    console.log(rows);
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } 
   
  else {
    return (
      <div className={`frame`}>
      <div className={`data`}>
        <div>
          <h1 className= {`title`}>רשימת הקניות שלי ({productsInBag})</h1>
          <div id="divInCenter">
            <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
          </div>
        </div>
         
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