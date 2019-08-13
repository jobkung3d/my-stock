import React, { Component } from 'react';
import Layouts from '../../component/layout';
import { Form, Input, Button } from 'antd';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
  

class ProductAdd extends Component{ 
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
        const TitleError = isFieldTouched('username') && getFieldError('username');
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