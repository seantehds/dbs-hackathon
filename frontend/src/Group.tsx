import { useEffect, useState } from 'react'
//import { apiFetch } from "./api"; // todo add api route
import './App.css' // todo change to a dedicated Groups.css?

var thisUserIsOwner = true; // todo change based on this user's owner status

function Group() {
  const [data, setData] = useState(0)
  const test = [
      {
        id: 1,
        name: "Alice",
        net: -10,
        isOwner: "True",
      },
      {
        id: 2,
        name: "Bob",
        net: 10,
        isOwner: "True",
      },
      {
        id: 3,
        name: "Charlie",
        net: -100,
        isOwner: "False",
      },
      {
        id: 4,
        name: "Denise",
        net: 100,
        isOwner: "False",
      },
    ]
  return (
    <>
      <h3>Members of Group X (other than you)</h3>
      <table>
        <tr>
            <td>Member Name</td>
            <td>Net Money</td>
            <td>Pay!</td>
            <td>Owner?</td>
            {thisUserIsOwner ?
                <td>Add/Remove Owner</td>
            :
                <div></div>
            }
            {thisUserIsOwner ?
                <td>Delete Member</td>
            :
                <div></div>
            }
        </tr>
        {test.map((r) => (
          <tr key={r.id}>
            <td>{r.name}</td>
            <td>{r.net}</td>
            <td>
                {r.net < 0 ?
                    <form action="http://www.google.com" method="GET">
                        <input name="amount_paid" defaultValue={-r.net}/>
                        <button>Pay</button>
                    </form>
                :
                    <div></div>
                }
            </td>
            <td>{r.isOwner}</td>
            {thisUserIsOwner && r.isOwner == "True" ?
                <td>
                    <form action="http://www.google.com" method="GET">
                        <input type="hidden" name="owner_status_modify" value="remove"/>
                        <button>Remove</button>
                    </form>
                </td>
            : thisUserIsOwner && r.isOwner == "False" ?
                <td>
                    <form action="http://www.google.com" method="GET">
                        <input type="hidden" name="owner_status_modify" value="add"/>
                        <button>Add</button>
                    </form>
                </td>
            :
                <div></div>
            }
            {thisUserIsOwner ?
                <td>
                    <form action="http://www.google.com" method="GET">
                        <input type="hidden" name="member_modify" value="delete"/>
                        <button>Delete</button>
                    </form>
                </td>
            :
                <div></div>
            }
            
          </tr>
        ))}
      </table>
    </>
  )
}

export default Group
