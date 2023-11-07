import { keyframes } from "@stitches/react"
import { stitches } from "../global.styles"

const { styled } = stitches

const animatetop = keyframes({
    'from': { top: '-300px', opacity: '0' },
    'to': { top: '0', opacity: '1' }
});

export const Modal = styled('div', {
    position: 'fixed',
    zIndex: '1',
    left: '0',
    top: '0',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    'article': {
        minHeight: '28rem',
        maxHeight: '90vh',
        minWidth: '32rem',
        maxWidth: '95%',
        backgroundColor: '$ninth',
        margin: 'auto',
        border: '1px solid $twelfth',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)',
        animationName: `${animatetop}`,
        animationDuration: '0.4s',
        borderRadius: '.5rem .5rem .3rem .3rem',
    },
    'span': {
        color: '$eleventh',
        float: 'right',
        fontSize: '$lg',
        fontWeight: 'bold',
        '&:hover, &:focus': {
            color: 'black',
            textDecoration: 'none',
            cursor: 'pointer',
        },
    },
    'header': {
        color: '$sixth',
        width: '100%',
        padding: '2px 16px',
        margin: '0 auto',
        backgroundColor: '$third',
        borderRadius: '.3rem .3rem 0 0',
    },
    'footer': {
        display: 'flex',
        height: '5rem',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        borderRadius: '0 0 .5rem .5rem',
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