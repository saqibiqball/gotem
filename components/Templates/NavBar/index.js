import React, { useContext, useEffect, useState } from 'react';
import { Button, Drawer, Dropdown, Navbar } from 'rsuite';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { logOutUser } from '@/store/user/action';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import MyLink from '@/components/UI/MyLink';
import RenderButton from '@/components/Templates/NavBar/RenderButton';
import HeaderNav from '@/components/Templates/NavBar/HeaderNav';
import useDashboardLink from '@/hooks/useDashboardLink';
import { SocketContext } from '@/context/socket';
import CustomNotice from '@/components/UI/CustomNotice';
import { getUnreadMessagesCount } from '@/http/chatAPI';

// eslint-disable-next-line
const NavBar = ({ onSelect, activeKey, ...props }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [show, setShow] = useState(false);
	const [countUnreadMessages, setCountUnreadMessages] = useState(0);
	const { currentUser, isAuth } = useSelector((state) => state.user);
	const usersLink = useDashboardLink();
	const socket = useContext(SocketContext);

	const fetchData = async () => {
		try {
			return await getUnreadMessagesCount();
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
	};

	useEffect(() => {
		fetchData().then(setCountUnreadMessages);
	}, []);

	useEffect(() => {
		socket.on('updateUnreadMessages', () => {
			fetchData().then(setCountUnreadMessages);
		});
	}, [socket]);

	const toggleHandler = (bool) => {
		setShow(bool);
	};

	const logOut = async () => {
		dispatch(logOutUser());
		socket.emit('kick', currentUser.id);
		await router.push('/');
	};

	return (
		<header className="page_header f-grow">
			<Navbar {...props}>
				<MWT_Container fluid>
					<MWT_Row align_items="center">
						<MWT_Col className="text-right">
							<div className="d-flex justify-content-end">
								<div className="nav-logo hidden-above-md mr-auto">
									<Link href={'/'}>
										<a className="d-in-flex small-text align-center links-darkColor">
											<Image
												alt="logo"
												src={
													process.env.NEXT_PUBLIC_CLIENT_URL +
													'/images/logo-icon.svg'
												}
												width={100}
												height={100}
											/>
										</a>
									</Link>
									<Button
										className="toggle-btn-header rs-btn-link p-0"
										onClick={() => toggleHandler(!show)}
									>
										{show ? (
											<i className="fs-16 ico ico-X" />
										) : (
											<i className="fs-16 ico ico-Menu-alt-8" />
										)}
									</Button>
								</div>
								{isAuth && (
									<>
										{' '}
										{currentUser.roleId === 2 && (
											<>
												<div className="mr-20 mr-lg-30 d-in-flex hidden-above-xl">
													<Link
														href={`${usersLink}/my-missions/add-mission`}
													>
														<a className="d-in-flex align-center links-darkColor">
															<i className="ico ico-Cloud-upload fs-24" />
														</a>
													</Link>
												</div>

												<div className="mr-20 mr-lg-30 pr-30 align-center d-in-flex border-right hidden-below-xl">
													<Link
														href={`${usersLink}/my-missions/add-mission`}
													>
														<a className="rs-btn-main rs-btn rs-btn-default">
															+ Submit mission
														</a>
													</Link>
												</div>
											</>
										)}
										<div className="mr-20 mr-lg-30 d-in-flex">
											<Link href={'#'}>
												<a className="d-in-flex align-center links-darkColor">
													<i className="ico ico-Bell fs-24" />
												</a>
											</Link>
										</div>
										<div className="mr-20 mr-lg-30 d-in-flex hidden-below-lg">
											<Link href={`${usersLink}/settings`}>
												<a className="d-in-flex align-center links-darkColor">
													<i className="ico ico-Cog fs-24" />
												</a>
											</Link>
										</div>
										{currentUser.roleId !== 1 && (
											<div className="mr-20 mr-lg-30 d-in-flex hidden-below-lg">
												<Link href={`${usersLink}/bookmarks`}>
													<a className="d-in-flex align-center links-darkColor">
														<i className="ico ico-Bookmark fs-24" />
													</a>
												</Link>
											</div>
										)}
										<div className="mr-20 mr-lg-30 d-in-flex">
											<Link href={`${usersLink}/chat`}>
												<a className="d-in-flex align-center links-darkColor">
													<span className="mr-5">
														{countUnreadMessages}
													</span>{' '}
													<i className="ico ico-Mail fs-24" />
												</a>
											</Link>
										</div>
										<Dropdown
											className="hidden-above-lg"
											trigger="hover"
											placement="bottomEnd"
											renderToggle={RenderButton}
										>
											<Dropdown.Item
												as={MyLink}
												href={`${usersLink}/bookmarks`}
											>
												<i className="ico ico-Bookmark fs-24" />
											</Dropdown.Item>
											<Dropdown.Item
												as={MyLink}
												href={`${usersLink}/settings`}
											>
												<i className="ico ico-Cog fs-24" />
											</Dropdown.Item>
											<Dropdown.Item as={'span'} onClick={logOut}>
												<i className="ico ico-Logout-1 fs-24 " />
											</Dropdown.Item>
										</Dropdown>
										<div className="icon-box icon-box-v-center navbar-avatar hidden-below-lg">
											<div className="icon-box__icon img-fit ">
												<Image
													src={
														process.env.NEXT_PUBLIC_API_URL +
														currentUser.photo
													}
													alt="avatar"
													width="40"
													height="40"
												/>
											</div>
											<div className="icon-box__body ml-15 text-left">
												<h6 className="fs-16 fw-500 mb-0">
													{currentUser.firstName} {currentUser.lastName}
												</h6>
												<p className="fs-12 fw-500 color-darkColor capitalize">
													{currentUser.roles?.name}
												</p>
											</div>
										</div>
										<Button
											onClick={logOut}
											className="btn-icon ml-20 hidden-below-lg"
										>
											<i className="ico ico-Logout-1 fs-24 ml-15" />
										</Button>
									</>
								)}
							</div>
						</MWT_Col>
					</MWT_Row>
				</MWT_Container>
			</Navbar>
			<Drawer
				size="xs"
				placement="left"
				open={show}
				onClose={() => toggleHandler(false)}
				className="page_header-drawer"
			>
				<div onClick={() => toggleHandler(false)}>
					<HeaderNav />
				</div>
			</Drawer>
		</header>
	);
};

export default NavBar;
