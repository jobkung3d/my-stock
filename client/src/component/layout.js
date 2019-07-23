import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';

class Layout extends Component{
    render(){
        const { children } = this.props; 
        return(
            <div>
                <Header />
                    <div>
                        { children }
                    </div>
                <Footer />
            </div>   
        )
    }
}

export default Layout;