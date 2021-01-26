import React from "react";

import { ListGroup, Row, Col } from "react-bootstrap";

interface TrackInfoItemProps {
    label: string,

    value: any,
}

export const TrackInfoItem : React.FC<TrackInfoItemProps> = ({label, value}) => {
    return (
        <ListGroup.Item style={{paddingTop: "40px", paddingBottom: "40px"}}>
                <Row>
                    <Col md={6} className="text-left">
                        <span className="thicc gray">
                            {label}
                        </span>
                    </Col>

                    <Col md={6} className="text-right">
                        <span className="bold blue">
                            {value}
                        </span>
                    </Col>
                </Row>
        </ListGroup.Item>
    );
}