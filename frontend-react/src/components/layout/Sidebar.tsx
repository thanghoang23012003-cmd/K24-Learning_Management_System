import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { faArrowLeft, faBars } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';

interface SidebarProps {
  isExpanded?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({ isExpanded = true, onToggle }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('courses');
  const { t } = useTranslation();
  console.log(isExpanded, activeItem);

  const menuItems = [
    {
      id: 'dashboard',
      label: t('sidebar.dashboard', { ns: 'layout' }),
      icon: <DashboardIcon />,
      isActive: false,
    },
    {
      id: 'courses',
      label: t('sidebar.courses', { ns: 'layout' }),
      icon: <CoursesIcon />,
      isActive: true,
    },
    {
      id: 'setting',
      label: t('sidebar.settings', { ns: 'layout' }),
      icon: <SettingIcon />,
      isActive: false,
    },
  ];

  return (
    <>
      {/* Section */}
      <section 
        className="flex h-full w-60 bg-gray-800 flex-col justify-center items-start sidebar-shadow absolute left-0 top-0" 
      >
        {/* Header Section */}
        <div 
          className="flex flex-col items-start absolute left-0 top-0 h-full w-full gap-3"
        >
          {/* Logo Section */}
          <div 
            className="flex flex-col items-start self-stretch relative mt-5"
          >
            <div className="flex justify-between items-center self-stretch relative">
              <div className="flex items-center relative" style={{ gap: '5px' }}>
                <div className="ml-4 flex w-40 flex-shrink-0 items-center cursor-pointer">
                  <img src="/public/logos/logo.png" alt="Byway Logo" className="h-8 w-8 mr-2" />
                  <span className="text-white font-medium text-base">Byway</span>
                </div>
              </div>
              <button 
                className="p-0 bg-transparent border-none cursor-pointer flex items-center justify-center" 
                onClick={onToggle}
              >
                <FontAwesomeIcon icon={faArrowLeft} className='text-white mr-2'/>
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="flex flex-col items-start self-stretch relative">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center text-white self-stretch relative cursor-pointer transition-all duration-200 hover:bg-blue-500/10`}
                onClick={() => setActiveItem(item.id)}
              >
                <div 
                  className="flex items-start relative"
                  style={{ padding: '18px', gap: '10px' }}
                >
                  {item.icon}
                </div>
                <div
                  className="relative"
                >
                  {item.label}
                </div>
                {item.isActive && (
                  <div 
                    className="absolute right-0 border-r border-2 w-1 h-full border-primary-500"
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* User Section */}
        <div 
          className="flex flex-col w-full mt-auto absolute left-0 bottom-4 ml-4"
        >
          <div className="flex justify-between items-center self-stretch relative">
            <div className="flex items-center relative">
              <div 
                className="relative w-10 h-10 border-2 border-radius-100 border-white mr-3"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '100px',
                  background: 'linear-gradient(45deg, #F59E0B, #EF4444)',
                }}
              ></div>
              <div 
                className="relative font-medium text-white"
              >
                Hi, John
              </div>
            </div>
            <button className="p-0 mr-10 bg-transparent border-none cursor-pointer">
              <FontAwesomeIcon icon={faBars} className='text-white' />
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
}

// Icon Components
function DashboardIcon() {
  return (
    <img src="/image/icons/dashboard.svg" alt="Dashboard Icon" />
  );
}

function CoursesIcon() {
  return (
    <img src="/image/icons/course.svg" alt="Courses Icon" />
  );
}

function SettingIcon() {
  return (
    <img src="/image/icons/setting.svg" alt="Setting Icon" />
  );
}
