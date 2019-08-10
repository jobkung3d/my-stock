import React, { Component } from 'react';
import Layouts from '../../component/layout';

class ProductAdd extends Component{ 
    render(){
        return(
            <div>
                <Layouts breadCrumb={["Products","Add"]} menuKey="2">
                  Products Add
                </Layouts>
            </div>
        )
    }
}

export default ProductAdd