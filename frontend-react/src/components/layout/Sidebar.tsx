import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { faArrowLeft, faBars } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";

interface SidebarProps {
  isExpanded?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({ isExpanded = true, onToggle }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("courses");
  const { t } = useTranslation();
  const navigate = useNavigate();
  console.log(isExpanded, activeItem);

  const { user } = useAuth();

  const menuItems = [
    {
      id: "dashboard",

      label: t("sidebar.dashboard", { ns: "layout" }),

      icon: <DashboardIcon />,

      path: "/admin/dashboard",
    },

    {
      id: "courses",

      label: t("sidebar.courses", { ns: "layout" }),

      icon: <CoursesIcon />,

      path: "/admin/course/create",
    },

    {
      id: "reviews",

      label: t("sidebar.reviews", { ns: "layout" }),

      icon: <ReviewIcon />,

      path: "/admin/reviews",
    },

    {
      id: "setting",

      label: t("sidebar.settings", { ns: "layout" }),

      icon: <SettingIcon />,

      path: "/admin/settings",
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Section */}

      <section className="flex h-full w-60 bg-gray-800 flex-col justify-center items-start sidebar-shadow absolute left-0 top-0">
        {/* Header Section */}

        <div className="flex flex-col items-start absolute left-0 top-0 h-full w-full gap-3">
          {/* Logo Section */}

          <div className="flex flex-col items-start self-stretch relative mt-5">
            <div className="flex justify-between items-center self-stretch relative">
              <div
                className="flex items-center relative"
                style={{ gap: "5px" }}
              >
                <div
                  onClick={() => navigate("/")}
                  className="ml-4 flex w-40 flex-shrink-0 items-center cursor-pointer"
                >
                  <img
                    src="logos/logo.png"
                    alt="Byway Logo"
                    className="h-8 w-8 mr-2"
                  />

                  <span className="text-white font-medium text-base">
                    Byway
                  </span>
                </div>
              </div>

              <button
                className="p-0 bg-transparent border-none cursor-pointer flex items-center justify-center"
                onClick={onToggle}
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="text-white mr-2"
                />
              </button>
            </div>
          </div>

          {/* Navigation Menu */}

          <div className="flex flex-col items-start self-stretch relative">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center text-white self-stretch relative cursor-pointer transition-all duration-200 hover:bg-blue-500/10 ${
                  activeItem === item.id ? "bg-blue-500/20" : ""
                }`}
                onClick={() => {
                  setActiveItem(item.id);

                  navigate(item.path);
                }}
              >
                <div
                  className="flex items-start relative"
                  style={{ padding: "18px", gap: "10px" }}
                >
                  {item.icon}
                </div>

                <div className="relative">{item.label}</div>

                {activeItem === item.id && (
                  <div className="absolute right-0 border-r border-2 w-1 h-full border-primary-500"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* User Section */}

        <div className="flex flex-col w-full mt-auto absolute left-0 bottom-4 ml-4">
          <div className="flex justify-between items-center self-stretch relative">
            <div className="flex items-center relative">
              <div className="mr-2 w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-white font-medium cursor-pointer">
                {user?.username?.charAt(0)?.toUpperCase()}
              </div>

              <div className="relative font-medium text-white">
                Hi, {user?.username}!
              </div>
            </div>

            <button className="p-0 mr-10 bg-transparent border-none cursor-pointer">
              <FontAwesomeIcon icon={faBars} className="text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}

      <main className="p-4 overflow-y-auto w-full pl-60">
        <Outlet />
      </main>
    </div>
  );
}

function CoursesIcon() {
  return <img src="image/icons/course.svg" alt="Courses Icon" />;
}

function SettingIcon() {
  return <img src="image/icons/setting.svg" alt="Setting Icon" />;
}

function DashboardIcon() {
  return <img src="image/icons/dashboard.svg" alt="Dashboard Icon" />;
}

function ReviewIcon() {
  return <img src="image/icons/review.svg" width="24px" height="24px" alt="Review Icon" />;
}
