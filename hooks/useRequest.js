import { useEffect, useState } from 'react';
import CustomNotice from '@/components/UI/CustomNotice';

export default function useRequest(request, defaultValue = null) {
	const [data, setData] = useState(defaultValue);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let isSubscribe = true;
		isSubscribe &&
			request()
				.then((response) => setData(response))
				.catch((e) =>
					CustomNotice({
						content: e.response?.data?.message,
						type: 'error',
					})
				)
				.finally(() => setLoading(false));

		return () => (isSubscribe = false);
	}, [request]);

	return [data, loading];
}
