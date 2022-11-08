import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'rsuite';
import CustomField from '@/components/UI/CustomField';
import useDebounce from '@/hooks/useDebounce';

const SidebarChatFilter = ({ chats, setSearchChats }) => {
	const form = useRef();
	const [formData, setFormData] = useState({
		search: '',
	});
	const debounceSearch = useDebounce(formData, 250);

	useEffect(() => {
		const searchString = debounceSearch.search.toLowerCase().trim();
		if (searchString.length > 0) {
			const result = chats.filter((c) => {
				return c.lastMessage.toLowerCase().trim().indexOf(searchString) >= 0;
			});
			setSearchChats(result);
		} else {
			setSearchChats(chats);
		}
		// eslint-disable-next-line
	}, [chats, debounceSearch]);

	return (
		<div className="mwt-chat-sidebar-filter">
			<Form ref={form} onChange={setFormData} formValue={formData}>
				<CustomField name="search" placeholder="Search" inputIconLeft="ico-Search1" />
			</Form>
		</div>
	);
};

export default SidebarChatFilter;
