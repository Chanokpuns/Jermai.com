
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbaruser from "../components/Navbaruser";
import "./chat.css";

function ChatPage() {
  const navigate = useNavigate();

  // ข้อมูลผู้ติดต่อและข้อความตัวอย่าง
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "John",
      messages: [
        { id: 1, text: "สวัสดีค่ะ", sender: "other", time: "15:52" },
        { id: 2, text: "สวัสดีค่ะ เจอของที่นี่", sender: "me", time: "15:53" },
      ],
    },
    {
      id: 2,
      name: "Tangmo",
      messages: [
        { id: 1, text: "สอบถามเรื่องกระเป๋าที่ประกาศไว้ค่ะ", sender: "other", time: "16:10" },
      ],
    },
    {
      id: 3,
      name: "John",
      messages: [
        { id: 1, text: "ยังตามหากุญแจอยู่ไหมครับ", sender: "other", time: "17:20" },
      ],
    },
    {
      id: 4,
      name: "Tangmo",
      messages: [
        { id: 1, text: "ขอบคุณสำหรับข้อมูลนะคะ", sender: "other", time: "18:00" },
      ],
    },
  ]);

  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [message, setMessage] = useState("");

  // ส่งข้อความตัวอย่าง
  const handleSend = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      sender: "me",
      time: new Date().toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === selectedContact.id
          ? {
              ...contact,
              messages: [...contact.messages, newMessage],
            }
          : contact
      )
    );

    setSelectedContact((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));

    setMessage("");
  };

  return (
    <div className="chat-page">

      {/* Header */}
      <header className="create-post-header">
        <div className="create-post-brand">
          <h1>เจอมั้ย.com</h1>
          <button
            className="back-button"
            onClick={() => navigate(-1)}
          >
            ← กลับ
          </button>
        </div>

        <div className="create-post-navbar">
          <Navbaruser />
        </div>
      </header>

      {/* Chat */}
      <main className="chat-container">

        {/* รายชื่อผู้ติดต่อ */}
        <aside className="chat-sidebar">

          <div className="chat-sidebar-header">
            <h2>ข้อความ</h2>
          </div>

          <div className="contact-list">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                className={`contact-item ${
                  selectedContact.id === contact.id ? "selected" : ""
                }`}
                onClick={() => setSelectedContact(contact)}
              >
                <div className="chat-avatar">
                  {contact.name.charAt(0)}
                </div>

                <div className="contact-info">
                  <h3>{contact.name}</h3>
                  <p>
                    {contact.messages[contact.messages.length - 1]?.text}
                  </p>
                </div>
              </button>
            ))}
          </div>

        </aside>

        {/* พื้นที่สนทนา */}
        <section className="chat-conversation">

          <div className="conversation-header">
            <div className="chat-avatar">
              {selectedContact.name.charAt(0)}
            </div>
            <h3>{selectedContact.name}</h3>
          </div>

          <div className="message-list">
            {selectedContact.messages.map((msg) => (
              <div
                key={msg.id}
                className={`message-row ${
                  msg.sender === "me" ? "my-message" : "other-message"
                }`}
              >
                <div className="message-bubble">
                  <p>{msg.text}</p>
                  <span>{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ช่องพิมพ์ข้อความ */}
          <form className="chat-composer" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="พิมพ์ข้อความ..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button type="submit">ส่ง</button>
          </form>

        </section>

      </main>
    </div>
  );
}

export default ChatPage;
