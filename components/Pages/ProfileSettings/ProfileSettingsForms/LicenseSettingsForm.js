import React, { useState } from 'react';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import CustomField from '@/components/UI/CustomField';
import CustomUploaderImage from '@/components/UI/CustomUploaderImage';
import { Button, Form, Schema } from 'rsuite';

const model = Schema.Model({
	userLicense: Schema.Types.StringType().isRequired('This field is must be not empty.'),
});

const LicenseSettingsForm = ({ form, formValue, setFormValue, fetching, onSubmit }) => {
	const [formError, setFormError] = useState({});
	return (
		<Form
			ref={form}
			onCheck={setFormError}
			formError={formError}
			model={model}
			checkTrigger="change"
			formValue={formValue}
			onChange={setFormValue}
		>
			<MWT_Row className="c-mb-20">
				<MWT_Col>
					<CustomField
						accepter={CustomUploaderImage}
						name="licenseFiles"
						disabled={fetching}
						label={<>Your License Photo</>}
						fileList={formValue.licenseFiles}
						setFormValue={setFormValue}
						multiple={true}
					/>
				</MWT_Col>
			</MWT_Row>
			<hr />
			<MWT_Row>
				<MWT_Col>
					<CustomField
						label="Enter your license ID"
						placeholder="licenseID"
						disabled={fetching}
						type="text"
						name="userLicense"
						error={formError.userLicense}
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

export default LicenseSettingsForm;
