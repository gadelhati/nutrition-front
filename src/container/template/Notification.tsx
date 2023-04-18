import { keyframes } from "@stitches/react"
import { stitches } from "../globalStyles"

const { styled } = stitches

const show_toast = keyframes ({
    '0%': { transform: 'translateX(100%)', },
    '40%': { transform: 'translateX(-5%)', },
    '80%': { transform: 'translateX(0%)', },
    '100%': { transform: 'translateX(-10px)', },
})
const hide_toast = keyframes ({
    '0%': { transform: 'translateX(-10px)', },
    '40%': { transform: 'translateX(0%)' },
    '80%': { transform: 'translateX(-5%)' },
    '100%': { transform: 'translateX(calc(100% + 20px))' },
})
const progress = keyframes ({
    '100%': { width: '0%', },
})

// novos recursos css: https://www.sitepoint.com/css-is-where-has-pseudo-class-selectors/

export const Notification = styled('ul', {
    position: 'fixed',
    top: '30px',
    right: '20px',
    ':where(.toast, .column)': {
        display: 'flex',
        alignItems: 'center',
    },
    '.toast': {
        width: '400px',
        position: 'relative',
        overflow: 'hidden',
        listStyle: 'none',
        borderRadius: '4px',
        padding: '16px 17px',
        marginBottom: '10px',
        background: 'var(--light)',
        justifyContent: 'space-between',
        animation: 'show_toast 0.3s ease forwards',
    },
    '.toast.hide': {
        animation: 'hide_toast 0.3s ease forwards',
    },
    '::before': {
        position: 'absolute',
        content: "",
        height: '3px',
        width: '100%',
        bottom: '0px',
        left: '0px',
        animation: `${progress} 5s linear forwards`,
    },
    variants: {
        show:{
            true: {
                visibility: 'visible',
                // animation: `${fadein} 0.5s, ${expand} 0.5s 0.5s, ${stay} 3s 1s, ${shrink} 0.5s 4s, ${fadeout} 0.5s 4.5s`,
                'div': {
                    visibility: 'visible',
                }
            },
            false: {
                visibility: 'hidden',
            }
        }
    }
})