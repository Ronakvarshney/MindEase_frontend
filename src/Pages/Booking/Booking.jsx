import React from 'react'
import { useNavigate } from 'react-router-dom';

const Booking = () => {
  const navigate = useNavigate();
  
  const experts = [
    {
      src: '/src/assets/woman-doctor-wearing-lab-coat-with-stethoscope-isolated.jpg',  // Replace with actual image path
      alt: 'Expert 1',
      name: 'Dr. Saraha Williams',
      description: 'Dr. Sarah Williams is a clinical psychologist with over 15 years of experience in treating mental health issues. She specializes in treating depression, anxiety disorders, and PTSD. Dr. Williams uses evidence-based therapies like Cognitive Behavioral Therapy (CBT) and Mindfulness-Based Stress Reduction (MBSR) to help patients lead healthier and happier lives.',
      specialization: 'Psychology',
      degrees: ['PhD in Clinical Psychology', 'Licensed Psychologist'],
    },
    {
      src: '/src/assets/istockphoto-177373093-612x612.jpg',  // Replace with actual image path
      alt: 'Expert 2',
      name: 'Dr. John Smith',
      description: 'Dr. John Smith is a psychiatrist who specializes in treating mood disorders, including depression and bipolar disorder. With extensive experience in both pharmacological and therapeutic approaches, Dr. Smith helps patients manage their mental health conditions through a holistic approach, including therapy, medication management, and lifestyle adjustments.',
      specialization: 'Psychiatry',
      degrees: ['MD', 'Board Certified in Psychiatry'],
    },
    {
      src: '/src/assets/photo_2024-12-18_09-48-23-850x600.jpg',  // Replace with actual image path
      alt: 'Expert 3',
      name: 'Dr. Emily Davis',
      description: 'Dr. Emily Davis is a psychotherapist and marriage counselor who helps individuals and couples overcome relationship issues, communication problems, and emotional challenges. She uses a blend of psychodynamic therapy, CBT, and couple’s therapy to help people build stronger, healthier relationships.',
      specialization: 'Therapy & Counseling',
      degrees: ['M.A. in Clinical Psychology', 'Licensed Marriage and Family Therapist (LMFT)'],
    },
    {
      src: '/src/assets/portrait-hansome-young-male-doctor-man.jpg',  // Replace with actual image path
      alt: 'Expert 4',
      name: 'Dr. Michael Clark',
      description: 'Dr. Michael Clark is a licensed clinical social worker with a focus on trauma and anxiety disorders. He works with patients to address the root causes of their anxiety and offers tools for managing stress and fear. He uses a combination of EMDR (Eye Movement Desensitization and Reprocessing) and CBT to help people heal from past trauma and regain control of their mental health.',
      specialization: 'Social Work & Therapy',
      degrees: ['LCSW (Licensed Clinical Social Worker)', 'Master of Social Work (MSW)'],
    },
    {
      src: '/src/assets/healthcare-workers-preventing-virus-quarantine-campaign-concept-cheerful-friendly-asian-female-physician-doctor-with-clipboard-daily-checkup-standing-white-background.jpg',  // Replace with actual image path
      alt: 'Expert 5',
      name: 'Dr. Laura Harris',
      description: 'Dr. Laura Harris is a renowned clinical psychologist specializing in adolescent mental health. She helps teenagers and young adults dealing with anxiety, depression, and self-esteem issues. Dr. Harris provides tailored therapeutic interventions and has a passion for empowering youth to cope with the pressures of school, relationships, and societal expectations.',
      specialization: 'Adolescent Psychology',
      degrees: ['PhD in Clinical Psychology', 'Licensed Psychologist'],
    },
    {
      src: '/src/assets/Dr.-Atul-Singhal--1733295298.png',  // Replace with actual image path
      alt: 'Expert 6',
      name: 'Dr. Peter Adams',
      description: 'Dr. Peter Adams is a clinical psychiatrist with a focus on holistic mental health. He integrates medication, psychotherapy, and lifestyle changes to help his patients overcome severe mental health conditions like chronic depression, anxiety, and substance abuse disorders. Dr. Adams advocates for the mind-body connection and promotes mental wellness through a comprehensive, individualized treatment approach.',
      specialization: 'Psychiatry & Holistic Mental Health',
      degrees: ['MD', 'Board Certified in Psychiatry', 'Certified in Integrative Psychiatry'],
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-20">
      <div className="grid md:grid-cols-3 gap-8">
        {experts.map((expert, indx) => (
          <div key={indx} className="bg-white p-2 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex flex-col items-center mb-6">
              <img className="w-32 h-32 rounded-full object-cover border-4 border-yellow-500 shadow-md" src={expert.src} alt={expert.alt} />
              <h2 className="text-xl font-semibold mt-4 text-gray-800">{expert.name}</h2>
              <p className="text-sm text-gray-600 text-center mt-2">{expert.description}</p>
            </div>

            <div className="text-center mb-4">
              <p className="text-lg font-medium text-gray-700">{expert.specialization}</p>
            </div>

            <div className="space-y-2 mb-6">
              {expert.degrees.map((degree, idx) => (
                <p key={idx} className="text-sm text-gray-500">{degree}</p>
              ))}
            </div>

            <div className="flex items-center justify-center">
              <button
                onClick={() => navigate("/appointment", { state: { expert } })}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transform transition duration-200 hover:scale-105">
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Booking
