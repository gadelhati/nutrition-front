import { stitches } from "../globalStyles"

const { styled } = stitches

export const FlexCointainer = styled('div',{
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'start',
    // alignItems: 'center',
    overflow: 'hidden',
    variants: {
        element:{
            all: {
                alignItems: 'stretch',
                backgroundColor: '$back',
            },
            main: {
                flexBasis: '0',
                flexGrow: '1.5',
                flexDirection: "column",
                color: '$four1',
                backgroundColor: '$three1'
            },
            content: {
                height: '94vh',
                flexDirection: "row",
                
                color: '$three1',
                backgroundColor: '$four1'
            },
            nav: {
                height: '6vh',
                backgroundPosition: '50%',
                padding: '.5rem',
                flexDirection: "row",
                justifyContent: 'space-between',
                
                color: '$two1',
                backgroundColor: '$five1'
            },
        },
    },
})
export const SideTitle = styled('a',{
    textDecoration: 'none',
    color: '$three1',
    backgroundColor: '$five1',
    height: '$md',
    width: '$xss',
    userSelect: 'none',
    borderRadius: '5px',
    padding: '.5em',
    textTransform: 'capitalize',
    transition: '.5s',
    p : {
        display: 'inline',
    },
})
export const SideItem = styled('a',{
    textDecoration: 'none',
    color: '$five1',
    height: '$xss',
    width: '$xss',
    userSelect: 'none',
    borderRadius: '5px',
    padding: '.5em',
    textTransform: 'capitalize',
    transition: '.5s',
    '&:hover': {
        color: '$five1',
        backgroundColor: '$three1',
        boxShadow: '0 0 0.2em #000, 0 0 0.2em #999, 0 0 0.2em #888',
    },
    p : {
        display: 'inline',
    },
})

export const Sidebar = styled('aside',{
    width: '256px',
    display: 'flex',
    justifyContent: 'start',
    flexDirection: 'column',
    padding: '$xxs',
    paddingLeft: '$xxs',
    margin: '$xxs',
    borderRadius: '.3rem',
    color: '$five1',
    backgroundColor: '$one1',
    backgroundImage: 'linear-gradient(to bottom, $one1, $three1)',
    // scrollBehavior: 'smooth',
    // overflowY: 'auto',
    // overflowX: 'hidden',
    '&:hover' : {
        // textShadow: '0 0 0.2em #000, 0 0 0.2em #000, 0 0 0.2em #000',
    },
    variants: {
        sidehide: {
            true: {
                // '@bp4': {
                //     display: 'none',
                // },
            },
            false: {
                width: '2.9rem',
                'p': {
                    display: 'none',
                },
                // '@bp4': {
                //     display: 'none',
                // },
            },
        },
    },
})

export const CenterContainer = styled('div',{
    minHeight: '100vh',
    padding: '0',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})
export const CenterItem = styled('div', {
    backgroundColor: '$four1',
    borderRadius: '10px',
    width: '20vw',
    height: '60vh',
    padding: '0',
    margin: '0',
})

export const Button = styled('button', {
    display: 'inline-block',
    padding: '0.5em 1.7em',
    margin: '0 0.1em 0.1em 0',
    border: '0.16em solid $one1',
    backgroundColor: '$one1',
    borderRadius: '0.5em',
    boxSizing: 'border-box',
    textDecoration: 'none',
    fontFamily: '"Roboto", sans-serif',
    fontWeight: '300',
    color: '#ffffff',
    textShadow: '0 0.04em 0.04em rgba(0, 0, 0, 0.35)',
    textAlign: 'center',
    transition: 'all 0.2s',
    '&:hover': {
        borderColor: '$five1',
    },
    '&:focus': {
        borderColor: '$five1',
    },
})

export const Table = styled('table', {
    fontFamily: 'arial, sans-serif',
    fontSize: '0.8em',
    boxSizing: 'border-box',
    width: '100%',
    padding: '$sm',
    'tbody': {
        display: 'block',
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
    },
    'td, th': {
        textAlign: 'left',
        width: '100%',
    },
    'tr:nth-child(even)': {
        backgroundColor: '$six',
    },
    'tr:nth-child(odd)': {
        backgroundColor: '$five1',
    },
    'tr:hover': {
        color: '$one1',
        backgroundColor: '$five1',
    },
})