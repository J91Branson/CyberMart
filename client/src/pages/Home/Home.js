import React from "react";
import { Parallax } from "react-parallax";
import './Home.css';

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
const image1 =
  "https://d17fnq9dkz9hgj.cloudfront.net/uploads/2018/04/Pomeranian_02.jpg";

const image2 =
  "http://funnypicture.org/wallpaper/2015/05/funny-cat-playing-34-cool-wallpaper.jpg";

const image3 =
  "https://wallpaperbro.com/img/270125.jpg";

const Home = () => (
  <div style={styles}>
    <Parallax
      bgImage={image1}
      strength={300}
      renderLayer={percentage => (
        <div>
          <div
            style={{
              position: "absolute",
              background: `rgba(255,182,182, ${percentage * 1})`,
              left: "35%",
              top: "60%",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              width: percentage * 500,
              height: percentage * 500
            }}
          />
        </div>
      )}
    >
      <div style={{ height: 500 }}>
        <button type="button" style={{
          position: "absolute",
          top: "59%",
          left: "35%",
          transform: "translate(-50%,-50%)"
        }} className="btn btn-primary btn-lg">Dog Stuff!</button>
      </div>
    </Parallax>
    
    <Parallax
      bgImage={image2}
      strength={300}
      renderLayer={percentage => (
        <div>
          <div
            style={{
              position: "absolute",
              background: `rgba(255,182,182, ${percentage * 1})`,
              left: "70%",
              top: "60%",
              borderRadius: "50%",
              transform: "translate(-50%,-50%)",
              width: percentage * 500,
              height: percentage * 500
            }}
          />
        </div>
      )}
    >
      <div style={{ height: 500 }}>
        <button type="button" style={{
          position: "absolute",
          top: "59%",
          left: "70%",
          transform: "translate(-50%,-50%)"
        }} className="btn btn-primary btn-lg">Cat Stuff!</button>
      </div>
    </Parallax>
    
    <Parallax
      bgImage={image3}
      strength={300}
      renderLayer={percentage => (
        <div>
          <div
            style={{
              position: "absolute",
              background: `rgba(255,182,182, ${percentage * 1})`,
              left: "50%",
              top: "50%",
              borderRadius: "50%",
              transform: "translate(-50%,-50%)",
              width: percentage * 500,
              height: percentage * 500
            }}
          />
        </div>
      )}
    >
      <div style={{ height: 500 }}>
        <button type="button" style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)"
        }} className="btn btn-primary btn-lg">Stuff!</button>
      </div>
    </Parallax>
  </div>
);

export default Home;
