const withPWA = require('next-pwa');

module.exports = withPWA({
	pwa: {
		dest: 'public',
		register: true,
		skipWaiting: true,
		publicExcludes: ['!images/*'],
		buildExcludes: [/chunks\/images\/.*$/, /images\/.*$/, /media\/.*$/],
		disable: process.env.NODE_ENV === 'development'
	}
});