import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Footer from '../components/layout/Footer';

export default function Profile() {
  const { t } = useTranslation('profile');
  const [activeTab, setActiveTab] = useState<'profile' | 'courses' | 'reviews' | 'teachers' | 'messages'>('profile');

  // Mock data for courses and reviews
  const courses = [
    { id: 1, title: "Beginner’s Guide to Design", instructor: "Ronald Richards", rating: 5, ratingsCount: 1200 },
    { id: 2, title: "Beginner’s Guide to Design", instructor: "Ronald Richards", rating: 5, ratingsCount: 1200 },
    { id: 3, title: "Beginner’s Guide to Design", instructor: "Ronald Richards", rating: 5, ratingsCount: 1200 },
    { id: 4, title: "Beginner’s Guide to Design", instructor: "Ronald Richards", rating: 5, ratingsCount: 1200 },
    { id: 5, title: "Beginner’s Guide to Design", instructor: "Ronald Richards", rating: 5, ratingsCount: 1200 },
    { id: 6, title: "Beginner’s Guide to Design", instructor: "Ronald Richards", rating: 5, ratingsCount: 1200 },
    { id: 7, title: "Beginner’s Guide to Design", instructor: "Ronald Richards", rating: 5, ratingsCount: 1200 },
    { id: 8, title: "Beginner’s Guide to Design", instructor: "Ronald Richards", rating: 5, ratingsCount: 1200 },
    { id: 9, title: "Beginner’s Guide to Design", instructor: "Ronald Richards", rating: 5, ratingsCount: 1200 },
  ];

  const reviews = [
    {
      courseId: 1,
      title: "Beginner’s Guide to Design",
      rating: 5,
      comment: "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
    },
    {
      courseId: 2,
      title: "Beginner’s Guide to Design",
      rating: 5,
      comment: "The course exceeded my expectations. The content is well-structured and the instructor explains everything clearly.",
    },
    {
      courseId: 3,
      title: "Beginner’s Guide to Design",
      rating: 5,
      comment: "Great course! I learned so much in a short time. Highly recommend it to anyone starting out.",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="p-8 w-full">
            <h2 className="text-2xl font-bold mb-6">{t("profileinfo", {ns: 'profile'})}</h2>
            <div className="grid grid-cols-2 gap-6 bg-white rounded-2xl shadow p-6">
              {/* First Name */}
              <div>
                <label className="block text-gray-600 mb-1">{t("firstname", {ns: 'profile'})}</label>
                <input className="w-full border p-2 rounded" placeholder={t("firstname", {ns: 'profile'})} />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-gray-600 mb-1">{t("lastName", {ns: 'profile'})} </label>
                <input className="w-full border p-2 rounded" placeholder={t("lastName", {ns: 'profile'})} />
              </div>

              {/* Headline */}
              <div className="col-span-2">
                <label className="block text-gray-600 mb-1">{t("headline", {ns: 'profile'})} </label>
                <input className="w-full border p-2 rounded" placeholder={t("headline", {ns: 'profile'})}/>
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="block text-gray-600 mb-1">{t("description", {ns: 'profile'})}</label>
                <textarea className="w-full border p-2 rounded h-24" placeholder={t("description", {ns: 'profile'})} />
              </div>

              {/* Language */}
              <div className="col-span-2">
                <label className="block text-gray-600 mb-1">{t("language", {ns: 'profile'})}</label>
                <select className="w-full border p-2 rounded">
                  <option value="en">English</option>
                  <option value="vi">Vietnamese</option>
                </select>
              </div>

              {/* Image Preview */}
              <div className="col-span-2">
                <label className="block text-gray-600 mb-2">{t("imagePreview", {ns: 'profile'})}</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl h-32 flex items-center justify-center bg-gray-50 mb-3">
                  <img
                    src="https://picsum.photos/id/1/100/100"
                    alt="preview"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <input type="file" accept="image/*" className="hidden" id="image-upload" />
                <label htmlFor="image-upload" className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition">
                  {t("uploadImage", {ns: 'profile'})}
                </label>
              </div>

              {/* Links */}
              <div className="col-span-2 space-y-3">
                <label className="block text-gray-600">{t('links')}</label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 w-20">Website:</span>
                  <input className="flex-1 border p-2 rounded" placeholder="https://example.com" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 w-20">LinkedIn:</span>
                  <input className="flex-1 border p-2 rounded" placeholder="https://linkedin.com/in/johndoe" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 w-20">YouTube:</span>
                  <input className="flex-1 border p-2 rounded" placeholder="https://youtube.com/@johndoe" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 w-20">Facebook:</span>
                  <input className="flex-1 border p-2 rounded" placeholder="https://facebook.com/johndoe" />
                </div>
              </div>

              {/* Save Button */}
              <div className="col-span-2 flex justify-end mt-4">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">
                  {t("saveProfile", {ns: 'profile'})}
                </button>
              </div>
            </div>
          </div>
        );

      case 'courses':
        return (
          <div className="p-8 w-full">
            <h2 className="text-2xl font-bold mb-6">{t('myCourses')}</h2>

            {/* Toolbar: Search + Sort + Filter */}
            <div className="flex items-center justify-between mb-6">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder={t('searchUser')}
                  className="w-full border p-2 rounded pl-10"
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="flex items-center space-x-3">
                <select className="border p-2 rounded">
                  <option>{t('relevance')}</option>
                  <option>{t('latest')}</option>
                </select>
                <button className="border px-4 py-2 rounded hover:bg-gray-100">
                  {t('filter')}
                </button>
              </div>
            </div>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <div key={course.id} className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
                  <img
                    src={`https://picsum.photos/seed/course${index}/400/200`}
                    alt={course.title}
                    className="rounded-xl mb-3 w-full h-32 object-cover"
                  />
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <p className="text-sm text-gray-500">By {course.instructor}</p>
                  <p className="text-yellow-500 text-sm mt-1">
                    {Array(course.rating).fill(0).map(() => '★').join('')} ({course.ratingsCount} ratings)
                  </p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-2">
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  className={`px-4 py-2 border rounded ${
                    p === 1 ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="p-8 w-full">
            <h2 className="text-2xl font-bold mb-6">{t('myReviews')}</h2>
            <div className="space-y-6">
              {reviews.map((review, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
                  <p className="font-semibold mb-1">
                    {t('courseName')}: {review.title}
                  </p>
                  <p className="text-yellow-500">★★★★★</p>
                  <p className="text-gray-600 mt-2">{review.comment}</p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-2">
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  className={`px-4 py-2 border rounded ${
                    p === 1 ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Wrapper: min-h-screen */}
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Main */}
        <main className="flex-1 pb-40 flex">
          {/* Sidebar */}
          <aside className="w-72 bg-white border-r shadow-sm p-6">
            <div className="flex flex-col items-center mb-8">
              <img
                src="https://picsum.photos/id/1/100/100"
                alt="avatar"
                className="rounded-full mb-3 w-20 h-20 object-cover"
              />
              <p className="font-semibold text-lg">John Doe</p>
              <button className="mt-2 text-blue-600 text-sm">{t('shareProfile')}</button>
            </div>

            <nav className="space-y-2">
              <button
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === 'profile'
                    ? 'bg-blue-600 text-white shadow'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                {t('profile')}
              </button>
              <button
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === 'courses'
                    ? 'bg-blue-600 text-white shadow'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('courses')}
              >
                {t('myCourses')}
              </button>
              <button
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === 'teachers'
                    ? 'bg-blue-600 text-white shadow'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('teachers')}
              >
                {t('teachers')}
              </button>
              <button
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === 'messages'
                    ? 'bg-blue-600 text-white shadow'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('messages')}
              >
                {t('messages')}
              </button>
              <button
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === 'reviews'
                    ? 'bg-blue-600 text-white shadow'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                {t('myReviews')}
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1">{renderContent()}</div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}