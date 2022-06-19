import App from 'next/app';
import AppHead from '@/components/elements/head';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import { getStrapiMedia } from 'utils/media';
import { getGlobalData } from 'utils/api';
import Layout from '@/components/layout';
import '@/styles/index.css';

import { pageview } from 'lib/gtag';
import Analytics from 'components/analytics';

import { useState, useEffect } from 'react';

const MyApp = ({ Component, pageProps }) => {
	// Prevent Next bug when it tries to render the [slug] route
	const router = useRouter();
	const slug = router.asPath;
	if (slug === '/[slug]') return null;

	const mainPages = [
		'/',
		'/empresa',
		'/produtos',
		'/informacoes',
		'/contato'
	];
	let bgImage = mainPages.includes(slug)
		? 'bg-rbx-porto bg-fixed bg-cover'
		: 'bg-rbx-green bg-[length:50px_50px]';

	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const handleRouteChange = (url) => {
			pageview(url);
		};

		router.events.on('routeChangeComplete', handleRouteChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, []);

	// Extract the data we need
	const { global } = pageProps;
	const pageMetadata = pageProps.metadata;

	if (global == null) {
		return <ErrorPage statusCode={404} />;
	}

	for (let prop in pageMetadata)
		if (!pageMetadata[prop]) delete pageMetadata[prop];
	const metadata = { ...global.metadata, ...pageMetadata };
	const favicon = getStrapiMedia(global.favicon.url);

	return (
		<>
			<AppHead favicon={favicon} />
			{/* Global site metadata */}
			<DefaultSeo
				titleTemplate={`%s | ${global.metaTitleSuffix}`}
				title={'Page'}
				description={metadata.metaDescription}
				openGraph={{
					images: Object.values(metadata.shareImage.formats).map(
						(image) => {
							return {
								url: getStrapiMedia(image.url),
								width: image.width,
								height: image.height
							};
						}
					)
				}}
				twitter={{
					cardType: metadata.twitterCardType,
					handle: metadata.twitterUsername
				}}
			/>
			{/* Display the content */}

			<Layout global={global} bgImage={bgImage} mounted={mounted}>
				<Component {...pageProps} mounted={mounted} />
			</Layout>
			{process.env.NODE_ENV === 'production' && <Analytics />}
		</>
	);
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So [slug] pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
	// Calls page's `getInitialProps` and fills `appProps.pageProps`
	const appProps = await App.getInitialProps(ctx);
	// Fetch global site settings from Strapi
	const global = await getGlobalData();
	// Pass the data to our page via props
	return { ...appProps, pageProps: { global, path: ctx.pathname } };
};

export default MyApp;