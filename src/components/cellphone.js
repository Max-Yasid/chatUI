import React from 'react';
import './cellphone.css';
import styled, { css } from 'styled-components';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import SimpleBarReact from "simplebar-react";
import "simplebar/src/simplebar.css";

import avatar from './../assets/images/avatar.jpg';
import dog1 from './../assets/images/dog-image-1.jpg';
import dog2 from './../assets/images/dog-image-2.jpg';
import dog3 from './../assets/images/dog-image-3.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Message = styled.p`
    font-size: 9px;
    background-color: white;
    max-width: 68%;
    padding: 5px 7.5px;
    margin: 0;
    color: hsl(271, 15%, 43%);
    border-radius: 10px 10px 5px 10px;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, .08);
    font-family: var(--main-font);
    ${ props => props.isMessageFromAnotherPerson && css`
        background-color: hsl(0, 0%, 90%);
        color: hsl(276, 55%, 52%);
        border-radius: 10px 10px 10px 5px;
        box-shadow: none;
    `}
    ${props => props.isMessageAnImage && css`
        background-color: transparent;
        display: flex;
        padding: 0 0 0 8px;
        gap: 0 10px;
        box-shadow: none;
    `}
    ${ props => props.isMesageSpecial && css`
        width: 72%;
        max-width: 72%;
        color: hsl(0, 0%, 85%);
        background-color: none;
        padding: 8.5px 11px;
        background-image: linear-gradient(to right, var(--main-color-2), var(--main-color-1));
        box-shadow: none;
    `}
    ${ props => props.biggerFont && css`
        font-size: 11px;
    `}
`;

export default React.memo(function Cellphone({ socket }){
    const [userMessage, setUserMessage] = useState("");
    const [messagesList, updateMessageList] = useState([]);
    let simpleBarRef = useRef();

    useEffect(() => {
        simpleBarRef.current.contentWrapperEl.scrollTop = simpleBarRef.current.contentEl.scrollHeight;
    });
    
    const getUserMessage = (e) => {
        setUserMessage(e.target.value);
    }
    
    const sendMessageHandler = (e) => {
        e.preventDefault();
        if(!userMessage)
            return;
        socket.emit('chat message', userMessage);
        updateMessageList([...messagesList, { userMessage, isMessageFromMe: true }]);
        setUserMessage("");
    }
    socket.on('chat message', (msg) => {
        updateMessageList([...messagesList, { userMessage: msg, isMessageFromMe: false }]);
    });
    return (
        <div className="cellphone">
            <div className="cellphone__background">
                <header className="cellphone__header">
                    <div className="cellphone__top-bar"></div>
                    <div className="cellphone__header-content">
                        <div className="cellphone__back">
                            <FontAwesomeIcon icon={faChevronLeft} className="header-icon"/>
                        </div>
                        <div className="cellphone__user-info">
                            <div className="cellphone__photo-side">
                                <div className="cellphone__photo-container">
                                    <img src={avatar} width={23} height={23} alt="" className="cellphone__photo" />
                                </div>
                            </div>
                            <div className="cellphone__user-info-text">
                                <p className="cellphone__username">Samuel Green</p>
                                <p className="cellphone__user-status">Available to walk</p>
                            </div>
                        </div>
                        <div className="cellphone__more">
                            <FontAwesomeIcon icon={faEllipsisV} className="header-icon"/>
                        </div>
                    </div>
                </header>
                <section className="cellphone__messages">
                    <SimpleBarReact ref={ simpleBarRef } style={{ maxHeight: "100%", padding: "1px 8px 0px 8px", margin: 0 }}>
                        <div className="cellphone__message-container">
                            <Message>
                                That sounds great. I’d be happy with that.
                            </Message>
                        </div>
                        <div className="cellphone__message-container">
                            <Message>
                                Could you send over some pictures of your dog, please?
                            </Message>
                        </div>
                        <div 
                            className="
                                cellphone__message-container 
                                cellphone__message-container--right 
                                cellphone__message-container--marginTop"
                        >
                            <Message isMessageFromAnotherPerson isMessageAnImage>
                                <img src={dog1} alt="dog" width={35} className="cellphone__photo" />
                                <img src={dog2} alt="dog" width={35} className="cellphone__photo" />
                                <img src={dog3} alt="dog" width={35} className="cellphone__photo" />
                            </Message>
                        </div>
                        <div className="cellphone__message-container cellphone__message-container--right">
                            <Message isMessageFromAnotherPerson>
                                Here are a few pictures. She’s a happy girl!    
                            </Message>
                        </div>
                        <div className="cellphone__message-container cellphone__message-container--right">
                            <Message isMessageFromAnotherPerson>
                                Can you make it?
                            </Message>
                        </div>
                        <div className="cellphone__message-container cellphone__message-container--marginTop">
                            <Message>
                                She looks so happy! The time we discussed works. How long shall I take her out for?
                            </Message>
                        </div>
                        <div className="cellphone__message-container">
                            <Message isMesageSpecial>
                                <label htmlFor="walk-price1" className="walk-price-label">
                                    <input id="walk-price1" type="radio" name="price" className="walk-price-label__input" />
                                    <span className="walk-price-label__checkmark"></span>
                                    <span className="walk-price-label__description"> 30 minute walk </span>
                                    <span className="walk-price-label__price">$29</span>
                                </label>
                            </Message>
                        </div>
                        <div className="cellphone__message-container">
                            <Message isMesageSpecial>
                                <label htmlFor="walk-price2" className="walk-price-label">
                                    <input id="walk-price2" type="radio" name="price" className="walk-price-label__input" />
                                    <span className="walk-price-label__checkmark"></span>
                                    <span className="walk-price-label__description"> 1 hour walk </span>
                                    <span className="walk-price-label__price">$49</span>
                                </label>
                            </Message>
                        </div>
                        {messagesList.map((message, i) => (
                            <div 
                                key={i} 
                                className={`
                                    cellphone__message-container
                                    ${message.isMessageFromMe ? "cellphone__message-container--right": ""}
                                `}
                            >
                                {message.isMessageFromMe ?
                                    <Message biggerFont>
                                        {message.userMessage}
                                    </Message> 
                                    :
                                    <Message isMessageFromAnotherPerson biggerFont>
                                        {message.userMessage}
                                    </Message> 
                                }
                            </div>
                        ))}
                    </SimpleBarReact>
                </section>
                <form className="cellphone__footer">
                    <div className="cellphone__send">
                        <div className="cellphone__input-container">
                            <input 
                                className="cellphone__input" 
                                onChange={getUserMessage}
                                type="text" 
                                placeholder="Type a message..."
                                value={userMessage}
                            />
                        </div>
                        <div className="cellphone__btnSend-container">
                            <button onClick={sendMessageHandler} className="cellphone__btnSend">
                                <FontAwesomeIcon icon={faAngleRight} className="header-icon"/>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
});