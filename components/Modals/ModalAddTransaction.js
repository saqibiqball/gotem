import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Form, Modal, Schema, SelectPicker } from 'rsuite';
import { getAllUsersInList } from '@/http/userAPI';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import CustomField from '@/components/UI/CustomField';
import CustomNotice from '@/components/UI/CustomNotice';
import { addTransaction } from '@/http/transactionAPI';

const ModalAddTransaction = ({ modalShow, handlerModalClose, handler }) => {
	const { NumberType } = Schema.Types;
	const form = useRef();
	const [fetching, setFetching] = useState(false);
	const [users, setUsers] = useState([]);
	const [formError, setFormError] = useState({});
	const [formValue, setFormValue] = useState({
		id: null,
		amount: 0,
	});

	const model = Schema.Model({
		id: NumberType().isRequired('The field is required.'),
		amount: NumberType()
			.isRequired('The field is required.')
			.min(1, 'The amount need to be more than 1'),
	});

	const userAvailableBalance = useMemo(() => {
		let res = null;
		if (formValue.id) res = users.find((u) => u.id === formValue.id)?.availableBalance;
		return res;
	}, [formValue.id, users]);

	useEffect(() => {
		let isSubscribed = true;
		const fetchData = async () => {
			try {
				const data = await getAllUsersInList();
				setUsers(data);
			} catch (e) {
				CustomNotice({
					content: e.response?.data?.message,
					type: 'error',
				});
			}
		};
		isSubscribed && fetchData();
		return () => (isSubscribed = false);
	}, []);

	const handleSubmit = async () => {
		if (!form.current.check()) return true;
		setFetching(true);
		try {
			await addTransaction({
				userReceivedId: formValue.id,
				userAmount: -formValue.amount,
				status: 'payout',
			});
			handler();
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
		setFetching(false);
	};

	return (
		<Modal size="md" overflow={false} open={modalShow} onClose={handlerModalClose}>
			<Modal.Header className="text-center">
				<Modal.Title>Make a payment</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form
					ref={form}
					formValue={formValue}
					onChange={setFormValue}
					onCheck={setFormError}
					formError={formError}
					model={model}
					checkTrigger="change"
				>
					<MWT_Row className="c-mb-10 p-20 master-services" gutter={10}>
						<MWT_Col>
							<CustomField
								disabled={fetching}
								label="Search User"
								value={formValue.id}
								valueKey="id"
								labelKey="nickName"
								placeholder="Search User"
								accepter={SelectPicker}
								name="id"
								data={users}
								error={formError.id}
							/>
							<CustomField
								disabled={fetching}
								name="amount"
								step={0.01}
								type="number"
								placeholder="Write down amount"
								error={formError.amount}
							/>
						</MWT_Col>
						{userAvailableBalance !== null && (
							<MWT_Col>
								<p>
									Available balance of user is{' '}
									<span className="color-darkColor">${userAvailableBalance}</span>
								</p>
							</MWT_Col>
						)}
					</MWT_Row>
				</Form>
			</Modal.Body>
			<Modal.Footer className="text-center">
				<div>
					<Button onClick={handleSubmit} className="rs-btn-main">
						Add Payment
					</Button>
					<Button
						onClick={handlerModalClose}
						className="rs-btn-main rs-btn-small"
						appearance="ghost"
					>
						Close
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalAddTransaction;
