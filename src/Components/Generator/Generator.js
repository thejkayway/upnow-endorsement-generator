import React from 'react';
import { Stage, Layer, Rect, Text, Circle, Label, Tag } from 'react-konva';
import PropTypes from 'prop-types';
import URLImage from '../Konva/URLImage';
import flagPath from '../../resources/generator/images/flag.png';

class Generator extends React.Component {
    constructor(props) {
        super(props);
        this.imageCount = 0;
    }

    doneLoadingImages = () => this.imageCount === 0;

    startLoadImage = () => {
        this.imageCount += 1;
    }

    finishLoadImage = () => {
        this.imageCount -= 1;
        const { doneLoadingImages } = this.props;
        if (this.doneLoadingImages() && doneLoadingImages) {
            doneLoadingImages();
        }
    };

    render() {
        const {
            name,
            imageSize,
            location,
            message,
            forwardRef,
            backgroundImagePath,
            avatarImagePath,
        } = this.props;
        return (
            <div className="Generator">
                <Stage
                    width={imageSize}
                    height={imageSize}
                >
                    <Layer
                        ref={forwardRef}
                    >
                        <Rect
                            x={0}
                            y={0}
                            height={imageSize}
                            width={imageSize}
                            fill="rgb(251, 228, 171)"
                        />
                        <URLImage
                            x={0}
                            y={0}
                            width={imageSize}
                            height={imageSize / 2}
                            src={backgroundImagePath}
                            startLoad={this.startLoadImage}
                            finishLoad={this.finishLoadImage}
                        />
                        <Rect
                            x={0}
                            y={0}
                            width={imageSize}
                            height={imageSize / 2}
                            fill="rgba(235, 195, 71, 0.3)"
                        />
                        <URLImage
                            x={imageSize * 0.0391}
                            y={imageSize * 0.0391}
                            width={imageSize * 0.3125}
                            height={imageSize * 0.3125}
                            src={avatarImagePath}
                            startLoad={this.startLoadImage}
                            finishLoad={this.finishLoadImage}
                        />
                        <Circle
                            x={imageSize * 0.1953}
                            y={imageSize * 0.1953}
                            radius={imageSize * 0.15625}
                            stroke="white"
                            strokeWidth={imageSize * 0.01172}
                        />
                        <URLImage
                            x={imageSize * 0.01953}
                            y={imageSize / 2 - imageSize * 0.0879}
                            width={imageSize * 0.9375}
                            height={imageSize * 0.1758}
                            src={flagPath}
                            startLoad={this.startLoadImage}
                            finishLoad={this.finishLoadImage}
                        />
                        <Text
                            text={name}
                            x={imageSize * 0.05859}
                            y={imageSize / 2 - imageSize * 0.07813}
                            fontSize={imageSize * 0.09375}
                            fontFamily="Nunito"
                            fontStyle="bold"
                            fill="white"
                            stroke="rgb(214,84,42)"
                            strokeWidth={imageSize * 0.00352}
                        />
                        <Label
                            x={imageSize * 0.0488}
                            y={imageSize * 0.3223}
                        >
                            <Tag
                                fill="black"
                            />
                            <Text
                                text={location}
                                fontSize={imageSize * 0.0391}
                                fontFamily="Nunito"
                                fontStyle="italic bold"
                                fill="white"
                                padding={imageSize * 0.00977}
                                wrap="word"
                            />
                        </Label>
                        <Text
                            text="supports Universal Preschool"
                            x={imageSize * 0.07813}
                            y={imageSize / 2 + imageSize * 0.01563}
                            fontSize={imageSize * 0.0625}
                            fontFamily="Nunito"
                            fontStyle="italic bold"
                            fill="white"
                            stroke="rgb(214,84,42)"
                            strokeWidth={imageSize * 0.00195}
                        />
                        <Text
                            text={`"${message}"`}
                            x={imageSize * 0.1172}
                            y={imageSize / 2 + imageSize * 0.1367}
                            width={imageSize - imageSize * 0.2344}
                            fontSize={imageSize * 0.0391}
                            fontFamily="Roboto"
                            fontStyle="italic"
                            fill="rgb(60,60,60)"
                            wrap="word"
                        />
                        <Text
                            text="Sign the petition at upnow2020.org"
                            x={imageSize * 0.293}
                            y={imageSize - imageSize * 0.0703}
                            fontSize={imageSize * 0.043}
                            fontFamily="Nunito"
                            fontStyle="italic"
                        />
                    </Layer>
                </Stage>
            </div>
        );
    }
}
Generator.propTypes = {
    name: PropTypes.string.isRequired,
    imageSize: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    forwardRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
    backgroundImagePath: PropTypes.string.isRequired,
    avatarImagePath: PropTypes.string.isRequired,
    doneLoadingImages: PropTypes.func,
};
Generator.defaultProps = {
    doneLoadingImages: null,
};
// eslint-disable-next-line react/jsx-props-no-spreading
export default React.forwardRef((props, ref) => <Generator {...props} forwardRef={ref} />);
