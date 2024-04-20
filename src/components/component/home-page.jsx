"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FiSettings, FiUpload, FiLogOut, FiUser, FiPackage, FiFlag } from "react-icons/fi";
import { cv } from "@/components/component/cv";
import { settings } from "@/components/component/settings";
import { Emails } from "@/components/component/emails";

export function HomePage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isemailOpen, setIsemailsOpen] = useState(false);
  const cvComponent = cv();
  const EmailComponent = Emails();
  const SettingsComponent = settings();
  const handleLogout = () => {
    // Clear all items from local storage
    localStorage.clear();
    //refresh the page
    window.location.reload();
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openSettings = () => {
    setIsSettingsOpen(true);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  const emailsOpen = () => {
    setIsemailsOpen(true);
  };

  const closeEmails = () => {
    setIsemailsOpen(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  const getFullNameAndEmail = () => {
    const formData = JSON.parse(localStorage.getItem("formData"));
    const fullName = formData ? formData.fullName : "";
    const sender_email = formData ? formData.sender_email : "";
    return { fullName, sender_email };
  };
  const { fullName, sender_email } = getFullNameAndEmail();

  const handleStartSendingMails = async () => {
    const emailData = {
      email_subject: subject,
      email_body: message
    };
  
    // Save email data to localStorage
    localStorage.setItem("emailData", JSON.stringify(emailData));
    
    // Set the file separator to "\n" for new line
    localStorage.setItem("file_separator", "\n"); 
  
    console.log("Email data saved:", emailData);
    
    // Here you can send the email data to the server or perform any other necessary action
    let emails = localStorage.getItem("emails");
    let resume = localStorage.getItem("resume");
    const formData = JSON.parse(localStorage.getItem("formData"));
    // Extract sender_email from formData
    const sender_email = formData ? formData.sender_email : "";
    // Extract sender_password from formData
    const sender_password = formData ? formData.sender_password : "";
    const emaillData = JSON.parse(localStorage.getItem("emailData"));
    //Extract email_subject from emailData
    const email_subject = emaillData ? emaillData.email_subject : "";
    //Extract email_body from emailData
    const email_body = emaillData ? emaillData.email_body : "";
    const file_separator = localStorage.getItem("file_separator");
  
    // Construct FormData object
    const MyformData = new FormData();
    MyformData.append("emails", emails);
    MyformData.append("email_body", email_body);
    MyformData.append("resume", resume);
    MyformData.append("sender_email", sender_email);
    MyformData.append("sender_password", sender_password);
    MyformData.append("email_subject", email_subject);
    MyformData.append("file_separator", file_separator);
  
    try {
      // Send POST request to the API endpoint
      const response = await fetch("http://127.0.0.1:8000/send/", {
        method: "POST",
        body: MyformData,
      });
  
      // Check if request was successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Parse response JSON
      const responseData = await response.json();
      console.log("Emails sent successfully:", responseData);
      
      // Optionally, you can display a success message or perform other actions
    } catch (error) {
      console.error("Error sending emails:", error.message);
      // Handle error (e.g., display error message to the user)
    }
  };

  
  

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <header className="flex h-20 items-center justify-center px-4 border-b md:px-6">
        <Link href="#" className="mr-auto flex items-center gap-2 text-lg font-semibold">
          <FiFlag className="w-6 h-6" />
          <span className="sr-only">Easy Internship</span>
          Easy Internship
        </Link>
        <nav className="flex-1">
          <ul className="flex items-center justify-center space-x-4">
            <li>
              <div className="flex items-center gap-2">
                <FiPackage className="w-6 h-6" />
                <button onClick={emailsOpen} className="font-medium">
                  Upload Emails
                </button>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-2">
                <FiUpload className="w-6 h-6" />
                <button onClick={openModal} className="font-medium">
                  Upload CV
                </button>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-2">
                <FiSettings className="w-6 h-6" />
                <button onClick={openSettings} className="font-medium">
                  Settings
                </button>
              </div>
            </li>
          </ul>
        </nav>
        <Popover>
          <PopoverTrigger asChild>
            <Button className="rounded-full border-2 border-gray-200" size="icon" variant="ghost">
              <span className="sr-only">Open messages</span>
              <Avatar
                alt="Avatar"
                className="border w-8 h-8 rounded-full object-cover"
                height="32"
                src="/placeholder-user.jpg"
                width="32"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <div>
              <div className="flex items-center gap-2">
                <Avatar
                  alt="Avatar"
                  className="border w-10 h-10 rounded-full object-cover"
                  height="40"
                  src="/placeholder-user.jpg"
                  width="40"
                />
                <div className="space-y-1 leading-none">
                  <div className="font-semibold">{fullName}</div>
                  <div className="text-xs leading-none text-gray-500 dark:text-gray-400">{sender_email}</div>
                </div>
              </div>
              <div>
                <div className="mt-4">
                  <div className="flex justify-center items-center">
                    <div className="mt-4 flex flex-col gap-4">
                      <div className="flex items-center gap-2">
                        <FiLogOut className="w-6 h-6" />
                        <button onClick={handleLogout} className="font-medium">
                Logout
              </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Compose new email</h1>
            <p className="text-gray-500 dark:text-gray-400">Fill in the details below.</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Enter subject" onChange={(e) => setSubject(e.target.value)} value={subject} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea className="min-h-[200px]" id="message" placeholder="Enter your message" onChange={(e) => setMessage(e.target.value)} value={message} />
            </div>
          </div>
          <div className="flex justify-center">
            <Button onClick={handleStartSendingMails}>Start Sending Mails</Button>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={closeModal}>
          <div className="bg-white p-0 rounded-md w-1/2 h-1/2" onClick={stopPropagation}>
            <div className="flex flex-col justify-center h-full">
              <div className="mb-8 flex justify-center">{cvComponent}</div>
            </div>
          </div>
        </div>
      )}

      {isSettingsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={closeSettings}>
          <div className="bg-white p-0 rounded-md max-w-md w-full" onClick={stopPropagation}>
            <div className="mb-8 h-1/2">{SettingsComponent}</div>
          </div>
        </div>
      )}

      {isemailOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={closeEmails}>
          <div className="bg-white p-0 rounded-md w-1/2 h-1/2" onClick={stopPropagation}>
            <div className="flex flex-col justify-center h-full">
              <div className="mb-8 flex justify-center">{EmailComponent}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
