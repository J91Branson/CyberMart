// Import React Packages
import React from 'react';

// Import Files/Components
import Content from "../../layouts/Content/Content";


const ImageStyle={height:"200px"};

const About = () => (
    <Content>
    <h3>
      <img style={ImageStyle} src={process.env.PUBLIC_URL+"/assets/JB.png"}/>
      <h2>Joshua Branson</h2>
      <h5>Front-end and Design</h5>
      <h5><a href=""></a><i class="fab fa-github-square"></i><a href=""></a><i class="fab fa-linkedin"></i></h5>
    </h3>
    <h3>
      <img style={ImageStyle} src={process.env.PUBLIC_URL+"/assets/Caitlyn.png"}/>
      <h2>Caitlyn Sifuentes</h2>
      <h5>Front-end and Design</h5>
      <h5><a href=""></a><i class="fab fa-github-square"></i><a href=""></a><i class="fab fa-linkedin"></i></h5>
    </h3>
    <h3>
      <img style={ImageStyle} src={process.env.PUBLIC_URL+"/assets/G.Sean.png"}/>
      <h2>G. Sean Massingill</h2>
      <h5>Front-end and Design</h5>
      <h5><a href=""></a><i class="fab fa-github-square"></i><a href=""></a><i class="fab fa-linkedin"></i></h5>
    </h3>
    <h3>
      <img style={ImageStyle} src={process.env.PUBLIC_URL+"/assets/Nina.png"}/>
      <h2>Nina Calderone</h2>
      <h5>Front-end and Design</h5>
      <h5><a href=""></a><i class="fab fa-github-square"></i><a href=""></a><i class="fab fa-linkedin"></i></h5>
    </h3>
    <h3>
      <img style={ImageStyle} src={process.env.PUBLIC_URL+"/assets/Jackson.png"}/>
      <h2>Jackson Stein</h2>
      <h5>Front-end and Design</h5>
      <h5><a href=""></a><i class="fab fa-github-square"></i><a href=""></a><i class="fab fa-linkedin"></i></h5>
    </h3>
  </Content>
);

export default About;
