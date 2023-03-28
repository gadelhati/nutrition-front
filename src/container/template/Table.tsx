import { stitches } from "../globalStyles"

const { styled } = stitches

export const Table = styled('table', {
    fontFamily: 'arial, sans-serif',
    fontSize: '0.8em',
    width: '100%',
    padding: '$sm',
    borderSpacing: '0',
    'tbody': {
        display: 'block',
    },
    'td, th': {
        paddingLeft: '1em',
        textAlign: 'left',
        height: '2em',
        width: '10%',
    },
    'tr:nth-child(even)': {
        backgroundColor: '$six',
    },
    'tr:nth-child(odd)': {
        backgroundColor: '$five1',
    },
    'tr:hover': {
        cursor: 'pointer',
        color: '$six1',
        backgroundColor: '$eight1',
    },
})