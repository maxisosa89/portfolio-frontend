import React, { useEffect, useState } from "react";
import axios from "axios";
import MessagesCard from "../../components/admin/MessagesCardAdmin";
import Spinner from "../../components/Spinner";

export default function ListMessagesPage() {
  const token = localStorage.getItem("tokenPortfolioMS");
  const [messages, setMessages] = useState();
  const [messagesDisplay, setMessagesDisplay] = useState();
  const [idDelete, setIdDelete] = useState();
  const [loading, setLoading] = useState(true);
  const getAllMessages = async () => {
    const allM = await axios.get('http://localhost:3001/messages', { headers: { Authorization: token } });
    setMessages(allM.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    setLoading(false);
  };
  async function handleRead(e) {
    e.preventDefault();
    await axios.put(`http://localhost:3001/messages/${e.target.id}`, {}, { headers: { Authorization: token } })
    getAllMessages();
  };
  async function handleDelete(e) {
    e.preventDefault();
    if (e.target.id !== "noDelete") {
      setLoading(true);
      await axios.delete(`http://localhost:3001/messages/${e.target.id}`, { headers: { Authorization: token } });
      getAllMessages();
    } else {
      document.getElementById("modalDelete")?.classList.add("hidden");
      const blurDiv = document.getElementsByName("containerCardMessageList");
      blurDiv.forEach(b => {
        b.classList.toggle("blur-sm");
      });
      const btnsCards = document.getElementsByName("btnProjectCardAdmin");
      btnsCards.forEach(b => {
        b.removeAttribute("disabled");
        b.classList.toggle("hover:bg-transparent");
        b.classList.toggle("cursor-pointer");
      });
    }
    setIdDelete("");
  };
  function handleModal(e) {
    e.preventDefault();
    document.getElementById("modalDelete")?.classList.remove("hidden");
    const blurDiv = document.getElementsByName("containerCardMessageList");
    blurDiv.forEach(b => {
      b.classList.toggle("blur-sm");
    });
    const btnsCards = document.getElementsByName("btnProjectCardAdmin");
    btnsCards.forEach(b => {
      b.setAttribute("disabled", "");
      b.classList.toggle("hover:bg-transparent");
      b.classList.toggle("cursor-pointer");
    });
  };
  function handleFilter(e) {
    e.preventDefault();
    e.target.id === "allMessages" ?
      setMessagesDisplay({
        option: "all",
        data: messages
      }) :
      setMessagesDisplay({
        option: "unread",
        data: messages.filter(m => !m.read)
      })
  };
  useEffect(() => {
    getAllMessages();
  }, []);
  useEffect(() => {
    if (messagesDisplay?.option === "unread"){
      setMessagesDisplay({
        option: "unread",
        data: messages.filter(m => !m.read)
      })
    } else {
      setMessagesDisplay({
        option: "all",
        data: messages
      })
    };
  }, [messages]);
  return (
    <div className="container mx-auto bg-tertiary pt-24">
      {
        loading ?
          <div className="fixed top-1/2 left-1/2 p-5 transform -translate-x-1/2 -translate-y-1/2">
            <Spinner />
          </div> :
          <div>
            <div className="flex justify-center">
              <button
                id="allMessages"
                onClick={handleFilter}
                className={`border border-white bg-secondary hover:bg-tertiary text-white py-2 px-4 m-1 rounded-full ${messagesDisplay.option === "all" && "font-semibold"}`}
              >
                Todos ({messages.length})
              </button>
              <button
                id="unreadMessages"
                onClick={handleFilter}
                className={`border border-white bg-secondary hover:bg-tertiary text-white py-2 px-4 m-1 rounded-full ${messagesDisplay.option === "unread" && "font-semibold"}`}
              >
                No Leídos ({messages.filter(m => !m.read).length})
              </button>
            </div>
            {
              messagesDisplay?.data?.map(m => (
                <div key={m.id} className="my-5 mx-0 md:mx-5">
                  <MessagesCard
                    message={m}
                    idDelete={idDelete}
                    setIdDelete={setIdDelete}
                    handleRead={handleRead}
                    handleDelete={handleDelete}
                    handleModal={handleModal} />
                </div>
              ))
            }
          </div>
      }
    </div>
  )
}