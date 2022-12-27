import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../store/Context";
import {Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => {
    const {device} = useContext(Context)

    console.log(device.devices)

    return (
        <Row className={'d-flex mt-2'}>
            {
                device.devices.map(item =>
                    <DeviceItem
                        key={item.id}
                        device={item}
                        brand={() => (device.brands.find(item.id))}
                    />
                )
            }
        </Row>
    );
})

export default DeviceList;