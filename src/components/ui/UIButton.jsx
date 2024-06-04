import React from 'react';
import checkIcon from '../../assets/icons/check.png';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import '../../styles.css';


export default function UIButton({ text, loading, checked, enabled, onClick }) {

	function clickHandler() {
		if (enabled && !checked && onClick) {
			onClick();
		}
	}

	const buttonClassNames = ` uiButton rounded-full px-6 py-2 mt-4 shadow-button ${
		enabled
			? 'cursor-pointer bg-button-green text-black transition duration-300 ease-in-out transform'
			: 'cursor-not-allowed bg-button-disabled text-black'
	}`;


	return (
		<div
			className={buttonClassNames}
			style={{
				width: '230px',
				userSelect: 'none'
			}}
			onClick={clickHandler}
		>
			{checked && <img src={checkIcon} alt="check" width="18" height="18" className='absolute left-6' style={{ top: '50%', transform: 'translateY(-50%)' }} />}
			{loading && (
				<svg
					className="animate-spin h-[18px] w-[18px] m-[2px] text-blue-600 absolute left-6"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					></circle>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
			)}
			<span>{text}</span>
		</div>
	);
}


