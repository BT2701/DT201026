export const HEART_UNLOCK = 20

export const tapHint =
  'Chạm vào khoảng trống trên màn hình để nhận trái tim từ Trưởng. Đủ 20 trái tim sẽ mở một lời nhắn bí mật.'

export const secretHeartMessage =
  'Đủ 20 trái tim rồi. Bí mật của Trưởng nè: giữa thật nhiều ngày thường, Dĩm vẫn là điều dịu dàng nhất. 💗'

export const wishTitle = 'Chúc cô gái của Trưởng một ngày 20/10 thật xinh đẹp 💐'

export const wishParagraphs = [
  'Chúc Dĩm của Trưởng luôn xinh xắn, vui vẻ và lúc nào cũng được yêu thương thật nhiều. Mong rằng mỗi ngày của Dĩm đều có những điều nhỏ bé khiến em mỉm cười, những giấc mơ dần thành hiện thực và thật nhiều bình yên trong lòng.',
  'Cảm ơn em vì đã xuất hiện và trở thành một người đặc biệt trong thế giới của Trưởng. Hôm nay là ngày của em, nhưng đối với Trưởng, em luôn xứng đáng được yêu thương mỗi ngày.',
  'Chúc mừng ngày 20/10, cô gái đáng yêu của Trưởng. 💗',
] as const

export const hugMessage = 'Ôm online trước nha, còn ôm thật thì để Trưởng lo! 💗'

export const momentTitle = 'Bàn tay Trưởng đang giữ Dĩm nè'

export const momentHint = 'Chạm vào tấm ảnh để Trưởng giữ chặt thêm một chút.'

export const momentNote = 'Giữ rồi nha. Bàn tay nhỏ của Dĩm, Trưởng không định buông đâu.'

export const heartNotes = [
  'Hôm nay em phải cười thật nhiều nha! ❤️',
  'Có một người đang gửi đến em thật nhiều yêu thương.',
  'Dĩm xứng đáng với những điều dịu dàng nhất.',
  'Gửi em một cái ôm thật chặt từ Trưởng.',
  'Mong mọi điều tốt đẹp đều tìm đến em.',
  'Bí mật nè: em là cô gái đặc biệt của Trưởng! 💗',
] as const

export const fullHeartMessage = '100% rồi đó nha! Trưởng chụp màn hình làm bằng chứng đó 💗'

export const letterLines = [
  'Gửi Dĩm,',
  'Trưởng không biết món quà nhỏ này có làm em bất ngờ không, nhưng Trưởng đã muốn tạo ra một điều gì đó thật dễ thương dành riêng cho em.',
  'Có thể Trưởng không phải lúc nào cũng nói được những lời ngọt ngào nhất, nhưng Trưởng mong em luôn cảm nhận được rằng em là một người rất đặc biệt.',
  'Mong em luôn vui vẻ, tự tin, xinh đẹp theo cách riêng của mình và luôn được đối xử bằng sự dịu dàng mà em xứng đáng nhận được.',
  'Chúc Dĩm một ngày 20/10 thật hạnh phúc.',
  'Thương em nhiều,',
  'Trưởng ❤️',
] as const

export const letterSignature = 'Trưởng ♡ Dĩm'

export type DateIdeaId = 'flowers' | 'cake' | 'hug' | 'night'

export type DateIdea = {
  id: DateIdeaId
  title: string
  tease: string
  result: string
}

export const dateIdeas: readonly DateIdea[] = [
  {
    id: 'flowers',
    title: '🌷 Cùng nhau đi ngắm hoa',
    tease: 'Chạm vào đây, một vườn hoa nhỏ sẽ nở ra.',
    result: 'Hoa đã nở khắp tấm thiệp này rồi nè.',
  },
  {
    id: 'cake',
    title: '🍰 Dẫn em đi ăn món ngon',
    tease: 'Chạm vào đây nếu bụng đang hát một bài hát.',
    result: 'Hôm nào mình đi ăn một bữa thật ngon nha!',
  },
  {
    id: 'hug',
    title: '🧸 Ôm em thật lâu',
    tease: 'Chạm vào đây để gấu bông ôm một trái tim.',
    result: 'Một cái ôm thật lâu, dành cho Dĩm.',
  },
  {
    id: 'night',
    title: '🌙 Cùng nhau tạo thật nhiều kỷ niệm',
    tease: 'Chạm vào đây để trời tối và sao hiện ra.',
    result: 'Một bầu trời nhỏ cho những kỷ niệm mình sẽ viết tiếp.',
  },
]

export const finalLines = [
  "Happy Women's Day 20/10, Dĩm yêu dấu! 💗",
  'Mong em luôn hạnh phúc, luôn được yêu thương và có thật nhiều lý do để mỉm cười.',
  'Từ Trưởng, với tất cả sự dễ thương mà Trưởng có thể gửi qua màn hình này. 🥰',
] as const

export const navLinks = [
  { href: '#loi-chuc', label: 'Lời chúc' },
  { href: '#khoanh-khac', label: 'Ảnh' },
  { href: '#trai-tim', label: 'Trái tim' },
  { href: '#thuong', label: 'Thương' },
  { href: '#thu', label: 'Thư' },
  { href: '#hen-ho', label: 'Hẹn hò' },
  { href: '#bat-ngo', label: 'Bất ngờ' },
] as const
