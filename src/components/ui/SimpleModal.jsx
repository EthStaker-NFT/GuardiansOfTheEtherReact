import React from 'react';

export default function SimpleModal({ open, children, onClose = () => { } }) {
	if (!open) return null;

	function closeModal(e) {
		if (e.target === e.currentTarget) {
			onClose();
		}
	}

	return (
		<div
			id="default-modal"
			tabIndex="-1"
			aria-hidden="true"
			className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
			onClick={closeModal}
		>
			<div className="relative px-4 w-full max-w-2xl max-h-full">
				<div className="relative rounded-3xl shadow bg-black">
					<div className="px-6 py-12 md:p-5 space-y-4">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}
