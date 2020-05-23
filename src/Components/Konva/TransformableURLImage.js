import React from 'react';
import { Group, Image, Transformer } from 'react-konva';
import URLImage from './URLImage';

class TransformableURLImage extends URLImage {
    constructor(props) {
        super(props);
        // this.shapeRef = React.useRef();
        // this.trRef = React.useRef();
        this.shapeRef = React.createRef();
        this.trRef = React.createRef();
    }

    componentDidUpdate(oldProps) {
        super.componentDidUpdate(oldProps);
        const { isSelected } = this.props;
        // const { shapeRef, trRef } = this.state;
        if (isSelected) {
            // we need to attach transformer manually
            this.trRef.current.nodes([this.shapeRef.current]);
            this.trRef.current.getLayer().batchDraw();
        }
    }

    render() {
        const { imageSize, x, y, width, height, draggable,
            isSelected, onSelect, onChange } = this.props;
        const { image } = this.state;
        return (
            <>
                <Group
                    clipFunc={(ctx) => {
                        ctx.arc(
                            imageSize * 0.2833,
                            imageSize * 0.1833,
                            imageSize * 0.1344,
                            0,
                            Math.PI * 2,
                        );
                    }}
                >
                    <Image
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        image={image}
                        draggable={draggable}
                        onDragEnd={(e) => {
                            onChange({
                                x: e.target.x(),
                                y: e.target.y(),
                                width: e.target.width(),
                                height,
                                draggable,
                                id: 'avatar',
                            });
                        }}
                        onTransformEnd={() => {
                            // transformer changes scale of the node
                            // and NOT its width or height
                            // but in the store we have only width and height
                            // to match the data better we will reset scale on transform end
                            const node = this.shapeRef.current;
                            const scaleX = node.scaleX();
                            const scaleY = node.scaleY();

                            // we will reset it back
                            node.scaleX(1);
                            node.scaleY(1);
                            onChange({
                                x: node.x(),
                                y: node.y(),
                                draggable,
                                id: 'avatar',
                                // set minimal value
                                width: Math.max(5, node.width() * scaleX),
                                height: Math.max(node.height() * scaleY),
                            });
                        }}
                        onClick={onSelect}
                        onTap={onSelect}
                        ref={this.shapeRef}
                    />
                </Group>
                {isSelected && (
                    <Transformer
                        ref={this.trRef}
                        boundBoxFunc={(oldBox, newBox) => {
                            // limit resize
                            if (newBox.width < 10 || newBox.height < 10) {
                                return oldBox;
                            }
                            return newBox;
                        }}
                    />
                )}
            </>
        );
    }
}

export default TransformableURLImage;
