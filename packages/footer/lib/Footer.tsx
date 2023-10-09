import React from "react";
import styled from "styled-components";
import  './Footer.module.css';

const Footer: React.FC = () => {
    return <footer className="content">
        <img src="logo/copyright.svg" alt="Copyright" style={{height: 13}}></img>
        <text>Pixellpay Innovations Private Limited, All rights reserved.</text>
    </footer>
};

export default Footer;