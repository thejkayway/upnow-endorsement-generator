import React from 'react';
import { Image } from 'react-konva';
import PropTypes from 'prop-types';

class URLImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
        };
    }

    componentDidMount() {
        this.loadImage();
    }

    componentDidUpdate(oldProps) {
        const { src } = this.props;
        if (oldProps.src !== src) {
            this.loadImage();
        }
    }

    componentWillUnmount() {
        this.image.removeEventListener('load', this.handleLoad);
    }

    handleLoad = () => {
        const { finishLoad } = this.props;
        this.setState(
            { image: this.image },
            () => { finishLoad(); },
        );
    };

    loadImage() {
        // save to "this" to remove "load" handler on unmount
        const { src, startLoad } = this.props;
        startLoad();
        this.image = new window.Image();
        this.image.src = src;
        this.image.addEventListener('load', this.handleLoad);
    }

    render() {
        const { x, y, width, height, draggable } = this.props;
        const { image } = this.state;
        return (
            <Image
                x={x}
                y={y}
                width={width}
                height={height}
                image={image}
                draggable={draggable}
                ref={(node) => {
                    this.imageNode = node;
                }}
            />
        );
    }
}

URLImage.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    draggable: PropTypes.bool,
    src: PropTypes.string.isRequired,
    finishLoad: PropTypes.func.isRequired,
    startLoad: PropTypes.func.isRequired,
};
URLImage.defaultProps = {
    draggable: false,
};

export default URLImage;
