"use client";
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { Button } from '@/components/ui/button';

export function Verification() {
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const userEmail = localStorage.getItem('user_email');
  const [mycode, setMycode] = useState('');

  const handleSendVerificationCode = async () => {
    setIsSendingCode(true);
    try {
      const formData = new FormData();
      formData.append('to', userEmail);

      const response = await fetch('http://localhost:8000/api/email/send-verification-code', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Verification code sent:', data.code);
        setMycode(data.code);
        setIsSendingCode(false); // Disable the button after code is sent
        setSuccess('Verification code sent successfully.');
        setError('');
      } else {
        console.error('Failed to send verification code:', response.statusText);
        setIsSendingCode(false);
        setError('Failed to send verification code: ' + response.statusText);
        setSuccess('');
      }
    } catch (error) {
      console.error('Error sending verification code:', error);
      setIsSendingCode(false);
      setError('Error sending verification code: ' + error.message);
      setSuccess('');
    }
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    if (verificationCode === mycode) {
      console.log("Verification code is correct");
      window.location.href = "/home";
      setIsCodeVerified(true);
      setSuccess('Verification successful!');
      setError('');
    } else {
      setError('Invalid verification code.');
      setSuccess('');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12 dark:bg-white-950">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Verify Your Email</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            We've sent a 4-digit code to your email address. Enter the code below to verify your identity.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleVerificationSubmit}>
          <div className="flex justify-center">
            <OtpInput
              value={verificationCode}
              onChange={setVerificationCode}
              numInputs={4}
              separator={<span>&nbsp;</span>}
              renderInput={(inputProps, index) => (
                <input {...inputProps} autoFocus={index === 0} className="otp-input" />
              )}
              inputStyle={{
                width: '3rem',
                height: '3rem',
                margin: '0 0.5rem',
                fontSize: '1.5rem',
                borderRadius: '0.5rem',
                border: 'black 3px solid',
                background: 'white',
                color: 'black',
                textAlign: 'center'
              }}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <Button className="w-full bg-black" type="submit" disabled={isSendingCode}>
            Verify
          </Button>
          <Button className={`w-full ${isSendingCode ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500'}`} onClick={handleSendVerificationCode} disabled={isSendingCode}>
            {isSendingCode ? 'Sending...' : 'Send Verification Code'}
          </Button>
        </form>
        {isCodeVerified && (
          <div className="flex justify-center">
            <div className="bg-green-200 p-4 rounded-lg">
              <p className="text-green-800">Verification successful!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
