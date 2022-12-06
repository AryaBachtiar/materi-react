import axios from 'axios';
import React, { useState } from 'react'
import"../style/Form.css"

export default function Form() {
    const [judul, setJudul] = useState("");
    const[deskripsi, setDeskripsi] = useState("");
    const[tahunterbit, setTahunterbit] = useState("");
    const[pengarang, setPengarang] = useState("");

    const addBuku = async(e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8000/daftarBuku", {
                judul: judul,
                deskripsi: deskripsi,
                tahunterbit: tahunterbit,
                pengarang: pengarang
            })
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
        <h1>Form Tambahkan Buku</h1>
        <form onSubmit={addBuku}>
            <div className='input'>
                <label htmlFor="input">Judul: </label>
                <input type="text" name="judul" id= "judul" onChange={(e) => setJudul(e.target.value)} required/>
            </div>
            <div className='input'>
                <label htmlFor="deskripsi">Deskripsi: </label>
                <input type="text" name="deskripsi" id="deskripsi" onChange={(e) => setDeskripsi(e.target.value)} required/>
            </div>
            <div className='input'>
                <label htmlFor="tahunterbit">Tahun Terbit: </label>
                <input type="date" name="tahunterbit" id="tahunterbit" onChange={(e) => setTahunterbit(e.target.value)} required/>
            </div>
            <div className='input'>
                <label htmlFor="pengarang">Pengarang: </label>
                <input type="text" name="pengarang" id="pengarang" onChange={(e) => setPengarang(e.target.value)} required/>
            </div>
            <br />
            <button type='submit'>Tambahkan</button>
        </form>
    </div>
  )
}

 