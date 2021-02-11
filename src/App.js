import React ,  {useState, useEffect} from "react"
// import Table from 'rc-table';
import { DataGrid } from '@material-ui/data-grid';

function App() {
  // const columns = [
  //   {
  //     id:1,
  //     title: 'Name',
  //     dataIndex: 'name',
  //     key: 'name',
  //     width: 100,
  //   },
  //   {
  //     id:2,
  //     title: 'Category',
  //     dataIndex: 'category',
  //     key: 'category',
  //     width: 100,
  //   },
  //   {
  //     id:3,
  //     title: 'Price',
  //     dataIndex: 'price',
  //     key: 'price',
  //     width: 200,
  //   },
  //   {
  //     id:4,
  //     title: 'Quantity',
  //     dataIndex: 'quantity',
  //     key: 'quantity',
  //     width: 200,
  //   },
    // {
    //   title: 'Operations',
    //   dataIndex: '',
    //   key: 'operations',
    //   render: () => <a href="#">Delete</a>,
    // },
  //];
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
  
  
   const [error] = useState(null);
   const [rows] = useState([{ id :'1',name : 'milk' ,category : 'milk products', price :'5' , quantity: '2'},
                                       {id:'2',name : 'coca-cola' ,category : 'drinks', price :'3' , quantity: '3'} ]);

    const [productsInBag] = useState(rows.length);

  useEffect(() => {
   

  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } 
   
  else {
    return (
      <div className={`frame`}>
      <div className={`data`}>
        <div>
          <h1 className= {`title`}>רשימת הקניות שלי {productsInBag}</h1>
          <div id="divInCenter">
            <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
          </div>
          </div>
          <div>
          {/* <hr
            style={{
                color: "black",
                backgroundColor: "black",
                height: 5,
            }}
          /> */}
         </div>
      </div>
      </div>
    );
  }
}

export default App