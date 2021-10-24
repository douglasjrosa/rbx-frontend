import classNames from "classnames";
import Image from "../elements/image";
import Video from "../elements/video";
import CustomLink from "../elements/custom-link";

const FeatureRowsGroup = ({ data }) => {
  return (
    <div className="container flex flex-col gap-10">
      {data.features.map((feature, index) => (
        <div
          className={classNames(
            // Common classes
            "flex flex-col justify-center md:p-8 rounded-lg shadow-lg sm:items-center bg-white md:gap-10 feature-rows-group-card-rbx",
            {
              "md:flex-row": index % 2 === 0,
              "md:flex-row-reverse": index % 2 === 1,
            }
          )}
          key={feature.id}
        >
          {/* Media section */}
          <div className="w-full lg:w-4/12 max-h-full">
            {/* Images */}
            {feature.media.mime.startsWith("image") && (
              <Image
                media={feature.media}
                className={classNames(
                  "w-full h-auto rounded-t-md md:rounded-md"
                )}
                width={feature.mediaWidth}
                height={feature.mediaHeight}
              />
            )}
            {/* Videos */}
            {feature.media.mime.startsWith("video") && (
              <Video
                media={feature.media}
                className="w-full h-auto"
                autoPlay
                controls={false}
              />
            )}
          </div>
          {/* Text section */}
          <div className="w-full lg:w-6/12 text-lg p-5">
            <h3 className="text-4xl">{feature.title}</h3>
            <div className="my-6">{feature.description}</div>
            {feature.link && 
            <CustomLink link={feature.link}>
              <div className="text-blue-600 with-arrow hover:underline">
                {feature.link.text}
              </div>
            </CustomLink>
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureRowsGroup;
