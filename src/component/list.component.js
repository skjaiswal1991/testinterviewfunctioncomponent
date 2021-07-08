import React, { useEffect, useState } from "react";
import axios from "axios";

function List() {
  const [usersdata, setUsersdata] = useState(null);
  const [initialData, setInitialData] = useState(null);
  useEffect(() => {
    axios.get("https://reqres.in/api/users?page=1").then((result) => {
      console.log(result.data.data);
      setUsersdata(result.data.data);
    });
  }, []);

  const shortbyemail = () => {
    setInitialData("( Short By Email )");
    let data = usersdata.sort(compare_email);
    console.log("shortbyemail", data);
    setUsersdata(data);
  };

  const shortbyname = () => {
    setInitialData("( Short By Name )");
    let data = usersdata.sort(compare_firstname);
    // console.log("shortByname", data);
    setUsersdata(data);
  };

  function compare_firstname(a, b) {
    if (a.first_name < b.first_name) {
      return -1;
    } else if (a.first_name > b.first_name) {
      return 1;
    } else {
      return 0;
    }
  }

  function compare_email(a, b) {
    if (a.email < b.email) {
      return -1;
    } else if (a.email > b.email) {
      return 1;
    } else {
      return 0;
    }
  }

  return (
    <>
      <h1>Show Data {initialData} </h1>
      <button onClick={shortbyname}> short By Name</button>
      <button onClick={shortbyemail}> short By Email</button>
      <table className="table">
        <thead>
          <tr>
            <td>id </td>
            <td>Name</td>
            <td>Email</td>
            <td>Image</td>
          </tr>
        </thead>
        <tbody>
          {usersdata &&
            usersdata.map((u, i) => (
              <tr key={i}>
                <td>{u.id}</td>
                <td>{u.first_name}</td>
                <td>{u.email}</td>
                <td>{u.avatar}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default List;
