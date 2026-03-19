import { useState } from "react";
import "./App.css";
import { db } from "./firebaseConnection";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    const postRef = doc(db, "Users", "blxpSMirngsItEmF3V0a");
    await getDoc(postRef)
      .then((snapshot) => {
        setName(snapshot.data().name);
        setEmail(snapshot.data().email);
        setPassword(snapshot.data().password);
      })
      .catch(() => {
        console.log("Errooo");
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
      </div>
    </div>
  );
}

export default App;
