import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/layouts/dashboard.layout';
import { getUserPage } from '@/http/userAPI';
import CustomNotice from '@/components/UI/CustomNotice';
import { useRouter } from 'next/router';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import CustomLoader from '@/components/UI/CustomLoader';
import UserPageHeader from '@/components/Pages/Users/UsersPage/UserPageHeader';
import UserPageContent from '@/components/Pages/Users/UsersPage/UserPageContent';

const AuthorSlug = () => {
	const router = useRouter();
	const { authorSlug } = router.query;
	const [user, setUser] = useState({});
	const [fetch, setFetch] = useState(false);

	useEffect(() => {
		const fetchSourcer = async () => {
			setFetch(true);
			try {
				if (authorSlug) {
					const userData = await getUserPage(authorSlug);
					setUser(userData);
				}
			} catch (e) {
				CustomNotice({
					content: e.response?.data?.message,
					type: 'error',
				});
			}
			setFetch(false);
		};
		fetchSourcer();
	}, [authorSlug]);

	return (
		<section className="sourcer-page s-py-50">
			<MWT_Container>
				{fetch && (
					<MWT_Row>
						<MWT_Col>
							<CustomLoader />
						</MWT_Col>
					</MWT_Row>
				)}
				{!fetch && (
					<>
						{Object.keys(user).length > 0 ? (
							<MWT_Row className="c-mb-30">
								<MWT_Col>
									<UserPageHeader user={user} />
								</MWT_Col>
								<MWT_Col>
									<MWT_Row>
										<MWT_Col>
											<UserPageContent user={user} />
										</MWT_Col>
									</MWT_Row>
								</MWT_Col>
							</MWT_Row>
						) : (
							<MWT_Row>
								<MWT_Col>
									<h6 className="text-center">User Not Found</h6>
								</MWT_Col>
							</MWT_Row>
						)}
					</>
				)}
			</MWT_Container>
		</section>
	);
};

AuthorSlug.Layout = DashboardLayout;

export default AuthorSlug;
