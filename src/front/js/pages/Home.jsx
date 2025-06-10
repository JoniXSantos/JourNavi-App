import React from "react";
import "../../styles/home.css";
import JourNaviLogo from "../../img/JourNavi Logo.png";
import JourNaviLogoDark from "../../img/JourNavi Logo Dark Mode.png";
import JourNaviBackground from "../../img/JourNavi HomePage Background.png";
import JourNaviBackgroundDark from "../../img/JourNavi HomePage Background Dark.png";
import { useNavigate } from "react-router-dom";


export const Home = ({ dark }) => {
	const navigate = useNavigate();

	return (
		<div className="container">
			<div className={`p-5 text-center mt-5 rounded-3 ${dark ? 'bg-dark' : 'bg-grayish'}`}>
				<img src={dark ? JourNaviLogoDark : JourNaviLogo} alt="logotype" width="150" height="150" />
				<img src={dark ? JourNaviBackgroundDark : JourNaviBackground} alt="background" className="img-fluid position-relative" style={{ top: '-100px', display: 'block' }} />
				<p className={`col-xl-7 col-lg-8 col-md-10 col-sm-12 mx-auto fs-3 p-3 rounded-2 text-white ${dark ? '' : 'bg-dark'}`} style={{ marginTop: '-40px' }}>
					Welcome to JourNavi, the navigator in your journey. <br></br> Get ready for a new adventure with us!
				</p>
				<div className="d-inline-flex gap-2 mt-3">
					<button className="d-inline-flex align-items-center btn btn-lg px-4 rounded-2 text-white" type="button" style={{ background: '#FE5558' }} onClick={() => navigate('/signup')}>
						START
					</button>
				</div>
			</div>
			<div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
				<div className="col">
					<div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4" style={{ backgroundImage: "linear-gradient(rgba(254, 85, 88, 0.5), rgba(254, 85, 88, 0.5)), url('https://images.news18.com/ibnlive/uploads/2024/08/taj-mahal-foreign-tourists-2024-08-fb1fc044e90a6ce70c628a3eb503bcc0-16x9.jpg?impolicy=website&width=640&height=360')", backgroundSize: "cover", border: "none" }}>
						<div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
							<h3 className="pt-5 mt-2 mb-4 display-6 lh-1 fw-bold text-white"><i className="fa-solid fa-handshake-angle"></i> Connect with people all over the world and share your experiences.</h3>
						</div>
					</div>
				</div>
				<div className="col">
					<div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4" style={{ backgroundImage: "linear-gradient(rgba(254, 85, 88, 0.5), rgba(254, 85, 88, 0.5)), url('https://www.visitlondon.com/-/media/images/london/visit/traveller-information/essential-information/internet/internetinlondon_1920x1080.png?mw=800&rev=3542ba89ee6342848eae1e604b1d0659&hash=E0543B5921EFA03863B0F725E5ADA2AD')", backgroundSize: "cover", border: "none" }}>
						<div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
							<h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold text-white"><i className="fa-solid fa-compass"></i> Ask for guidance whenever you need.</h3>
						</div>
					</div>
				</div>
				<div className="col">
					<div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4" style={{ backgroundImage: "linear-gradient(rgba(254, 85, 88, 0.5), rgba(254, 85, 88, 0.5)), url('https://www.flagsonline.it/uploads/2019-6-7/420-272/bandiere-kit-strutture-ricettive.jpg')", backgroundSize: "cover", border: "none" }}>
						<div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
							<h3 className="pt-5 mt-2 mb-4 display-6 lh-1 fw-bold text-white"><i className="fa-solid fa-earth-americas"></i> Save the countries you visited and plan your next destinations.</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
