import React from 'react';
import { Button, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import ImageButtons from './ImageButtons';
import background1 from '../../resources/generator/images/background1.png';
import background2 from '../../resources/generator/images/background2.png';
import background3 from '../../resources/generator/images/background3.png';
import background4 from '../../resources/generator/images/background4.png';
import background5 from '../../resources/generator/images/background5.png';
import background6 from '../../resources/generator/images/background6.png';

import './GeneratorForm.css';

const backgroundImages = [
    {
        title: 'background1',
        url: background1,
        picked: true,
    },
    {
        title: 'background2',
        url: background2,
        picked: false,
    },
    {
        title: 'background3',
        url: background3,
        picked: false,
    },
    {
        title: 'background4',
        url: background4,
        picked: false,
    },
    {
        title: 'background5',
        url: background5,
        picked: false,
    },
    {
        title: 'background6',
        url: background6,
        picked: false,
    },
];

class GeneratorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: backgroundImages,
        };
    }

    handleSubmit = (event, newImageState) => {
        const { name, location, message } = this.state;
        const { images } = newImageState || this.state;
        const { updateGenerator } = this.props;

        const background = images.filter((image) => image.picked)[0].url;
        const data = { name, location, message, background };
        data[event.target.name] = event.target.value;
        updateGenerator(data);
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        if (value !== '') {
            this.setState(
                { [name]: value },
                this.handleSubmit(event),
            );
        }
    }

    onPickBackground = (event) => {
        const backgroundButtons = event.target.parentElement.childNodes;
        let imageSettings = this.state;
        backgroundButtons.forEach((button) => {
            if (button.style.backgroundImage) {
                const imageName = button.style.backgroundImage.split('/').pop().split('.')[0];
                imageSettings = {
                    images: backgroundImages.map((image) => ({
                        title: image.title,
                        url: image.url,
                        picked: image.title.localeCompare(imageName) === 0,
                    })),
                };
                this.setState(imageSettings);
            }
        });
        this.handleSubmit(event, imageSettings);
    };

    render() {
        const { images } = this.state;
        return (
            <form className="Generator-form" onSubmit={this.handleSubmit}>
                <div className="Generator-form-textEntry">
                    <span className="Generator-form-label">Name</span>
                    <TextField
                        name="name"
                        variant="outlined"
                        size="small"
                        onChange={this.handleChange}
                    />
                </div>
                <div className="Generator-form-textEntry">
                    <span className="Generator-form-label">Location or Title</span>
                    <TextField
                        name="location"
                        variant="outlined"
                        size="small"
                        onChange={this.handleChange}
                    />
                </div>
                <div className="Generator-form-backgroundPicker">
                    <span className="Generator-form-label">Select a background</span>
                    <ImageButtons
                        images={images}
                        pickHandler={this.onPickBackground}
                    />
                </div>
                <div className="Generator-form-textEntry">
                    <span className="Generator-form-label">Message</span>
                    <TextField
                        name="message"
                        variant="outlined"
                        multiline
                        rows={3}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="Generator-form-avatarEntry">
                    <span className="Generator-form-label">Photo of you</span>
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
        );
    }
}
GeneratorForm.propTypes = {
    updateGenerator: PropTypes.func.isRequired,
};

export default GeneratorForm;
