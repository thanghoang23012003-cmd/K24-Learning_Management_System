import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

export default function UserHeader() {
  const { t } = useTranslation();

  return (
    <>
      {/* Header */}
      <header className="py-2 border-b border-slate-200">
        <div className="flex items-center justify-start w-full h-full px-20">
          {/* Logo and Brand */}
          <div className="flex w-40 flex-shrink-0 items-center cursor-pointer">
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
          <div className="flex items-center gap-6">
            {/* Shopping Cart */}
            <FontAwesomeIcon icon={faCartShopping} className="w-6 h-6 item-center text-slate-700 ml-20 mr-5 cursor-pointer" />

            {/* Login and Signup Buttons */}
            <div className="flex items-center gap-3">
              <button className="cursor-pointer px-2.5 py-2.5 border border-slate-700 text-slate-700 text-sm font-medium hover:bg-slate-50 hover:text-white hover:bg-slate-700">
                {t('header.login', { ns: 'layout' })}
              </button>
              <button className="cursor-pointer px-2.5 py-2.5 bg-slate-700 text-white text-sm font-medium hover:bg-white hover:text-slate-700 hover:border hover:border-slate-700">
                {t('header.sign_up', { ns: 'layout' })}
              </button>
            </div>
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
