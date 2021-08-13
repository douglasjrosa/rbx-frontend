import { getStrapiMedia } from "utils/media";
import PropTypes from "prop-types";
import { mediaPropTypes } from "utils/types";

const Image = props => {
  const { url, alternativeText } = props.media;
  const fullUrl = getStrapiMedia(url);

  let newProps = {
    src: fullUrl,
    alt: alternativeText || props.alt || "",
    className: props.className || "",
    width: props.width || "",
    height: props.height || ""
  };
  
  for(let prop in newProps){
    if(newProps[prop] === "") delete newProps[prop];
  }
  
  return <img {...newProps} />;
};

Image.propTypes = {
  media: mediaPropTypes.isRequired,
  className: PropTypes.string,
};

export default Image;
