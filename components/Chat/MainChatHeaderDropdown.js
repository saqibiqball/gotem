import React from 'react';
import { Button, Dropdown } from 'rsuite';
import useDashboardLink from '@/hooks/useDashboardLink';

const RenderButton = (props, ref) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	return (
		<Button className="btn-icon" {...props} ref={ref}>
			<i className="btn-icon ico-Dots-vertical1 fs-24" />
		</Button>
	);
};

const MainChatHeaderDropdown = ({ receiver }) => {
	const dashboardLink = useDashboardLink();
	const viewProfile = () => {
		let link = dashboardLink;
		if ('roleId' in receiver) {
			switch (receiver.roleId) {
				case 2:
					link += `/${receiver.slug}`;
					break;
				case 3:
					link += `/${receiver.slug}`;
					break;
			}
		}
		return link;
	};

	return (
		<div>
			<Dropdown renderToggle={RenderButton} placement={'bottomEnd'}>
				{/*<Dropdown.Item as={'span'} onClick={viewProfile}>*/}
				{/*	View profile*/}
				{/*</Dropdown.Item>*/}
				<Dropdown.Item as={'span'}>Mark as unread</Dropdown.Item>
			</Dropdown>
		</div>
	);
};

export default MainChatHeaderDropdown;
