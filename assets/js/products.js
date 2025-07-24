const products = [
  {
    id: 1,
    name: "Nike Air Force 1",
    brand: "Nike",
    size: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
    price: 3000000,
    rating: 5,
    image: "assets/img/Nike_Air_Force_1.jpg",
    isNew: true,
    sold: 26,
    discount: 30,
    description: "Nike Air Force 1 mang phong cách cổ điển, thiết kế trẻ trung phù hợp mọi hoạt động thường ngày.",
    createdAt: "2025-07-20"
  },
  {
    id: 2,
    name: "Nike Air Force 1 Shadow",
    brand: "Nike",
    size: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
    price: 2500000,
    rating: 5,
    image: "assets/img/Nike_Air_Force_1_Shadow.jpg",
    isNew: true,
    sold: 30,
    discount: 0,
    description: "Phiên bản Shadow với thiết kế phá cách, màu sắc tươi sáng dành cho những ai thích nổi bật.",
    createdAt: "2025-07-17"
  },
  {
    id: 3,
    name: "New Balance 9060",
    brand: "New Balance",
    size: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
    price: 3300000,
    rating: 4.5,
    image: "assets/img/NewBalance_9060.jpg",
    isNew: true,
    sold: 22,
    discount: 0,
    description: "New Balance 9060 kết hợp giữa sự thoải mái và phong cách thể thao hiện đại.",
    createdAt: "2025-07-14"
  },
  {
    id: 4,
    name: "MLB - Speed Runner",
    brand: "MLB",
    size: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
    price: 2700000,
    rating: 4.5,
    image: "assets/img/MLB_Speed_​​Runner.jpg",
    isNew: false,
    sold: 14,
    discount: 20,
    description: "MLB Speed Runner mang cảm hứng từ các vận động viên chuyên nghiệp, đế cao năng động.",
    createdAt: "2025-06-30"
  },
  {
    id: 5,
    name: "Nike V2K Run By You",
    brand: "Ananas",
    size: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
    price: 2800000,
    rating: 5,
    image: "assets/img/Nike_V2K_Run_By_You.jpg",
    isNew: true,
    sold: 35,
    discount: 0,
    description: "Đậm chất retro với form dáng chunky và chi tiết kim loại nổi bật, Nike V2K Run By You cho phép bạn tự tay thiết kế đôi giày độc nhất.",
    createdAt: "2025-07-21"
  },
  {
    id: 6,
    name: "MLB XLG Chunky Denim Monogram",
    brand: "MLB",
    size: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
    price: 3500000,
    rating: 4.5,
    image: "assets/img/MLB_XLG_Chunky_Denim_Monogram.jpg",
    isNew: false,
    sold: 17,
    discount: 20,
    description: "MLB Chunky Monogram mang phong cách thời trang đường phố với chất liệu denim cao cấp.",
    createdAt: "2025-06-25"
  }
];

// Hàm tạo HTML sao đánh giá
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  let html = '';
  for (let i = 0; i < fullStars; i++) html += '<i class="fas fa-star text-warning me-1"></i>';
  if (hasHalfStar) html += '<i class="fas fa-star-half-alt text-warning me-1"></i>';
  for (let i = 0; i < emptyStars; i++) html += '<i class="far fa-star text-secondary me-1"></i>';
  return html;
}
