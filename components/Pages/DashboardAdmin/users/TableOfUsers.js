import React, { useRef, useState } from 'react';
import Image from 'next/image';
import CustomLoader from '@/components/UI/CustomLoader';
import { dateFormat } from '@/helpers/dateFormat';
import { Button, Schema } from 'rsuite';
import CustomNotice from '@/components/UI/CustomNotice';
import { useRouter } from 'next/router';
import { deleteUser, updateUser } from '@/http/userAPI';
import { useSelector } from 'react-redux';
import NoticeModal from '@/components/Modals/NoticeModal';
import VerificationFilesModal from '@/components/Modals/VerificationFilesModal';

const { StringType } = Schema.Types;
const model = Schema.Model({
	rejectMsg: StringType().isRequired('The field is required.'),
});

const TableOfUsers = ({ users, setUsers, fetch }) => {
	const form = useRef();
	const router = useRouter();
	const { currentUser } = useSelector((state) => state.user);
	const [userFiles, setUserFiles] = useState({});
	const [userVerificate, setUserVerificate] = useState({
		firstName: '',
		lastName: '',
		license: '',
		email: '',
		id: null,
	});
	const [formValue, setFormValue] = useState({
		rejectMsg: '',
	});
	const [formError, setFormError] = useState({});
	const [showModal, setShowModal] = useState(false);
	const [showModalFiles, setShowModalFiles] = useState(false);
	const [idDelete, setIdDelete] = useState(null);
	const handleEdit = (data) => {
		router.push(`/dashboard-admin/${currentUser.slug}/users/edit-user/${data.id}`);
	};

	const openModal = (id) => {
		setIdDelete(id);
		setShowModal(true);
	};
	const closeModal = () => setShowModal(false);

	const openModalFiles = (files, selfyFiles, userInfo) => {
		setUserFiles({ files, selfyFiles });
		setUserVerificate({
			firstName: userInfo.firstName,
			lastName: userInfo.lastName,
			license: userInfo.license,
			email: userInfo.email,
			id: userInfo.id,
		});
		setShowModalFiles(true);
	};

	const closeModalFiles = () => {
		setShowModalFiles(false);
		setUserFiles({});
		setFormValue({ rejectMsg: '' });
	};

	const handleDelete = async () => {
		try {
			closeModal();
			await deleteUser(idDelete);

			const newArr = users.rows.filter((user) => +user.id !== +idDelete);
			setUsers((prevState) => ({
				...prevState,
				rows: [...newArr],
			}));
			CustomNotice({
				content: `User was deleted`,
				type: 'success',
			});
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
	};

	const handlerApproveReject = async (email, id, statusId) => {
		if (statusId === 2) {
			if (!form.current.check()) return true;
		}
		try {
			const updatedUser = await updateUser({
				id,
				email,
				statusId,
				rejectMsg: formValue.rejectMsg,
			});

			closeModalFiles();
			const idx = users.rows.findIndex((item) => item.id === id);
			const before = users.rows.slice(0, idx);
			const after = users.rows.slice(idx + 1);

			setUsers({ ...users, rows: [...before, updatedUser, ...after] });
			if (statusId === 1) {
				CustomNotice({
					content: `User was activated`,
					type: 'success',
				});
			} else {
				CustomNotice({
					content: `User was rejected`,
					type: 'success',
				});
			}
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
	};

	return (
		<>
			{fetch ? (
				<CustomLoader />
			) : (
				<>
					<NoticeModal
						showModal={showModal}
						closeModal={closeModal}
						handler={handleDelete}
					/>
					<VerificationFilesModal
						showModal={showModalFiles}
						closeModal={closeModalFiles}
						handlerApproveReject={handlerApproveReject}
						userFiles={userFiles}
						userInfo={userVerificate}
						model={model}
						form={form}
						setFormError={setFormError}
						formError={formError}
						formValue={formValue}
						setFormValue={setFormValue}
					/>
					<div className="t-header">
						<span>Users</span>
					</div>
					<div className="table-wrap">
						<table>
							<thead>
								<tr>
									<th>Role</th>
									<th>Profile Name</th>
									<th>Full Name</th>
									<th>Email address</th>
									<th>Registration date</th>
									<th>KYC files</th>
									<th>Status</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{users.rows.length > 0 ? (
									users.rows.map((user) => (
										<tr key={user.id}>
											<td className="capitalize">{user.roles.name}</td>
											<td>
												<div className="d-flex align-center no-wrap">
													<span className="img-fit mr-15 d-shrink ">
														<Image
															src={
																process.env.NEXT_PUBLIC_API_URL +
																user.photo
															}
															width={28}
															height={28}
															alt={'photo'}
															className="rounded-circle"
														/>
													</span>

													<span className="capitalize">
														{user.nickName}
													</span>
												</div>
											</td>
											<td>
												{user.firstName} {user.lastName}
											</td>
											<td>{user.email}</td>
											<td>{dateFormat(user.createdAt)}</td>
											<td className="text-center">
												<Button
													className="btn-icon "
													onClick={() =>
														openModalFiles(
															user.files,
															user.selfyFiles,
															{
																firstName: user.firstName,
																lastName: user.lastName,
																license: user.userLicense,
																email: user.email,
																id: user.id,
															}
														)
													}
												>
													<i className="ico ico-Eye1" />
												</Button>
											</td>
											<td>
												<span
													className={
														'status ' +
														(user.statusId === 2 ? 'reject' : 'active')
													}
												>
													{user.statuses.name}
												</span>
												{!user.confirmEmail && (
													<span className="status">
														Not verified email
													</span>
												)}
											</td>
											<td className="no-wrap">
												<Button
													className="btn-icon mr-30"
													onClick={() => openModal(user.id)}
												>
													<i className="ico ico-Trash" />
												</Button>
												<Button
													className="btn-icon"
													onClick={() => handleEdit(user)}
												>
													<i className="ico ico-Pencil" />
												</Button>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan="7">
											<p className="text-center">You dont have any users</p>
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</>
			)}
		</>
	);
};

export default TableOfUsers;
