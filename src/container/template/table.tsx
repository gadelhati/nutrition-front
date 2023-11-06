import { stitches } from "../global.styles"

const { styled } = stitches

export const Table = styled('table', {
    fontFamily: 'arial, sans-serif',
    fontSize: '0.9em',
    color: '$sixteenth',
    padding: '$sm',
    margin: '0 $xxs $xxs $xxs',
    boxSizing: 'border-box',
    borderSpacing: '0',
    backgroundColor: '$tenth',
    borderRadius: '.3rem',
    display: 'block',
    borderCollapse: 'collapse',
    // border: 'solid $third 1px',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    '.header': {
        display: 'flex',
        justifyContent: 'space-between',
    },
    'thead > div > span:after': {
        color: 'red',
        content: "   ",
    },
    'thead > tr': {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        backgroundColor: '$tenth',
    },
    'td, th': {
        borderBottom: '1px solid $eighth',
        paddingLeft: '1em',
        textAlign: 'left',
        height: '3em',
        width: '10%',
    },
    'tr:nth-child(even)': {
        backgroundColor: '$tenth',
    },
    'tr:nth-child(odd)': {
        backgroundColor: '$sixth',
    },
    'tr:hover': {
        cursor: 'pointer',
        backgroundColor: '$seventh',
    },
})