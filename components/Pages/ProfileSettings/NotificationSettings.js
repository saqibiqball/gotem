import React, { useState } from 'react';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import { Toggle } from 'rsuite';

const NotificationSettings = () => {
	const [commentsNotifications, setCommentsNotifications] = useState({
		push: true,
		email: false,
		sms: true,
	});
	const [tagsNotifications, setTagsNotifications] = useState({
		push: false,
		email: false,
		sms: false,
	});
	const [remindersNotifications, setRemindersNotifications] = useState({
		push: false,
		email: false,
		sms: false,
	});
	const [activityNotifications, setActivityNotifications] = useState({
		push: false,
		email: false,
		sms: false,
	});

	console.log('commentsNotifications =', commentsNotifications);
	console.log('tagsNotifications =', tagsNotifications);
	console.log('remindersNotifications =', remindersNotifications);
	console.log('activityNotifications =', activityNotifications);
	return (
		<div className="ls p-32 bordered">
			<h6>Notification settings</h6>
			<p>
				We may still send you important notifications about your account outside of your
				notifications settings
			</p>
			<hr />
			<MWT_Row>
				<MWT_Col lg={7}>
					<h6 className="h-small">Comments</h6>
					<p>
						These are the notifications for comments on your post and replies to your
						comments.
					</p>
				</MWT_Col>
				<MWT_Col lg={5}>
					<div className="toggle">
						<Toggle
							size="md"
							checked={commentsNotifications.push}
							onChange={() =>
								setCommentsNotifications({
									...commentsNotifications,
									push: !commentsNotifications.push,
								})
							}
						/>
						<label>Push</label>
					</div>
					<div className="toggle">
						<Toggle
							size="md"
							checked={commentsNotifications.email}
							onChange={() =>
								setCommentsNotifications({
									...commentsNotifications,
									email: !commentsNotifications.email,
								})
							}
						/>
						<label>Email</label>
					</div>

					<div className="toggle">
						<Toggle
							size="md"
							checked={commentsNotifications.sms}
							onChange={() =>
								setCommentsNotifications({
									...commentsNotifications,
									sms: !commentsNotifications.sms,
								})
							}
						/>
						<label>SMS</label>
					</div>
				</MWT_Col>
			</MWT_Row>
			<hr />
			<MWT_Row>
				<MWT_Col lg={7}>
					<h6 className="h-small">Tags</h6>
					<p>These are the notifications when someone tags you in the comment.</p>
				</MWT_Col>
				<MWT_Col lg={5}>
					<div className="toggle">
						<Toggle
							size="md"
							checked={tagsNotifications.push}
							onChange={() =>
								setTagsNotifications({
									...tagsNotifications,
									push: !tagsNotifications.push,
								})
							}
						/>
						<label>Push</label>
					</div>
					<div className="toggle">
						<Toggle
							size="md"
							checked={tagsNotifications.email}
							onChange={() =>
								setTagsNotifications({
									...tagsNotifications,
									email: !tagsNotifications.email,
								})
							}
						/>
						<label>Email</label>
					</div>

					<div className="toggle">
						<Toggle
							size="md"
							checked={tagsNotifications.sms}
							onChange={() =>
								setTagsNotifications({
									...tagsNotifications,
									sms: !tagsNotifications.sms,
								})
							}
						/>
						<label>SMS</label>
					</div>
				</MWT_Col>
			</MWT_Row>
			<hr />
			<MWT_Row>
				<MWT_Col lg={7}>
					<h6 className="h-small">Reminders</h6>
					<p>
						These are the notifications to remind you of updates you might have messed.
					</p>
				</MWT_Col>
				<MWT_Col lg={5}>
					<div className="toggle">
						<Toggle
							size="md"
							checked={remindersNotifications.push}
							onChange={() =>
								setRemindersNotifications({
									...remindersNotifications,
									push: !remindersNotifications.push,
								})
							}
						/>
						<label>Push</label>
					</div>
					<div className="toggle">
						<Toggle
							size="md"
							checked={remindersNotifications.email}
							onChange={() =>
								setRemindersNotifications({
									...remindersNotifications,
									email: !remindersNotifications.email,
								})
							}
						/>
						<label>Email</label>
					</div>

					<div className="toggle">
						<Toggle
							size="md"
							checked={remindersNotifications.sms}
							onChange={() =>
								setRemindersNotifications({
									...remindersNotifications,
									sms: !remindersNotifications.sms,
								})
							}
						/>
						<label>SMS</label>
					</div>
				</MWT_Col>
			</MWT_Row>
			<hr />
			<MWT_Row>
				<MWT_Col lg={7}>
					<h6 className="h-small">More activity about you</h6>
					<p>These are the notifications for post on your profile</p>
				</MWT_Col>
				<MWT_Col lg={5}>
					<div className="toggle">
						<Toggle
							size="md"
							checked={activityNotifications.push}
							onChange={() =>
								setActivityNotifications({
									...activityNotifications,
									push: !activityNotifications.push,
								})
							}
						/>
						<label>Push</label>
					</div>
					<div className="toggle">
						<Toggle
							size="md"
							checked={activityNotifications.email}
							onChange={() =>
								setActivityNotifications({
									...activityNotifications,
									email: !activityNotifications.email,
								})
							}
						/>
						<label>Email</label>
					</div>

					<div className="toggle">
						<Toggle
							size="md"
							checked={activityNotifications.sms}
							onChange={() =>
								setActivityNotifications({
									...activityNotifications,
									sms: !activityNotifications.sms,
								})
							}
						/>
						<label>SMS</label>
					</div>
				</MWT_Col>
			</MWT_Row>
		</div>
	);
};

export default NotificationSettings;
