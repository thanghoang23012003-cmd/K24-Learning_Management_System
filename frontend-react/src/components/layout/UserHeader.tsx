import { faBell, faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export default function UserHeader() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
    toast.success(t('account.logout_success', { ns: 'layout' }));
  };

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    Cookies.set("lang", lang);
    setIsLangOpen(false);
  }

  return (
    <>
      {/* Header */}
      <header className="py-2 border-b border-slate-200">
        <div className="flex items-center justify-start w-full h-full px-20">
          {/* Logo and Brand */}
          <div onClick={() => navigate('/')} className="flex w-40 flex-shrink-0 items-center cursor-pointer">
            <img src="logos/logo.png" alt="Byway Logo" className="h-8 w-8 mr-2" />
            <span className="text-slate-700 font-medium text-base">Byway</span>
          </div>

          {/* Navigation Items */}
          <div className="flex ml-20 items-center gap-1">
            {/* Categories */}
            <button className="text-slate-700 text-sm font-medium hover:text-slate-900">
              {t('header.categories', { ns: 'layout' })}
            </button>

            {/* Search Bar */}
            <div className="flex items-center gap-2.5 px-2.5 py-2.5 border border-slate-700 rounded-lg w-[622px] h-10">
              <input className="text-slate-700 text-sm font-medium focus:outline-none focus:border-none w-[90%]" placeholder="Search courses" />
            </div>

            {/* Teach on Byway */}
            <button className="text-slate-700 text-sm font-medium hover:text-slate-900 whitespace-nowrap cursor-pointer">
              {t('header.teach', { ns: 'layout' })}
            </button>
          </div>
          
          
          {/* Right Side Actions */}
          <div className="flex items-center gap-6 ml-auto">
            {isLoggedIn ? (
              <>
                {/* Wishlist */}
                <FontAwesomeIcon icon={faHeart} className="w-6 h-6 text-slate-700 cursor-pointer" />

                {/* Shopping Cart */}
                <FontAwesomeIcon icon={faCartShopping} className="w-6 h-6 text-slate-700 cursor-pointer" />

                {/* Notifications */}
                <FontAwesomeIcon icon={faBell} className="w-6 h-6 text-slate-700 cursor-pointer" />

                {/* Avatar + Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-white font-medium cursor-pointer"
                  >
                    {user?.username?.charAt(0)?.toUpperCase()}
                  </div>

                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
                      <ul className="py-2 text-sm text-slate-700">
                        <li onClick={() => navigate('/profile')} className="px-4 py-2 hover:bg-slate-100 cursor-pointer">{t('account.profile', { ns: 'layout' })}</li>
                        <li className="px-4 py-2 hover:bg-slate-100 cursor-pointer">{t('account.my_courses', { ns: 'layout' })}</li>
                        <li className="px-4 py-2 hover:bg-slate-100 cursor-pointer">{t('account.settings', { ns: 'layout' })}</li>
                        <li onClick={handleLogout} className="px-4 py-2 hover:bg-slate-100 cursor-pointer text-red-600">{t('account.logout', { ns: 'layout' })}</li>
                      </ul>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Shopping Cart */}
                <FontAwesomeIcon icon={faCartShopping} className="w-6 h-6 text-slate-700 ml-20 mr-5 cursor-pointer" />

                {/* Login and Signup Buttons */}
                <div className="flex items-center gap-3">
                  <button onClick={() => navigate('/login')} className="cursor-pointer px-2.5 py-2.5 border border-slate-700 text-slate-700 text-sm font-medium hover:bg-slate-50 hover:text-white hover:bg-slate-700">
                    {t('header.login', { ns: 'layout' })}
                  </button>
                  <button onClick={() => navigate('/sign_up')} className="cursor-pointer px-2.5 py-2.5 bg-slate-700 text-white text-sm font-medium hover:bg-white hover:text-slate-700 hover:border hover:border-slate-700">
                    {t('header.sign_up', { ns: 'layout' })}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Language Switcher */}
          <div className="relative ml-5" ref={dropdownRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="px-2 py-1 border border-slate-700 rounded text-sm hover:bg-slate-100"
            >
              {i18n.language.toUpperCase()}
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-30 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
                <ul className="py-1 text-sm text-slate-700">
                  <li
                    onClick={() => { handleChangeLanguage('en'); }}
                    className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
                  >
                    {t('header.en', { ns: 'layout' })}
                  </li>
                  <li
                    onClick={() => { handleChangeLanguage('vi'); }}
                    className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
                  >
                    {t('header.vi', { ns: 'layout' })}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
}
