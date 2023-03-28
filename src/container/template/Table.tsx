import { stitches } from "../globalStyles"

const { styled } = stitches

export const Table = styled('table', {
    fontFamily: 'arial, sans-serif',
    fontSize: '0.8em',
    // boxSizing: 'border-box',
    width: '100%',
    padding: '$sm',
    // border: 'none',
    borderSpacing: '0',
    borderRadius: '10px',
    tableLayout: 'fixed',
    'tbody': {
        display: 'block',
        // height: '100vh',
        // overflowY: 'auto',
        // overflowX: 'hidden',
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
        color: '$five1',
        backgroundColor: '$eight1',
    },
})