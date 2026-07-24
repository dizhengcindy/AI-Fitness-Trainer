"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { vapi } from "@/lib/vapi";
import { useUser } from "@clerk/nextjs";
import { HandleSSOCallback } from "@clerk/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const GenerateProgram = () => {
  const [callActive, setCallActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState([]);
  const [callEnded, setCallEnded] = useState(false);


  const {user} = useUser();
  const router = useRouter();

  const messageContainerRef = useRef<HTMLDivElement>(null);
  //auto scroll messages
  useEffect(()=>{
    if(messageContainerRef.current){
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  },[messages])

  //navigate user to profile page after call ends
  useEffect(()=>{
    if(callEnded){
      const redirectTimer = setTimeout(()=>{
        router.push(`/profile`);
      }, 1500);

      return () => clearTimeout(redirectTimer);
    }
  },[callEnded, router])

  //setup event listeners for vapi
  useEffect(()=>{
    const handleCallStart = () => {
      console.log("Call started");
      setConnecting(false);
      setCallActive(true);
      setCallEnded(false);
    }

    const handleCallEnd = () => {
      console.log("Call ended");
      setConnecting(false);
      setIsSpeaking(false);
      setCallActive(false);
      setCallEnded(true);

    }

    const handleSpeechStart = () => {
      console.log("AI started speaking");
      setIsSpeaking(true);

    }
    const handleSpeechEnd = () => {
      console.log("AI stopped speaking");
      setIsSpeaking(false);
    }
    const handleMessage = (message: any) => {

    }

    const handleError = (error: any) => {
      console.log("Error:", error);
      setConnecting(false);
      setCallActive(false);
    }

    vapi.on("call-start", handleCallStart)
        .on("call-end", handleCallEnd)
        .on("speech-start", handleSpeechStart)
        .on("speech-end", handleSpeechEnd)
        .on("message", handleMessage)
        .on("error", handleError)
    
        //cleanup
        return () => {
          vapi.off("call-start", handleCallStart)
          vapi.off("call-end", handleCallEnd)
          vapi.off("speech-start", handleSpeechStart)
          vapi.off("speech-end", handleSpeechEnd)
          vapi.off("message", handleMessage)
          vapi.off("error", handleError)
        }
  },[])

  const toggleCall = async () => {
    if(callActive){
      await vapi.stop();
    } else {
     try{
      setConnecting(true);
      setMessages([]);
      setCallEnded(false);

      const fullName = user?.firstName
      ? `${user.firstName} ${user.lastName || ""}`.trim()
      : "There";

      await vapi.start(
       process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!,{
        variableValues: {
          full_name: fullName,
          user_id: user?.id,
        },
      }
    );

     }catch(error){
      console.error("Failed to start call:", error);
      setConnecting(false);
     }
    }

  }


  return (
    <div className="container mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Generate a Fitness Program</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Generate a Fitness Program</h2>
        </div>
      </div>
    </div>
  )
}