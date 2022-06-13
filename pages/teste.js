import classNames from 'classnames';
import Markdown from 'react-markdown';
import Image from '@/components/elements/image';
import CustomLink from '@/components/elements/custom-link';
import TextHeader from '@/components/elements/text-header'

const FeatureRowsGroup = ({ data }) => {
	var joinNextRow = false;

	return (
		<div className="container flex flex-col z-20">
			{data.features.map((feature, index) => {
				const row = (
					<div
						className={classNames(
							// Common classes
							'flex flex-col justify-center md:p-8 sm:items-center bg-white md:gap-10 shadow-lg',
							{ 'rounded-t-lg': !joinNextRow },
							{ 'rounded-b-lg mb-16': !feature.joinNextRow },
							{
								'md:flex-row': index % 2 === 0,
								'md:flex-row-reverse': index % 2 === 1
							}
						)}
						key={feature.id}
					>
						{/* Media section */}
						<div className="w-full lg:w-4/12">
							{/* Images */}
							{index > 1 && feature.media.mime.startsWith('image') && (
								<Image
									media={feature.media}
									className={classNames(
										'object-cover h-auto md:rounded-md',
										{ 'rounded-t-md': !joinNextRow }
									)}
									width={feature.mediaWidth}
									height={feature.mediaHeight}
									priority={index < 1}
								/>
							)}
						</div>
						{/* Text section */}
						<div className="w-full lg:w-6/12 text-lg p-5">
							<TextHeader heading={index} className="text-4xl">{feature.title}</TextHeader>
							<Markdown className="my-6">{feature.description}</Markdown>
							{feature.link && (
								<CustomLink link={feature.link}>
									<div className="text-blue-600 with-arrow hover:underline">
										{feature.link.text}
									</div>
								</CustomLink>
							)}
						</div>
					</div>
				);
				joinNextRow = feature.joinNextRow;
				return row;
			})}
		</div>
	);
};

export default FeatureRowsGroup;
