import React, {useContext, useState} from 'react';
import Layout from "../components/Layout";
import {Button, Card, Form, Row} from "react-bootstrap";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../store/Context";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handlerClick = async () => {
        let data;
        try {
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setUser(user)
            user.setIsAuth(true)
            history.push(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Layout>
            <div className={'container d-flex align-items-center justify-content-center'}
                 style={{height: window.innerHeight - 56}}>
                <Card className={'p-5'}>
                    <Form className={'d-flex flex-column'}>
                        <h3 className={'m-auto'}>{isLogin ? 'Authorize' : 'Registration'}</h3>

                        <Form.Control
                            className={'mt-3'}
                            placeholder={"Login..."}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Form.Control
                            className={'mt-3'}
                            placeholder={"Password..."}
                            type={'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Row
                            className={'d-flex flex-md-nowrap flex-sm-wrap justify-content-between align-items-end px-2'}>
                            {isLogin
                                ?
                                <div className={'w-auto'}>
                                    Don't have an account? <NavLink to={REGISTRATION_ROUTE}>Registration</NavLink>
                                </div>
                                :
                                <div className={'w-auto'}>
                                    Have an account? <NavLink to={LOGIN_ROUTE}>Login</NavLink>
                                </div>

                            }
                            <Button
                                onClick={handlerClick}
                                className={'mt-3 w-auto px-sm-5 px-1'}
                                variant={"outline-success"}
                            >
                                {isLogin ? 'Enter' : 'Registration'}
                            </Button>
                        </Row>
                    </Form>
                </Card>
            </div>
        </Layout>
    );
})

export default Auth;