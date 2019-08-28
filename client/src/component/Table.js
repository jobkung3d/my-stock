import React, { Component } from 'react'
import { Table, Button, Divider, Icon } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment';

class TableList extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
    };
  }

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 5000);
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  onClickAction = () => {
    console.log('aaaaa')
  }

  render() {
    const columns = [
      {
        title: 'รูป',
        dataIndex: 'image_path',
        key: 'image_path',
        render: image_path => (
          <span>
            {image_path?"<img src=" + image_path + "/>":''}
          </span>
        ),
      },
      {
        title: 'ชื่อ',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'บาร์โค้ด',
        dataIndex: 'barcode',
        key: 'barcode'
      },
      {
        title: 'ราคาซื้อ',
        dataIndex: 'original_price',
        key: 'original_price'
      },
      {
        title: 'ราคาขาย',
        dataIndex: 'sell_price',
        key: 'sell_price'
      },
      {
        title: 'วันที่ซื้อ',
        dataIndex: 'date_add',
        key: 'date_add'
      },
      {
        title: 'Action',
        dataIndex: 'action',
        render: (text, record) =>(
          <span>
            <Button type="link">
            <Link to={{ pathname: '/products/edit/'+record.id }}>Edit</Link></Button>
            <Divider type="vertical" />
            <Button type="link" onClick={this.onClickAction}>Delete</Button>
          </span>
        )
      },
    ];
    
    const data = [];
    this.props.data.projectList && this.props.data.projectList.map((value, index)=>{
      return data.push({
        key: index,
        id : value.id,
        name: value.product_name,
        barcode: value.barcode,
        original_price: value.original_price,
        sell_price: value.sell_price,
        image_path: value.image_path,
        date_add: moment(value.date_add).format("DD/MM/YYYY")
      });
    })

    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" style={{ marginRight: 8 }}><Link to="/products/add"><Icon type="file-add" /> Add</Link></Button>
          <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
            Reload
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default TableList