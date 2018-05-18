import React, { Component } from 'react';
import './About.css';
import calleImg from '../images/calle.png';
import camillaImg from './../images/camilla.png';
import davidImg from './../images/david.png';
import matildaImg from './../images/matilda.png';


//This component displays information about the app and its' creators
class About extends Component {
    
    render(){
        return(
            <div id="About">
                <div id="aboutText">
                    Librari is your personal library, where you can keep track of your books in your personalized bookshelves.
                    Maybe you want to keep track of what books you wish to buy, your favorite books, or which ones you want to recommend to your friends. 
                    Whatever your purpose is, it is possible to create shelves that fits your personal need.
                    With the possibility to log in with an unique account, you can reach your Librari anywhere, anytime.<br/><br/>
                    We hope you enjoy!
                </div>
                <div id="aboutUs">
                    <div className="aboutPerson">
                        <div className="aboutImage"><img alt="" src={calleImg}/></div>
                        <div className="aboutName">Calle Svedhag</div> 
                        <div className="aboutIcons"></div>
                    </div>
                    <div className="aboutPerson">
                        <div className="aboutImage"><img alt="" src={camillaImg}/></div>
                        <div className="aboutName">Camilla Ahlenius</div> 
                        <div className="aboutIcons"></div>
                    </div>
                    <div className="aboutPerson">
                        <div className="aboutImage"><img alt="" src={davidImg}/></div>
                        <div className="aboutName">David Tranæus</div> 
                        <div className="aboutIcons"></div>
                    </div>
                    <div className="aboutPerson">
                        <div className="aboutImage"><img alt="" src={matildaImg}/></div>
                        <div className="aboutName">Matilda Carlson</div> 
                        <div className="aboutIcons"></div>
                    </div>
                </div>
            </div>
        );
    }
}
export default About;
