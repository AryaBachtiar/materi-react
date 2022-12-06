import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';

export default function Home() {

    const [buku, setBuku] = useState([]);

    const getAll = () => {
        axios
        .get("http://localhost:8000/daftarBuku")
        .then((res) => {
            setBuku(res.data);
        })
        .catch((error) => {
            alert("Terjadi Kesalahan " + error);
        })
    };

    useEffect(() => {
        getAll();
    }, []);

    const deleteUser = async (id) => {
        axios.delete("http://localhost:8000/daftarBuku/" + id);
        alert("User Berhasil dihapus Coy");
        getAll();
        window.location.reload();
    }

  return (
    <div className="container my-5">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>No.</th>
            <th>Judul</th>
            <th>Deskripsi</th>
            <th>Tahun Terbit</th>
            <th>Pengarang</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {buku.map((book, index) => {
            return (
                <tr key={book.id}>
                <td>{index + 1}</td>
                <td>{book.judul}</td>
                <td>{book.deskripsi}</td>
                <td>{book.tahunterbit}</td>
                <td>{book.pengarang}</td>
                <td>
                  <Button
                    variant="danger"
                    className="mx-1"
                    onClick={() => deleteUser(book.id)}
                  >
                      Hapus
                  </Button>
                  <a href={"/edit/" + book.id}>
                  <Button
                    variant="warning"
                    className="mx-1"
                  >
                      Ubah
                  </Button>
                  </a>
                </td>
              </tr>
            );
           
          })}
        </tbody>
      </table>
    </div>
  );
}
