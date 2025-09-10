import { useState } from 'react';
import { useTranslation } from 'react-i18next'; 
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

export default function SignUp() {
  const { t, i18n } = useTranslation("sign_up"); 
  const [errors, setErrors] = useState<string[]>([]);
 const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrors([t('validates.not_match_password', {ns: 'sign_up'})]);
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BE_DOMAIN}/auth/register?lang=${i18n.language}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        setErrors(errData.message || [t('validates.fail', {ns: 'sign_up'})]);
        return;
      }

      setErrors([]);
      toast.success(t('validates.success', {ns: 'sign_up'}));
      navigate("/login");
    } catch (err) {
      console.log(err)
      setErrors([t('validates.error', {ns: 'sign_up'})]);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Side - Image */}
        <div className="md:w-1/2 h-full flex items-center justify-center relative">
          <img
            src="image/signup.jpg"
            alt="Learning online"
            className="w-full h-full object-cover rounded-l-lg"
            
          />
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 bg-white p-8 flex flex-col justify-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            {t('create_your_account', { Sign_Up: 'sign_up' })}
          </h1>

          {errors.length > 0 && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              <ul className="list-disc list-inside text-sm">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('first_name', { Sign_Up: 'sign_up' })}
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('last_name', { Sign_Up: 'sign_up' })}
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('username', { Sign_Up: 'sign_up' })}
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('Email', { defaultValue: 'Email' })}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('password', { Sign_Up: 'sign_up' })}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                 {t('confirm_password', { Sign_Up: 'sign_up' })}
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 text-white bg-black rounded-md hover:bg-gray-800 transition duration-200 font-medium flex items-center justify-center"
            >
              {t('create_account', { Sign_Up: 'sign_up' })}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-xs text-gray-500">
              {t('or_sign_up_with', { defaultValue: 'or sign up with' })}
            </span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social Buttons */}
          <div className="flex space-x-4">
            <button className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition">
              <svg className="w-5 h-5 mr-2" fill="#3B5998" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.991 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.064 24 12.073z"/>
              </svg>
              {t('Facebook', { defaultValue: 'Facebook' })}
            </button>
            <button className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F5"/>
                <path d="M12 23c2.97 0 5.46-.99 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.78 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.24-.73-.38-1.5-.38-2.3s.14-1.57.38-2.3V7.07H2.18C1.43 8.58 1 10.3 1 12s.43 3.42 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.41 1 12 1 7.78 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {t('Google', { defaultValue: 'Google' })}
            </button>
            <button className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition">
              <svg className="w-5 h-5 mr-2" fill="#0078D4" viewBox="0 0 24 24">
                <path d="M18.5 5.5H5.5V18.5H18.5V5.5ZM15.5 15.5H8.5V8.5H15.5V15.5Z"/>
              </svg>
              {t('Microsoft', { defaultValue: 'Microsoft' })}
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            {t('already_have_an_account?', { defaultValue: 'or sign up with' })}
            <a href="#" className="text-blue-600 hover:underline">
              {t('log_in', { defaultValue: 'login' })}
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}