import React, { useRef, useState } from 'react';
import { Button, Form, Modal, Radio, RadioGroup, Schema } from 'rsuite';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import { makeReport } from '@/http/reportAPI';
import CustomNotice from '@/components/UI/CustomNotice';
import CustomField from '@/components/UI/CustomField';

const { StringType } = Schema.Types;

const reportModel = Schema.Model({
	subject: StringType().isRequired('The field is required.'),
});

const ReportModal = ({ modalShow, handlerModalClose, user }) => {
	const form = useRef();
	const [formError, setFormError] = useState({});
	const [formValue, setFormValue] = useState({
		reportField: '',
		subject: '',
	});

	const sendReportHandler = async () => {
		// if (!form.current.check()) return true;
		setFormError({});
		if (formValue.subject === 'Other' && formValue.reportField.length === 0) {
			setFormError({ ...formError, reportField: 'Is required field' });
			return true;
		}
		await makeReport({ ...formValue, user: user.email });
		setFormValue({
			reportField: '',
			subject: '',
		});
		CustomNotice({
			content: 'Report was sent',
			type: 'success',
		});
		handlerModalClose();
	};
	return (
		<Modal
			className="vendor-modal"
			overflow={false}
			open={modalShow}
			onClose={handlerModalClose}
		>
			<Modal.Header>
				<Modal.Title>Send report a claim to admin</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<MWT_Row className="c-mb-10 p-20 master-services" gutter={10}>
					<MWT_Col>
						<Form
							ref={form}
							onCheck={setFormError}
							model={reportModel}
							checkTrigger="change"
							formValue={formValue}
							onChange={setFormValue}
						>
							<CustomField
								name="subject"
								label="Subjects"
								accepter={RadioGroup}
								error={formError.subject}
							>
								<Radio inline value={'Profile contains false information'}>
									Profile contains false information
								</Radio>
								<Radio inline value={"Source is using someone else's identity"}>
									Source is using someone else&apos;s identity
								</Radio>
								<Radio
									inline
									value={'Innapropriate behavior and aggressive language'}
								>
									Innapropriate behavior and aggressive language
								</Radio>
								<Radio inline value={'Harrassing behavior'}>
									Harrassing behavior
								</Radio>
								<Radio
									inline
									value={'Source is requesting to be paid outside of platform'}
								>
									Source is requesting to be paid outside of platform
								</Radio>
								<Radio
									inline
									value={
										'Source is requesting to communicate outside of platform'
									}
								>
									Source is requesting to communicate outside of platform
								</Radio>
								<Radio inline value={'Spam messages'}>
									Spam messages
								</Radio>
								<Radio inline value={'Scammer'}>
									Scammer
								</Radio>
								<Radio inline value={'Other'}>
									Other
								</Radio>
							</CustomField>
							<CustomField
								name="reportField"
								accepter="textarea"
								placeholder="Report text"
								error={formError.reportField}
							/>
						</Form>
					</MWT_Col>
				</MWT_Row>
			</Modal.Body>
			<Modal.Footer className="text-center">
				<div className="divider-30" />
				<p>
					<Button className="rs-btn-main" onClick={sendReportHandler}>
						Send Report
					</Button>
					<Button onClick={handlerModalClose} className="rs-btn-main" appearance="ghost">
						Close
					</Button>
				</p>
			</Modal.Footer>
		</Modal>
	);
};

export default ReportModal;
