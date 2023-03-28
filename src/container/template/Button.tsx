import { stitches } from "../globalStyles"

const { styled } = stitches

export const Button = styled('button', {
    backgroundImage: 'linear-gradient($three1, $one1)',
    border: '0',
    borderRadius: '4px',
    boxShadow: 'rgba(0, 0, 0, .3) 0 5px 15px',
    boxSizing: 'border-box',
    color: '#fff',
    cursor: 'pointer',
    fontFamily: 'Montserrat,sans-serif',
    fontSize: '.9em',
    margin: '5px',
    padding: '10px 15px',
    textAlign: 'center',
    userSelect: 'none',
    touchAction: 'manipulation',
    '&:hover': {
        boxShadow: 'rgba(0, 0, 0, .3) 0 5px 10px',
    },
    '&:focus': {
        // backgroundImage: 'linear-gradient($three1, $one1, $three1)',
        // color: '$four1',
        textShadow: '0 0 3px #000, 0 0 5px #000',
    },
    '&:active': {
        boxShadow: 'lightGray 0 3px 7px inset',
        transform: 'translateY(2px)',
    }
})