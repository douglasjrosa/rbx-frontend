import NextImage from 'next/image';

const customLoader = ({ src, width, quality }) => {
	const reqLink = `https://ribermax.com.br/_next/image?url=${encodeURIComponent(src)}&w=${Math.min(width, 1080)}&q=${
		quality || 75
	}`;
	console.log(reqLink);
	return reqLink;
};

const Image = (props) => {
	const { media } = props;

	const name = !media || !media.name ? props.src : media.name;

	const imgObj = require('../../public/images/' + name).default;
	const { src, blurDataURL } = imgObj;
	

	const alt = props.alternativeText || media.alternativeText || '';
	const className = props.className || media.className || '';
	const width = props.width || media.width;
	const height = props.height || media.height;
	const layout = props.layout || 'responsive';
	const priority = props.priority || false;

	return (
		<NextImage
			loader={customLoader}
			src={src}
			alt={alt}
			className={className}
			width={width}
			height={height}
			layout={layout}
			priority={priority}
			placeholder="blur"
			blurDataURL={blurDataURL}
		/>
	);
};

export default Image;
