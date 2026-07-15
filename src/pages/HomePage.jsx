// src/pages/HomePage.jsx
// Mirrors home.html exactly: navbar, hero, ABSTRACT, team section, social links.

import Navbar from '../components/Navbar';
import '../styles/home.css';

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <div className="container">
        <div className="front" style={{ marginLeft: '45px' }}>
          WELCOME <br />TO<br /> FILIM.IN
        </div>
        <div className="ig">
          <img
            src="/cryptography.png"
            style={{ width: '550px', height: '450px', marginLeft: '50px', marginTop: '60px', borderRadius: '20px' }}
            alt="Filimin hero"
          />
        </div>
      </div>

      <br /><br /><br />

      {/* Abstract section */}
      <div className="ABSTRACT">
        <div className="head" style={{ fontSize: '55px', fontFamily: 'fantasy', paddingTop: '30px', color: 'white' }}>
          FILIM.in
        </div>
        <p style={{ color: '#1DE9B6' }}>
          Get Into The Universe Of Learning Financial Literacy
        </p>
        <br />
        <p style={{ color: 'whitesmoke', fontFamily: 'fantasy' }}>WHY FILIM.IN</p>
        <p style={{ color: '#1DE9B6', width: '1000px', marginLeft: '150px' }}>
          OUR WEBSITE HELPS YOU TO LEARN THE FINANCIAL TERMS AND INVOKE YOUR KNOWLEDGE IN IT.
        </p>
      </div>

      {/* Team section */}
      <div>
        <p className="foot">OUR TEAM</p>
        <div className="img">
          <img src="/Ar.jpg"     style={{ width: '150px', height: '150px', padding: '15px', borderRadius: '130px' }} alt="Rithin AR" />
          <img src="/naveen.jpg" style={{ width: '150px', height: '150px', padding: '15px', borderRadius: '120px', marginLeft: '235px' }} alt="Naveen Kumar" />
          <img src="/SPK.jpg"    style={{ width: '150px', height: '150px', padding: '15px', borderRadius: '130px', marginLeft: '215px' }} alt="Praveen Kumar S" />
        </div>
      </div>

      <p style={{ display: 'inline-block', marginLeft: '80px',  marginTop: '20px' }}>DEVELOPER</p>
      <p style={{ display: 'inline-block', marginLeft: '200px', marginTop: '20px' }}>DEVELOPER</p>
      <p style={{ display: 'inline-block', marginLeft: '180px', marginTop: '20px' }}>DEVELOPER</p>

      {/* Social links */}
      <div className="logo">
        <div className="icon1">
          <a href="https://www.instagram.com/rith_in_8248/" target="_blank" rel="noreferrer">
            <ion-icon name="logo-instagram"></ion-icon>
          </a>
          <a href="https://www.linkedin.com/in/naveen-kumar-663a14292" target="_blank" rel="noreferrer">
            <ion-icon name="logo-linkedin"></ion-icon>
          </a>
        </div>
        <div className="icon2">
          <a href="https://www.instagram.com/_mr._unknown_27" target="_blank" rel="noreferrer">
            <ion-icon name="logo-instagram"></ion-icon>
          </a>
          <a href="https://www.linkedin.com/in/rithin-rajavel-4a1825293" target="_blank" rel="noreferrer">
            <ion-icon name="logo-linkedin"></ion-icon>
          </a>
        </div>
        <div className="icon3">
          <a href="https://www.instagram.com/intresting_31/" target="_blank" rel="noreferrer">
            <ion-icon name="logo-instagram"></ion-icon>
          </a>
          <a href="https://www.linkedin.com/in/praveen-kumar-s-38b971288" target="_blank" rel="noreferrer">
            <ion-icon name="logo-linkedin"></ion-icon>
          </a>
        </div>
      </div>
    </>
  );
}
