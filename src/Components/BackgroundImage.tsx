import React from 'react';

const BackgroundImage: React.FC = () => {
    // Image Url
    const image_url = '../../public/BackgroundImage.jpg';

    // Redirect to original image url
    const image_source_url = 'https://www.pexels.com/photo/island-during-golden-hour-and-upcoming-storm-1118873/';

    return (
        <div>
            <a href={image_source_url} target="_blank">
                <img src={image_url} alt="Weather Picture" width="500" height="500"/>
            </a>
        </div>
    );
}

export default BackgroundImage;