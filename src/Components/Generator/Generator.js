import React from 'react';
import { Stage, Layer, Rect, Text, Circle, Label, Tag, Group, Transformer } from 'react-konva';
import Konva from 'konva';
import PropTypes from 'prop-types';
import URLImage from '../Konva/URLImage';
import TransformableURLImage from '../Konva/TransformableURLImage';

import upnowLogoPath from '../../resources/generator/images/upnowEndorsementLogo.png';
import quotationMarkPath from '../../resources/generator/images/quote.png';
import instaLogoPath from '../../resources/generator/images/instaLogo.png';
import internetLogoPath from '../../resources/generator/images/wwwLogo.png';
import twitterLogoPath from '../../resources/generator/images/twitterLogo.png';

class Generator extends React.Component {
    constructor(props) {
        super(props);
        const { imageSize, initialAvatarState } = this.props;
        this.imageCount = 0;
        this.trRef = React.createRef();
        this.shapeRef = React.createRef();

        // Reusable config for canvas elements

        // "${Name} endorses" text
        this.endorsementTextPosition = {
            x: imageSize * 0.42,
            y: imageSize * 0.21,
        };
        this.padding = imageSize * 0.015;
        this.headingFontHeight = imageSize * 0.05;

        // Avatar
        this.avatarDiameter = imageSize * 0.28;
        this.avatarPosition = {
            x: imageSize * 0.05,
            y: imageSize * 0.03,
        };
        const defaultAvatar = {
            x: this.avatarPosition.x,
            y: this.avatarPosition.y,
            width: this.avatarDiameter,
            height: this.avatarDiameter,
            id: 'avatar',
            draggable: true,
        };

        // Logo
        this.logoDiameter = imageSize * 0.32;
        this.logoPosition = {
            x: imageSize * 0.65,
            y: imageSize * 0.15,
        };
        this.state = {
            avatarState: initialAvatarState || defaultAvatar,
            selectedId: null,
        };
    }

    componentDidMount() {
        const { updateAvatarState } = this.props;
        const { avatarState } = this.state;
        if (updateAvatarState) {
            updateAvatarState(avatarState);
        }
    }

