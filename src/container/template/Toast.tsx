import { keyframes } from "@stitches/react"
import { stitches } from "../globalStyles"

const { styled } = stitches

const fadein = keyframes({
    'from': { bottom: '0', opacity: '0', },
    'to': { bottom: '30px', opacity: '1' }
})
const expand = keyframes({
    'from': { minWidth: '50px', },
    'to': { minWidth: '350px', }
})
const stay = keyframes({
    'from': { minWidth: '350px', },
    'to': { minWidth: '350px', }
})
const shrink = keyframes({
    'from': { minWidth: '350px', }, 
    'to': { minWidth: '50px', }
})
const fadeout = keyframes({
    'from': {bottom: '30px', opacity: '1' },
    'to': {bottom: '60px', opacity: '0' }
})

export const Toast = styled('div', {
    visibility: 'hidden',
    maxWidth: '50px',
    height: '50px',
    margin: 'auto',
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    borderRadius: '2px',
    position: 'fixed',
    zIndex: '1',
    left: '0',
    right: '0',
    bottom: '30px',
    fontSize: '17px',
    whiteSpace: 'nowrap',
    'span': {
        width: '50px',
        height: '50px',
        float: 'left',
        paddingTop: '16px',
        paddingBottom: '16px',
        boxSizing: 'border-box',
        backgroundColor: '#111',
        color: '#fff',
    },
    'div': {
        visibility: 'hidden',
        color: '#fff',
        padding: '16px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
    variants: {
        show:{
            true: {
                visibility: 'visible',
                animation: `${fadein} 0.5s, ${expand} 0.5s 0.5s, ${stay} 3s 1s, ${shrink} 0.5s 4s, ${fadeout} 0.5s 4.5s`,
                'div': {
                    visibility: 'visible',
                }
            },
            false: {
                visibility: 'hidden',
            }
        }
    }
})