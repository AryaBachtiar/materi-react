import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { InputGroup, Form } from 'react-bootstrap'
import { useHistory, useParams} from 'react-router-dom'
import Swal from 'sweetalert2';

export default function Edit() {
//Stage berfungsi untuk menyimpan data semantara
    const param = useParams();
    const [judul, setJudul] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [tahunterbit, setTahunterbit] = useState("");
    const [pengarang, setPengarang] = useState("");

    const history = useHistory();

    // Untuk Menmapilkan Data yang telah ditamabahkan 
  useEffect(() => {
    axios
    .get("http://localhost:8000/daftarBuku/" + param.id)
    .then((response) => {
        const newBook = response.data;
        setJudul(newBook.judul);
        setDeskripsi(newBook.deskripsi);
        setTahunterbit(newBook.tahunterbit);
        setPengarang(newBook.pengarang);
    })
    .catch((error) => {
        alert("Terjadi Kesalahan Bre!" + error);
    });
  }, []);

//   Bagian Untuk mengedit Data yang ada di dalam table
  const submitActionHandler = async (event) => {
    event.preventDefault();
   
    await axios 
    .put("http://localhost:8000/daftarBuku/" + param.id, {
        judul:judul,
        deskripsi:deskripsi,
        tahunterbit:tahunterbit,
        pengarang:pengarang
    })
    .then(() => {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            setTimeout(() => {
                history.push("/");
                window.location.reload();
              
            }, 1500);
            if (result.isConfirmed) {
              Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Anda Tidak Merubah Data Apapun', '', 'info')
            }
          })
        
    })
    .catch((error) => {
        alert("Terjadi Kesalahan: " + error);
    });
  };

//   Untuk Meanmpilkan dan mengedit data yang ada dalam table 
  return (
    <div className="edit mx-5">
        <div className="container my-5">
            <Form onSubmit={submitActionHandler}>
            <div className="name mb-3">
            <Form.Label>
             <strong>Judul</strong>
            </Form.Label>
            <InputGroup className="d-flex-gap-3">
                <Form.Control
                placeholder="Judul"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                />
            </InputGroup>
            </div>
        

        <div className="place-of-birth mb-3">
         <Form.Label>
            <strong>Deskripsi</strong>
         </Form.Label>
         <InputGroup className="d-flex gap-3">
            <Form.Control
            placeholder="Deskripsi"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            />
         </InputGroup>
        </div>
        <div className="place-of-birth mb-3">
         <Form.Label>
            <strong>Tahun Terbit</strong>
         </Form.Label>
         <InputGroup className="d-flex gap-3">
            <Form.Control
            placeholder="Tahun Terbit"
            value={tahunterbit}
            onChange={(e) => setTahunterbit(e.target.value)}
            />
         </InputGroup>
        </div>

        <div className="birth-date mb-3">
         <Form.Label>
            <strong>Pengarang</strong>
         </Form.Label>
        <div className="d-flex gap-3">
            <InputGroup className="d-flex gap-3">
                <Form.Control
                type="text"
                value={pengarang}
                onChange={(e) => setPengarang(e.target.value)}
                />
            </InputGroup>
        </div>
        </div>

        {/* Tombol Save untuk menconfirmasi jika ingin di edit */}
        <div className="d-flex justify-content-end align-center mt-2">
            <button className="buton btn" type="submit">
                Save
            </button>

        </div>
        </Form>
        </div>
    </div>
  )
}
