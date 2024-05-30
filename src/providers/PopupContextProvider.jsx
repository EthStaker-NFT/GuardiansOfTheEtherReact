import React, { useCallback, useState, useContext } from 'react';
import closeIcon from '../assets/icons/close.svg';

const initialPopupData = {
	content: null,
	buttonText: "Okay",
	status: "message",
	onClose: () => {},
	showButton: true,
};

const initialContextValue = {
	showPopup: () => {},
	hidePopup: () => {},
};

export const PopupContext = React.createContext(initialContextValue);

export const PopupContextProvider = ({ children }) => {
	const [show, setShow] = useState(false);
	const [popupData, setPopupData] = useState(initialPopupData);

	const showPopup = useCallback((data) => {

		setPopupData({
			...initialPopupData,
			...data,
			onClose: () => {
				hidePopup();
				data.onClose && data.onClose();
			},
		});
		setShow(true);
	}, []);

	const hidePopup = useCallback(() => {
		setPopupData(initialPopupData);
		setShow(false);
	}, []);

	let backgroundClass;
	let textColorClass;
	switch (popupData.status) {
	case 'success':
		backgroundClass = 'bg-button-green';
		textColorClass = 'text-black';
		break;
	case 'error':
		backgroundClass = 'bg-black';
		textColorClass = 'text-error-red';
		break;
	case 'message':
	default:
		backgroundClass = 'bg-black';
		textColorClass = 'text-button-green';
		break;
	}

	return (
		<PopupContext.Provider value={{ showPopup, hidePopup }}>
			{show && (
				<div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
					<div className={`relative flex flex-col items-center gap-4 text-base px-20 py-16 rounded-3xl w-90 ${backgroundClass} ${textColorClass}`}>
						{/*<img src={closeIcon} alt="close" width="24" height="24" className="absolute top-4 right-4 cursor-pointer" onClick={popupData.onClose} />*/}
						<div className={`text-center ${textColorClass}`}>
							{typeof popupData.content === 'string' ? <p>{popupData.content}</p> : popupData.content}
						</div>
						{popupData.showButton && (
							<button className="bg-white text-black rounded-full py-2 mt-7 w-button" onClick={popupData.onClose}>
								{popupData.buttonText}
							</button>
						)}
					</div>
				</div>
			)}
			{children}
		</PopupContext.Provider>
	);
};
