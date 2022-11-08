import React from 'react';
import CustomRate from '@/components/UI/CustomRate';
import { dateFormat } from '@/helpers/dateFormat';

const UserPageFeedbacksItem = ({ feedback }) => {
	return (
		<div className="sourcer-feedback">
			<div className="sourcer-feedback__header">
				<h6 className="h-small color-main">{feedback?.mission?.title}</h6>

				<div className="sourcer-feedback__meta">
					<CustomRate
						color={'color-main'}
						readOnly
						rating={feedback.ratingLevel}
						size={'xs'}
						allowHalf
					/>
					<span className="sourcer-feedback__date">
						{dateFormat(feedback?.proposal?.createdAt)} -{' '}
						{dateFormat(feedback?.proposal?.updatedAt)}
					</span>
				</div>
				<div className="sourcer-feedback__content">
					<blockquote>{feedback.content}</blockquote>
					<p className="mb-10">by {feedback.user?.nickName}</p>
					<div className="sourcer-feedback__price">
						<span className="price-value">$ {feedback?.proposal?.amount}</span>
						{feedback?.proposal?.isFixedPrice && <span>Fixed Price</span>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserPageFeedbacksItem;
