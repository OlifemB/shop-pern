import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createBrand} from "../../../http/deviceAPI";

const CreateBrand = ({children, show, onHide}) => {
    const [value, setValue] = useState('')

    const addBrand = () => {
        createBrand({name: value}).then(data => {
            setValue('')
            onHide()
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Add Brand
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Control
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    placeholder={'Brand name'}
                />
            </Modal.Body>

            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Close</Button>
                <Button variant={'outline-success'} onClick={addBrand}>Add</Button>
            </Modal.Footer>

        </Modal>
    );
}

export default CreateBrand;