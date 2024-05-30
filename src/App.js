import Home from "./pages/Home";
import { PopupContextProvider } from "./providers/PopupContextProvider";
import { BrowserView, MobileView, isBrowser, isMobile, isAndroid } from 'react-device-detect';
import HomeMobile from "./pages/HomeMobile";
import {useState} from "react";
import Navbar from "./components/Navbar";

function App() {
	// get query params	
	const urlParams = new URLSearchParams(window.location.search);
	const forceDesktop = urlParams.get('force-desktop');
	const [modalInfo, setModalInfo] = useState({ type: '', text: '', link: '', visible: false });

	return (
		<PopupContextProvider>
			<div className="bg-stars min-h-screen text-center flex flex-col font-sans">
				<Navbar />
				<div className="w-full pt-24" style={{paddingTop: '8rem'}}>
					<h1 className="text-4xl font-bold text-white">Claim NFT</h1>
					<p className="text-lg text-white mt-2">For operating your own Ethereum staking node</p>
				</div>
				<div className="bg-white-top w-full bg-no-repeat" style={{height: '11vh'}}></div>

				<div className="flex-grow bg-main-content-bg p-12">
					{(!isMobile || forceDesktop === 'true') ? <Home isAndroid={isAndroid}/> :
						<HomeMobile />}
				</div>

			</div>
		</PopupContextProvider>
	);
}

export default App;
