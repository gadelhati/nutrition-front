import { stitches } from "../globalStyles"

const { styled } = stitches

export const Table = styled('table', {
    fontFamily: 'arial, sans-serif',
    fontSize: '0.8em',
    padding: '$sm',
    margin: '$sm',
    boxSizing: 'border-box',
    borderSpacing: '0',
    backgroundColor: '$six1',
    borderRadius: '10px',
    display: 'block',
    borderCollapse: 'collapse',
    border: 'solid $two1 1px',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    'thead > tr': {
        color: 'red',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        backgroundColor: '$one1',
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