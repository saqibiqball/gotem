import React, { useState } from 'react';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import CustomField from '@/components/UI/CustomField';
import { Button, Form } from 'rsuite';

const RateSettingsForm = ({ form, formValue, setFormValue, fetching, onSubmit }) => {
	const [formError, setFormError] = useState({});
	return (
		<Form
			ref={form}
			onCheck={setFormError}
			formError={formError}
			checkTrigger="change"
			formValue={formValue}
			onChange={setFormValue}
		>
			<MWT_Row className="c-mb-20">
				<MWT_Col lg={4}>
					<CustomField
						label="Minimal hourly rate"
						placeholder="Minimal hourly rate"
						disabled={fetching}
						type="number"
						name="hourlyRate"
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

export default RateSettingsForm;
