export function getClickableLink(link) {
	return link.startsWith('http://') || link.startsWith('https://') ? link : `http://${link}`;
}
