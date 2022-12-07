import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
// import swal from "sweetalert";
import Swal from 'sweetalert2';

export default function Home() {
  const [buku, setBuku] = useState([]);

  // Untuk menampilkan semua data yang ada di page awal(HOME)
  const getAll = () => {
    axios
      .get("http://localhost:8000/daftarBuku")
      .then((res) => {
        setBuku(res.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan " + error);
      });
  };

  useEffect(() => {
    getAll();
  }, []);
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  // Untuk menghapus data yang ada di dalam table
  const deleteUser = async (id) => {
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:8000/daftarBuku/" + id);
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
    getAll();
  };

  return (
    <div className="container my-5">
      {buku.length !== 0 ? (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>No.</th>
                <th>Judul</th>
                <th>Deskripsi</th>
                <th>Tahun Terbit</th>
                <th>Pengarang</th>
                {localStorage.getItem("id") !== null ? <th>Aksi</th> : <></>}
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
                    {localStorage.getItem("id") !== null ? (
                      <td>
                        <Button
                          variant="danger"
                          className="mx-1"
                          onClick={() => deleteUser(book.id)}
                        >
                          Hapus
                        </Button>
                        <a href={"/edit/" + book.id}>
                          <Button variant="warning" className="mx-1">
                            Ubah
                          </Button>
                        </a>
                      </td>
                    ) : (
                      <></>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <div>
            <h1>BELUM ADA DATA </h1>
          </div>
        </>
      )}
    </div>
  );
}
