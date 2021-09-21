import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Button, Card, Row, Col, Statistic, Tag, notification } from '../ant';
import { CommentOutlined } from '@ant-design/icons';
import Upvote from './Upvote';
import { useAppEnv } from './../env';


// WIP
// discussion prop should be a discussion object, similar to resource in ResourceCard.js
// add onClick to Card, should take you to discussion forum page
// once discussion card page is made, remove all instances of discussion and replace with discussion prop
// fix toggleUpvote once discussion posts are put in mongo
export default function DiscussionCard({ discussion }) {
    let { api, user } = useAppEnv();
    let [upvoted, setUpvoted] = useState(false);
    let [upvotes, setUpvotes] = useState(discussion.upvotes);
    let [userName, setUserName] = useState("");

    let requestUserName = async () => {
        let fetchedUserName = "";
        let responseUser = await api.get('/api/users/' + discussion.user);
        if (responseUser != null) {
            if (responseUser.status === 200) {
                fetchedUserName = responseUser.name;
            }
        }
        return fetchedUserName;
    }

    let fetchUserName = async () => {
        let fetchedUserName = await requestUserName();
        setUserName(fetchedUserName);
    };

    useEffect(() => {
        fetchUserName();
    }, [discussion]);

    useLayoutEffect(() => {
        setUpvoted(user?.upvotedDiscussions.includes(discussion._id));
    }, [api, user]);

    const toggleUpvote = async () => {
        let res = await api.post('/api/users/' + user?._id + '/upvote-discussion', {
            discussionId: discussion._id,
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
                style={{ width: 900 }}
                title={
                  <button
                    className="discussion-button"
                    >
                  {discussion.header}
                  </button>
                }
                onClick={() => {
                  window.location.href='/discussion/' + discussion._id}
                }
            >
                <Card.Meta
                    description={
                        <b>Written by {userName}</b>
                    }
                ></Card.Meta>
                <Card.Meta description={
                    <p>{discussion.text}</p>
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
                            <Statistic value={discussion.comments.length} valueStyle={{ fontSize: 15 }} />
                        </Col>
                        <Col align="center" style={{ padding: '14px 0 0 14px' }}>
                            <b>Last updated on {getFormattedDate(new Date(discussion.lastUpdated))}</b>
                        </Col>
                    </Row>
                </div>
            </Card>
        </div >
    );
}

// style for col is style {{padding: 'up right down left'}}

