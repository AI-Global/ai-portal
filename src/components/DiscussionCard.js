import React, { useState, useLayoutEffect } from 'react';
import { Card, Row, Col, Statistic, Tag, notification } from '../ant';
import { CommentOutlined } from '@ant-design/icons';
import Upvote from './Upvote';
import { useAppEnv } from './../env';


// WIP
// discussion prop should be a discussion object, similar to resource in ResourceCard.js
// add onClick to Card, should take you to discussion forum page
// once discussion card page is made, remove all instances of sampleDiscussion and replace with discussion prop
// fix toggleUpvote once discussion posts are put in mongo
export default function DiscussionCard({ discussion }) {
    let sampleDiscussion = {
        _id: 1039,
        user: "stephen",
        header: "Ethical Implications of AI",
        text: "Optimizing logistics, detecting fraud, composing art, conducting research, providing translations: intelligent machine systems are transforming our lives for the better. As these systems become more capable, our world becomes more efficient and consequently richer.",
        comments: ["hello", "sup", "nice discussion!"],
        upvotes: 10,
        timestamp: Date.now(),
        lastUpdated: Date.now(),
        type: ["Media", "Retail", "Other"],
        path: null,
    }
    let { api, user } = useAppEnv();
    let [upvoted, setUpvoted] = useState(false);
    let [upvotes, setUpvotes] = useState(sampleDiscussion.upvotes);

    useLayoutEffect(() => {
        setUpvoted(user?.upvotedDiscussions.includes(sampleDiscussion._id));
    }, [api, user]);

    const toggleUpvote = async () => {
        let res = await api.post('/api/users/' + user?._id + '/upvote-discussion', {
            discussionId: sampleDiscussion._id,
        });

        if (res.status === 200) {
            if (upvoted) {
                setUpvotes(prevUpvotes => prevUpvotes - 1);
            } else {
                setUpvotes(prevUpvotes => prevUpvotes + 1);
            }

            setUpvoted(prevUpvoted => !prevUpvoted);
        }
    };

    const handleOnSubmit = async () => {
        notification.open({
            message: 'Open the discussion to read or add comments!',
        });
    };

    const getFormattedDate = date => {
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date
            .getDate()
            .toString()
            .padStart(2, '0');

        return month + '/' + day + '/' + year;
    };
    return (
        <div className="discussion-box">
            <Card
                hoverable
                style={{ width: 965 }}
                title={
                    <>
                        <Row gutter={[24, 4]}>
                            <Col align="center" style={{ padding: '14px 0 0 14px' }}>
                                <b>{sampleDiscussion.header}</b>
                            </Col>
                            <Col align="center" style={{ padding: '14px 0 0 14px' }}>
                                {sampleDiscussion.type.map(t => (
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
                    description={
                        <b>Written by {sampleDiscussion.user}</b>
                    }
                ></Card.Meta>
                <Card.Meta description={
                    <p>{sampleDiscussion.text}</p>
                }></Card.Meta>
                <div>
                    <Row gutter={[24, 4]}>
                        <Col align="center" style={{ padding: '14px 0 0 14px' }}>
                            <Upvote size={15} userUpvoted={upvoted} onClick={toggleUpvote} />
                        </Col>
                        <Col align="center" style={{ padding: '14px 0 0 3px' }}>
                            <Statistic value={upvotes} valueStyle={{ fontSize: 15 }} />
                        </Col>
                        <Col align="center" style={{ padding: '14px 0 0 14px' }}>
                            <CommentOutlined style={{ fontSize: 15 }} onClick={handleOnSubmit}></CommentOutlined>
                        </Col>
                        <Col align="center" style={{ padding: '14px 0 0 3px' }}>
                            <Statistic value={sampleDiscussion.comments.length} valueStyle={{ fontSize: 15 }} />
                        </Col>
                        <Col align="center" style={{ padding: '14px 0 0 14px' }}>
                            <b>Last updated on {getFormattedDate(new Date(sampleDiscussion.lastUpdated))}</b>
                        </Col>
                    </Row>
                </div>
            </Card>
        </div >
    );
}

// style for col is style {{padding: 'up right down left'}}

