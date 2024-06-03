module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				'stars': "url('/src/assets/images/background.png'), linear-gradient(360deg, rgba(124, 177, 20, .16), rgba(0, 0, 0, .14) 82%), linear-gradient(#000, #000)",
			},
			backgroundSize: {
				'stars': '518px auto',
				'white-top': '100% auto'
			},
			backgroundPosition: {
				'white-top': 'bottom center',
			},
			zIndex: {
				'below': '-1'
			},
			colors: {
				'main-content-bg': '#FFFFFF',
				'dark-blue': '#1F4899',
				'light-blue': '#87d5e2',
				'purple': "#791F99",
				'teal': "#07e3a1",
				'green': '#6fa010',
				'link-green': '#70a011',
				"link-lower": '#ade440',
				'grey': '#ddd',
				'button-green': '#ade43f',
				'button-disabled': 'rgba(173, 228, 63, 0.4)',
				'error-red': '#c30054',
				'grey-on-white': '#596273',
			},
			fontSize: {
				sm: ['14px', '20px'],
				base: ['18px', '24px'],
				lg: ['18px', '28px'],
				xl: ['24px', '32px'],
				title: ['32px', '40px'],
			},
			spacing: {
				'navbar': '3.2rem',
				'button': '200px',
				'section': '4rem',
				'section-bottom': '135px',
			},
			width: {
				'nft-image': '230px',
			},
			boxShadow: {
				'button': '0 4px 8px rgba(0, 0, 0, 0.3)',  // Customize this to match your design
			},
		}
	},
	plugins: [],
}
