import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './App.css';

import GeneratorForm from './Components/GeneratorForm';
import Generator from './Components/Generator';

import logo from './resources/logo.png';
import defaultAvatarPath from './resources/generator/images/defaultAvatar.png';
import defaultBackgroundPath from './resources/generator/images/background1.png';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#484c54'
        },
        secondary: {
            main: '#838b9c'
        }
    }
});
const IMAGE_SIZE = {
    tiny: 250,
    small: 350,
    medium: 400,
    large: 500
};
const IMAGE_DOWNLOAD_SIZE = 1024;
const DOWNLOAD_NAME = 'endorsement.png';

class App extends React.Component {
    constructor(props) {
        super(props);
        let imageSize = this.determineCanvasSize(window.innerWidth);
        this.state = {
            name: 'Rosa Luxemburg',
            location: 'Portland, OR',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tmpor incididunt ut labore et dolore magna aliqa. Ut enim ad minim venium, quis nostrud.',
            backgroundImagePath: defaultBackgroundPath,
            avatarImagePath: defaultAvatarPath,
            imageSize: imageSize
        }
        this.canvasRef = React.createRef();
        this.downloadRef = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    determineCanvasSize = (windowWidth) => {
        if (windowWidth > 1400) {
            return IMAGE_SIZE.large;
        }
        if (windowWidth > 1100 && windowWidth <= 1400) {
            return IMAGE_SIZE.medium;
        }
        if (windowWidth > 600 && windowWidth <= 1100) {
            return IMAGE_SIZE.small;
        }
        if (windowWidth <= 600) {
            return IMAGE_SIZE.tiny;
        }
    }

    downloadHandler = async () => {
        let generator = <Generator
            imageSize={IMAGE_DOWNLOAD_SIZE}
            ref={this.downloadRef}
            name={this.state.name}
            location={this.state.location}
            message={this.state.message}
            backgroundImagePath={this.state.backgroundImagePath}
            avatarImagePath={this.state.avatarImagePath}
            doneLoadingImages={this.downloadStarter}/>;
        let invisibleHolder = document.createElement('div');
        ReactDOM.render(generator, invisibleHolder);
    };

    downloadFromURI = (uri) => {
        let link = document.createElement('a');
        link.download = DOWNLOAD_NAME;
        link.href = uri;
        link.click();
    };

    downloadStarter = () => {
        let layer = this.downloadRef.current;
        this.downloadFromURI(layer.toDataURL());
    }

    handleResize = () => {
        let previousSize = this.state.imageSize;
        let newSize = this.determineCanvasSize(window.innerWidth);
        if (previousSize !== newSize) {
            console.log(window.innerWidth)
            console.log('changing size from ' + previousSize + ' to ' + newSize);
            this.setState({imageSize: newSize});
        }
        //this.setState({imageSize: this.determineCanvasSize(window.innerWidth)});
    };

    updateGenerator = (data) => {
        let newState = {};
        let { name, location, message, background } = data;
        if (name) { newState.name = name; }
        if (location) { newState.location = location; }
        if (message) { newState.message = message; }
        newState.backgroundImagePath = background;
        this.setState(newState);
    };

    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    render() {
        return <ThemeProvider theme={theme}>
            <div className='App'>
                <header className='App-header' style={{backgroundColor:theme.palette.primary.dark}}>
                    <img src={logo} className='App-logo' alt='logo' />
                    <h2 className='App-title'>
                        I support Universal Preschool NOW!
                    </h2>
                </header>
                <div className="Content">
                    <div className="Config">
                        <GeneratorForm
                            updateGenerator={this.updateGenerator}
                        />
                    </div>
                    <div className="Generator">
                        <Generator
                            imageSize={this.state.imageSize}
                            ref={this.canvasRef}
                            name={this.state.name}
                            location={this.state.location}
                            message={this.state.message}
                            backgroundImagePath={this.state.backgroundImagePath}
                            avatarImagePath={this.state.avatarImagePath} />
                        <div className="Download">
                            <Button
                                variant="contained"
                                size="large"
                                color="primary"
                                onClick={this.downloadHandler}>
                                Download
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    }
}

export default App;
