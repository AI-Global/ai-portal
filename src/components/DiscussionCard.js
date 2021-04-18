import React, { useState } from 'react';
import CommentsList from './CommentsList';
import { Card, Row, Col, Statistic, Tag } from '../ant';
import { EditOutlined, EllipsisOutlined, SettingOutlined, CommentOutlined } from '@ant-design/icons';
import Upvote from './Upvote';


export default function DiscussionCard({ }) {
    // actions={[
    //     <SettingOutlined key="setting" />,
    //     <EditOutlined key="edit" />,
    //     <EllipsisOutlined key="ellipsis" />,
    // ]}
    let tags = ["Media", "Retail", "Other"]
    return (
        <div className="resource-box">
            <Card
                hoverable
                style={{ width: 965 }}
                title={
                    <>
                        <Row gutter={[24, 4]}>
                            <Col align="center" style={{ padding: '14px 0 0 14px' }}>
                                <b>Ethical Implications of AI</b>
                            </Col>
                            <Col align="center" style={{ padding: '14px 0 0 14px' }}>
                                {tags.map(t => (
                                    <Tag
                                        style={{
                                            color: 'white',
                                            fontWeight: 'bold',
                                            align: "left"
                                        }}
                                        color={'#00CDFF'}
                                    >
                                        {t.toUpperCase()}
                                    </Tag>
                                ))}
                            </Col>
                        </Row>
                    </>
                }
            >
                <Card.Meta
                    description={<b>Written by User 1337</b>}
                ></Card.Meta>
                <Card.Meta description={<p>Optimizing logistics, detecting fraud, composing art, conducting research, providing translations: intelligent machine systems are transforming our lives for the better. As these systems become more capable, our world becomes more efficient and consequently richer.</p>}></Card.Meta>
                <div>
                    <Row gutter={[24, 4]}>
                        <Col align="center" style={{ padding: '14px 0 0 14px' }}>
                            <Upvote size={15} /*userUpvoted={ } onClick={ }*/ />
                        </Col>
                        <Col align="center" style={{ padding: '14px 0 0 3px' }}>
                            <Statistic value={5} valueStyle={{ fontSize: 15 }} />
                        </Col>
                        <Col align="center" style={{ padding: '14px 0 0 14px' }}>
                            <CommentOutlined style={{ fontSize: 15 }}></CommentOutlined>
                        </Col>
                        <Col align="center" style={{ padding: '14px 0 0 3px' }}>
                            <Statistic value={5} valueStyle={{ fontSize: 15 }} />
                        </Col>
                        <Col align="center" style={{ padding: '14px 0 0 14px' }}>
                            <b>Last updated 10s ago</b>
                        </Col>
                    </Row>
                </div>
            </Card>
        </div >
    );
}

// style for col is style {{padding: 'up right down left'}}

