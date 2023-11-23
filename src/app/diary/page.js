"use client";
import Link from "next/link";
import "@styles/diary.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Diary() {
  const [judul, setJudul] = useState([]);
  const [isiDiary, setIsiDiary] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [tulis, setTulis] = useState("");
  const [diary, setDiary] = useState([]);

  function handlerInputDiary(event) {
    // Prevent the browser from reloading the page
    event.preventDefault();
    setTulis(event.target.value);
  }
  function handlerSubmitDiary(event) {
    // Prevent the browser from reloading the page
    
    setDiary(tulis);
    console.log('isi diary:' + tulis);
  }
  function handlerKeyEnter(e){
    e.preventDefault
    if (e.key === 'Enter'){
      setTulis(e.target.value)
      setDiary(tulis);
    }
  }
  async function postDiary(){
    const updateDiary = [...isDynamicMetadataRoute, tulis]
    setData(updateDiary)
    setDiary('')
  }
  const isSubmitDisabled = tulis.trim() === '';

  const endpointAPI = "https://6555c48784b36e3a431e49a6.mockapi.io/diaryku";
  useEffect(() => {
    axios.get(endpointAPI)
      .then((res) => {
        const data = res.data;

        // ambil judul
        const judul = data.map((item) => item.judul);
        setJudul(judul);

        // ambil isi_diary
        const isi_diary = data.map((item) => item.isi_diary);
        setIsiDiary(isi_diary);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
    }, []);
  
    return (
      <div>
        <div className="banner-container"> 
        <div className="cta-banner-wrapper">
          {/* Tombol CTA */}
          <input
            name="input-nama"
            type="text"
            placeholder="Tuliskan namamu.."
            onChange={handlerInputDiary}
            onKeyDown={handlerKeyEnter}
          />
          <div
            className={`cta-button ${isSubmitDisabled ? 'disabled' : 'active'}`}
            onClick={isSubmitDisabled ? null : handlerSubmitDiary}
          >
             {/* Conditionally render text based on isSubmitDisabled */}
          <p>{isSubmitDisabled ? 'Disable' : 'Submit Nama'}</p>
          </div>
        </div>
        </div>
         
        {isLoading ? (
          "Loading..."
        ) : judul.length > 0 ? (
          <ul>
            {judul.map((item, idx) => (
              <Link href={`/diary/${item}/${isiDiary[idx]}`} style={{ textDecoration: 'none' }}>

              <li key={idx}>
              
                <div className="diary-container">
                  <h1>{judul[idx]}</h1>
                  <p className="p-diary">{isiDiary[idx]}</p>
                </div>
              </li>
              </Link>
            ))}
          </ul>
        ) : (
          "API not loading"
        )}
      </div>
    );
  }
  
