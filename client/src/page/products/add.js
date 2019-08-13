import React, { Component } from 'react';
import Layouts from '../../component/layout';
import moment from 'moment';
import { Form, Input, Button, InputNumber, DatePicker } from 'antd';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
  

class ProductAdd extends Component{ 
    constructor(){
      super()
      this.state = {date_buy: new Date()};
    }
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
            console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };
          const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 8,
              },
            },
          };
        // Only show error after a field is touched.
        const TitleError = isFieldTouched('product_name') && getFieldError('product_name');
        const BarcodeError = isFieldTouched('barcode') && getFieldError('barcode');
        const PriceBuyError = isFieldTouched('price_buy') && getFieldError('price_buy');
        const PriceSellError = isFieldTouched('price_sell') && getFieldError('price_sell');
        const DateBuyError = isFieldTouched('date_buy') && getFieldError('date_buy');

        return (
            <div>
                <Layouts breadCrumb={["Products","Add"]} menuKey="2">
                    <Form {...formItemLayout} onSubmit={this.handleSubmit} >
                        <Form.Item validateStatus={TitleError ? 'error' : ''} help={TitleError || ''} label="ชื่อสินค้า">
                            {getFieldDecorator('product_name', {
                            rules: [{ required: true, message: 'กรุณากรอกชื่อของสินค้า' }],
                            })(
                            <Input size="large" />,
                            )}
                        </Form.Item>
                        <Form.Item validateStatus={BarcodeError ? 'error' : ''} help={BarcodeError || ''} label="หมายเลขบาร์โค้ด">
                            {getFieldDecorator('barcode', {
                            rules: [{ required: true, message: 'กรุณากรอกหมายเลขบาร์โค้ด' }],
                            })(
                            <Input size="large" />,
                            )}
                        </Form.Item>
                        <Form.Item validateStatus={PriceBuyError ? 'error' : ''} help={PriceBuyError || ''} label="ราคาที่ซื้อมา">
                            {getFieldDecorator('price_buy', {
                            rules: [{ required: true, message: 'กรุณากรอกราคาที่ซื้อมา' }],
                            })(
                              <InputNumber
                              size="large"
                              formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              parser={value => value.replace(/฿\s?|(,*)/g, '')}
                              />, 
                            )}
                        </Form.Item>
                        <Form.Item validateStatus={PriceSellError ? 'error' : ''} help={PriceSellError || ''} label="ราคาที่ขาย">
                            {getFieldDecorator('price_sell', {
                            rules: [{ required: true, message: 'กรุณากรอกราคาที่ขาย' }],
                            })(
                              <InputNumber
                              size="large"
                              formatter={value => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              parser={value => value.replace(/฿\s?|(,*)/g, '')}
                              />, 
                            )}
                        </Form.Item>
                        <Form.Item validateStatus={DateBuyError ? 'error' : ''} help={DateBuyError || ''} label="วันที่ซื้อ">
                            {getFieldDecorator('date_buy', {
                            rules: [{ required: true, message: 'กรุณากรอกราคาที่ขาย' }],
                            })(
                              <DatePicker 
                                size="large"
                                defaultValue={moment('2015/01/01', 'DD/MM/YYYY')}
                                format={'DD/MM/YYYY'}
                              />, 
                              
                            )}
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                            เพิ่มสินค้า
                            </Button>
                        </Form.Item>
                        
                    </Form>
                </Layouts>
            </div>
        );
    }
}
const WrappedProductAdd = Form.create({ name: 'horizontal_login' })(ProductAdd);
export default WrappedProductAdd