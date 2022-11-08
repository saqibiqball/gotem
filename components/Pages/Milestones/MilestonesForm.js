import React from 'react';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import CustomField from '@/components/UI/CustomField';
import { Button, Form, InputNumber, Schema } from 'rsuite';
import { useRouter } from 'next/router';

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
	title: StringType().isRequired('The field is required.'),
	description: StringType().isRequired('The field is required.'),
	amount: NumberType().isRequired('The field is required.'),
});

const MilestonesForm = ({
	form,
	setFormError,
	fetching,
	formError,
	formValue,
	setFormValue,
	onSubmit,
}) => {
	const router = useRouter();
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
						label="Milestone title"
						placeholder="Milestone title"
						disabled={fetching}
						type="text"
						name="title"
						error={formError.title}
					/>
				</MWT_Col>
				<MWT_Col>
					<CustomField
						label="Milestone description"
						placeholder="Milestone description"
						accepter="textarea"
						disabled={fetching}
						type="text"
						rows={5}
						name="description"
						error={formError.description}
					/>
				</MWT_Col>
				<MWT_Col>
					<CustomField
						label="Amount"
						placeholder="Amount"
						disabled={fetching}
						min={0}
						accepter={InputNumber}
						name="amount"
						error={formError.amount}
					/>
				</MWT_Col>
				{onSubmit && (
					<MWT_Col>
						<Form.Group>
							<Button className="rs-btn-main mr-20" onClick={onSubmit}>
								submit your milestone
							</Button>
							<Button className="rs-btn-main2" onClick={() => router.back()}>
								cancel
							</Button>
						</Form.Group>
					</MWT_Col>
				)}
			</MWT_Row>
		</Form>
	);
};

export default MilestonesForm;
