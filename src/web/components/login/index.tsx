import "./index.css";
import * as React from "react";
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import {withRouter} from 'react-router-dom'

const {useState, useContext} = React;
import YdStore from "../../models/index";

const Login = (routerProps: any) => {
    const {location, history} = routerProps;
    const RedirectUrl = location.state ? location.state.from.pathname : "/demo";
    const ydstore = useContext(YdStore);

    const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (Username == '') {
            setShowName(true)
        }
        if (Password == '') {
            setShowPass(true)
        }
        if (Username && Password) {
            history.push(RedirectUrl);
            ydstore.token = localStorage["token"] = Math.random().toString();
            console.log(ydstore.token);
        }
    };

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [ShowName, setShowName] = useState(false);
    const [ShowPass, setShowPass] = useState(false);


    return <div className="container">
        <section>
            <span>token:{ydstore.token}</span>
            <h4 className="test">欢迎登陆后台管理系统！</h4>
            <Form onSubmit={e => {
                handleSubmit(e)
            }} className="login-form">
                <Input className='inputValue'
                       prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                       placeholder="Username" value={Username}
                       onChange={(e) => {
                           setUsername(e.target.value);
                           if (e.target.value) setShowName(false)
                       }}
                />
                {ShowName ? <span className='error'>Please input your username!</span> : ''}


                <Input className='inputValue'
                       prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                       type="password" placeholder="Password" value={Password}
                       onChange={(e) => {
                           setPassword(e.target.value);
                           if (e.target.value) setShowPass(false)
                       }}
                />

                {ShowPass ? <span className='error'>Please input your Password!</span> : ''}
                <Form.Item>
                    <Checkbox>Remember me</Checkbox>
                    <a className="login-form-forgot" href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                    <a href="">register now!</a>
                </Form.Item>
            </Form>
        </section>
    </div>
};
export default withRouter(Login);
