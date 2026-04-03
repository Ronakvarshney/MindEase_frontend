"use client"
import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

interface ForgotPasswordProps {
  onBack: () => void;
}

export default function ForgotPassword(){
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setLoading(true);
    
    try{
     const response = await axios.post("/api/forgot-password" , {email});
     console.log(response.data);
    }
    catch(error){
        console.error(error);
    }
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-cream flex items-center justify-center px-4">
      <div className="max-w-md w-full">
          <div className="bg-white rounded-[3rem] p-10 md:p-12 border border-slate-100 shadow-xl shadow-indigo-500/5 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
              <ShieldCheck size={120} />
            </div>

            <Link href="/login"
            
              className="mb-8 flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-bold tracking-wide uppercase">Back to Login</span>
            </Link>

            {!submitted ? (
              <>
                <div className="mb-8">
                  <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-[1.5rem] flex items-center justify-center mb-6">
                    <Mail size={32} />
                  </div>
                  <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Forgot password?</h1>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    No worries, it happens. Enter the email address associated with your account and we&apos;ll send you a recovery link.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                      <input 
                        required
                        type="email" 
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                      />
                    </div>
                  </div>

                  <button 
                    disabled={loading}
                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-3 active:scale-[0.98]"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Send Reset Link <Sparkles size={18} />
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Check your email</h2>
                <p className="text-slate-500 font-medium leading-relaxed mb-8">
                  We&apos;ve sent password reset instructions to <br />
                  <span className="text-slate-900 font-bold">{email}</span>
                </p>
                <button 
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-indigo-600 transition-all"
                >
                  Return to Login
                </button>
                <p className="mt-8 text-sm text-slate-400 font-medium">
                  Didn&apos;t receive the email? Check your spam folder or{' '}
                  <button onClick={() => setSubmitted(false)} className="text-indigo-600 font-bold hover:underline">try again</button>
                </p>
              </div>
            )}
          </div>
      </div>
    </div>
  );
};
