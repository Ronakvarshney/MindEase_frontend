import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Questions = () => {
    const [loading, setLoading] = useState(true);
    const [questionData, setQuestionData] = useState(null);
    const [optiondata, setOptionData] = useState([]);
    const [totalscore, setTotalScore] = useState(0);
 
    const [selectedOption, setSelectedOption] = useState({});
    const[message , setmessage] = useState('');
    const navigate = useNavigate();
    const generateQuestion = async () => {
        try {
            const generate = await axios.post("http://localhost:3000/api/generate-question", null, { withCredentials: true });
            const res = await generate.data.response;
            const cleanData = res.replace(/```json\n|\n```/g, '').trim();
            const data = JSON.parse(cleanData);
            setQuestionData(data);
            setLoading(false);
            toast(data.msg);

        } catch (error) {
            setLoading(false);
            console.error(error.message);
            toast.error(error.message);
            toast.error("You are Unauthorished First Login")
        }
    };

    const handler = (selectedAnswer, correctAnswer, scoring, questionIndex, optionIndex) => {
        const isCorrect = selectedAnswer === correctAnswer;
        const score = isCorrect ? 1 : 0;

        // Update selected option for the question
        setSelectedOption(prevState => ({
            ...prevState,
            [questionIndex]: optionIndex // Track which option is selected
        }));

        // Update the optiondata state
        setOptionData(prevData => [
            ...prevData,
            { answer: selectedAnswer, isCorrect, score }
        ]);
    };
    const getScoringMessage=(scoring , totalScore)=> {
        for (let i = 0; i < scoring.length; i++) {
            // Split the range into min and max
            const [min, max] = scoring[i].range.split('-').map(Number);

            // Check if the totalScore is within this range
            if (totalScore >= min && totalScore <= max) {
                setmessage(scoring[i].message);
            
                setTimeout(() => {
                    navigate("/")
                }, 5000); // Return the message for the matched range
            }
        }

        return 'No message found for this score.';
    }

    useEffect(() => {
        generateQuestion();
    }, []);
    

    useEffect(() => {
        const total = optiondata.reduce((acc, curr) => acc + curr.score, 0);
        setTotalScore(total);
      
    }, [optiondata]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10">
            {
                loading ?
                    <div className="flex items-center justify-center">
                        <img src='/src/assets/Hourglass.gif' alt="loading" className="w-16 h-16" />
                    </div>

                    :
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
                        <h2 className="text-3xl font-semibold text-center text-blue-600">{questionData?.quiztitle}</h2>
                        <p className="text-gray-700 text-center my-4">{questionData?.description || questionData?.quizdescription}</p>
                        <div className="space-y-6">
                            {
                                questionData?.questions?.map((question, index) => (
                                    <div key={question?.questiontext} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                        <h3 className="text-xl font-medium text-gray-800">
                                            <span className="font-bold">{index + 1}.</span> {question?.questiontext}
                                        </h3>
                                        <ul className="space-y-3 mt-4">
                                            {question?.options?.map((answer, idx) => {
                                                const isSelected = selectedOption[index] === idx; // Check if this option was selected
                                                return (
                                                    <li
                                                        key={idx}
                                                        onClick={() => handler(answer, question?.correctanswertext , question?.scoring, index, idx)}
                                                        className={`p-2 border border-gray-300 rounded cursor-pointer transition ${isSelected ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
                                                    >
                                                        <span className="font-semibold">{idx + 1}:</span> {answer}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='bg-blue-500 p-2 text-white font-bold'>
                            MentalScore : {totalscore}
                        </div>
                        <div className=' w-full mt-4'>
                    
                            <button onClick={() => getScoringMessage(questionData?.scoring, totalscore)} className='bg-red-400 text-white font-bold p-2 '>Analysis Your Mental Health</button>
                    
                             <p className='text-xl font-semibold m-2 bg-gray-200 p-2 rounded-lg '>{message}</p>

                        
                        </div>
                    </div>
            }
            <ToastContainer/>
        </div>
    );
};

export default Questions;
