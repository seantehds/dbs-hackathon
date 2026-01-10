import { useState } from 'react'
import './App.css'
import Table from './components/Table'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

const outstandingAmount = [

]

const getData = () => [
  {
    name: "Jane Cooper",
    role: "Admin",
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Cody Fisher",
    role: "Owner",
    imgUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Esther Howard",
    role: "Member",
    imgUrl:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Jenny Wilson",
    role: "Member",
    imgUrl:
      "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Kristin Watson",
    role: "Admin",
    imgUrl:
      "https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Cameron Williamson",
    //statement: `You owe A ${net}`
    role: "Member",
    imgUrl:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
];

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Group",
        accessor: "name",
      },
      {
        Header: "",
        accessor: "role",
        //accessor: "statement" //have to think about how to get the concluding statement
      }
    ],
    []
  );

  const data = React.useMemo(() => getData(), []);

  return (
    <>
      <h1>Hello React!</h1>
      <Table columns={columns} data={data} />

      <Router>
        <div className="container">
          <Header />

          <Routes>
            <Route path='/' element={
              <>

              </>
            }
            />
            <Route path='login/' element={
              <>

              </>
            }
            />
          </Routes>

          <Footer />
          {/*<h2>Hello {name}</h2>*/}
        </div>
      </Router>
    </>
  );
}

export default App
