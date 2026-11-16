import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, imageUrl } from "../services/api";
import Navbaruser from "../components/Navbaruser";
import "./createfoundpost.css";
import "./myposts.css";

function MyPosts() {
  const navigate = useNavigate();

  const [myPosts, setMyPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const posts = await api("/posts/mine");
        const withClues = await Promise.all(
          posts.map(async (p) => ({
            ...p,
            clues: await api(`/posts/${p.id}/clues`),
          }))
        );
        setMyPosts(withClues);
      } catch (err) {
        setError(err.message);
      }
    })();
  }, []);

  const toggleStatus = async (post) => {
    const next = post.status === "closed" ? "open" : "closed";
    setError("");
    try {
      await api(`/posts/${post.id}/status`, {
        method: "PATCH",
        body: { status: next },
      });
      setMyPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, status: next } : p))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const deletePost = async (post) => {
    if (!window.confirm(`ลบประกาศ "${post.name}" ใช่หรือไม่?`)) return;
    setError("");
    try {
      await api(`/posts/${post.id}`, { method: "DELETE" });
      setMyPosts((prev) => prev.filter((p) => p.id !== post.id));
    } catch (err) {
      setError(err.message);
    }
  };

  const statusLabel = (p) =>
    p.status === "closed"
      ? "เจอแล้ว"
      : p.type === "lost"
      ? "กำลังตามหา"
      : "กำลังหาเจ้าของ";

  return (
    <div className="create-found-post-page my-post-page">

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

      <main className="my-post-main">

        <h2 className="my-post-title">ประกาศของฉัน</h2>
        {error && <p style={{ color: "#d33" }}>{error}</p>}
        {!error && myPosts.length === 0 && <p>ยังไม่มีประกาศ</p>}

        {/* รายการประกาศของฉัน */}
        <section className="my-post-section">

          {myPosts.map((post) => (
            <div className="my-post-card" key={post.id}>

              <div className="my-post-item">

                <img
                  src={imageUrl(post.image)}
                  alt={post.name}
                  className="my-post-image"
                />

                <div className="my-post-info">

                  <span className="my-post-status">
                    {statusLabel(post)}
                  </span>

                  <p>ID: {post.id}</p>
                  <h4>{post.name}</h4>
                  <p>สถานที่: {post.location}</p>
                  <p>วันที่ประกาศ: {post.date}</p>

                  <div>
                    <button
                      type="button"
                      className="confirm-button"
                      onClick={() => toggleStatus(post)}
                    >
                      {post.status === "closed"
                        ? "เปิดประกาศอีกครั้ง"
                        : "พบแล้ว / ปิดประกาศ"}
                    </button>
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => deletePost(post)}
                    >
                      ลบประกาศ
                    </button>
                  </div>

                </div>
              </div>

              {/* เบาะแสที่ได้รับ */}
              <div className="my-post-clues">

                <h4>
                  เบาะแสที่ได้รับ ({post.clues.length})
                </h4>

                {post.clues.length > 0 ? (
                  post.clues.map((clue) => (
                    <div className="clue-card" key={clue.id}>

                      <div className="clue-card-header">
                        <span>เบาะแส #{clue.id}</span>
                        <span>{clue.date}</span>
                      </div>

                      <p>
                        <strong>สถานที่:</strong> {clue.location}
                      </p>

                      <p>
                        <strong>รายละเอียด:</strong> {clue.description}
                      </p>

                    </div>
                  ))
                ) : (
                  <p className="no-clue">
                    ยังไม่มีเบาะแสที่ได้รับ
                  </p>
                )}

              </div>

            </div>
          ))}
        </section>

      </main>
    </div>
  );
}

export default MyPosts;