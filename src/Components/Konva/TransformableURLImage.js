import React from 'react';
import { Group, Image } from 'react-konva';
import URLImage from './URLImage';

class TransformableURLImage extends URLImage {
    constructor(props) {
        super(props);
        this.shapeRef = React.createRef();
        this.trRef = React.createRef();
    }

    componentDidUpdate(oldProps) {
        super.componentDidUpdate(oldProps);
        const { updateShapeRef } = this.props;
        updateShapeRef(this.shapeRef);
    }

    render() {
        const { clipFunc, x, y, width, height, draggable,
            onSelect, onChange } = this.props;
        const { image } = this.state;
        return (
            <>
                <Group
                    clipFunc={clipFunc}
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
            </>
        );
    }
}

export default TransformableURLImage;
