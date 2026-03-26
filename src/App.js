import { useEffect, useState } from "react";
import "./App.css";
import { auth, db } from "./firebaseConnection";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");

  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUSer] = useState("");

  const [users, setUsers] = useState([]);

  const [user, setUser] = useState(false);
  const [userDetail, setUserDetail] = useState();

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

  useEffect(() => {
    async function LoadPost() {}

    const unsub = onSnapshot(collection(db, "Users"), (snapshot) => {
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
    });
    LoadPost();
  }, []);

  useEffect(() => {
    async function checkLogin() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(true);
          setUserDetail({
            uid: user.uid,
            email: user.email,
          });
        }
      });
    }
    checkLogin();
  }, []);

  async function updateUser() {
    const userRef = doc(db, "Users", userId);
    await updateDoc(userRef, {
      name: name,
      email: email,
      password: password,
    }).then(() => {
      console.log("User was updated");
      setEmail("");
      setName("");
      setPassword("");
    });
  }

  async function deleteUser(id) {
    const userRef = doc(db, "Users", id);
    await deleteDoc(userRef).then(() => {
      alert("User Deleted");
    });
  }

  async function newUser() {
    await createUserWithEmailAndPassword(auth, emailUser, passwordUser)
      .then((value) => {
        console.log("Cadastrado com successo", value);
      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          alert("Senha muito fraca");
        } else if (error.code === "auth/email-already-in-use") {
          alert("Email ja existe");
        }
      });
  }
  async function login() {
    await signInWithEmailAndPassword(auth, emailUser, passwordUser)
      .then((value) => {
        console.log("Usuario logado");

        setUserDetail({
          uid: value.user.uid,
          email: value.user.email,
        });
        setUser(true);

        setEmailUser("");
        passwordUser("");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function logout() {
    await signOut(auth);
    setUser(false);
    setUserDetail({});
  }

  return (
    <div className="App">
      <h2>Starting react with firebase</h2>
      {user && (
        <div>
          <strong>Seja bem vindo voce esta logado !</strong>
          <span>
            ID: {userDetail.uid} - Email:{userDetail.email}
          </span>
          <button onClick={logout}>Logout</button>
        </div>
      )}
      <div className="container">
        <label>Email</label>
        <input
          value={emailUser}
          onChange={(e) => setEmailUser(e.target.value)}
          placeholder="type Email"
        />
        <br />
        <label>Password</label>
        <input
          value={passwordUser}
          onChange={(e) => setPasswordUSer(e.target.value)}
          placeholder="type the password"
        />
        <br />
        <button onClick={newUser}>Sign in</button>
        <button onClick={login}>Login</button>
      </div>
      <hr></hr>
      <br /> <br />
      <div className="container">
        <label>ID do Post:</label>

        <input
          placeholder="Digite o ID do post"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <br />

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
        {/* <button onClick={getPost}>findAll</button> */}
        <button onClick={updateUser}>update user</button>

        <ul>
          {users.map((item) => {
            return (
              <li key={user.id}>
                <strong>ID:{item.id}</strong>
                <br />
                <span>Name:{item.name}</span>
                <br />
                <span>email:{item.email}</span>
                <br />
                <span>Name:{item.password}</span>
                <br />
                <button onClick={() => deleteUser(user.id)}>Delete</button>{" "}
                <br />
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
