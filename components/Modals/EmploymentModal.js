import React, { useMemo, useRef, useState } from 'react';
import { Button, Checkbox, Form, Modal, Schema, SelectPicker } from 'rsuite';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import CustomField from '@/components/UI/CustomField';
const { StringType } = Schema.Types;

const model = Schema.Model({
	name: StringType().isRequired('The field is required.'),
	description: StringType().isRequired('The field is required.'),
	monthFrom: StringType().isRequired('The field is required.'),
	yearFrom: StringType().isRequired('The field is required.'),
});

const months = [
	{ id: 1, name: 'January' },
	{ id: 2, name: 'February' },
	{ id: 3, name: 'March' },
	{ id: 4, name: 'April' },
	{ id: 5, name: 'May' },
	{ id: 6, name: 'June' },
	{ id: 7, name: 'July' },
	{ id: 8, name: 'August' },
	{ id: 9, name: 'September' },
	{ id: 10, name: 'October' },
	{ id: 11, name: 'November' },
	{ id: 12, name: 'December' },
];

const EmploymentModal = ({
	showModal,
	closeModal,
	addEmployment,
	form,
	formValue,
	setFormValue,
	fetching,
	setFormError,
	formError,
}) => {
	const years = useMemo(() => {
		const yearsArr = [];
		const yearToday = new Date().getFullYear();

		for (let i = 0; i <= 100; i++) {
			yearsArr.push({ id: i + 1, name: (yearToday - i).toString() });
		}

		return yearsArr;
	}, []);

	return (
		<Modal size="md" open={showModal} onClose={closeModal}>
			<Modal.Header>
				<Modal.Title>Add/Edit Employment</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form
					ref={form}
					onCheck={setFormError}
					formError={formError}
					model={model}
					checkTrigger="change"
					formValue={formValue}
					onChange={setFormValue}
				>
					<MWT_Row className="c-mb-10">
						<MWT_Col>
							<CustomField
								label="Employment name"
								placeholder="Employment name"
								disabled={fetching}
								type="text"
								name="name"
								error={formError.name}
							/>
						</MWT_Col>
						<MWT_Col>
							<CustomField
								label="Employment description"
								placeholder="Employment description"
								accepter="textarea"
								disabled={fetching}
								type="text"
								name="description"
								error={formError.description}
							/>
						</MWT_Col>
						<MWT_Col lg={6}>
							<CustomField
								accepter={SelectPicker}
								label="Month From"
								placeholder="Month From"
								disabled={fetching}
								name="monthFrom"
								data={months}
								searchable={false}
								cleanable={false}
								valueKey="name"
								labelKey="name"
								error={formError.monthFrom}
							/>
						</MWT_Col>
						<MWT_Col lg={6}>
							<CustomField
								accepter={SelectPicker}
								label="Year From"
								placeholder="Year From"
								disabled={fetching}
								name="yearFrom"
								data={years}
								searchable={false}
								cleanable={false}
								valueKey="name"
								labelKey="name"
								error={formError.yearFrom}
							/>
						</MWT_Col>
						<MWT_Col>
							<CustomField
								name="isPresent"
								accepter={Checkbox}
								disabled={fetching}
								checked={formValue.isPresent}
								onChange={() => {
									setFormValue({ ...formValue, isPresent: !formValue.isPresent });
									setFormError({});
								}}
							>
								I am currently working in this position
							</CustomField>
						</MWT_Col>
						<MWT_Col lg={6}>
							<CustomField
								accepter={SelectPicker}
								label="Month To"
								placeholder="Month To"
								disabled={fetching || formValue.isPresent}
								name="monthTo"
								data={months}
								cleanable={false}
								searchable={false}
								valueKey="name"
								labelKey="name"
								error={formError.monthTo}
							/>
						</MWT_Col>
						<MWT_Col lg={6}>
							<CustomField
								accepter={SelectPicker}
								label="Year To"
								placeholder="Year To"
								disabled={fetching || formValue.isPresent}
								name="yearTo"
								data={years}
								cleanable={false}
								searchable={false}
								valueKey="name"
								labelKey="name"
								// error={formError.yearTo}
							/>
						</MWT_Col>
					</MWT_Row>
				</Form>
			</Modal.Body>
			<Modal.Footer className="text-center">
				<div>
					<Button className="rs-btn-main rs-btn-small" onClick={() => addEmployment()}>
						Save
					</Button>
					<Button className="rs-btn-danger rs-btn-small" onClick={closeModal}>
						Cancel
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
};

export default EmploymentModal;
