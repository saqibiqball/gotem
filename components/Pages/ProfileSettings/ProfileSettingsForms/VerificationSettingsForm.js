import React, { useState } from 'react';
import { Button, Form } from 'rsuite';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import CustomField from '@/components/UI/CustomField';
import CustomUploaderImage from '@/components/UI/CustomUploaderImage';

const VerificationSettingsForm = ({ form, formValue, setFormValue, fetching, onSubmit }) => {
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
				<MWT_Col>
					<CustomField
						accepter={CustomUploaderImage}
						name="files"
						disabled={fetching}
						label="Choose one of the following documents to provide: Passport, Drivers License, or State issued Identification Card"
						fileList={formValue.files}
						setFormValue={setFormValue}
						multiple={true}
					/>
				</MWT_Col>
			</MWT_Row>
			<hr />
			<MWT_Row className="c-mb-20">
				<MWT_Col>
					<CustomField
						accepter={CustomUploaderImage}
						name="selfyFiles"
						disabled={fetching}
						label={
							<>
								Please submit a selfie of yourself holding your identification next
								to your face. <a href="#">See example by clicking here</a>
							</>
						}
						fileList={formValue.selfyFiles}
						setFormValue={setFormValue}
						multiple={true}
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

export default VerificationSettingsForm;
