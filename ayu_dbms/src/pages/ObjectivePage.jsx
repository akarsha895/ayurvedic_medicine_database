import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ObjectivePage() {
  return (
    <div className='flex flex-col min-h-screen'>
    <Navbar />
    <div className="flex-grow my-24">
   
    <div className="bg-color-4 text-lg text-white p-6 w-2/3 m-auto my-">
        <h1 className="text-4xl text-center font-serif">About Ayurveda</h1>
        <p>"Ayurveda" is an ancient healing system and its roots originated in India more than 5,000 years ago. It is taken as the Upaveda of Atharvaveda (One among the four important Indian Vedas).
The word Ayurveda is a combination of two words: “Ayur” means Life, “Veda” means Knowledge, Science, Wisdom. It called a “Science of Life”. More than a system of treating disease, this is a science of life & basic principles of Ayurveda.
It gives a body of wisdom designed to help people stay healthy while realizing their full human potential guidelines on their ideal daily and seasonal routines, diet, behavior and the proper use of our senses, Ayurveda reminds us that health is the balanced and dynamic integration between our environment, body, mind, and spirit</p>

    </div>
   
      <div className='p-6 w-2/3 right-14 flex-wrap m-auto my-4'>
      <img src="https://images.onlymyhealth.com/only-my-health-english/images/2024/10/29/article/image/mn-Ayurvedic-Panchakarma-1730196755805.jpg" alt="Ayurveda" className="rounded-lg shadow-lg" />
      </div>
      
      <div className="bg-color-4 text-lg text-white p-6 w-2/3 m-auto my-4">
      <h1 className="text-4xl text-center font-serif ">Objectives of Ayurvedic Medicinal Database</h1>
      <p className="mt-4 text-lg">
        Our primary objectives are to:
        <ul className="list-disc list-inside mt-2">
          <li>Provide comprehensive information on medicinal plants.</li>
          <li>Educate users about various diseases and their Ayurvedic treatments.</li>
          <li>Promote the use of natural remedies and holistic health practices.</li>
          <li>Encourage research and exploration in the field of Ayurveda.</li>
        </ul>
      </p>
      </div>
     
    </div>
    <Footer />
    </div>
  );
}

export default ObjectivePage;