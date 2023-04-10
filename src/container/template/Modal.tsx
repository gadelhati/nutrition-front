import { keyframes } from "@stitches/react"
import { stitches } from "../globalStyles"

const { styled } = stitches

const animatetop = keyframes({
    'from': { top: '-300px', opacity: '0' },
    'to': { top: '0', opacity: '1' }
});

export const Modal = styled('div', {
    display: 'none',
    position: 'fixed',
    zIndex: '1',
    left: '0',
    top: '0',
    minWidth: '100%',
    minHeight: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.4)',
    'article': {
        maxHeight: '80vh',
        position: 'relative',
        backgroundColor: '#fefefe',
        margin: 'auto',
        padding: '1em',
        border: '1px solid #888',
        maxWidth: '80%',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)',
        animationName: `${animatetop}`,
        animationDuration: '0.4s',
        borderRadius: '.5rem',
    },
    'span': {
        color: '#aaa',
        float: 'right',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        '&:hover, &:focus': {
            color: 'black',
            textDecoration: 'none',
            cursor: 'pointer',
        },
    },
    variants: {
        show: {
            false: {
                display: 'none',
            },
            true: {
                display: 'flex',
            },
        },
    },
})