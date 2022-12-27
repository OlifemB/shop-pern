import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import {ReactSVG} from "react-svg";
import {useHistory} from "react-router-dom";
import {DEVICE_ROUTE} from "../utils/consts";

const DeviceItem = ({device, brand}) => {
    const history = useHistory()

    return (
        <Col xs={12} sm={6} md={6} lg={4} xl={3}
             className={' my-2'}
             onClick={() =>( history.push(`${DEVICE_ROUTE}/${device.id}`))}>
            <Card className={'c-pointer '}>
                {/*<ReactSVG src={'noImage.svg'}/>*/}
                <Card.Img width={"100%"} height={'auto'} src={process.env.REACT_APP_API_URL+ device.img}/>
                <Card.Body>
                    <div className={'d-flex justify-content-between'}>
                        <div className={'text-black-50'}>
                            {device.brandId}
                        </div>
                        <div>
                            {device.rating}
                        </div>
                    </div>
                    <Card.Title>{device.name}</Card.Title>

                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default DeviceItem;