import React from 'react';
import { Stage, Layer, Rect, Text, Circle, Label, Tag } from 'react-konva';
import URLImage from './Konva/URLImage';
import flagPath from '../resources/generator/images/flag.png'

class Generator extends React.Component {

    render() {
        return <div className="Generator">
            <Stage width={this.props.imageSize} height={this.props.imageSize}>
                <Layer>
                    <Rect
                        x={0}
                        y={0}
                        height={this.props.imageSize}
                        width={this.props.imageSize}
                        fill={'rgb(251, 228, 171)'}/>
                    <URLImage
                        x={0}
                        y={0}
                        width={this.props.imageSize}
                        height={this.props.imageSize / 2}
                        src={this.props.backgroundImagePath}/>
                    <Rect
                        x={0}
                        y={0}
                        width={this.props.imageSize}
                        height={this.props.imageSize / 2}
                        fill={'rgba(235, 195, 71, 0.3)'}/>
                    <URLImage
                        x={this.props.imageSize * 0.0391}
                        y={this.props.imageSize * 0.0391}
                        width={this.props.imageSize * 0.3125}
                        height={this.props.imageSize * 0.3125}
                        src={this.props.avatarImagePath}/>
                    <Circle
                        x={this.props.imageSize * 0.1953}
                        y={this.props.imageSize * 0.1953}
                        radius={this.props.imageSize * 0.15625}
                        stroke={'white'}
                        strokeWidth={this.props.imageSize * 0.01172}/>
                    <URLImage
                        x={this.props.imageSize * 0.01953}
                        y={this.props.imageSize / 2 - this.props.imageSize * 0.0879}
                        width={this.props.imageSize * 0.9375}
                        height={this.props.imageSize * 0.1758}
                        src={flagPath}/>
                    <Text
                        text={this.props.name}
                        x={this.props.imageSize * 0.05859}
                        y={this.props.imageSize / 2 - this.props.imageSize * 0.07813}
                        fontSize={this.props.imageSize * 0.09375}
                        fontFamily='Nunito'
                        fontStyle='bold'
                        fill='white'
                        stroke='rgb(214,84,42)'
                        strokeWidth={this.props.imageSize * 0.00352}/>
                    <Label
                        x={this.props.imageSize * 0.0488}
                        y={this.props.imageSize * 0.3223}>
                        <Tag
                            fill='black'/>
                        <Text
                            text={this.props.location}
                            fontSize={this.props.imageSize * 0.0391}
                            fontFamily='Nunito'
                            fontStyle='italic bold'
                            fill='white'
                            padding={this.props.imageSize * 0.00977}
                            wrap='word'/>
                    </Label>
                    <Text
                        text='supports Universal Preschool'
                        x={this.props.imageSize * 0.07813}
                        y={this.props.imageSize / 2 + this.props.imageSize * 0.01563}
                        fontSize={this.props.imageSize * 0.0625}
                        fontFamily='Nunito'
                        fontStyle='italic bold'
                        fill='white'
                        stroke='rgb(214,84,42)'
                        strokeWidth={this.props.imageSize * 0.00195}/>
                    <Text
                        text={'"'+this.props.message+'"'}
                        x={this.props.imageSize * 0.1172}
                        y={this.props.imageSize / 2 + this.props.imageSize * 0.1367}
                        width={this.props.imageSize - this.props.imageSize * 0.2344}
                        fontSize={this.props.imageSize * 0.0391}
                        fontFamily='Roboto'
                        fontStyle='italic'
                        fill='rgb(60,60,60)'
                        wrap='word'/>
                    <Text
                        text='Sign the petition at upnow2020.org'
                        x={this.props.imageSize * 0.293}
                        y={this.props.imageSize - this.props.imageSize * 0.0703}
                        fontSize={this.props.imageSize * 0.043}
                        fontFamily='Nunito'
                        fontStyle='italic'/>
                </Layer>
            </Stage>
        </div>
    }
}
export default Generator;