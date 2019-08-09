import React, { Component } from 'react';
import Layout from '../component/layout';
import { withRouter } from "react-router-dom";


class Home extends Component{
    render(){
        return(
            <div>
                <Layout breadCrumb={["Dashboard"]} menuKey="1">
                    Dashboard
                </Layout>
            </div>
        )
    }
}

export default withRouter(Home)