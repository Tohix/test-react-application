import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { addLocation} from '../actions/weather';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class WeatherFormComponent extends React.Component {

    /**
     * Component Did mount
     */
    componentDidMount() {
        this.props.form.validateFields();
    }

    /**
     * Handle Submit
     * @param e
     */
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.addLocation(values.location);
            }
        });

        this.props.form.resetFields();
    }

    /**
     * Render
     * @returns {XML}
     */
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        const userNameError = isFieldTouched('location') && getFieldError('location');
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <FormItem
                    validateStatus={userNameError ? 'error' : ''}
                    help={userNameError || ''}>

                    {getFieldDecorator('location', {
                        rules: [{ required: true, message: 'Please input your location' }],
                    })(
                        <Input prefix={<Icon type="location" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Location" />
                    )}

                </FormItem>

                <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                    >
                        Add Location
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const WeatherForm = Form.create()(WeatherFormComponent);

const mapStateToProps = state => ({
    weather: state.getIn(['weather']),
})

export default connect(mapStateToProps, {addLocation})(WeatherForm)
