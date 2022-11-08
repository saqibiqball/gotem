import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Form, Modal, Schema } from 'rsuite';
import CustomField from '@/components/UI/CustomField';
import CustomUploaderFiles from '@/components/UI/CustomUploaderFiles';
import CustomNotice from '@/components/UI/CustomNotice';
import { ProposalContext } from '@/context/proposal';
import { createEvidence, updateEvidence } from '@/http/evidenceAPI';

const { StringType } = Schema.Types;

const reportModel = Schema.Model({
	title: StringType().isRequired('The field is required.'),
	description: StringType().isRequired('The field is required.'),
});

const EvidencesModal = ({ milestone, modalShow, handlerModalClose }) => {
	const form = useRef();
	const [proposal, setProposal] = useContext(ProposalContext);
	const [fetching, setFetching] = useState(false);
	const [formError, setFormError] = useState({});
	const [formValue, setFormValue] = useState({
		title: '',
		description: '',
		evidenceFiles: [],
		milestoneId: milestone.id,
		proposalId: proposal.id,
	});

	const isNewEvidence = useMemo(() => {
		return !(milestone.evidences && Object.keys(milestone.evidences).length > 0);
	}, [milestone.evidences]);

	useEffect(() => {
		if (milestone.evidences && Object.keys(milestone.evidences).length > 0) {
			setFormValue({ ...formValue, ...milestone.evidences, id: milestone.evidences.id });
		}
	}, [milestone.evidences]);

	const onSubmit = async () => {
		if (!form.current.check()) return true;
		setFetching(true);

		try {
			const data = new FormData();
			let res;
			Object.keys(formValue).forEach((key) => {
				if (key === 'uploaded_evidenceFiles') {
					formValue[key].forEach((item) => {
						data.append('uploaded_evidenceFiles', item);
					});
				} else if (key === 'toDelete') {
					data.append(key, JSON.stringify(formValue[key]));
				} else {
					data.append(key, formValue[key]);
				}
			});
			if (isNewEvidence) {
				res = await createEvidence(data);
			} else {
				res = await updateEvidence(data);
			}
			setProposal({ proposal, ...res });
			handlerModalClose();
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
		setFetching(false);
	};

	return (
		<Modal
			className="vendor-modal"
			overflow={true}
			open={modalShow}
			onClose={handlerModalClose}
		>
			<Modal.Header>
				<Modal.Title>Evidences</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form
					ref={form}
					onCheck={setFormError}
					model={reportModel}
					checkTrigger="change"
					formValue={formValue}
					onChange={setFormValue}
				>
					<CustomField
						label="Title"
						name="title"
						placeholder="Enter your title"
						error={formError.title}
					/>
					<CustomField
						label="Description"
						name="description"
						accepter="textarea"
						rows={5}
						placeholder="Enter your description"
						error={formError.description}
					/>
					<CustomField
						accepter={CustomUploaderFiles}
						accept="image/png, image/jpeg, image/jpg, image/svg, application/pdf"
						name="evidenceFiles"
						disabled={fetching}
						fileList={formValue.evidenceFiles}
						setFormValue={setFormValue}
						error={formError.evidenceFiles}
						setFormError={setFormError}
						errorMsg="You can only upload pdf and image files"
						multiple={true}
						confirmNodal={true}
						draggable
					>
						<div>
							<i className="ico ico-Cloud-upload-Bold fs-60 color-main" />
							<h6 className="h-small mt-20">Click to upload or drag’n’drop</h6>
							<p>Upload relevant files (default is private)</p>
						</div>
					</CustomField>
				</Form>
			</Modal.Body>
			<Modal.Footer className="text-center">
				<div className="divider-30" />
				<p>
					<Button className="rs-btn-main" onClick={onSubmit}>
						Send Message
					</Button>
					<Button onClick={handlerModalClose} className="rs-btn-main" appearance="ghost">
						Close
					</Button>
				</p>
			</Modal.Footer>
		</Modal>
	);
};

export default EvidencesModal;
