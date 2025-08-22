import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { base_path, image_path } from "../../environment";
import { Image } from "antd";

export const getImage = (rawURL, size = 300) => {
  const RAW_URL1 = rawURL.split("/d/");
  const RAW_URL2 = RAW_URL1[1].split("/view");
  const IMAGE_ID = RAW_URL2[0];
  return `https://drive.google.com/thumbnail?id=${IMAGE_ID}&sz=w${size}`;
};

const ImageWithBasePath = (props) => {
  // Combine the base path and the provided src to create the full image source URL
  let imagesrc = props.src ? props.src.includes('http') ? props.src : `${image_path}${props.src}` : '';
  let fullSrc = props.isProduct ? imagesrc : `${base_path}${props.src}`;
  if (fullSrc.includes("drive.google.com")) {
    fullSrc = getImage(fullSrc, props.width);
  }

  if (props.preview && props.preview.src) {
    props.preview.src = fullSrc;
  }
  return (
    <Image
      className={props.className}
      src={fullSrc}
      height={props.height}
      alt={props.alt}
      width={props.width}
      id={props.id}
      preview={props.preview || false}
    />
  );
};

// Add PropTypes validation
ImageWithBasePath.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired, // Make 'src' required
  alt: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  id: PropTypes.string,
  isProduct: PropTypes.bool,
  preview: PropTypes.any,
};


export default ImageWithBasePath;
