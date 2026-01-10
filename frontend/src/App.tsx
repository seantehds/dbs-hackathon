import './App.css'
import { useState } from 'react';
import Table from './components/Table'
import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      fetch("http://localhost:5050/")
    }
  }

  const data = React.useMemo(() => getData(), []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={
          <>
            <div>Home</div>
            {/* <Table columns={columns} data={data} />

            <div className="min-h-screen bg-gray-100 text-gray-900">
              <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                <div className="">
                  <h1 className="text-xl font-semibold">Payments App</h1>
                </div>
                <div className="mt-4">
                  <Table columns={columns} data={data} />
                </div>
              </main>
            </div> */}
          </>
        }
        />
        <Route path='/login' element={
          <>
            <div style={{
              border: "solid",
              borderRadius: "10px",
              padding: "0px 32px 24px"
            }}>
              <h2>Login</h2>
              <form style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <input type="text" id="email" placeholder="Email" onChange={
                  e => {
                    setEmail(e.target.value)
                  }} />
                <input type="text" id="password" placeholder="Password" onChange={
                  e => {
                    setPassword(e.target.value)
                  }
                } />
                <button type="submit">Login</button>
              </form>
              <Link to="/register">Register</Link>
            </div>
          </>
        }
        />
        <Route path='/register' element={
          <>
            <div style={{
              border: "solid",
              borderRadius: "10px",
              padding: "0px 32px 24px"
            }}>
              <h2>Register</h2>
              <form style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <input type="text" id="email" placeholder="Email" />
                <input type="text" id="password" placeholder="Password" />
                <button type="submit" >Register</button>
              </form>
              <Link to="/login">Back</Link>
            </div>
          </>
        }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App
