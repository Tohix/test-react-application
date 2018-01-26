import React, { Component } from 'react';
import { Tabs, Button, List } from 'antd';
import { connect } from 'react-redux';
import { removeWeatherTab, selectActiveTab} from '../actions/weather';
import _ from 'lodash';

const TabPane = Tabs.TabPane;

const styles = {
    textCapitalize: {
        textTransform: 'capitalize'
    }
}

class WeatherTabs extends React.Component {

    /**
     * Component Did Mount
     */
    componentDidMount() {
        let tabData = _.find(this.props.weather.items, {key: this.props.weather.activeTab});
        if (tabData) {
            this.props.selectActiveTab(this.props.weather.activeTab, tabData.title);
        }
    }
    /**
     * On Change
     * @param activeKey
     */
    onChange = (activeKey) => {
        let tabData = _.find(this.props.weather.items, {key: activeKey});
        if (tabData) {
            this.props.selectActiveTab(activeKey, tabData.title);
        }
    }

    /**
     * On Edit
     * @param targetKey
     * @param action
     */
    onEdit = (targetKey, action) => {
        if (action === 'remove') {
            this.remove(targetKey);
        }
    }

    /**
     * Remove
     * @param targetKey
     */
    remove = (targetKey) => {
        this.props.removeWeatherTab(targetKey);
    }

    /**
     * Render
     * @returns {XML}
     */
    render() {
        return (
            <div>
                <Tabs
                    hideAdd
                    onChange={this.onChange}
                    activeKey={this.props.weather.activeTab}
                    type="editable-card"
                    onEdit={this.onEdit}
                >
                    {this.props.weather.items.map(pane => <TabPane tab={pane.title} key={pane.key}>
                        <List
                            header={<div style={styles.textCapitalize}><strong>Weather for {pane.title}</strong></div>}
                            bordered
                            dataSource={pane.content}
                            renderItem={item => (<List.Item style={styles.textCapitalize}>{item}</List.Item>)}
                        />
                    </TabPane>)}
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        weather: state.get('weather').toJS(),
    }
}

export default connect(mapStateToProps, {removeWeatherTab, selectActiveTab})(WeatherTabs)