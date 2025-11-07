import React, { useState } from 'react';
import { Stars } from '../../pages/DetailCourse';
import { formatDateTime, beFileUrl } from '../../utils/base.util';
import type { CourseReview } from '../../pages/DetailCourse';
import { useApi } from '../../hooks/useAPI';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

interface ReviewItemProps {
  review: CourseReview;
  courseId: string;
  onReviewSubmitted: () => void;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review, courseId, onReviewSubmitted }) => {
  const { t } = useTranslation();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const { createReview } = useApi();

  const user = review.userId;
  const userName = user ? `${user.firstName} ${user.lastName}` : 'Anonymous';
  const avatarUrl = user?.avatar ? beFileUrl(user.avatar) : null;

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent) return;

    try {
      await createReview(courseId, undefined, replyContent, review._id);
      toast.success(t('reply_submitted', { ns: 'course' }));
      setReplyContent('');
      setShowReplyForm(false);
      onReviewSubmitted();
    } catch (error) {
      toast.error(t('reply_submit_failed', { ns: 'course' }));
    }
  };

  const renderAvatar = () => {
    if (avatarUrl) {
      return (
        <img
          src={avatarUrl}
          alt={userName}
          className="w-8 h-8 rounded-full mr-2 object-cover"
        />
      );
    }

    // Nếu không có avatar, hiển thị chữ cái đầu của tên
    return (
      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white font-medium mr-2">
        {userName?.charAt(0)?.toUpperCase() || "A"}
      </div>
    );
  };

  return (
    <div className="border-b py-4">
      <div className="flex items-center mb-2">
        {renderAvatar()}
        <div className="font-bold mr-2">{userName}</div>
        {review.rating && <Stars value={review.rating} />}
      </div>

      <p className="text-gray-700">{review.content}</p>

      {review.status === 'pending' && (
        <p className="text-sm text-yellow-600 mt-2">
          {t('review_pending_approval', { ns: 'course', defaultValue: 'Your comment is awaiting approval' })}
        </p>
      )}

      <div className="text-sm text-gray-500 mt-2">
        {formatDateTime(review.createdAt)}
        {review.status && (
          <span className="ml-2">
            ({t(`review_status_${review.status}`, { ns: 'course' })})
          </span>
        )}
        <button 
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="ml-4 text-blue-500 hover:underline"
        >
          {t('reply', { ns: 'course', defaultValue: 'Reply' })}
        </button>
      </div>

      {showReplyForm && (
        <form onSubmit={handleReplySubmit} className="mt-4 ml-8">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            rows={3}
            placeholder={t('write_your_reply', { ns: 'course', defaultValue: 'Write your reply...' })}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition cursor-pointer"
          >
            {t('submit_reply', { ns: 'course', defaultValue: 'Submit Reply' })}
          </button>
        </form>
      )}

      {review.replies && review.replies.length > 0 && (
        <div className="ml-8 mt-4">
          {review.replies.map((reply) => (
            <ReviewItem key={reply._id} review={reply} courseId={courseId} onReviewSubmitted={onReviewSubmitted} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
