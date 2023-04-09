import { stitches } from "../globalStyles"

const { styled } = stitches

export const Container = styled('div',{
    display: 'flex',
    height: '20em',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
})

export const ContainerInput = styled('input',{
    fontFamily: 'Montserrat,sans-serif',
    fontSize: '18px',
    marginTop: '.1em',
    display: 'block',
    border: 'none',
    backgroundColor: '$five1',
    borderBottom: '1px solid #757575',
    borderRadius: '5px',
    padding: '10px 10px 10px 5px',
    '&:focus': {
        outline: 'none',
    },
    // '&:focus ~ label, input:valid ~ label': {
    //     top: '-20px',
    //     fontSize: '14px',
    //     color: '#4285f4',
    // }
})

export const ContainerInput2 = styled('div',{
    fontSize: '.9rem',
    fontFamily: 'Segoe UI, sans-serif',
    margin: '1em 0 0 0',
    maxWidth: '190px',
    position: 'relative',
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

export const ContainerInput3 = styled('div',{
    position: 'relative',
    margin: '50px auto',
    width: '200px',
    'input[type="text"]': {
        fontSize: '20px',
        width: '100%',
        border: 'none',
        borderBottom: '2px solid #ccc',
        padding: '5px 0',
        backgroundColor: 'transparent',
        outline: 'none',
    },
    'label': {
        position: 'absolute',
        top: '0',
        left: '0',
        color: '#ccc',
        transition: 'all 0.3s ease',
        pointerEvents: 'none',
    },
    'input[type="text"]:focus ~ .label, input[type="text"]:valid ~ .label': {
        top: '-20px',
        fontSize: '16px',
        color: '#333',
    },
    'div': {
        position: 'absolute',
        bottom: '0',
        left: '0',
        height: '2px',
        width: '100%',
        backgroundColor: '#333',
        transform: 'scaleX(0)',
        transition: 'all 0.3s ease',
    },
    'input[type="text"]:focus ~ div, input[type="text"]:valid ~ div': {
        transform: 'scaleX(1)',
    }
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