import { useEffect, useState } from 'react'
import './App.css'
import { DataGrid } from '@mui/x-data-grid';






function App() {

  const [columns, setColumns] = useState([]);
  
  const [rows, setRows] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      try {
        const response = await fetch('http://localhost:5000/players');
        const data = await response.json();
        
        
        setColumns(Object.keys(data[0]).map((key) => {
          return {
            field: key,
            headerName: key,
            width: 130,
          }
        }));
        setRows(data.map((row, index) => {
          return { id: index, ...row }
        }));
        
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();

  }, []);

  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
    </>
  )
}

export default App
