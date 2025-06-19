/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                dhruvLighter: '#6692CE',
                dhruvLight: '#3961C9',
                dhruv: '#004aad',
                dhruvDark: '#003B8A',
                dhruvDarker: '#002C68',
            },
            screens: {
                xs: '412px',
                lg: '992px',
                xl: '1200px',
                '2xl': '1400px'
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}

