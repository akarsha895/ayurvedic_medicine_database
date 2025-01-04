import React from 'react'
import AdminNavbar from './AdminNavbar';
import { Link } from 'react-router-dom';
import HomeImg from '../assets/homeimg.jpg';
import medicinalPlant from '../assets/medicinalPlant.png';
import Disease from '../assets/disease.png';
import AyuMed from '../assets/ayurvedicMedicine.png';
import HerbalPrep from '../assets/herbalPreparation.png';
import Footer from '../components/Footer';
import logo from '../assets/logo.png';

function AdminHome() {
  return (
    <div>
      <AdminNavbar />
      <div className=" text-white my-20 w-full h-screen">
        {/* Main Content */}
        <section>
          <div className="flex  font-serif  m-4">
            {/* Left Section */}
            <div className="w-1/2  h-92 m-2  bg-color-3   rounded-lg shadow-lg">
              <div className="bg-color-3 text-white p-6  ">
                <h1 className="text-8xl text-center font-serif">Ayurvedic</h1>
                <br />
                <h1 className="text-7xl font-serif">Medicinal Database</h1>

                <p className="mt-2  text-lg">
                  {" "}
                  Ayurveda is an ancient medicine system of the Indian subcontinent. It is said to have originated in India about 5000 years back. The word Ayurveda is a conjugation of two Sanskrit words 'ayus', meaning 'life' and 'veda', meaning 'science', thus ayurveda literally means the 'science of life'.
                </p>
                <button className="bg-color-4 text-white p-2 rounded-lg  border-2 mt-4 hover:border-color-1 hover:text-white">
                  <Link to="/aboutus" className="text-white">
                    
                    Explore More..
                  </Link>
                </button>
              </div>
            </div>

            {/* Right Section - Carousel */}
            <div className="w-1/2 h-1/2 m-2   rounded-lg shadow-lg">
              <img
                style={{ width: "100%", height: "100%" }}
                src={HomeImg}
                alt="Placeholder"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Bottom Section with Four Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          <div className="bg-color-4 text-white p-4 rounded-lg shadow-lg hover:border-color-1 hover:shadow-lg hover:border-2">
            <img src={medicinalPlant} alt="medplant" className="inline" />
            <Link to="/medicinalPlant" className="relative inline-block group">
              <h3 className="font-bold text-xl p-2 inline">Medicinal Plants</h3>
              <span className="absolute left-0 right-0 bottom-[-6px] h-[3px] bg-white rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            </Link>
            <p>
              Explore the healing power of nature with our extensive collection
              of medicinal plants, each offering unique therapeutic benefits.
            </p>
          </div>

          <div className="bg-color-4 text-white p-4 rounded-lg shadow-lg hover:border-color-1 hover:shadow-lg hover:border-2">
            <img src={Disease} alt="disease" className="inline" />
            <Link to="/disease" className="relative inline-block group">
              <h3 className="font-bold text-xl p-2 inline">Disease</h3>
              <span className="absolute left-0 right-0 bottom-[-6px] h-[3px] bg-white rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            </Link>
            <p>
              Discover insights into various diseases, their causes, symptoms,
              and effective Ayurvedic treatments to promote holistic healing.
            </p>
          </div>

          <div className="bg-color-4 text-white p-4 rounded-lg shadow-lg hover:border-color-1 hover:shadow-lg hover:border-2">
            <img src={AyuMed} alt="ayu med" className="inline" />
            <Link to="/ayumed" className="relative inline-block group">
              <h3 className="font-bold text-xl p-2 inline">
                Ayurvedic Treatments
              </h3>
              <span className="absolute left-0 right-0 bottom-[-6px] h-[3px] bg-white rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            </Link>
            <p>
              Delve into the principles of Ayurvedic medicine, focusing on
              natural remedies and holistic approaches to restore balance and
              wellness.
            </p>
          </div>

          <div className="bg-color-4 text-white p-4 rounded-lg shadow-lg hover:border-color-1 hover:shadow-lg hover:border-2">
            <img src={HerbalPrep} alt="herbal prep" className="inline" />
            <Link to="/herbalprep" className="relative inline-block group">
              <h3 className="font-bold text-xl p-2 inline">
                Herbal Preparation
              </h3>
              <span className="absolute left-0 right-0 bottom-[-6px] h-[3px] bg-white rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            </Link>
            <p>
              Uncover the art of herbal preparation, where traditional methods
              meet modern practices to create effective natural remedies.
            </p>
          </div>
        </div>
        <section>
          
        </section>

        {/* Footer Section */}
        
      </div>
      <Footer />
    </div>
  )
}

export default AdminHome;