export function notFound(req, res) {
  res.status(404).json({ message: "ไม่พบ API ที่เรียก" });
}

export function errorHandler(err, req, res, next) {
  console.error(err);
  if (err.code === "ER_DUP_ENTRY") {
    return res.status(409).json({ message: "ข้อมูลนี้ถูกใช้งานแล้ว" });
  }
  if (err.name === "MulterError") {
    return res.status(400).json({ message: "อัปโหลดรูปไม่สำเร็จ (ไฟล์ใหญ่เกิน 5MB)" });
  }
  res.status(err.status || 500).json({ message: err.message || "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
}
