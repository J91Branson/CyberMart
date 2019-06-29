// Import React Packages
import React from "react";
import { Parallax } from "react-parallax";

// Import Files/Components
import './Home.css';
import Bestseller from "../Product/Bestseller";


const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
const image1 =
  "https://thehappypuppysite.com/wp-content/uploads/2017/10/Cute-Dog-Names-HP-long.jpg";

const image2 =
  "http://yesofcorsa.com/wp-content/uploads/2017/01/4K-Cat-Photo.jpg"
const image3 =
  "http://starkovtattoo.spb.ru/images/700/DSC100766071.jpg";

const Home = () => (
  <div style={styles}>
    <Parallax bgImage={image1} strength={500}>
      <div style={{ height: 500 }}>
        <div className="card" style={{
          padding: 20,
          position: "absolute",
          top: "29%",
          left: "2%",
        }}>
          <div className="card-body dogHome">
            <h1 className="card-title">Shop for Dogs</h1>
            <p className="card-text">Need something for your good boy/girl?</p>
            <a href="#" className="btn btn-primary">Click Here</a>
          </div>
        </div>
      </div>
    </Parallax>
    {/* wip - need to filter out dog bestsellers only */}
    <div>
      <Bestseller />
    </div>
    <Parallax bgImage={image2} strength={500}>
      <div style={{ height: 500 }}>
        <div className="card" style={{
          padding: 20,
          position: "absolute",
          top: "29%",
          left: "50%",
        }}>
          <div className="card-body catHome">
            <h1 className="card-title">Shop for Cats</h1>
            <p className="card-text">Cats have it all – admiration, an endless sleep, and company only when they want it.</p>
            <a href="#" className="btn btn-primary">Get Them More</a>
          </div>
        </div>
      </div>
    </Parallax>
    {/* <div>
      <Bestseller />   Cat one goes here
    </div> */}
    <Parallax bgImage={image3} strength={500}>
      <div style={{ height: 500 }}>
        <div className="card" style={{
          padding: 20,
          position: "absolute",
          top: "29%",
          left: "2%",
        }}>
          <div className="card-body dogHome">
            <h1 className="card-title">Something Else In Mind?</h1>
            <p className="card-text">Shop by catagories instead.</p>
            <a href="#" className="btn btn-primary">Go to Catagories</a>
          </div>
        </div>
      </div>
    </Parallax>
  </div>
);

export default Home;
