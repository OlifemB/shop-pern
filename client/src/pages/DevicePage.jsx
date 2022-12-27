import React, {useContext, useEffect, useState} from 'react';
import Layout from "../components/Layout";
import {Button, Col, Container, Image, Row, Table} from "react-bootstrap";
import {ReactSVG} from "react-svg";
import {useHistory, useParams} from "react-router-dom";
import {Context} from "../store/Context";
import {fetchOneDevice} from "../http/deviceAPI";

const DevicePage = () => {
    const {id} = useParams()

    const [device, setDevice] = useState({info: []})
    console.log(device)

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])
    return (
        <Layout>
            <Container className={'mt-3'}>
                <Row>
                    <Col md={4}>
                        <h2>{device.name}</h2>
                        {/*<ReactSVG src={'noImage.svg'}/>*/}
                        <Image src={process.env.REACT_APP_API_URL + device.img} className={'w-100'}/>
                        <div>{device.rating}</div>
                    </Col>
                    <Col md={8} className={'d-flex align-items-center justify-content-center flex-column'}>
                        <div><h3>{device.price} $</h3></div>
                        <Button variant={'outline-dark'}>Add to Cart</Button>
                    </Col>
                </Row>

                <Row>
                    <h1>Характеристики</h1>
                    {device.info.map((info, index) =>
                        <Row key={info.id}
                             style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                            {info.title}: {info.description}
                        </Row>
                    )}
                </Row>
            </Container>
        </Layout>
    );
};

export default DevicePage;