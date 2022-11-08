import React from 'react';
import CustomRate from '@/components/UI/CustomRate';
import { dateFormat } from '@/helpers/dateFormat';

const SourcePageFeedback = ({ proposal }) => {
	return (
		<div className="sourcer-feedback">
			<div className="sourcer-feedback__header">
				<h6 className="h-small color-main">{proposal.mission.title}</h6>

				{proposal.mission.review.length > 0 && (
					<>
						<div className="sourcer-feedback__meta">
							<CustomRate
								color={'color-main'}
								readOnly
								rating={proposal.mission.review[0].ratingLevel}
								size={'xs'}
								allowHalf
							/>
							<span className="sourcer-feedback__date">
								{dateFormat(proposal.createdAt)} - {dateFormat(proposal.updatedAt)}
							</span>
						</div>
					</>
				)}

				<div className="sourcer-feedback__content">
					{proposal.mission.review.length > 0 && (
						<blockquote>{proposal.mission.review[0].content}</blockquote>
					)}
					<div className="sourcer-feedback__price">
						<span className="price-value">$ {proposal.amount}</span>
						{proposal.isFixedPrice && <span>Fixed Price</span>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SourcePageFeedback;
