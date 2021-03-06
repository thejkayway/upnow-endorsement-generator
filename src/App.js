import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FontFaceObserver from 'fontfaceobserver';
import './App.css';

import GeneratorForm from './Components/UI/GeneratorForm';
import Generator from './Components/Generator/Generator';

import logo from './resources/logo.png';
import defaultAvatarPath from './resources/generator/images/defaultAvatar.png';
import defaultBackgroundPath from './resources/generator/images/background1.jpg';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#f3c30e',
        },
        secondary: {
            main: '#fff9e6',
        },
    },
    typography: {
        textField: {
            background: 'white',
        },
    },
});
const IMAGE_SIZE = {
    tiny: 250,
    small: 350,
    medium: 400,
    large: 500,
};
const IMAGE_DOWNLOAD_SIZE = 1024;
const DOWNLOAD_NAME = 'endorsement.png';
const fontObservers = [
    new FontFaceObserver('Open Sans'),
    new FontFaceObserver('Open Sans Bold Italic'),
    new FontFaceObserver('Open Sans Italic'),
];

class App extends React.Component {
    constructor(props) {
        super(props);
        const imageSize = this.determineCanvasSize(window.innerWidth);
        this.state = {
            name: 'Lady Buttermilk',
            title: 'Cat',
            message:
`Meow

            meow
            
    meow`,
            backgroundImagePath: defaultBackgroundPath,
            avatarImagePath: defaultAvatarPath,
            imageSize,
            fontsLoaded: false,
        };
        this.canvasRef = React.createRef();
        this.downloadRef = React.createRef();
    }

    async componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        this.generateAfterFontsLoaded();
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
        return IMAGE_SIZE.medium;
    }

    downloadHandler = () => {
        const {
            name, title, message, backgroundImagePath, avatarImagePath, avatarState, imageSize,
        } = this.state;
        const generator = (
            <Generator
                imageSize={IMAGE_DOWNLOAD_SIZE}
                ref={this.downloadRef}
                name={name}
                title={title}
                message={message}
                backgroundImagePath={backgroundImagePath}
                avatarImagePath={avatarImagePath}
                logoPath={logo}
                initialAvatarState={this.scaleAvatar(avatarState, imageSize, IMAGE_DOWNLOAD_SIZE)}
                doneLoadingImages={this.downloadStarter}
            />
        );
        const invisibleHolder = document.createElement('div');
        ReactDOM.render(generator, invisibleHolder);
    };

    downloadFromURI = (uri) => {
        const link = document.createElement('a');
        link.download = DOWNLOAD_NAME;
        link.href = uri;
        link.click();
    };

    downloadStarter = () => {
        const layer = this.downloadRef.current;
        this.downloadFromURI(layer.toDataURL());
    }

    generateAfterFontsLoaded = async () => {
        const promises = [];
        fontObservers.forEach((font) => promises.push(font.load()));
        await Promise.all(promises);
        this.setState({ fontsLoaded: true });
    };

    handleResize = () => {
        const { imageSize: previousSize } = this.state;
        const newSize = this.determineCanvasSize(window.innerWidth);
        if (previousSize !== newSize) {
            this.setState({ imageSize: newSize });
        }
    };

    scaleAvatar = (avatar, oldCanvasSize, newCanvasSize) => ({
        x: avatar.x * (newCanvasSize / oldCanvasSize),
        y: avatar.y * (newCanvasSize / oldCanvasSize),
        width: avatar.width * (newCanvasSize / oldCanvasSize),
        height: avatar.height * (newCanvasSize / oldCanvasSize),
    });

    updateAvatarState = (avatar) => {
        this.setState({ avatarState: avatar });
    };

    updateGenerator = (data) => {
        const newState = {};
        const {
            name, title, message, background, avatar,
        } = data;
        newState.name = name;
        newState.title = title;
        newState.message = message;
        if (avatar) {
            this.avatarHelpText = (
                <span
                    className="Generator-helpText"
                >
                    Click or tap on your photo in the image above to edit.
                </span>
            );
            newState.avatarImagePath = avatar.src;
        }
        newState.backgroundImagePath = background;
        this.setState(newState);
    };

    render() {
        const {
            imageSize, name, title, message,
            backgroundImagePath, avatarImagePath, avatarState, fontsLoaded,
        } = this.state;
        return (
            <ThemeProvider theme={theme}>
                <div className="App">
                    <header className="App-header" style={{ backgroundColor: theme.palette.primary.main }}>
                        <h2 className="App-title">
                            I support Universal Preschool NOW!
                        </h2>
                    </header>
                    <div className="Content">
                        <div className="Config">
                            <GeneratorForm
                                initialName={name}
                                initialTitle={title}
                                initialMessage={message}
                                updateGenerator={this.updateGenerator}
                            />
                        </div>
                        {fontsLoaded && (
                            <div className="Generator-display">
                                <Generator
                                    imageSize={imageSize}
                                    ref={this.canvasRef}
                                    name={name}
                                    title={title}
                                    message={message}
                                    backgroundImagePath={backgroundImagePath}
                                    avatarImagePath={avatarImagePath}
                                    logoPath={logo}
                                    initialAvatarState={avatarState}
                                    updateAvatarState={this.updateAvatarState}
                                />
                                {this.avatarHelpText}
                                <div className="Download">
                                    <Button
                                        variant="contained"
                                        size="large"
                                        color="primary"
                                        style={{
                                            border: '1px solid black',
                                            fontFamily: 'Nunito Bold',
                                        }}
                                        onClick={this.downloadHandler}
                                    >
                                        Download
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </ThemeProvider>
        );
    }
}

export default App;
