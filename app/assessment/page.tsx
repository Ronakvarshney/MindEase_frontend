"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Brain, Loader, ShieldCheck, Sparkles } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAssessmentStore } from "@/store/assessmentStore";
import { Toaster } from "react-hot-toast";

interface Question {
  question_text: string;
  options: string[];
}

const Page = () => {
  const [screen, setscreen] = useState(true);
  const [answers, setanswers] = useState<Record<string, string>>({});
  const [questionsData, setquestionData] = useState<Question[]>([]);
  const [loading , setloading] = useState(false);
  const { addDetails } = useAssessmentStore();
  const navigate = useRouter();

  const handleChange = async (indx: number, option: string) => {
    console.log(option, indx + 1);
    setanswers((prev) => ({ ...prev, [questionsData[indx].question_text]: option }));
  };

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/generate/assessment");
        console.log(res.data);
        if (res.data) setquestionData(res.data.assessment.questions);
      } catch (error) {
        console.error("Failed to fetch assessment questions:", error?.message);
      }
    };
    loadQuestions();
  }, []);

  

  const submitHandler = async () => {
    setloading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/v1/analyze/assessment", { answers });
      if (res.data.result) {
        console.log(res.data.result)
        const data = res.data.result ;
        addDetails(data.risk_level , data.mental_health_score , data.overall_summary);
        navigate.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
      {screen ? (
        <div className="max-w-3xl w-full px-4">
          <div className="bg-white rounded-[3rem] p-12 text-center border border-slate-100 shadow-xl shadow-indigo-500/5">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
              <Brain size={40} />
            </div>
            <h1 className="text-4xl font-black text-slate-900 mb-6">
              Start your <span className="text-mental-blue">Vibe Check.</span>
            </h1>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed">
              A simple, AI-powered conversation to help you understand your
              current headspace. No scary forms—just a gentle check-in.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-left">
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <ShieldCheck className="text-emerald-500" />
                <span className="text-sm font-bold text-slate-700">
                  100% Private
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <Sparkles className="text-amber-500" />
                <span className="text-sm font-bold text-slate-700">
                  AI Personalization
                </span>
              </div>
            </div>
            <button
              onClick={() => setscreen(false)}
              className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-mental-blue transition-all flex items-center justify-center gap-3 shadow-xl"
            >
              Begin Assessment <ArrowRight />
            </button>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-900 text-white p-6">
          <div className="max-w-6xl mx-auto bg-gray-800 rounded-2xl shadow-xl p-6">
            <h1 className="text-3xl font-bold mb-2">
              Mental Health Assessment
            </h1>
            <p className="text-gray-400 mb-6">
              Please answer the following questions honestly. This helps us
              understand your current mental well-being.
            </p>

            {questionsData.map((q, index) => (
              <div key={index} className="mb-6 p-4 bg-gray-700 rounded-xl">
                <h2 className="font-semibold mb-3">
                  {index + 1}. {q?.question_text}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {q.options.map((opt, optIndex) => (
                    <label
                      key={optIndex}
                      className={`cursor-pointer p-3 rounded-lg border transition-all duration-200 flex items-center gap-2 
                    ${
                      answers[q.question_text] === opt
                        ? "bg-blue-600 border-blue-400"
                        : "bg-gray-800 border-gray-600 hover:border-gray-400"
                    }`}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={opt}
                        checked={answers[q.question_text] === opt}
                        onChange={() => handleChange(index, opt)}
                        className="hidden"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-8 text-center">
              <button
                className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl font-semibold shadow-lg"
                onClick={() => submitHandler()}
              >
                {loading ? <Loader size={25}/> : `Submit Assessment` }
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default Page;
