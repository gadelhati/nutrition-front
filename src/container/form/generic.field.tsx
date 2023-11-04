import { stitches } from "../global.styles"

const { styled } = stitches

export const Container = styled('div',{
    display: 'flex',
    minHeight: '6rem',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '$lg',
    '.tab': {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    variants: {
        block: {
            true: {
                display: 'inline-block',
            },
            false: {
                height: '5em',
            },
        },
        align: {
            column: {
                display: 'inline-block',
            },
            line: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }
        },
    },
})

export const ContainerInput2 = styled('div',{
    overflowX: 'clip',
    'input[type=checkbox]': {
        '+ label, + label + label': {
            height: '1.4em',
        },
    },
    'span': {
        position: 'relative',
        display: 'inline-block',
        margin: 'min(.2em) min(.2em) 0em 0em',
    },
    'select': {
        minHeight: '1.8em',
    },

    'input:disabled': {
        backgroundColor: '$eleventh',
        // pointerEvents: 'none',
        cursor: 'not-allowed',
    },

    'input, select': {
        display: 'inline-block',
        width: '26em',
        padding: '10px 0 10px 35px',
        fontWeight: 'normal',
        color: '$fourth',
        background: '$tenth',
        border: '0',
        borderRadius: '.25rem',
        outline: '0',
        textIndent: '60px',
        transition: 'all .3s ease-in-out',
        overflow: 'hidden',
        textOverflow: 'ellipsis ellipsis',
        '+ label': {
            pointerEvents: 'none',
            textTransform: 'uppercase',
            display: 'inline-block',
        },
        '+ label + label': {
            display: 'none',
            opacity: '0',
            transition: 'opacity 2s',
        },
        '+ label, + label + label': {
            overflow: 'hidden',
            textOverflow: 'ellipsis ellipsis',
            position: 'absolute',
            top: '.9rem',
            left: '0',
            bottom: '.7rem',
            padding: '.1em 1.5em',
            color: '#032429',
            fontSize: '$xs',
            fontWeight: 'bold',
            textShadow: '0 1px 0 rgba(19,74,70,0)',
            transition: 'all .3s ease-in-out',
            borderRadius: '.25rem',
            background: 'rgba(122,184,147,0)',
            '&:after': {
                position: 'absolute',
                content: '""',
                width: '0',
                height: '0',
                top: '100%',
                left: '150%',
                marginLeft: '-3px',
                borderLeft: '3px solid transparent',
                borderRight: '3px solid transparent',
                borderTop: '3px solid rgba(122,184,147,0)',
                transition: 'all .3s ease-in-out',
            },
        },
    },
    'input:not([disabled]):focus, input:not([disabled]):active, select:not([disabled]):focus, select:not([disabled]):active': {
        color: '$fourth',
        textIndent: '0',
        background: '$tenth',
        '+ label': {
            width: '100%',
            overflow: 'visible',
            color: '$tenth',
            textShadow: '0 1px o rgba(19, 74, 70, .4)',
            background: 'rgba(122, 184, 147, 1)',
            transform: 'translateY(-1.9rem)',
        },
        '+ label + label': {
            marginTop: '.3rem',
            padding: '.5rem',
            opacity: '1',
            display: 'none',
            width: '100%',
            overflow: 'visible',
            color: '$tenth',
            textShadow: '0 1px o rgba(19, 74, 70, .4)',
            background: '$danger',
            transform: 'translateY(+1.9rem)',
        },
    },
    variants: {
        historic: {
            true: {
                'input, select': {
                    width: '10em',
                    '+ label': {
                        width: '8em',
                    },
                },
            },
            false: {
                'input, select': {
                    '+ label': {
                        width: '7rem',
                    },
                },
            },
        },
        error: {
            true: {
                'input, select': {
                    color: '$tenth',
                    background: '$danger',
                },
                'input:focus, input:active, select:focus, select:active': {
                    '+ label + label': {
                        height: '4rem',
                        background: '$danger',
                        display: 'inline-block',
                        zIndex: '1',
                    },
                },
            },
        },
    },
})

export const ContainerInput = styled('div',{
    fontSize: '.9rem',
    fontFamily: 'Segoe UI, sans-serif',
    margin: '1rem 0 0 0',
    // maxWidth: '190px',
    // position: 'relative',
    padding: '.1rem',
    'input': {
        color: '$five1',
        fontSize: '100%',
        padding: '0.8em',
        outline: 'none',
        border: 'none',
        borderBottom: '2px solid #ccc',
        backgroundColor: 'transparent',
        width: '100%',
    },
    'input[type="number"]': {
        appearance: 'textfield',
    },
    'label': {
        fontSize: '100%',
        position: 'absolute',
        left: '0',
        padding: '0.8em',
        marginLeft: '0.5em',
        pointerEvents: 'none',
        transition: 'all 0.3s ease',
    },
    'input:focus ~ div': {
        transform: 'scaleX(1)',
    },
    ':is(input:focus, input:valid)~label': {
        // transform: 'translateY(-50%) scale(.9)',
        transform: 'translateY(-50%)',
        margin: '0em',
        padding: '0.4em',
    },
    ':is(input:focus, input:valid)': {
        transition: 'all 0.3s ease',
        borderBottom: '2px solid $one1',
    },
})

export const ContainerLabel = styled('label',{
    color: '#999',
    fontSize: '18px',
    fontWeight: 'normal',
    position: 'relative',
    pointerEvents: 'none',
    left: '5px',
    top: '10px',
    transition: '0.2s ease all',
})