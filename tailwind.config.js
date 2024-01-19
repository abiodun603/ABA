/** @type {import('tailwindcss').Config} */
const nativewind = require("nativewind/tailwind/native")
module.exports = {
	content: [
		'./App.{js,jsx,ts,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./layouts/**/*.{js,ts,jsx,tsx}',
		'./screens/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				kblack: '#1F1A1D',
				kblack2: '#1F1E1F',
				kdesc: '#80747B',
				kgray: '#808080',
				kprimary: '#390036',
				ksecondary: '#82007C',
				kgreen: '#219653',
				ksecondary: '#A3229A',
				ktext: '#4E444B',
			},
		},
	},
	plugins: [],
};
