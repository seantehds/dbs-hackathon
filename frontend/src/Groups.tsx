import { useEffect, useState } from 'react'
//import { apiFetch } from "./api"; // todo add api route
import './App.css' // todo change to a dedicated Groups.css?

function Groups() {
  const [data, setData] = useState(0)
  const test = [
      {
        id: 1,
        name: "Group1",
        net: -10,
      },
      {
        id: 2,
        name: "Group2",
        net: 10,
      },
      {
        id: 3,
        name: "Group3",
        net: -100,
      },
      {
        id: 4,
        name: "Group4",
        net: 100,
      },
    ]
  return (
    <>
      <h3>Groups</h3>
      <table>
        <tr>
            <td>Group Name</td>
            <td>Net Money</td>
        </tr>
        {test.map((r) => (
          <tr key={r.id}>
            <td><a href="https://www.google.com">{r.name}</a></td>
            <td><a href="https://www.google.com">{r.net}</a></td>
          </tr>
        ))}
      </table>
    </>
  )
}

export default Groups
