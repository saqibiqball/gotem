const { useEffect, useState } = require('react');

//hook for window size
//USAGE
//init hook: const size = useWindowSize();

// <div>
// 	{size.width}px / {size.height}px
// </div>

function useWindowSize() {
	const [windowSize, setWindowSize] = useState({
		width: undefined,
		height: undefined,
	});
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const handleResize = () => {
				setWindowSize({
					width: window.innerWidth,
					height: window.innerHeight,
				});
			};

			window.addEventListener('resize', handleResize);
			handleResize();
			return () => window.removeEventListener('resize', handleResize);
		}
	}, []);
	return windowSize;
}

export default useWindowSize;
