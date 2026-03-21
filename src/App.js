import { useState } from "react";
import "./App.css";
import { db } from "./firebaseConnection";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [users, setUsers] = useState([]);

  async function handleAdd() {
    await addDoc(collection(db, "Users"), {
      name: name,
      email: email,
      password: password,
    })
      .then(() => {
        console.log("Deuuu");
      })
      .catch((error) => {
        console.log("erro" + error);
      });
  }

  async function getPost() {
    // const postRef = doc(db, "Users", "blxpSMirngsItEmF3V0a");
    // await getDoc(postRef)
    //   .then((snapshot) => {
    //     setName(snapshot.data().name);
    //     setEmail(snapshot.data().email);
    //     setPassword(snapshot.data().password);
    //   })
    //   .catch(() => {
    //     console.log("Errooo");
    //   });

    const usersRef = collection(db, "Users");
    await getDocs(usersRef)
      .then((snapshot) => {
        let list = [];

        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            name: doc.data().name,
            email: doc.data().email,
            password: doc.data().password,
          });
        });

        setUsers(list);
        console.log(list);
      })
      .catch((error) => {
        console.log("Ocoreu um erro");
      });
  }

  return (
    <div className="App">
      <h2>Starting react with firebase</h2>
      <div className="container">
        <label>Name</label>
        <input
          type="text"
          placeholder="type your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="type your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="type your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleAdd}>Create</button>
        <button onClick={getPost}>Create</button>

        <ul>
          {users.map((user) => {
            return (
              <li key={user.id}>
                <span>Name:{user.name}</span>
                <br />
                <span>email:{user.email}</span>
                <br />
                <span>Name:{user.password}</span>
                <br />
                <br />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
