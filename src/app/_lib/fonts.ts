import localFont from 'next/font/local'

export const roboto = localFont({
    variable: '--font-roboto',
    display: 'swap',
    src: [
        {
            path: '../public/fonts/Roboto-Black.ttf',
            weight: '900',
            style: 'normal'
        }, {
            path: '../public/fonts/Roboto-Bold.ttf',
            weight: '700',
            style: 'normal'
        }, {
            path: '../public/fonts/Roboto-Regular.ttf',
            weight: '600',
            style: 'normal'
        }, {
            path: '../public/fonts/Roboto-Medium.ttf',
            weight: '400',
            style: 'normal'
        }, {
            path: '../public/fonts/Roboto-Light.ttf',
            weight: '300',
            style: 'normal'
        }
    ]
});

export const titillium = localFont({
    variable: '--font-titillium',
    display: 'swap',
    src: [
        {
            path: '../public/fonts/TitilliumWeb-Black.ttf',
            weight: '900',
            style: 'normal'
        }, {
            path: '../public/fonts/TitilliumWeb-Bold.ttf',
            weight: '700',
            style: 'normal'
        }, {
            path: '../public/fonts/TitilliumWeb-SemiBold.ttf',
            weight: '600',
            style: 'normal'
        }, {
            path: '../public/fonts/TitilliumWeb-Regular.ttf',
            weight: '400',
            style: 'normal'
        }, {
            path: '../public/fonts/TitilliumWeb-Light.ttf',
            weight: '300',
            style: 'normal'
        }
    ]
});