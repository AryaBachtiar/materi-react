import axios from 'axios';
import React, { useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Login() {

const[username, setUsername] = useState("");
const[password, setPassword] = useState("");

const history = useHistory();

const login = async (e) => {
    e.preventDefault();
    axios.get("http://localhost:8000/users").then(({data}) => {
        const user = data.find(
            (x) => x.username === username && x.password === password
        );
        if (user) {
            Swal.fire({
                icon:'success',
                title: 'Masuk Sebagai' + username,
                showConfirmButton: false,
            })
            setTimeout(() => {
                localStorage.setItem("id", user.id)
                history.push("/");
                window.location.reload();
            }, 2000);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Username atau Password tidak valid!',
                showConfirmButton: false,
              
            })
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    });
};

  return (
    <div className="container border my-5 pt-3 pb-5 px-5">
        <h1 className="mb-5">Form Login</h1>
        <Form onSubmit={login} method="POST">
        <div className="mb-3">
        <Form.Label>
            <strong>Username</strong>
        </Form.Label>
        <InputGroup className="d-flex gap-3">
            <Form.Control
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            </InputGroup>
            </div>
            <div className="mb-3">
                <Form.Label>
                    <strong>Password</strong>
                </Form.Label>
                <InputGroup className="d-flex gap-3">
                    <Form.Control
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </InputGroup>
                </div> 
                <button variant="primary" type="submit" className="mx-1 button btn">
                    Login
                </button>
                </Form>
    </div>
  );
}
