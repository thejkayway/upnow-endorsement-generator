import React from 'react';
import { Stage, Layer, Rect, Text, Circle, Label, Tag } from 'react-konva';
import PropTypes from 'prop-types';
import URLImage from '../Konva/URLImage';
import TransformableURLImage from '../Konva/TransformableURLImage';
import flagPath from '../../resources/generator/images/flag.png';

class Generator extends React.Component {
    constructor(props) {
        super(props);
        const { initialAvatarState } = this.props;
        this.imageCount = 0;
        this.state = {
            avatarState: initialAvatarState,
            selectedId: null,
        };
    }

    checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnAvatar = Boolean(e.target.parent.attrs.clipFunc);
        const clickedOnTransformHandles = e.target.attrs.name && Boolean(e.target.attrs.name.includes('_anchor'));
        if (!clickedOnAvatar && !clickedOnTransformHandles) {
            this.setState({ selectedId: null });
        }
    };

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
            title,
            message,
            forwardRef,
            backgroundImagePath,
            avatarImagePath,
            updateAvatarState,
        } = this.props;
        const { selectedId, avatarState } = this.state;
        const avatar = (
            <TransformableURLImage
                imageSize={imageSize}
                x={avatarState.x}
                y={avatarState.y}
                width={avatarState.width}
                height={avatarState.height}
                draggable={avatarState.draggable}
                src={avatarImagePath}
                id="avatar"
                startLoad={this.startLoadImage}
                finishLoad={this.finishLoadImage}
                isSelected={selectedId === 'avatar'}
                onSelect={() => {
                    this.setState({ selectedId: 'avatar' });
                }}
                onChange={(newAttrs) => {
                    this.setState({ avatarState: newAttrs });
                    updateAvatarState(newAttrs);
                }}
                preventDefault={false}
            />
        );
        const avatarOutline = (
            <Circle
                x={imageSize * 0.1953}
                y={imageSize * 0.1953}
                radius={imageSize * 0.15625}
                stroke="white"
                strokeWidth={imageSize * 0.0156}
                preventDefault={false}
            />
        );
        const background = (
            <URLImage
                x={0}
                y={0}
                width={imageSize}
                height={imageSize / 2}
                src={backgroundImagePath}
                startLoad={this.startLoadImage}
                finishLoad={this.finishLoadImage}
                preventDefault={false}
            />
        );
        const backgroundTintedOverlay = (
            <Rect
                x={0}
                y={0}
                width={imageSize}
                height={imageSize / 2}
                fill="rgba(235, 195, 71, 0.3)"
                preventDefault={false}
            />
        );
        const base = (
            <Rect
                x={0}
                y={0}
                height={imageSize}
                width={imageSize}
                fill="rgb(251, 228, 171)"
                preventDefault={false}
            />
        );
        const flag = (
            <URLImage
                x={imageSize * 0.01953}
                y={imageSize / 2 - imageSize * 0.0879}
                width={imageSize * 0.9375}
                height={imageSize * 0.1758}
                src={flagPath}
                startLoad={this.startLoadImage}
                finishLoad={this.finishLoadImage}
                preventDefault={false}
            />
        );
        const textName = (
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
                preventDefault={false}
            />
        );
        const textBody = (
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
                preventDefault={false}
            />
        );
        const textFooter = (
            <Text
                text="Sign the petition at upnow2020.org"
                x={imageSize * 0.293}
                y={imageSize - imageSize * 0.0703}
                fontSize={imageSize * 0.043}
                fontFamily="Nunito"
                fontStyle="italic"
                preventDefault={false}
            />
        );
        const textSupport = (
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
                preventDefault={false}
            />
        );
        const textTitle = (
            <Label
                x={imageSize * 0.0488}
                y={imageSize * 0.3223}
                preventDefault={false}
            >
                <Tag
                    fill="black"
                    preventDefault={false}
                />
                <Text
                    text={title}
                    fontSize={imageSize * 0.0391}
                    fontFamily="Nunito"
                    fontStyle="italic bold"
                    fill="white"
                    padding={imageSize * 0.00977}
                    wrap="word"
                    preventDefault={false}
                />
            </Label>
        );
        return (
            <div className="Generator">
                <Stage
                    width={imageSize}
                    height={imageSize}
                    onMouseDown={this.checkDeselect}
                    onTouchStart={this.checkDeselect}
                >
                    <Layer
                        ref={forwardRef}
                    >
                        {base}
                        {background}
                        {backgroundTintedOverlay}
                        {flag}
                        {textName}
                        {textSupport}
                        {textBody}
                        {textFooter}
                        {avatarOutline}
                        {avatar}
                        {textTitle}
                    </Layer>
                </Stage>
            </div>
        );
    }
}
Generator.propTypes = {
    name: PropTypes.string.isRequired,
    imageSize: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    initialAvatarState: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        width: PropTypes.number,
        height: PropTypes.number,
        id: PropTypes.string,
        draggable: PropTypes.bool,
    }).isRequired,
    forwardRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
    backgroundImagePath: PropTypes.string.isRequired,
    avatarImagePath: PropTypes.string.isRequired,
    doneLoadingImages: PropTypes.func,
    updateAvatarState: PropTypes.func,
};
Generator.defaultProps = {
    doneLoadingImages: null,
    updateAvatarState: null,
};
// eslint-disable-next-line react/jsx-props-no-spreading
export default React.forwardRef((props, ref) => <Generator {...props} forwardRef={ref} />);
