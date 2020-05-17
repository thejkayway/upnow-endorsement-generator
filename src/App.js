import React from 'react';
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

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Rosa Luxemburg',
            location: 'Portland, OR',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tmpor incididunt ut labore et dolore magna aliqa. Ut enim ad minim venium, quis nostrud.',
            backgroundImagePath: defaultBackgroundPath,
            avatarImagePath: defaultAvatarPath
        }
    }

    downloadHandler = () => {
        // get image
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

    render() {
        return <ThemeProvider theme={theme}>
            <div className='App'>
                <header className='App-header'>
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
                            imageSize={300}
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
