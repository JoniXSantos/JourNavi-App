import React from "react";
import "../../styles/home.css";


export const Home = ({ dark }) => {

	return (
		<div className="text-center">
			<h2 className={dark ? 'text-dark' : ''} style={{ transform: 'translateY(180%)' }}>Come and live this adventure around the world!</h2>
			<img className="mb-5" src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/02/22/08/istock-866616238.jpg?quality=75&width=1250&crop=3%3A2%2Csmart&auto=webp" />
		</div>
	);
};
