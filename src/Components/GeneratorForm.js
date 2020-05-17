import React from 'react';
import { Button, TextField } from '@material-ui/core';
import ImageButtons from './ImageButtons';
import background1 from '../resources/generator/images/background1.png';
import background2 from '../resources/generator/images/background2.png';
import background3 from '../resources/generator/images/background3.png';
import background4 from '../resources/generator/images/background4.png';
import background5 from '../resources/generator/images/background5.png';
import background6 from '../resources/generator/images/background6.png';

import './GeneratorForm.css';

const backgroundImages = [
    {
        title: 'background1',
        width: '8rem',
        height: '5rem',
        url: background1,
        picked: true,
    },
    {
        title: 'background2',
        width: '8rem',
        height: '5rem',
        url: background2,
        picked: false,
    },
    {
        title: 'background3',
        width: '8rem',
        height: '5rem',
        url: background3,
        picked: false,
    },
    {
        title: 'background4',
        width: '8rem',
        height: '5rem',
        url: background4,
        picked: false,
    },
    {
        title: 'background5',
        width: '8rem',
        height: '5rem',
        url: background5,
        picked: false,
    },
    {
        title: 'background6',
        width: '8rem',
        height: '5rem',
        url: background6,
        picked: false,
    },
]

class GeneratorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: backgroundImages
        };
    }

    handleSubmit = event => {
        event.preventDefault();
        let {name, location, message} = this.state;
        let background = this.state.images.filter(image=>image.picked)[0].url;
        let data = {name, location, message, background};
        data[event.target.name] = event.target.value;
        this.props.updateGenerator(data);
    }

    handleChange = event => {
        let {name, value} = event.target;
        if (value !== "") {
            this.setState(
                {[name]: value},
                this.handleSubmit(event));
        }
    }

    onPickBackground = event => {
        for (let node of event.target.parentElement.childNodes) {
            if (node.className.includes('imageSrc')) {
                let imageName = node.style["background-image"].split('/')[3].split('.')[0];
                for (let image of backgroundImages) {
                    if (image.title.localeCompare(imageName) === 0) {
                        image.picked = true;
                    } else {
                        image.picked = false;
                    }
                }
            }
        }
        this.setState({
            images: backgroundImages
        })
        this.handleSubmit(event);
    };

    render() {
        return <form className="Generator-form" onSubmit={this.handleSubmit}>
            <div className="Generator-form-textEntry">
                <label>Name</label>
                <TextField
                    name="name"
                    variant="outlined"
                    size="small"
                    onChange={this.handleChange}
                />
            </div>
            <div className="Generator-form-textEntry">
                <label>Location or Title</label>
                <TextField
                    name="location"
                    variant="outlined"
                    size="small"
                    onChange={this.handleChange}
                />
            </div>
                        <div className="Generator-form-backgroundPicker" >
                <label>Select a background</label>
                <ImageButtons
                    images={backgroundImages}
                    pickHandler={this.onPickBackground}/>
            </div>
            <div className="Generator-form-textEntry">
                <label>Message</label>
                <TextField
                    name="message"
                    variant="outlined"
                    multiline
                    rows={3}
                    onChange={this.handleChange}
                />
            </div>
            <div className="Generator-form-avatarEntry">
                <label>Photo of you</label>
                <Button
                    type="button"
                    variant="outlined"
                    size="small"
                    color="primary"
                >
                    Browse...
                </Button>
            </div>
        </form>
    }
}

export default GeneratorForm;