    "use client";
    import React, { useState , useEffect } from 'react';
    import { Label } from '@/components/ui/label';
    import { Input } from '@/components/ui/input';
    import { Button } from '@/components/ui/button';
    import OtpInput from 'react-otp-input';
    import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    
    export default function ForgotPassword() {
      const [email, setEmail] = useState('');
      const [verificationCode, setVerificationCode] = useState('');
      const [newPassword, setNewPassword] = useState('');
      const [myVerificationCode, setMyVerificationCode] = useState('');
      const [error, setError] = useState('');
      const [success, setSuccess] = useState('');
      const [allFieldsFilled, setAllFieldsFilled] = useState(false);
      const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Vérifier si tous les champs sont remplis
    if (email && verificationCode && newPassword) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  }, [email, verificationCode, newPassword]);

      const handleSendVerificationCode = async () => {
        setLoading(true);
        try {
          const formData1 = new FormData();
          formData1.append('email', email);
          // Vérifier si l'email existe
          const emailExistResponse = await fetch('http://localhost:8000/api/users/email-exist', {
            method: 'POST',
            body: formData1,
          });
           const response = await emailExistResponse.json();
           console.log(response);
           localStorage.setItem('access_token', response.access_token);
    
          if (!emailExistResponse.ok) {
            setError('Email does not exist.');
            setSuccess('');
            return;
          }
    
          // Envoyer le code de vérification
          const formData = new FormData();
          formData.append('to', email);
    
          const verificationCodeResponse = await fetch(`http://localhost:8000/api/email/send-verification-code`, {
            method: 'POST',
            body: formData,
          });
    
          // Vérifier si la réponse est OK
          if (verificationCodeResponse.ok) {
            const data = await verificationCodeResponse.json();
            setMyVerificationCode(data.code);
            setSuccess('Verification code sent successfully.');
            setError('');
          } else {
            setError('Failed to send verification code: ' + verificationCodeResponse.statusText);
            setSuccess('');
          }
        } catch (error) {
          setError('Error sending verification code: ' + error.message);
          setSuccess('');
        } finally{
            setLoading(false);
        }
      };
    
      const handleSubmitResetPassword = async () => {
        if (verificationCode !== myVerificationCode) {
          setError('Invalid verification code.');
          setSuccess('');
          return;
        } else {
          try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('new_password', newPassword);
            formData.append('access_token', localStorage.getItem('access_token'));

            const resetPasswordResponse = await fetch(`http://localhost:8000/api/users/change-password`, {
              method: 'PUT',
              body: formData,
            });
    
            if (resetPasswordResponse.ok) {
              setSuccess('Password reset successfully.');
              setError('');
              localStorage.removeItem('access_token');
              window.location.href = '/login';
            } else {
              setError('Failed to reset password: ' + resetPasswordResponse.statusText);
              setSuccess('');
            }
          } catch (error) {
            setError('Error resetting password: ' + error.message);
            setSuccess('');
          }
        }
      };
    
      return (
        <div className="flex h-screen items-center justify-center bg-white">
            {loading ? (
        <div className="text-center">
          <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-gray-700 dark:text-gray-700" />
          <p className="mt-4 text-gray-700 dark:text-gray-700">Sending verification code...</p>
        </div>
      ) : (
          <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Forgot Password</h1>
              <p className="text-gray-500">Enter your email address and verification code</p>
            </div>
            <form className="space-y-4 flex flex-col justify-center">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  className="mt-1"
                  id="email"
                  placeholder="Enter your email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="verificationCode" className="flex ">Verification Code</Label>
                <br />
                <div className="flex items-center justify-center">
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
                      fontSize: '1rem',
                      borderRadius: '0.5rem',
                      border: 'black 3px solid',
                      background: 'white',
                      color: 'black',
                      textAlign: 'center'
                    }}
                  />
                </div>
              </div>
              {myVerificationCode && (
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                className="mt-1"
                id="newPassword"
                placeholder="Enter your new password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          )}
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              <Button className="w-full bg-blue-400 text-white" type="button" onClick={handleSendVerificationCode}>
                Send Verification Code
              </Button>
              <Button
            className={`w-full bg-black text-white mt-4 ${allFieldsFilled ? '' : 'opacity-50 cursor-not-allowed'}`}
            type="button"
            onClick={handleSubmitResetPassword}
            disabled={!allFieldsFilled}>
               Reset Password
          </Button>
            </form>
          </div>
      )}
        </div>
      );
    }
    
