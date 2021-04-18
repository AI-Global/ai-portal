import React, { useState } from 'react';
import CommentsList from './CommentsList';
import { Card, Avatar, Row, Col, Statistic } from '../ant';
import { EditOutlined, EllipsisOutlined, SettingOutlined, CommentOutlined } from '@ant-design/icons';
import Upvote from './Upvote';


export default function DiscussionCard({ }) {
    // actions={[
    //     <SettingOutlined key="setting" />,
    //     <EditOutlined key="edit" />,
    //     <EllipsisOutlined key="ellipsis" />,
    // ]}
    return (
        <div className="resource-box">
            <Card
                hoverable
                style={{ width: 965 }}
            >
                <Card.Meta
                    title="Ethical Implications of AI"
                    description={
                        <div>
                            <p>Written by User 1337, Tags: Media, Retail, Other</p>
                            <p>Optimizing logistics, detecting fraud, composing art, conducting research, providing translations: intelligent machine systems are transforming our lives for the better. As these systems become more capable, our world becomes more efficient and consequently richer.</p>
                        </div>
                    }
                />
                <div>
                    <Row gutter={[24, 4]}>
                        <Col align="center" style={{ padding: '14px 0 0 14px' }}>
                            <Upvote size={20} /*userUpvoted={ } onClick={ }*/ />
                            <Statistic value={5} valueStyle={{ fontSize: 20 }} />
                        </Col>
                        <Col align="center" style={{ padding: '14px 0 0 14px' }}>
                            <CommentOutlined style={{ fontSize: 20 }}></CommentOutlined>
                            <Statistic value={5} valueStyle={{ fontSize: 20 }} />
                        </Col>
                        <Col align="center" style={{ padding: '14px 0 0 14px' }}>
                            <br></br>
                            <p>Last updated 10s ago</p>
                        </Col>
                    </Row>
                </div>
            </Card>
        </div>
    );
}

// style for col is style {{padding: 'up right down left'}}

