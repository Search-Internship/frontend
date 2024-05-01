
  "use client";
  import { useState } from 'react';

export function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    linkedin_link: '',
    password: '',
    phone_number: '',
    email_password: ''
  });

  const [showPassword, setShowPassword] = useState({ password: false, emailPassword: false });

  const togglePasswordVisibility = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost:8000/api/users', {
        method: 'POST',
        body: form
      });

      if (response.ok) {
        // Handle success
        console.log('User created successfully');
      } else {
        // Handle error
        console.error('Failed to create user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="w-full h-full h-screen max-w-md mx-auto py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-white">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-900">
            Create an Account
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-600">
            Enter your details to get started.
          </p>
        </div>
        <div className="bg-white dark:bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8 sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-[1fr, 2fr] gap-6">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-700"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      autoComplete="username"
                      className="block w-full px-3 py-2 border border-gray-200 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-white dark:border-gray-600 dark:text-gray-700 dark:border-gray-800"
                      id="username"
                      name="username"
                      placeholder="john_doe"
                      required
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-700"
                    htmlFor="phone"
                  >
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <input
                      autoComplete="tel"
                      className="block w-full px-3 py-2 border border-gray-200 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-white dark:border-gray-600 dark:text-gray-700 dark:border-gray-800"
                      id="phone"
                      name="phone_number"
                      placeholder="+212 123 456 789"
                      required
                      type="tel"
                      value={formData.phone_number}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-700"
                    htmlFor="email"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      autoComplete="email"
                      className="block w-full px-3 py-2 border border-gray-200 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-white dark:border-gray-600 dark:text-gray-700 dark:border-gray-800"
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      required
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-700"
                    htmlFor="linkedin"
                  >
                    LinkedIn Link
                  </label>
                  <div className="mt-1">
                    <input
                      autoComplete="url"
                      className="block w-full px-3 py-2 border border-gray-200 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-white dark:border-gray-600 dark:text-gray-700 dark:border-gray-800"
                      id="linkedin"
                      name="linkedin_link"
                      placeholder="https://www.linkedin.com/in/johndoe"
                      type="url"
                      value={formData.linkedin_link}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      autoComplete="new-password"
                      className="block w-full px-3 py-2 border border-gray-200 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-white dark:border-gray-600 dark:text-gray-700 dark:border-gray-800"
                      id="password"
                      name="password"
                      placeholder="********"
                      required
                      type={showPassword.password ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <div
                      onClick={() => togglePasswordVisibility('password')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-auto cursor-pointer"
                    >
                      {showPassword.password ? (
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.5 17h-11M12 8v.01"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.5 17h-11M12 8v.01"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-700 flex items-center"
                    htmlFor="emailPassword"
                  >
                    Email Password
                    <a
                      href="https://support.google.com/accounts/answer/185833?hl=fr#:~:text=Un%20mot%20de%20passe%20d,en%20deux%20%C3%A9tapes%20est%20activ%C3%A9e."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1"
                    >
                      ?
                    </a>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      autoComplete="new-password"
                      className="block w-full px-3 py-2 border border-gray-200 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-white dark:border-gray-600 dark:text-gray-700 dark:border-gray-800"
                      id="emailPassword"
                      name="email_password"
                      placeholder="********"
                      required
                      type={showPassword.emailPassword ? 'text' : 'password'}
                      value={formData.email_password}
                      onChange={handleChange}
                    />
                    <div
                      onClick={() => togglePasswordVisibility('emailPassword')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-auto cursor-pointer"
                    >
                      {showPassword.emailPassword ? (
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.5 17h-11M12 8v.01"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.5 17h-11M12 8v.01"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <button
                  className="w-full flex justify-center py-2 px-4 border border-gray-200 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-950 dark:bg-black dark:hover:bg-gray-900 dark:border-gray-800"
                  type="submit"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
