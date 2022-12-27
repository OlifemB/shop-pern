import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import Layout from "../components/Layout";
import CreateType from "../components/UI/modal/CreateType";
import CreateBrand from "../components/UI/modal/CreateBrand";
import CreateDevice from "../components/UI/modal/CreateDevice";

const Admin = () => {
    const [typeVisible, setTypeVisible] = useState(false)
    const [brandVisible, setBrandVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    return (
        <Layout>
            <Container>
                <Button variant={"outline-dark"} className={'mt-1'} onClick={() => setTypeVisible(true)}>Add Type</Button>
                <Button variant={"outline-dark"} className={'mt-1'} onClick={() => setBrandVisible(true)}>Add Brand</Button>
                <Button variant={"outline-dark"} className={'mt-1'} onClick={() => setDeviceVisible(true)}>Add Device</Button>
            </Container>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
        </Layout>
    );
};

export default Admin;