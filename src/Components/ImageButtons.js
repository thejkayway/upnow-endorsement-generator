import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
    },
    image: {
        position: 'relative',
        height: 200,
        margin: '0.2rem',
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
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
        border: '7px solid ' + theme.palette.secondary.main,
    },
}));

export default function ImageButtons(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {props.images.map((image) => (
                <ButtonBase
                    focusRipple
                    key={image.title}
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    style={{
                        width: image.width,
                        height: image.height,
                    }}
                    onClick={props.pickHandler}>
                    <span
                        className={classes.imageSrc}
                        style={{
                            backgroundImage: `url(${image.url})`,
                        }} />
                    <span className={image.picked ? classes.imageMarked : classes.imageBackdrop} />
                </ButtonBase>
            ))}
        </div>
    );
}
