import React, { useEffect, useState } from 'react';
import { Button, Form, TagPicker } from 'rsuite';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import CustomField from '@/components/UI/CustomField';
import CustomNotice from '@/components/UI/CustomNotice';
import { getCategories } from '@/http/userAPI';

const CategoriesSettingsForm = ({ form, formValue, setFormValue, fetching, onSubmit, model }) => {
	const [formError, setFormError] = useState({});
	const [allCategories, setAllCategories] = useState([]);

	useEffect(() => {
		const fetchCatefories = async () => {
			try {
				const res = await getCategories();
				setAllCategories(res);
			} catch (e) {
				CustomNotice({
					content: e.response?.data?.message,
					type: 'error',
				});
			}
		};
		fetchCatefories();
	}, []);

	return (
		<Form
			ref={form}
			onCheck={setFormError}
			formError={formError}
			checkTrigger="change"
			formValue={formValue}
			onChange={setFormValue}
			model={model}
		>
			<MWT_Row className="c-mb-20">
				<MWT_Col>
					<CustomField
						accepter={TagPicker}
						placeholder="All categories"
						name="cats"
						data={allCategories}
						valueKey="id"
						labelKey="name"
						value={formValue.cats}
						cleanable={false}
					/>
				</MWT_Col>
			</MWT_Row>
			<MWT_Row className="c-mb-20">
				<MWT_Col lg={4}>
					<div className="divider-20" />
					<Form.Group>
						<Button disabled={fetching} className="rs-btn-main" onClick={onSubmit}>
							Save
						</Button>
					</Form.Group>
				</MWT_Col>
			</MWT_Row>
		</Form>
	);
};

export default CategoriesSettingsForm;
