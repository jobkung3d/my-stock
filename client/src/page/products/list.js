import React, { Component } from 'react';
import { message } from 'antd';
import Layouts from '../../component/layout';
import TableList from '../../component/table';
import axios from 'axios'

class ProductList extends Component{ 
    constructor(props){
        super(props)
        let messageAlert
        if(this.props.location.state){
            messageAlert = this.props.location.state.message;
            if(messageAlert){
                message.success(messageAlert)
            }
        }

        this.state = {
            projectList: ''
        };
    }
    componentDidMount() {
       axios.get('http://localhost:3000/api/products/')
        .then(res => {
            //console.log(res);
            //console.log(res.data);
           this.setState({
                projectList : res.data,
            })
        });
    }

    render(){
        return(
            <div>
                <Layouts breadCrumb={["Products","List"]} menuKey="2">
                  <TableList data={this.state} />
                </Layouts>
            </div>
        )
    }
}

export default ProductList