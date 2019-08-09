import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { withRouter, Link } from "react-router-dom";
import 'antd/dist/antd.css'
import '../static/style.css'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class Layouts extends Component {

  state = {
    collapsed: false,
  };
  
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  

  render() {
    const { children, breadCrumb, menuKey } = this.props
    const listBreadcrumb = breadCrumb.map((breadCrumb) =>
      <Breadcrumb.Item key={breadCrumb.toString()}>{breadCrumb}</Breadcrumb.Item>
    );
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={[menuKey]} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Dashboard</span>
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Products</span>
              <Link to="/products" />
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="user" />
              <span>User</span>
            </Menu.Item>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Team</span>
                </span>
              }
            >
              <Menu.Item key="4">Team 1</Menu.Item>
              <Menu.Item key="5">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="6">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              { listBreadcrumb }
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              { children }
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(Layouts)