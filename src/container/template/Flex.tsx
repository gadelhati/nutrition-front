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
    backgroundColor: '$one1',
    borderRadius: '10px',
    width: '20vw',
    height: '60vh',
    padding: '0',
    margin: '0',
})

export const Button = styled('button', {
    alignItems: 'center',
    appearance: 'none',
    backgroundImage: 'radial-gradient(100% 100% at 100% 0, $one1 0, $five1 100%)',
    border: '0',
    borderRadius: '6px',
    boxShadow: '$one 0 2px 4px, $two 0 7px 13px -3px, $three 0 -3px 0 inset',
    boxSizing: 'border-box',
    color: '#fff',
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: '"JetBrains Mono",monospace',
    height: '48px',
    justifyContent: 'center',
    lineHeight: '1',
    listStyle: 'none',
    overflow: 'hidden',
    paddingLeft: '16px',
    paddingRight: '16px',
    position: 'relative',
    textAlign: 'left',
    textDecoration: 'none',
    transition: 'box-shadow .15s,transform .15s',
    userSelect: 'none',
    touchAction: 'manipulation',
    whiteSpace: 'nowrap',
    willChange: 'box-shadow,transform',
    fontSize: '18px',
    '&:focus': {
        boxShadow: '$six 0 2px 4px, $five 0 7px 13px -3px, $four 0 -3px 0 inset',
    },
    '&:hover': {
        boxShadow: '$one1 0 2px 4px, $two1 0 7px 13px -3px, $three1 0 -3px 0 inset',
        transform: 'translateY(-2px)',
    },
    '&:active': {
        boxShadow: '#3c4fe0 0 3px 7px inset',
        transform: 'translateY(2px)',
    },
})

export const Table = styled('table', {
    fontFamily: 'arial, sans-serif',
    borderCollapse: 'collapse',
    width: '100%',
    'td, th': {
        border: '1px solid #dddddd',
        textAlign: 'left',
        padding: '8px',
    },
    'tr:nth-child(even)': {
        backgroundColor: '#dddddd',
    }
})