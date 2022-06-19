import { imageLoader } from 'next-image-loader/build/image-loader';

imageLoader.loader = ({ src, width, quality }) =>
	`https://ribermax.com.br/_next/image?url=${encodeURIComponent(
		src
	)}&w=${Math.min(width, 1080)}&q=${quality || 75}`;
