/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/Glw26ObgUTB
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/

"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function settings() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    emailPassword: "",
    phoneNumber: "",
    linkedIn: ""
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Extracting specific fields
    const { fullName, email, emailPassword } = formData;
    // Creating an object with the extracted fields
    const formDataToSave = {
      fullName,
      sender_email: email,
      sender_password: emailPassword
    };
    // Saving the extracted fields in local storage
    localStorage.setItem("formData", JSON.stringify(formDataToSave));
    setShowPopup(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-8">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" placeholder="Enter your full name" type="text" onChange={handleChange} value={formData.fullName} />
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="Enter your email address" type="email" onChange={handleChange} value={formData.email} />
          </div>
        </div>
        <div>
          <Label htmlFor="emailPassword">Email Password</Label>
          <Input id="emailPassword" placeholder="Enter your email password" type="password" onChange={handleChange} value={formData.emailPassword} />
        </div>
        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input id="phoneNumber" placeholder="Enter your phone number" type="tel" onChange={handleChange} value={formData.phoneNumber} />
        </div>
        <div>
          <Label htmlFor="linkedIn">LinkedIn</Label>
          <Input id="linkedIn" placeholder="Enter your LinkedIn profile URL" type="url" onChange={handleChange} value={formData.linkedIn} />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-500">Make sure to save your changes...</p>
          <div className="flex gap-2">
            <Button className="bg-black hover:bg-gray-900 text-white" type="submit">
              Save Changes
            </Button>
          </div>
        </div>
      </form>

      {showPopup && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <p className="text-lg font-semibold text-center">Information Saved</p>
            <p className="text-sm text-gray-600 mt-2">Your information has been successfully saved.</p>
            <Button
              className="w-full mt-4 bg-black text-white"
              variant="primary"
              onClick={() => setShowPopup(false)}
            >
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
