import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: '100%',
    },
    image: {
        position: 'relative',
        width: '45%',
        height: '5rem',
        margin: '0.2rem',
        [theme.breakpoints.down('xs')]: {
            width: '4rem',
            height: '3rem',
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                backgroundColor: 'rgba(255,255,255,0)',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.primary.main,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageMarked: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(255,255,255,0.2)',
        transition: theme.transitions.create('opacity'),
        border: `7px solid ${theme.palette.primary.main}`,
        [theme.breakpoints.down('xs')]: {
            border: `3px solid ${theme.palette.primary.main}`,
        },
    },
}));

function ImageButtons(props) {
    const classes = useStyles();
    const { images, pickHandler } = props;

    return (
        <div className={classes.root}>
            {images.map((image) => (
                <ButtonBase
                    focusRipple
                    key={image.title}
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    onClick={pickHandler}
                >
                    <span
                        className={classes.imageSrc}
                        style={{
                            backgroundImage: `url(${image.url})`,
                        }}
                    />
                    <span className={image.picked ? classes.imageMarked : classes.imageBackdrop} />
                </ButtonBase>
            ))}
        </div>
    );
}

ImageButtons.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    pickHandler: PropTypes.func.isRequired,
};

export default ImageButtons;
