"use client";

import { useState } from "react";
import Image from "next/image";
import "@styles/home.css";

export default function Home() {
  const [tulis, setTulis] = useState("");
  const [diary, setDiary] = useState("Ardria Auliya");

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
  return (
    <>
      <div className="banner-container">
        {/* Kartunya */}
        <div className="header-banner-wrapper">
          {/* Foto Profil dan Nama */}
          <div className="profile-header-banner">
            {/* Foto Profil*/}
            <Image
              src="/assets/foto.png"
              alt="Picture of the author"
              fill
              objectFit="contain"
            />
          </div>
          <div className="content-header-banner">
            {/* Nama dan Kawan2*/}
            <h1>{diary}</h1>
            <div className="bio-nim-header-banner">
              {/* NIM dan BIO*/}
              <p>D121211001</p>
              <p>Mahasiswa Universitas Hasanuddin</p>
            </div>
          </div>
        </div>
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
    </>
  );
}