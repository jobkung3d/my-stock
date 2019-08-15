import React, { Component } from 'react';
import Layouts from '../../component/layout';
import moment from 'moment';
import { Form, Input, Button, InputNumber, DatePicker, Icon, message, Upload } from 'antd';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
 
// Input Upload

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

// End Input Upload //

class ProductAdd extends Component{ 
    constructor(){
      super()
      this.state = {
        date_buy: new Date(),
        loading: false,
      };
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

    //Input Upload
    handleChange = info => {
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl =>
          this.setState({
            imageUrl,
            loading: false,
          }),
        );
      }
    };
    // End Input Upload //
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

        // Input Upload
        const uploadButton = (
          <div>
            <Icon type={this.state.loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>
          </div>
        );
        const { imageUrl } = this.state;  
        // Only show error after a field is touched.
        const TitleError = isFieldTouched('product_name') && getFieldError('product_name');
        const BarcodeError = isFieldTouched('barcode') && getFieldError('barcode');
        const PriceBuyError = isFieldTouched('price_buy') && getFieldError('price_buy');
        const PriceSellError = isFieldTouched('price_sell') && getFieldError('price_sell');
        const DateBuyError = isFieldTouched('date_buy') && getFieldError('date_buy');
        //const ImageError = isFieldTouched('image') && getFieldError('image');
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
                            initialValue: moment(this.state.date_buy, 'DD/MM/YYYY'),
                            })(
                              <DatePicker 
                                size="large"
                                format={'DD/MM/YYYY'}
                              />, 
                              
                            )}
                        </Form.Item>
                        <Form.Item label="รูปภาพ">
                            {getFieldDecorator('image', {
                            })(
                              <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange}
                              >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                              </Upload>
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
const WrappedProductAdd = Form.create({ name: 'product_add' })(ProductAdd);
export default WrappedProductAdd