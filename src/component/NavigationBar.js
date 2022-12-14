import axios from "axios";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { Modal, Form, InputGroup } from "react-bootstrap";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";

export default function NavigationBar() {
  const [show, setShow] = useState(false);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tahunterbit, setTahunterbit] = useState("");
  const [pengarang, setPengarang] = useState("");

  const history = useHistory();

  
  // Untuk Menampilkan Table
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addUser = async (e) => {
    e.preventDefault();
    swal("Berhasil Menambahkan ", "You clicked the button!", "success");

   
    const data = {
      judul: judul,
      deskripsi: deskripsi,
      tahunterbit: tahunterbit,
      pengarang: pengarang,
    };

    await axios
      .post("http://localhost:8000/daftarBuku", data)
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        
      })
      .catch((error) => {
        alert("Terjadi Kesalahan " + error);
      });
      
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      {/* Bagian Navbar  */}
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              {/* Agar Bisa MEnambahkan Jika di Klik  */}

              {localStorage.getItem("id") !== null ? (
                <>
              <li className="nav-item">
                <button className="btn" onClick={handleShow}>
                  Tambah Buku
                </button>
              </li>
              <li className="nav-item float-right">
                <a className="btn" onClick={logout}>Logout
                </a> 
              </li>
                </>
              ) : (
              <li className="nav-item float-right">
                <a className="btn" href="/login">
                  Login
                </a>
              </li>
              )}
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            
              <img src="https://64.media.tumblr.com/1e904f7848e1d3b0f1953c1a7bfc1f26/tumblr_mkydxbyuQ81s5jjtzo1_500.gif" alt="" 
              style={{width:100}}/>
          </Navbar.Collapse>
        </Container>
      </Navbar>
{/* End Navbar */}

      {/* Untuk Menambahkan data */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Buku</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addUser} method="POST">
            <Form.Group className="mb-3" controlId="formBasictext">
              <Form.Label>Judul</Form.Label>
              <Form.Control type="text" placeholder="Masukkan Judul" onChange={(e) => setJudul(e.target.value)} required />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control type="text" placeholder="Deskripsi" onChange={(e) => setDeskripsi(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDate">
              <Form.Label>Tahun Terbit</Form.Label>
              <Form.Control type="date" placeholder="" onChange={(e) => setTahunterbit(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Pengarang</Form.Label>
              <Form.Control type="text" placeholder="Pengarang" onChange={(e) => setPengarang(e.target.value)} required />
            </Form.Group>
            {/* Button yang bekerja jika di Close akan kembali/tidak jadi di tambahkan  */}
            <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* Button akan menambahkan data jika Di klik butoon nya dan akan langsung meambahkan data yang telah diisi  */}
          <Button variant="primary" type="submit">
            Save 
          </Button>
          </Form>
        </Modal.Body>
       
      </Modal>
    </div>
  );
}
