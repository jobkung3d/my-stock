import React, { Component } from 'react';
import Layout from '../component/layout';
import { withRouter } from "react-router-dom";
import 'typeface-roboto';

class Home extends Component{
    render(){
        return(
            <div>
                <Layout>
                   Index
                </Layout>
            </div>
        )
    }
}

export default withRouter(Home)