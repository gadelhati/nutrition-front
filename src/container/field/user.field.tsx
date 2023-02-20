import { stitches } from "../globalStyles";

const { styled } = stitches;

export const UserContainer = styled('div',{
    display: 'flex',
    height: '300px',
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #ddd',
    padding: '3vw',
    flexDirection: 'column',
    borderRadius: '5px',
})
export const UserField = styled('input',{
    backgroundColor: '$letterBackgroudColor',
    variants: {
        position:{
            one: {
                color: '$one',
                backgroundColor: '$six'
            },
            two: {
                color: '$two',
                backgroundColor: '$five'
            },
            three: {
                color: '$three',
                backgroundColor: '$four'
            },
            four: {
                color: '$four',
                backgroundColor: '$three'
            },
            five: {
                color: '$five',
                backgroundColor: '$two'
            },
            six: {
                color: '$six',
                backgroundColor: '$one'
            },
        },
    },
}) 