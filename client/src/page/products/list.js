import React, { Component } from 'react';
import Layouts from '../../component/layout';
import TableList from '../../component/table';

class ProductList extends Component{ 
    render(){
        return(
            <div>
                <Layouts breadCrumb={["Products","List"]} menuKey="2">
                    <TableList />
                </Layouts>
            </div>
        )
    }
}

export default ProductList