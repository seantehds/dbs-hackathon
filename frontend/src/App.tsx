import './App.css'
import { useState } from 'react';
import Table from './components/Table'
import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
// import Header from './components/Header'
// import Footer from './components/Footer'

const outstandingAmount = [

]

const getData = () => [
  {
    name: "Jane Cooper",
    role: "You are owed $150",
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Cody Fisher",
    role: "You owe $20",
    imgUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Esther Howard",
    role: "You are owed $5",
    imgUrl:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Jenny Wilson",
    role: "You owe $250",
    imgUrl:
      "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Kristin Watson",
    role: "You owe $1000",
    imgUrl:
      "https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Cameron Williamson",
    //statement: `You owe A ${net}`
    role: "You are owed $300",
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
      const res = await fetch("http://localhost:5050/api/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email, password
        })
      })
      if (res.status === 200) {
        window.location.href = "http://localhost:5173/"
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:5050/api/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email, password
        })
      })
      if (res.status === 201) {
        window.location.href = "http://localhost:5173/login"
      }
    } catch (err) {
      console.log(err)
    }
  }

  const data = React.useMemo(() => getData(), []);

  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path='/' element={
          <>
            {/* <div>Home</div> */}
            <Table columns={columns} data={data} />
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
                <button type="submit" onClick={handleLogin}>Login</button>
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
                <input type="text" id="email" placeholder="Email" onChange={
                  e => {
                    setEmail(e.target.value)
                  }} />
                <input type="text" id="password" placeholder="Password" onChange={
                  e => {
                    setPassword(e.target.value)
                  }
                } />
                <button type="submit" onClick={handleRegister}>Register</button>
              </form>
              <Link to="/login">Back</Link>
            </div>
          </>
        }
        />
      </Routes>

      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App
