
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbaruser from "../components/Navbaruser";
import { api, getUser } from "../services/api";
import "./chat.css";

function ChatPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const me = getUser();

  const [contacts, setContacts] = useState([]);
  const [selectedId, setSelectedId] = useState(location.state?.conversationId ?? null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const listEnd = useRef(null);

  const loadContacts = useCallback(async () => {
    try {
      const data = await api("/chat/conversations");
      setContacts(data);
      setSelectedId((cur) => cur ?? data[0]?.id ?? null);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const loadMessages = useCallback(async () => {
    if (!selectedId) return;
    try {
      setMessages(await api(`/chat/conversations/${selectedId}/messages`));
    } catch (err) {
      setError(err.message);
    }
  }, [selectedId]);

  useEffect(() => {
    loadContacts();
    const t = setInterval(loadContacts, 4000);
    return () => clearInterval(t);
  }, [loadContacts]);

  useEffect(() => {
    loadMessages();
    const t = setInterval(loadMessages, 4000);
    return () => clearInterval(t);
  }, [loadMessages]);

  useEffect(() => {
    listEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const selectedContact = contacts.find((c) => c.id === selectedId);

  const handleSend = async (e) => {
    e.preventDefault();
    const text = message.trim();
    if (!text || !selectedId) return;
    setMessage("");
    try {
      await api(`/chat/conversations/${selectedId}/messages`, {
        method: "POST",
        body: { text },
      });
      loadMessages();
      loadContacts();
    } catch (err) {
      setError(err.message);
    }
  };

  const timeOf = (iso) =>
    new Date(String(iso).replace(" ", "T")).toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
    });

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
            {contacts.length === 0 && <p style={{ padding: 16 }}>ยังไม่มีการสนทนา</p>}
            {contacts.map((contact) => (
              <button
                key={contact.id}
                className={`contact-item ${selectedId === contact.id ? "selected" : ""}`}
                onClick={() => setSelectedId(contact.id)}
              >
                <div className="chat-avatar">{contact.otherName.charAt(0)}</div>
                <div className="contact-info">
                  <h3>
                    {contact.otherName}
                    {contact.postName ? ` · ${contact.postName}` : ""}
                  </h3>
                  <p>{contact.lastMessage || "เริ่มการสนทนา"}</p>
                </div>
              </button>
            ))}
          </div>

        </aside>

        {/* พื้นที่สนทนา */}
        <section className="chat-conversation">

          <div className="conversation-header">
            <div className="chat-avatar">
              {selectedContact ? selectedContact.otherName.charAt(0) : "?"}
            </div>
            <h3>{selectedContact ? selectedContact.otherName : "เลือกการสนทนา"}</h3>
          </div>

          <div className="message-list">
            {error && <p style={{ color: "#d33", padding: 8 }}>{error}</p>}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message-row ${msg.senderId === me?.id ? "my-message" : "other-message"}`}
              >
                <div className="message-bubble">
                  <p>{msg.text}</p>
                  <span>{timeOf(msg.createdAt)}</span>
                </div>
              </div>
            ))}
            <div ref={listEnd} />
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
