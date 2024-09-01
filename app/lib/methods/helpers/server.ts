/*
	Extract hostname from url
	url = 'https://thecortex.cortexflex.org/method'
	hostname = 'thecortex.cortexflex.org'
*/
export const extractHostname = (url: string): string => {
	let hostname;

	if (url.indexOf('//') > -1) {
		[, , hostname] = url.split('/');
	} else {
		[hostname] = url.split('/');
	}
	[hostname] = hostname.split(':');
	[hostname] = hostname.split('?');

	return hostname;
};
