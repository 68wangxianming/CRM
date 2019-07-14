import * as React from "react";
import YdStore from "../../models/index";
import {observer} from "mobx-react-lite";
import {NavLink} from "react-router-dom";
import {HomeRoutes} from "../../routes";
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const {useContext} = React;

const layout = observer(() => {
    const ydstore = useContext(YdStore);
    const token = ydstore.token;

    return (
        <>
            <div className='container'>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider collapsible>
                        <div className="logo" />
                        <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['2']} mode="inline" theme="dark">
                            <Menu.Item key="1"><NavLink to="/home"><Icon type="pie-chart"/>概括</NavLink></Menu.Item>
                            <SubMenu key="2" title={<span><Icon type="mail"/><span>经纪人管路</span></span>}>
                                <Menu.Item key="3"><NavLink to="/other">经纪人查询</NavLink></Menu.Item>
                                <Menu.Item key="4"><NavLink to="/home/index">经纪人认证</NavLink></Menu.Item>
                                <Menu.Item key="5"><NavLink to="/home/demo">经纪人等级</NavLink></Menu.Item>
                                <Menu.Item key="6"><NavLink to="/home/demo1">评价管理</NavLink></Menu.Item>
                            </SubMenu>
                            <SubMenu key="7" title={<span><Icon type="appstore"/><span>贷款人管理</span></span>}>
                                <Menu.Item key="9">贷款人查询</Menu.Item>
                                <SubMenu key="10" title="贷款意向">
                                    <Menu.Item key="11">详情</Menu.Item>
                                </SubMenu>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }} />
                        <Content style={{ margin: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>User</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                            </Breadcrumb>
                            <div style={{ padding: 24, background: '#fff', minHeight: 500 }}>
                                {HomeRoutes(token)}
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
            </div>
        </>
    )
});

export default layout;
