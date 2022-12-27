import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../store/Context";
import {Card, Row, Col} from "react-bootstrap";

const BrandBar = observer(() => {
    const {device} = useContext(Context)

    return (
        <Row>
            <Col className={'d-flex flex-row flex-wrap justify-content-start gap-2'}>
                {
                    device.brands.map(brand =>
                        <Card
                            key={brand.id}
                            className={`p-3 w-auto td-300 c-pointer hover 
                                ${brand.id === device.selectedBrand.id ? 'active' : ''}
                            `}
                            onClick={() => device.setSelectedBrand(brand)}
                        >
                            {brand.name}
                        </Card>
                    )
                }
            </Col>
        </Row>
    );
})

export default BrandBar;