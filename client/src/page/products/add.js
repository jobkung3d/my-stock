import React, { Component } from 'react';
import Layout from '../../component/layout';
import { withRouter } from "react-router-dom";
import 'typeface-roboto';

class ProductAdd extends Component{ 
    render(){
        return(
            <div>
                <Layout>
                    add
                </Layout>
            </div>
        )
    }
}

export default withRouter(ProductAdd)