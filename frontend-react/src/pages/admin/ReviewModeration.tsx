import { useEffect, useState } from 'react';
import { useApi } from "../../hooks/useAPI";
import type { AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';


// ---- Types ----
type ReviewStatus = 'pending' | 'approved' | 'rejected';

interface ReviewUser {
  firstName: string;
  lastName: string;
}

interface ReviewCourse {
  title: string;
}

export interface Review {
  _id: string;
  userId: ReviewUser;
  courseId: ReviewCourse;
  content: string;
  rating: number;
  status: ReviewStatus;
}

interface PaginatedReviews {
  reviews: Review[];
  total: number;
  page: number;
  limit: number;
}

const ReviewModeration: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<ReviewStatus>('pending');
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(10);
  const [totalReviews, setTotalReviews] = useState(0);
  const { t } = useTranslation('reviewModeration');

  const { getAllReviews, getPendingReviews, updateReviewStatus } = useApi() as {
    getAllReviews: (status: ReviewStatus, page: number, limit: number) => Promise<AxiosResponse<PaginatedReviews>>;
    getPendingReviews: (page: number, limit: number) => Promise<AxiosResponse<PaginatedReviews>>;
    updateReviewStatus: (id: string, status: ReviewStatus) => Promise<AxiosResponse<any>>;
  };

  useEffect(() => {
    void fetchReviews(filter, currentPage, reviewsPerPage);
  }, [filter, currentPage, reviewsPerPage]);

  const fetchReviews = async (status: ReviewStatus, page: number, limit: number) => {
    try {
      let response;
      if (status === 'pending') {
        response = await getPendingReviews(page, limit);
      } else {
        response = await getAllReviews(status, page, limit);
      }
      setReviews(response.data.reviews);
      setTotalReviews(response.data.total);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  const handleUpdateStatus = async (id: string, status: ReviewStatus) => {
    try {
      await updateReviewStatus(id, status);
      setReviews(prev => prev.filter(review => review._id !== id));
      void fetchReviews(filter, currentPage, reviewsPerPage); // Re-fetch reviews after status update
    } catch (error) {
      console.error('Failed to update review status:', error);
    }
  };

  const totalPages = Math.ceil(totalReviews / reviewsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col h-full">
      <h1 className="text-2xl font-bold mb-4">{t('review_moderation_title')}</h1>

      <div className="mb-4 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => {
              setFilter('pending');
              setCurrentPage(1);
            }}
            className={`${
              filter === 'pending'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            {t('pending_tab')}
          </button>
          <button
            onClick={() => {
              setFilter('approved');
              setCurrentPage(1);
            }}
            className={`${
              filter === 'approved'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            {t('approved_tab')}
          </button>
          <button
            onClick={() => {
              setFilter('rejected');
              setCurrentPage(1);
            }}
            className={`${
              filter === 'rejected'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            {t('rejected_tab')}
          </button>
        </nav>
      </div>

      <div className="flex-grow overflow-y-auto">
        {reviews.length > 0 ? (
          <ul className="space-y-4">
            {reviews.map((review) => (
              <li key={review._id} className="p-4 bg-white shadow rounded-lg">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">
                      {review.userId?.firstName} {review.userId?.lastName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t('course_label')}: {review.courseId?.title}
                    </p>
                    <p className="mt-2">{review.content}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {t('rating_label')}: {review.rating}/5
                    </p>
                  </div>
                  {filter === 'pending' && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUpdateStatus(review._id, 'approved')}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        {t('approve_button')}
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(review._id, 'rejected')}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        {t('reject_button')}
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>{t('no_reviews_found')}</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${currentPage === i + 1 ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ReviewModeration;
