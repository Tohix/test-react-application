import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import {Provider} from 'react-redux';

import 'antd/dist/antd.min.css';

import WeatherForm from './WeatherForm';
import WeatherTabs from './WeatherTabs';

const { Header, Footer, Content } = Layout;

const styles = {
    menu: {
        lineHeight: '64px'
    },
    content: {
        padding: '0 50px'
    },
    block: {
        background: '#fff',
        padding: 24,
        minHeight: 280
    },
    footerText: {
        textAlign: 'center'
    }
}

export default class RootComponent extends Component {

    /**
     * Render
     * @returns {XML}
     */
    render() {
        return (
            <div>
                <Layout>
                    <Header>
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            style={styles.menu}
                        >
                            <Menu.Item key="1">Home</Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={styles.content}>
                        <div style={styles.block}>
                            <WeatherForm />
                            <WeatherTabs />
                        </div>
                    </Content>
                    <Footer style={styles.footerText}>
                        Test ©2018 Footer
                    </Footer>
                </Layout>
            </div>
        );
    }

}