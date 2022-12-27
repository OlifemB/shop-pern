import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row, Table} from "react-bootstrap";
import {Context} from "../../../store/Context";
import {createDevice, fetchBrands, fetchDevices, fetchTypes} from "../../../http/deviceAPI";
import {observer} from "mobx-react-lite";

const CreateDevice = observer(({children, show, onHide}) => {
    const {device} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', String(price))
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header>
                <Modal.Title>
                    Add Device
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className={'d-flex flex-column gap-1'}>
                <Form>
                    <Form.Control
                        value={name}
                        placeholder={'Enter device name...'}
                        onChange={(e) => setName(e.target.value)}
                        className={'my-2'}
                    />
                    <Form.Control
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        type={'number'}
                        placeholder={'Price...'}
                        className={'my-2'}
                    />

                    <div className={'d-flex gap-2 my-2'}>
                        <Dropdown>
                            <Dropdown.Toggle>{device.selectedType.name || 'Select type'}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    device.types.map(type =>
                                        <Dropdown.Item
                                            onClick={() => device.setSelectedType(type)}
                                            key={type.id}
                                        >
                                            {type.name}
                                        </Dropdown.Item>
                                    )
                                }
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown>
                            <Dropdown.Toggle>{device.selectedBrand.name || 'Select brand'}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    device.brands.map(brand =>
                                        <Dropdown.Item
                                            key={brand.id}
                                            onClick={() => device.setSelectedBrand(brand)}
                                        >
                                            {brand.name}
                                        </Dropdown.Item>
                                    )
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <Form.Control
                        type={'file'}
                        plceholder={"File"}
                        onChange={selectFile}
                    />

                    <hr/>

                    <Button variant={'outline-dark'}
                            onClick={addInfo}
                    >
                        Add property
                    </Button>

                    {info.map(i =>
                        <Row className={'mt-2'} key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    placeholder={"Title"}
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                />
                            </Col>

                            <Col md={6}>
                                <Form.Control
                                    placeholder={"Description"}
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                />
                            </Col>

                            <Col md={2}>
                                <Button
                                    variant={'outline-danger'}
                                    className={'w-100'}
                                    onClick={() => removeInfo(i.number)}
                                >
                                    X
                                </Button>
                            </Col>
                        </Row>
                    )}

                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Close</Button>
                <Button variant={'outline-success'} onClick={addDevice}>Add device</Button>
            </Modal.Footer>

        </Modal>
    );
})

export default CreateDevice;