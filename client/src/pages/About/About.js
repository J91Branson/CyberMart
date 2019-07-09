// Import React Packages
import React from 'react';

// Import Files/Components
import Content from "../../layouts/Content/Content";
import './about.css';

const ImageStyle={height:"200px"};

const About = () => (
    <Content>
    <div className="row">
    <div className="col-md-6">
      <br></br>
    <h3 className="borderTeam">
      <img style={ImageStyle} src={process.env.PUBLIC_URL+"/assets/JB.png"}/>
      <br></br><br></br><br></br>
      <h2>Joshua Branson</h2>
      <h5>Front-end and graphics</h5>
      <h5><a href=""></a><i class="fab fa-github-square"></i> | <a href=""></a><i class="fab fa-linkedin"></i></h5>
    </h3>
    </div>
    <div className="col-md-6"></div> 
    </div>
    <div className="row">
    <div className="col-md-6"></div>
    <div className="col-md-6">
    <h3 className="borderTeam">
      <img style={ImageStyle} src={process.env.PUBLIC_URL+"/assets/Caitlyn.png"}/>
      <br></br><br></br><br></br>
      <h2>Caitlyn Sifuentes</h2>
      <h5>Front-end and styling</h5>
      <h5><a href=""></a><i class="fab fa-github-square"></i> | <a href=""></a><i class="fab fa-linkedin"></i></h5>
    </h3>
    </div>
    </div>
    <div className="row">
    <div className="col-md-6">
    <h3 className="borderTeam">
      <img style={ImageStyle} src={process.env.PUBLIC_URL+"/assets/G.Sean.png"}/>
      <br></br><br></br><br></br>
      <h2>G. Sean Massingill</h2>
      <h5>Back-end and merging </h5>
      <h5><a href=""></a><i class="fab fa-github-square"></i> | <a href=""></a><i class="fab fa-linkedin"></i></h5>
    </h3>
    </div>
    <div className="col-md-6"></div>
    </div>
    <div className="row">
    <div className="col-md-6"></div>
    <div className="col-md-6">
    <h3 className="borderTeam">
      <img style={ImageStyle} src={process.env.PUBLIC_URL+"/assets/Nina.png"}/>
      <br></br><br></br><br></br>
      <h2>Nina Calderone</h2>
      <h5>Front-end and Back-end routes</h5>
      <h5><a href=""></a><i class="fab fa-github-square"></i> | <a href=""></a><i class="fab fa-linkedin"></i></h5>
    </h3>
    </div>
    </div>
    <div className="row">
    <div className="col-md-6">
    <h3 className="borderTeam">
      <img style={ImageStyle} src={process.env.PUBLIC_URL+"/assets/Jackson.png"}/>
      <br></br><br></br><br></br>
      <h2>Jackson Stein</h2>
      <h5>Back-end and Bot</h5>
      <h5><a href=""></a><i class="fab fa-github-square"></i> | <a href=""></a><i class="fab fa-linkedin"></i></h5>
    </h3>
    </div>
    <div className="col-md-6"></div>
    </div>
  </Content>
);

export default About;S
