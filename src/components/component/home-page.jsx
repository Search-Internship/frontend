"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { convertToRaw } from 'draft-js'; 
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { draftToMarkdown } from 'markdown-draft-js';
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditor from "react-froala-wysiwyg";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import {
  FiSettings,
  FiUpload,
  FiLogOut,
  FiUser,
  FiPackage,
  FiFlag,
} from "react-icons/fi";
import { CV } from "@/components/component/cv";
import { settings } from "@/components/component/settings";
import { Emails } from "@/components/component/emails";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


// Define the HomePage functional component
export function HomePage() {
  // State variables
  const [subject, setSubject] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isemailOpen, setIsemailsOpen] = useState(false);
  const [language, setLanguage] = useState("english"); // Ajoutez un état pour gérer la langue sélectionnée

  // Components
  const cvComponent = CV();
  const EmailComponent = Emails();
  const SettingsComponent = settings();

  // Ref for Froala Editor
  const editorRef = useRef(null);

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.clear(); // Clear all items from local storage
    window.location.href = "/landing"; // Redirect to the login page
  };

  // Function to open modal for uploading CV
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close modal for uploading CV
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to open settings modal
  const openSettings = () => {
    setIsSettingsOpen(true);
  };

  // Function to close settings modal
  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  // Function to open modal for uploading emails
  const emailsOpen = () => {
    setIsemailsOpen(true);
  };

  // Function to close modal for uploading emails
  const closeEmails = () => {
    setIsemailsOpen(false);
  };

  // Function to prevent event propagation
  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value); // Mettre à jour l'état de la langue lorsque l'utilisateur change la sélection
  };

  // Function to get full name and email from local storage
  // const getFullNameAndEmail = () => {
  //   const formData = JSON.parse(localStorage.getItem("formData"));
  //   const fullName = formData ? formData.fullName : "";
  //   const sender_email = formData ? formData.sender_email : "";
  //   return { fullName, sender_email };
  // };
  // const { fullName, sender_email } = getFullNameAndEmail();


  const generateMessageWithAI = async () => {
    const resumeBase64 = localStorage.getItem("resume");
    const resumeBytes = atob(resumeBase64);
    const resumeUint8Array = new Uint8Array(resumeBytes.length);
    for (let i = 0; i < resumeBytes.length; ++i) {
      resumeUint8Array[i] = resumeBytes.charCodeAt(i);
    }
    const resumeBlob = new Blob([resumeUint8Array], {
      type: "application/pdf",
    });
    const resumeFile = new File([resumeBlob], "resume.pdf");
    const email_subject = subject;
  
    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("email_subject", email_subject);
    formData.append("language", language);
  
    console.log("resumeFile type:", resumeFile.name);
    console.log("email_subject:", email_subject);
    console.log("language:", language);
  
    try {
      const response = await fetch("http://localhost:8000/api/chat/generated-email-body", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Failed to generate message with AI: ${response.statusText}`);
      }
  
      const responseBody = await response.json();
      const emailBody = responseBody.email_body;
      // Process the Markdown text as needed
      console.log("Generated Markdown text:", emailBody);
      // For example, you can set the editor content state with the generated Markdown text
      setEditorContent(emailBody);
    } catch (error) {
      console.error("Error generating message with AI:", error);
      // Handle error
    }
  };
  

  // Function to handle sending emails
  const handleStartSendingMails = async () => {
    const content = editorRef.current?.editor.html.get();
    console.log("Content:", content);
    // Prepare email data
    const emailData = {
      email_subject: subject,
      email_body: content,
    };
    // Save email data to localStorage
    localStorage.setItem("emailData", JSON.stringify(emailData));
    

    // Convert emails string to a text file
    const emails = localStorage.getItem("emails");
    const emailsBlob = new Blob([emails], { type: "text/plain" });
    const emailsFile = new File([emailsBlob], "emails.txt");

    // Convert base64 resume to a PDF file
    const resumeBase64 = localStorage.getItem("resume");
    const resumeBytes = atob(resumeBase64);
    const resumeUint8Array = new Uint8Array(resumeBytes.length);
    for (let i = 0; i < resumeBytes.length; ++i) {
      resumeUint8Array[i] = resumeBytes.charCodeAt(i);
    }
    const resumeBlob = new Blob([resumeUint8Array], {
      type: "application/pdf",
    });
    const resumeFile = new File([resumeBlob], "resume.pdf");
    // Other data
    // const formData = JSON.parse(localStorage.getItem("formData"));
    // const sender_email = formData ? formData.sender_email : "";
    // const sender_password = formData ? formData.sender_password : "";
    const email_subject = emailData.email_subject;
    const email_body = emailData.email_body;
    const file_separator = ";"; // Assuming you want to hardcode the separator
    const accessToken = localStorage.getItem("token");
    // console.log 

    // Wait for the files to be created before logging their types
    await Promise.all([
      emailsFile, // This will ensure that emailsFile is fully created
      resumeFile, // This will ensure that resumeFile is fully created
    ]);

    // Construct FormData object
    const MyformData = new FormData();
    MyformData.append("emails", emailsFile);
    MyformData.append("email_body", email_body);
    MyformData.append("resume", resumeFile);
    // MyformData.append("sender_email", sender_email);
    // MyformData.append("sender_password", sender_password);
    MyformData.append("email_subject", email_subject);
    MyformData.append("file_separator", file_separator);
    MyformData.append("access_token", accessToken);


    
    console.log("emailsFile type:", emailsFile.name);
    console.log("resumeFile type:", resumeFile.name);
    console.log("email_subject:", email_subject);
    console.log("email_body:", email_body);
    console.log("file_separator:", file_separator);
    console.log("access_token:", accessToken);
    try {
      // Send POST request to the API endpoint
      const response = await fetch("http://127.0.0.1:8000/api/email/send-internship", {
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

      // Log a message indicating successful file upload
      console.log("Files uploaded successfully!");

      // Optionally, you can display a success message or perform other actions
    } catch (error) {
      console.error("Error sending emails:", error.message);
      // Handle error (e.g., display error message to the user)
    }
  };

  // Return JSX for the homepage component
  return (
    <div className="flex flex-col w-screen bg-white">
      <header className="flex h-20 items-center justify-center px-4 border-b md:px-6">
        <Link
          href="#"
          className="mr-auto flex items-center gap-2 text-lg font-semibold"
        >
          <FiFlag className="w-6 h-6" />
          <span className="sr-only">Easy Internship</span>
          Easy Internship
        </Link>
        <nav className="flex-1 flex justify-center items-center">
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
    {/* <li>
      <div className="flex items-center gap-2">
        <FiSettings className="w-6 h-6" />
        <button onClick={openSettings} className="font-medium">
          Settings
        </button>
      </div>
    </li> */}
  </ul>
</nav>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="rounded-full border-2 border-gray-200"
              size="icon"
              variant="ghost"
            >
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
                  <div className="font-semibold">User</div>
                  <div className="text-xs leading-none text-gray-500 dark:text-gray-400">
                    User@easyInternship.com
                  </div>
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
      <main className="flex-1 p-4 md:p-6 relative z-0"> {/* Ajoutez relative z-0 pour le maintenir en-dessous des modales */}
  <div className="mx-auto max-w-3xl space-y-4">
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">Compose new email</h1>
      <p className="text-gray-500 dark:text-gray-400">
        Fill in the details below.
      </p>
    </div>
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          placeholder="Enter subject"
          onChange={(e) => setSubject(e.target.value)}
          value={subject}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <FroalaEditor
          model={editorContent}
          ref={editorRef}
          tag="textarea"
          config={{
            placeholderText: "Enter your message",
          }}
        />
      </div>
    </div>
    <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <select
              id="language"
              onChange={handleLanguageChange}
              value={language}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="english">English</option>
              <option value="french">French</option>
            </select>
          </div>
    <div className="flex justify-center">
    <Button onClick={generateMessageWithAI} className="font-medium bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
  Generate Message with AI
</Button>

        </div>
    <div className="flex justify-center">
    
      <Button onClick={handleStartSendingMails} className=" bg-black text-white">
        Start Sending Mails
      </Button>
    </div>
  </div>
</main>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={closeModal}>
          <div className="bg-white p-0 rounded-md w-1/2 h-1/2 relative z-10" onClick={stopPropagation}>
            <div className="flex flex-col justify-center h-full">
              <div className="mb-8 flex justify-center">{cvComponent}</div>
            </div>
          </div>
        </div>
      )}

      {/* {isSettingsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={closeSettings}>
          <div className="bg-white p-0 rounded-md max-w-md w-full relative z-10" onClick={stopPropagation}>
            <div className="mb-8 h-1/2">{SettingsComponent}</div>
          </div>
        </div>
      )} */}

      {isemailOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={closeEmails}>
          <div className="bg-white p-0 rounded-md w-1/2 h-1/2 relative z-10" onClick={stopPropagation}>
            <div className="flex flex-col justify-center h-full">
              <div className="mb-8 flex justify-center">{EmailComponent}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  }
