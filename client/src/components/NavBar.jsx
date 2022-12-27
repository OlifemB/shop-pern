import React, {useContext} from 'react';
import {Context} from "../store/Context";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useHistory} from "react-router-dom";
import {BASKET_ROUTE, HOME_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {navItems, navItemsAuth} from "../data";
import {ReactSVG} from "react-svg";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" variant="dark" expand="sm">
            <Container>
                <NavLink to={SHOP_ROUTE}>
                    <ReactSVG src={'logo.svg'} style={{width: '120px', height: "auto"}}/>
                </NavLink>

                <Nav className="flex-fill mx-2 justify-content-center">
                    {
                        navItems.map(item => (
                            <Nav.Link
                                key={item.link}
                                className={'nav-link c-pointer'}
                                onClick={() => history.push(item.link)}
                            >
                                {item.title}
                            </Nav.Link>
                        ))
                    }
                </Nav>

                {user.isAuth
                    ? <>

                        <Button variant={'outline-light'} className={'nav-item'} onClick={logOut}>
                            Log Out
                        </Button>
                    </>
                    :
                    <Button variant={'primary'} className={'nav-item'} onClick={() => history.push(LOGIN_ROUTE)}>
                        Authorize
                    </Button>
                }
            </Container>
        </Navbar>
    );
})

export default NavBar;