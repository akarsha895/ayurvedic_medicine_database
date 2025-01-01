import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AboutUsPage() {
  return (
    <div className="text-black w-full h-screen">
      <Navbar />
      <div className="bg-color-2 text-lg text-white p-6 w-2/3 m-auto my-4">
        <h1 className="text-4xl text-center font-serif">About Us</h1>
        <h2 className="text-2xl mt-4">Introduction to Ayurveda</h2>
        <p>
          Ayurveda is an ancient healing system that originated in India over 5,000 years ago. The term "Ayurveda" is derived from two Sanskrit words: 
          <strong> "Ayur" (Life)</strong> and <strong> "Veda" (Knowledge, Science, Wisdom)</strong>. It is often referred to as the "Science of Life," focusing on maintaining health and well-being rather than merely treating diseases.
        </p>

        <h2 className="text-2xl mt-4">Our Mission</h2>
        <p>
          To provide a comprehensive platform that serves as a repository of Ayurvedic knowledge and practices, empowering individuals with the information necessary to make informed decisions about their health and wellness through Ayurveda.
        </p>

        <h2 className="text-2xl mt-4">Objectives of Our Ayurvedic Medicinal Database</h2>
        <ul className="list-disc list-inside mt-2">
          <li>Provide comprehensive information on medicinal plants.</li>
          <li>Educate users about various diseases and their Ayurvedic treatments.</li>
          <li>Promote the use of natural remedies and holistic health practices.</li>
          <li>Encourage research and exploration in the field of Ayurveda.</li>
        </ul>

        <h2 className="text-2xl mt-4">Our Vision</h2>
        <p>
          To be a leading resource for Ayurvedic knowledge, bridging the gap between ancient wisdom and modern health practices, and inspiring a global community to embrace holistic health and wellness through the principles of Ayurveda.
        </p>

        <h2 className="text-2xl mt-4">Why Choose Us?</h2>
        <ul className="list-disc list-inside mt-2">
          <li><strong>Expertise:</strong> Our team consists of Ayurvedic practitioners and researchers dedicated to providing accurate and reliable information.</li>
          <li><strong>User-Friendly:</strong> The database is designed to be accessible and easy to navigate for users of all backgrounds.</li>
          <li><strong>Community Engagement:</strong> We encourage feedback and contributions from users to continuously improve our platform.</li>
        </ul>

        <h2 className="text-2xl mt-4">Join Us</h2>
        <p>
          We invite you to explore our Ayurvedic Database Management System and embark on a journey towards better health and well-being through the wisdom of Ayurveda.
        </p>
      </div>

      <Footer />
    </div>
  );
}

export default AboutUsPage;