import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import Image from '@/components/elements/image';

const RichText = ({ data }) => {
	
	return (
		<div
			className="container prose-lg max-w-4xl z-20 bg-white rounded-lg shadow-lg p-12 richText-rbx block"
		>
			<Markdown
				components={{
					img: ({ node, ...props }) => {	
						const { src, alt } = props;
						return (
							<span className="text-center block">
								<img
									src={src}
									alt={alt}
									width={400}
									height={300}
								/>
							</span>
						);
					}
				}}
			>
				{data.content}
			</Markdown>
		</div>
	);
};

RichText.propTypes = {
	data: PropTypes.shape({
		content: PropTypes.string
	})
};

export default RichText;
