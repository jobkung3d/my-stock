import React, { Component } from 'react';
import axios from "axios";

class Header extends Component{
    constructor(){
        super();
        this.state = { 
            date: new Date(),
            isOpen: false
        };
        
        this.timerID = setInterval(() => {
            this.tick();
        }, 1000);
    }

    componentDidMount(){
        axios.get("http://localhost:3000/users").then(res => {
            console.log(res.data)
        })
    }

    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({ date: new Date()});
    }

    render() {
        return(
            <div>
                Header {this.state.date.toLocaleTimeString()}
            </div>
        )
    }
}

export default Header