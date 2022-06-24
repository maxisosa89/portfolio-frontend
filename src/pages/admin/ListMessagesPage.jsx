import React, { useEffect, useState } from "react";
import axios from "axios";
import MessagesCard from "../../components/admin/MessagesCardAdmin";
import Spinner from "../../components/Spinner";

export default function ListMessagesPage () {
    const [messages, setMessages] = useState();
    const [loading, setLoading] = useState(true);
    const getAllMessages = async () => {
        const allM = await axios.get('http://localhost:3001/messages');
        setMessages(allM.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        setLoading(false);
    };
    useEffect(() => {
        getAllMessages();
    }, []);
    return (
        <div className="container mx-auto bg-tertiary pt-24">
            {
                loading ?
                <div className="fixed top-1/2 left-1/2 p-5 transform -translate-x-1/2 -translate-y-1/2">
                    <Spinner />
                </div> :
                messages?.map(m => (
                    <div key={m.id} className="my-5 mx-0 md:mx-5">
                        <MessagesCard message={m} />
                    </div>
                ))
            }
        </div>
    )
}