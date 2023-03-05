import { stitches } from "../globalStyles";

const { styled } = stitches;

export const Container = styled('div',{
    position: 'relative',
    margin: '40px 0 20px',
    display: 'flex',
    height: '300px',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3vw',
    flexDirection: 'column',
})

export const ContainerInput = styled('input',{
    fontSize: '18px',
    padding: '10px 10px 10px 5px',
    display: 'block',
    width: '300px',
    border: 'none',
    backgroundColor: '$five1',
    borderBottom: '1px solid #757575',
    borderRadius: '5px',
    // paddingTop: '5px',
    '&:focus': {
        outline: 'none',
    },
    // '&:focus ~ label, input:valid ~ label': {
    //     top: '-20px',
    //     fontSize: '14px',
    //     color: '#4285f4',
    // }
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