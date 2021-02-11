import React ,  {useState, useEffect} from "react"


function App() {
   const [error] = useState(null);



  useEffect(() => {
   

  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } 
   
  else {
    return (
      <div className={`data`}>
          <h1 className= {`title`}>רשימת הקניות שלי</h1>
      </div>
    );
  }
}

export default App