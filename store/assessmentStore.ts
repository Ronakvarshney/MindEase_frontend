import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AssessmentSchema {
  risk_level: string;
  mental_health_score: number;
  overall_summary: string;

  addDetails: (
    risk_level: string,
    mental_health_score: number,
    overall_summary: string,
  ) => void;

  getDetails: () => {
    risk_level: string;
    mental_health: number;
    summary: string;
  };
}

// in typescript with zustand middlearws we have to use extra () this 
export const useAssessmentStore = create<AssessmentSchema>()(
  persist(
    (set, get) => ({
      //states =
      risk_level: "",
      mental_health_score: 0,
      overall_summary: "",

      addDetails: (
        risk_level,
        mental_health_score,
        overall_summary,
      ) =>{
        console.log(risk_level , mental_health_score , overall_summary)
         set({ risk_level, mental_health_score, overall_summary })

      } ,
      getDetails: () => {
        const state = get();
        return {
          risk_level: state?.risk_level,
          mental_health: state?.mental_health_score,
          summary: state?.overall_summary,
        };
      },
    }),
    { name: "assessment_store" },
  ),
);
