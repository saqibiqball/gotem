import React, { useEffect, useRef, useState } from 'react';
import SourcePageEmploymentHistoryItem from '@/components/Pages/Sources/SourcerPage/SourcePageEmploymentHistoryItem';
import EmploymentModal from '@/components/Modals/EmploymentModal';
import { useSelector } from 'react-redux';
import { deleteUserEmployment, userAddEmployment, userUpdateEmployment } from '@/http/userAPI';
import { Button } from 'rsuite';
import NoticeModal from '@/components/Modals/NoticeModal';

const SourcePageEmploymentHistory = ({ userId, employments }) => {
	const form = useRef();
	const { currentUser } = useSelector((state) => state.user);
	const [showModal, setShowModal] = useState(false);
	const [showModalNotice, setShowModalNotice] = useState(false);
	const [employmentsData, setEmploymentsData] = useState(employments);
	const [fetching, setFetching] = useState(false);
	const [formError, setFormError] = useState({});
	const [itemToEdit, setItemToEdit] = useState({});
	const [idDelete, setIdDelete] = useState(null);
	const cleanValue = {
		name: '',
		description: '',
		monthFrom: '',
		yearFrom: '',
		monthTo: '',
		yearTo: '',
		isPresent: false,
	};
	const [formValue, setFormValue] = useState(cleanValue);

	const openModal = () => {
		setShowModal(true);
	};

	useEffect(() => {
		if (Object.keys(itemToEdit).length) {
			setFormValue({
				id: itemToEdit.id,
				name: itemToEdit.name,
				description: itemToEdit.description,
				monthFrom: itemToEdit.monthFrom,
				yearFrom: itemToEdit.yearFrom,
				monthTo: itemToEdit.monthTo,
				yearTo: itemToEdit.yearTo,
				isPresent: itemToEdit.isPresent,
			});
		}
	}, [itemToEdit]);

	const openModalToEdit = (id) => {
		setItemToEdit(id);
		setShowModal(true);
	};

	const closeModal = () => {
		setFormValue(cleanValue);
		setShowModal(false);
		setItemToEdit({});
	};

	const openModalNotice = (id) => {
		setIdDelete(id);
		setShowModalNotice(true);
	};
	const closeModalNotice = () => setShowModalNotice(false);

	const addEmploymentHandler = async () => {
		if (!form.current.check()) {
			return true;
		}
		if (!formValue.isPresent && !formValue.monthTo.length) {
			setFormError({ ...formError, monthTo: 'Is required field' });
			return true;
		}

		if (Object.keys(itemToEdit).length) {
			const res = await userUpdateEmployment(formValue);
			const idx = employmentsData.findIndex((item) => item.id === res.id);
			const before = employmentsData.slice(0, idx);
			const after = employmentsData.slice(idx + 1);
			setEmploymentsData([...before, res, ...after]);
		} else {
			const res = await userAddEmployment(formValue);
			setEmploymentsData([...employmentsData, res]);
		}
		closeModal();
	};

	const deleteItemHandler = async () => {
		const filterArr = employmentsData.filter((item) => item.id !== idDelete);
		await deleteUserEmployment(idDelete);
		setEmploymentsData([...filterArr]);
		closeModalNotice();
	};

	return (
		<>
			<div className="d-flex justify-content-between">
				<h6>Employment history</h6>
				{currentUser.id === userId && (
					<Button className="btn-icon" onClick={() => openModal()}>
						<span className="fs-24">+</span>{' '}
					</Button>
				)}
			</div>
			<div className="divider-20" />
			{employmentsData.map((employment) => (
				<SourcePageEmploymentHistoryItem
					key={'employment_' + employment.id}
					employment={employment}
					openModalToEdit={openModalToEdit}
					deleteItem={openModalNotice}
					userId={userId}
				/>
			))}
			<NoticeModal
				showModal={showModalNotice}
				closeModal={closeModalNotice}
				handler={deleteItemHandler}
			/>
			<EmploymentModal
				showModal={showModal}
				form={form}
				formError={formError}
				setFormError={setFormError}
				fetching={fetching}
				formValue={formValue}
				setFormValue={setFormValue}
				addEmployment={addEmploymentHandler}
				closeModal={closeModal}
			/>
		</>
	);
};

export default SourcePageEmploymentHistory;
