import React, {useState, useEffect} from 'react'
import {useChatContext} from 'stream-chat-react'

import {SearchIcon} from '../assets'

const ChannelSearch = () => {
    const [searchText, changeText] = useState("");
    const [loading, setLoading] = useState(false);

    const onType = (e) => {
        e.preventDefault();

        setLoading(true);
        changeText(e.target.value)

        getChannelList(e.target.value)
    }

    const getChannelList = async (e) => {
        try {
            // TODO: Fetch Channels
        } catch (error) {
            changeText('')
        }
    }


    return (
        <div className="channel-search__container">
            <div className="channel-search__input__wrapper">
                <div className="channel-search__input__icon" >
                    <SearchIcon/>
                </div>
                <input 
                    className="channel-search__input__text"
                    placeholder="Search Channel"
                    type="text"
                    value={searchText}
                    onChange={onType}
                />
            </div>
            
        </div>
    )
}

export default ChannelSearch
