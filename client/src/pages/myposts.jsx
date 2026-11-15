
import { useNavigate } from "react-router-dom";
import Navbaruser from "../components/Navbaruser";
import "./createfoundpost.css";
import "./myposts.css";

function MyPosts() {
  const navigate = useNavigate();

  // ข้อมูลประกาศตัวอย่าง
  const myPosts = [
    {
      id: 2310,
      name: "กระเป๋าสตางค์",
      location: "ใต้ตึก IT",
      status: "กำลังตามหา",
      image: "/src/assets/it.jpg",
      date: "2026-11-15",
      clues: [
        {
          id: 1,
          location: "โรงอาหาร",
          description: "เห็นคนเก็บกระเป๋าสีดำได้บริเวณโต๊ะด้านหน้า",
          date: "2026-11-16",
        },
        {
          id: 2,
          location: "หน้าห้องสมุด",
          description: "อาจจะเห็นกระเป๋าที่มีลักษณะคล้ายกันวางอยู่",
          date: "2026-11-16",
        },
      ],
    },
    {
      id: 2311,
      name: "โทรศัพท์",
      location: "โรงอาหาร",
      status: "กำลังตามหา",
      image: "/src/assets/it.jpg",
      date: "2026-11-14",
      clues: [
        {
          id: 3,
          location: "อาคารเรียนรวม",
          description: "พบโทรศัพท์ที่มีเคสสีดำอยู่บริเวณชั้น 2",
          date: "2026-11-16",
        },
      ],
    },
  ];

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

        {/* รายการประกาศของฉัน */}
        <section className="my-post-section">

          {myPosts.map((post) => (
            <div className="my-post-card" key={post.id}>

              <div className="my-post-item">

                <img
                  src={post.image}
                  alt={post.name}
                  className="my-post-image"
                />

                <div className="my-post-info">

                  <span className="my-post-status">
                    {post.status}
                  </span>

                  <p>ID: {post.id}</p>
                  <h4>{post.name}</h4>
                  <p>สถานที่: {post.location}</p>
                  <p>วันที่ประกาศ: {post.date}</p>

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
