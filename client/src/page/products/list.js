import React, { Component } from 'react';
import Layouts from '../../component/layout';

class ProductList extends Component{ 
    render(){
        return(
            <div>
                <Layouts breadCrumb={["Products","List"]} menuKey="2">
                    Products List
                </Layouts>
            </div>
        )
    }
}

export default ProductList