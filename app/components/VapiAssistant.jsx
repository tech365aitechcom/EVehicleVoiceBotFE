"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Mic, MicOff, PhoneOff, Clock } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SoundWave from "./SoundWave";
import Vapi from "@vapi-ai/web";
33
const vapi = new Vapi("9ab416ca-a6a1-4e78-8838-ef28962b73aa");

const VapiAssistant = ({ setIsVapiCall }) => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [duration, setDuration] = useState(0);
  const durationIntervalRef = useRef(null);

  const handleCallStart = useCallback(() => {
    setConnecting(false);
    setConnected(true);
    startDurationTracking();
  }, []);

  const handleCallEnd = useCallback(() => {
    setConnecting(false);
    setConnected(false);
    stopDurationTracking();
  }, []);

  const handleError = useCallback((error) => {
    setConnecting(false);
    toast.error(error.error.message ?? "Call error occurred.");
  }, []);

  const handleUserSpeaking = useCallback((isSpeaking) => {
    setIsUserSpeaking(isSpeaking);
  }, []);

  useEffect(() => {
    vapi.on("call-start", handleCallStart);
    vapi.on("call-end", handleCallEnd);
    vapi.on("error", handleError);
    vapi.on("user-speaking", handleUserSpeaking);

    startCall();

    return () => {
      vapi.off("call-start", handleCallStart);
      vapi.off("call-end", handleCallEnd);
      vapi.off("error", handleError);
      vapi.off("user-speaking", handleUserSpeaking);
    };
  }, [handleCallStart, handleCallEnd, handleError, handleUserSpeaking]);

  const startCall = () => {
    setConnecting(true);
    vapi.start("a1694254-0013-436d-922a-92ad13ff49d4");
  };

  const endCall = () => {
    vapi.stop();
    stopDurationTracking();
    setIsVapiCall(false);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    vapi.mute(!isMuted);
  };

  const startDurationTracking = () => {
    durationIntervalRef.current = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);
  };

  const stopDurationTracking = () => {
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
    }
    setDuration(0);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="flex flex-col md:w-[500px] h-fit bg-gradient-to-br from-indigo-200 via-blue-200 to-indigo-300 rounded-3xl shadow-2xl backdrop-blur-lg">
        <header className="bg-white bg-opacity-80 p-4 rounded-t-3xl">
          <div className="container flex justify-between items-center">
            <h1 className="text-3xl font-bold text-indigo-700">
              Inbound EV agent
            </h1>
            <div className="flex items-center space-x-2">
              <Clock size={20} className="text-indigo-600" />
              <span className="text-indigo-600 font-medium">
                {formatDuration(duration)}
              </span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 flex flex-col items-center space-y-6">
          <div className="w-48 h-48 relative">
            <img
              src="/bot-icon.webp"
              alt="AI Assistant"
              className="w-32 h-32 rounded-full"
            />
          </div>
          <h2 className="text-3xl font-semibold text-indigo-800">
            Your AI Assistant
          </h2>
          <div className="w-full h-24 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-xl overflow-hidden grid place-items-center">
            <SoundWave isAnimating={isUserSpeaking} />
          </div>
        </main>
        <div className="bg-white bg-opacity-90 p-4 rounded-b-3xl flex justify-center items-center space-x-6">
          <button
            onClick={toggleMute}
            className={`p-4 rounded-full transition-transform transform hover:scale-110 ${
              isMuted ? "bg-red-500 text-white" : "bg-blue-300 text-gray-700"
            }`}
          >
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
          <button
            onClick={endCall}
            className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-transform transform hover:scale-110"
          >
            <PhoneOff size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VapiAssistant;