    componentDidUpdate() {
        const { selectedId } = this.state;
        if (selectedId === 'avatar') {
            // we need to attach transformer manually
            this.trRef.current.nodes([this.shapeRef.current]);
            this.trRef.current.getLayer().batchDraw();
        }
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

    positionedEndorses = () => {
        const { imageSize } = this.props;
        const measuringElement = new Konva.Text({
            x: 0,
            y: 0,
            skew: { y: -0.274 },
            fontSize: this.headingFontHeight,
            padding: this.padding,
            fontFamily: 'Open Sans Bold Italic',
            text: '    endorses     ',
        });
        const endorsesCenterX = this.endorsementTextPosition.x + imageSize * 0.02;
        const endorsesCenterY = this.endorsementTextPosition.y + imageSize * 0.09;
        const textWidth = measuringElement.getClientRect().width;
        const textHeight = (2 * this.padding) + this.headingFontHeight;
        return (
            <Label
                x={endorsesCenterX - textWidth / 2}
                y={endorsesCenterY + textHeight / 2}
            >
                <Group
                    clipFunc={(ctx) => {
                        ctx.beginPath();
                        ctx.moveTo(0, 0);
                        ctx.lineTo(imageSize * 0.03, textHeight * 0.4);
                        ctx.lineTo(imageSize * 0.02, textHeight);
                        ctx.lineTo(textWidth, -0.274 * textWidth + textHeight);
                        ctx.lineTo(textWidth - imageSize * 0.03,
                            -0.274 * textWidth + textHeight * 0.62);
                        ctx.lineTo(textWidth - imageSize * 0.02, -0.274 * textWidth);
                        ctx.closePath();
                    }}
                >
                    <Tag
                        fill="rgb(231, 67, 17)"
                        skew={{ y: -0.274 }}
                        preventDefault={false}
                    />
                </Group>
                <Text
                    text="    endorses     "
                    fontSize={this.headingFontHeight}
                    fontFamily="Open Sans Bold Italic"
                    fill="white"
                    skew={{
                        x: 0.21,
                        y: -0.274,
                    }}
                    padding={this.padding}
                    preventDefault={false}
                />
            </Label>
        );
    };

    positionedName = (name) => {
        const { imageSize } = this.props;
        const nameElement = new Konva.Text({
            x: 0,
            y: 0,
            skew: { y: -0.274 },
            fontSize: this.headingFontHeight,
            padding: this.padding,
            fontFamily: 'Open Sans Bold Italic',
            text: `    ${name}     `,
        });
        const nameCenterX = this.endorsementTextPosition.x;
        const nameCenterY = this.endorsementTextPosition.y;
        const textWidth = nameElement.getClientRect().width;
        const textHeight = (2 * this.padding) + this.headingFontHeight;
        const displacedX = nameCenterX - textWidth / 2;
        const displacedY = nameCenterY - (-0.137 * textWidth);
        return (
            <>
                <Label
                    x={displacedX}
                    y={displacedY}
                >
                    <Group
                        clipFunc={(ctx) => {
                            ctx.beginPath();
                            ctx.moveTo(0, 0);
                            ctx.lineTo(imageSize * 0.03, textHeight * 0.4);
                            ctx.lineTo(imageSize * 0.02, textHeight);
                            ctx.lineTo(textWidth, -0.274 * textWidth + textHeight);
                            ctx.lineTo(textWidth - imageSize * 0.03,
                                -0.274 * textWidth + textHeight * 0.62);
                            ctx.lineTo(textWidth - imageSize * 0.02, -0.274 * textWidth);
                            ctx.closePath();
                        }}
                    >
                        <Tag
                            fill="rgb(231, 67, 17)"
                            skew={{ y: -0.274 }}
                            preventDefault={false}
                        />
                    </Group>
                    <Text
                        text={`    ${name}     `}
                        fontSize={this.headingFontHeight}
                        fontFamily="Open Sans Bold Italic"
                        fill="white"
                        skew={{
                            x: 0.21,
                            y: -0.274,
                        }}
                        padding={this.padding}
                        preventDefault={false}
                    />
                </Label>
            </>
        );
    }

    positionedTitle = (title, name, bodyMessage) => {
        const { imageSize } = this.props;
        const textProps = {
            text: bodyMessage,
            x: imageSize * 0.13,
            y: imageSize * 0.555,
            width: imageSize * 0.75,
            fontSize: imageSize * 0.0391,
            fontFamily: 'Open Sans Italic',
            fill: 'rgb(60,60,60)',
            wrap: 'word',
            preventDefault: false,
        };
        const measuringText = new Konva.Text({ ...textProps });
        let titleText;
        if (name) {
            titleText = title === '' ? `- ${name}` : `- ${name}, ${title}`;
        } else {
            titleText = '';
        }
        return (
            <Text
                text={titleText}
                x={textProps.x}
                y={(imageSize * 0.565) + measuringText.height()}
                width={imageSize * 0.75}
                fontSize={imageSize * 0.033}
                padding={this.padding}
                fontFamily="Open Sans"
                fill={textProps.fill}
                wrap={textProps.wrap}
                preventDefault={textProps.preventDefault}
            />
        );
    }

    updateShapeRef = (ref) => {
        this.shapeRef = ref;
    }

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
                ref={this.transformerRef}
                startLoad={this.startLoadImage}
                finishLoad={this.finishLoadImage}
                onSelect={() => {
                    this.setState({ selectedId: 'avatar' });
                }}
                onChange={(newAttrs) => {
                    this.setState({ avatarState: newAttrs });
                    updateAvatarState(newAttrs);
                }}
                updateShapeRef={this.updateShapeRef}
                clipFunc={(ctx) => {
                    ctx.arc(
                        this.avatarPosition.x + this.avatarDiameter / 2,
                        this.avatarPosition.y + this.avatarDiameter / 2,
                        this.avatarDiameter / 2,
                        0,
                        Math.PI * 2,
                    );
                }}
                preventDefault={false}
            />
        );
        const avatarOutline = (
            <Circle
                x={this.avatarPosition.x + this.avatarDiameter / 2}
                y={this.avatarPosition.y + this.avatarDiameter / 2}
                radius={this.avatarDiameter / 2}
                stroke="white"
                strokeWidth={imageSize * 0.03}
                preventDefault={false}
            />
        );
        const background = (
            <URLImage
                x={0}
                y={0}
                width={imageSize}
                height={imageSize * 0.485}
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
                height={imageSize * 0.485}
                fill="rgba(228, 189, 37, 0.6)"
                preventDefault={false}
            />
        );
        const base = (
            <>
                <Rect
                    x={0}
                    y={0}
                    height={imageSize}
                    width={imageSize}
                    fill="rgb(254, 251, 242)"
                    preventDefault={false}
                />
                <URLImage
                    x={imageSize * 0.0167}
                    y={imageSize * 0.5}
                    width={imageSize * 0.1}
                    height={imageSize * 0.1}
                    src={quotationMarkPath}
                    startLoad={this.startLoadImage}
                    finishLoad={this.finishLoadImage}
                    preventDefault={false}
                />
                <URLImage
                    x={imageSize * 0.98}
                    y={imageSize * 0.94}
                    width={imageSize * 0.1}
                    height={imageSize * 0.1}
                    scaleX={-1}
                    scaleY={-1}
                    src={quotationMarkPath}
                    startLoad={this.startLoadImage}
                    finishLoad={this.finishLoadImage}
                    preventDefault={false}
                />
            </>
        );
        const footer = (
            <Rect
                x={0}
                y={imageSize * 0.96}
                height={imageSize * 0.04}
                width={imageSize}
                fill="rgb(236, 195, 69)"
                preventDefault={false}
            />
        );
        const logo = (
            <URLImage
                x={this.logoPosition.x}
                y={this.logoPosition.y}
                width={this.logoDiameter}
                height={this.logoDiameter}
                src={upnowLogoPath}
                startLoad={this.startLoadImage}
                finishLoad={this.finishLoadImage}
                preventDefault={false}
            />
        );
        const logoOutline = (
            <Circle
                x={this.logoPosition.x + this.logoDiameter / 2}
                y={this.logoPosition.y + this.logoDiameter / 2}
                radius={this.logoDiameter / 2}
                stroke="white"
                strokeWidth={imageSize * 0.0156}
                preventDefault={false}
            />
        );
        const textBody = (
            <Text
                text={message}
                x={imageSize * 0.132}
                y={imageSize * 0.555}
                width={imageSize * 0.75}
                fontSize={imageSize * 0.0391}
                fontFamily="Open Sans Italic"
                fill="rgb(60,60,60)"
                wrap="word"
                preventDefault={false}
            />
        );
        const textFooter = {
            web: (
                <>
                    <URLImage
                        x={imageSize * 0.028}
                        y={imageSize * 0.965}
                        width={imageSize * 0.028}
                        height={imageSize * 0.028}
                        src={internetLogoPath}
                        startLoad={this.startLoadImage}
                        finishLoad={this.finishLoadImage}
                        preventDefault={false}
                    />
                    <Text
                        text="UPNOW2020.ORG"
                        x={imageSize * 0.06}
                        y={imageSize * 0.967}
                        fontSize={imageSize * 0.03}
                        fontFamily="Open Sans"
                        preventDefault={false}
                    />
                </>),
            twitter: (
                <>
                    <URLImage
                        x={imageSize * 0.38}
                        y={imageSize * 0.965}
                        width={imageSize * 0.0395}
                        height={imageSize * 0.03}
                        src={twitterLogoPath}
                        startLoad={this.startLoadImage}
                        finishLoad={this.finishLoadImage}
                        preventDefault={false}
                    />
                    <Text
                        text="UPNOW2020"
                        x={imageSize * 0.42}
                        y={imageSize * 0.967}
                        fontSize={imageSize * 0.03}
                        fontFamily="Open Sans"
                        preventDefault={false}
                    />
                </>),
            instagram: (
                <>
                    <URLImage
                        x={imageSize * 0.695}
                        y={imageSize * 0.964}
                        width={imageSize * 0.03}
                        height={imageSize * 0.03}
                        src={instaLogoPath}
                        startLoad={this.startLoadImage}
                        finishLoad={this.finishLoadImage}
                        preventDefault={false}
                    />
                    <Text
                        text="UPNOWMULTCO"
                        x={imageSize * 0.73}
                        y={imageSize * 0.967}
                        fontSize={imageSize * 0.03}
                        fontFamily="Open Sans"
                        preventDefault={false}
                    />
                </>),
        };
        const textName = this.positionedName(name);
        const textSupport = this.positionedEndorses();
        const textTitle = this.positionedTitle(title, name, message);
        const transformer = (
            <Transformer
                ref={this.trRef}
                rotateEnabled={false}
                boundBoxFunc={(oldBox, newBox) => {
                    // limit resize
                    if (newBox.width < imageSize * 0.273 || newBox.height < imageSize * 0.273) {
                        return oldBox;
                    }
                    return newBox;
                }}
            />
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
                        {footer}
                        {background}
                        {backgroundTintedOverlay}
                        {logo}
                        {logoOutline}
                        {textBody}
                        {textTitle}
                        {textFooter.web}
                        {textFooter.twitter}
                        {textFooter.instagram}
                        {avatarOutline}
                        {avatar}
                        {textName}
                        {textSupport}
                        {selectedId === 'avatar' && transformer}
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
    }),
    forwardRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
    backgroundImagePath: PropTypes.string.isRequired,
    avatarImagePath: PropTypes.string.isRequired,
    doneLoadingImages: PropTypes.func,
    updateAvatarState: PropTypes.func,
};
Generator.defaultProps = {
    doneLoadingImages: null,
    updateAvatarState: null,
    initialAvatarState: null,
};
// eslint-disable-next-line react/jsx-props-no-spreading
export default React.forwardRef((props, ref) => <Generator {...props} forwardRef={ref} />);
