import { KnowledgeItem, KnowledgeCategory } from '../types/punehod';

export const PUNEHOD_CATEGORIES: KnowledgeCategory[] = [
  {
    id: 'drivers',
    name: 'การติดตั้ง & ไดรเวอร์',
    description: 'คู่มือการติดตั้งไดรเวอร์ USB, การตั้งค่าพอร์ต COM/USB, และโปรแกรมควบคุมสำหรับ Windows 10/11',
    icon: 'Download',
    count: 3
  },
  {
    id: 'platen',
    name: 'การปรับตั้งค่าแท่นพิมพ์ & ถาดพาสปอร์ต',
    description: 'ขั้นตอนการตั้งค่าขนาดเล่มพาสปอร์ต, การจัดวางถาดป้อนเล่ม, และการตั้งค่าความหนา / เซนเซอร์แท่นพิมพ์',
    icon: 'BookOpen',
    count: 2
  },
  {
    id: 'troubleshooting',
    name: 'การแก้ปัญหา & รหัสข้อผิดพลาด',
    description: 'วิธีแก้ปัญหากระดาษติด/เล่มติด, ไฟกะพริบเตือน Error 0x01 (Carriage Lock), Error 0x50 และปัญหาการเชื่อมต่อ',
    icon: 'AlertTriangle',
    count: 4
  },
  {
    id: 'maintenance',
    name: 'การบำรุงรักษา & หัวพิมพ์',
    description: 'การล้างหัวพิมพ์ (Head Cleaning), การตรวจสอบ Nozzle Check และการดูแลระบบหมึกขาว White Ink Circulation / หมึกทิ้ง',
    icon: 'Wrench',
    count: 3
  },
  {
    id: 'rip_software',
    name: 'ซอฟต์แวร์ RIP & สี',
    description: 'การกำหนดค่า AcroRIP / Punehod RIP, การจัดการ Profile สี ICC, และการพิมพ์เลเยอร์ White Underbase',
    icon: 'Sliders',
    count: 2
  },
  {
    id: 'videos',
    name: 'วิดีโอสาธิตการใช้งาน',
    description: 'คลิปวิดีโอสาธิตการทำงานจริงแบบ Step-by-Step ตั้งแต่แกะกล่องจนถึงการพิมพ์หน้าวีซ่าและพาสปอร์ตสำเร็จ',
    icon: 'Video',
    count: 2
  }
];

export const INITIAL_KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    id: 'punehod-driver-win',
    title: 'คู่มือการติดตั้งไดรเวอร์ PUNEHOD A4 Passport Printer (Windows 10/11)',
    category: 'drivers',
    categoryName: 'การติดตั้ง & ไดรเวอร์',
    description: 'ขั้นตอนการติดตั้งไดรเวอร์ USB เวอร์ชัน 3.4 ให้คอมพิวเตอร์มองเห็นเครื่องพิมพ์ พร้อมการเลือก Port และการเปิดสิทธิ์ Run as Administrator',
    steps: [
      'ดาวน์โหลดไดรเวอร์เวอร์ชัน v3.4 ล่าสุดจาก https://punehod.vercel.app/#drivers',
      'ต่อสาย USB เข้ากับพอร์ต USB 2.0 หรือ 3.0 โดยตรงด้านหลังเคสคอมพิวเตอร์ (หลีกเลี่ยงการต่อผ่าน USB Hub เพื่อความเสถียรของสัญญาณข้อมูล)',
      'คลิกขวาที่ไฟล์ติดตั้ง Driver Setup.exe แล้วเลือก "Run as administrator"',
      'ในขั้นตอน Port Selection ให้เลือกพอร์ต "USB001" หรือ Virtual Printer Port ที่ระบบตรวจพบ',
      'รีสตาร์ทเครื่องพิมพ์และเปิด Device Manager เพื่อตรวจสอบสถานะ "PUNEHOD Passport A4 USB Device" แสดงไฟเขียวพร้อมทำงาน'
    ],
    tags: ['Driver', 'Windows 10', 'Windows 11', 'USB', 'v3.4', 'การติดตั้ง'],
    sourceUrl: 'https://punehod.vercel.app/#drivers',
    views: 1482,
    downloads: 820,
    updatedAt: '2026-03-15T10:00:00Z',
    isPinned: true
  },
  {
    id: 'punehod-error-0x01',
    title: 'วิธีแก้รหัสข้อผิดพลาด Error 0x01 (Carriage Lock / ตลับหัวพิมพ์ติดขัด)',
    category: 'troubleshooting',
    categoryName: 'การแก้ปัญหา & รหัสข้อผิดพลาด',
    description: 'รหัสข้อผิดพลาด 0x01 เกิดจากชุด Carriage เคลื่อนที่สะดุด สายส่งหมึกขัดขวาง หรือแถบเซนเซอร์ตำแหน่ง (Encoder Strip) สกปรก',
    errorCode: '0x01',
    steps: [
      'ปิดสวิตช์เครื่องพิมพ์ทันที และถอดปลั๊กไฟเพื่อความปลอดภัย',
      'เปิดฝาครอบเครื่องพิมพ์ขึ้น ตรวจสอบตามแนวยาวของรางเลื่อนว่ามีเศษกระดาษ ชิ้นส่วน หรือสายน้ำหมึก (Ink Tube) บิดงอตึงเกินไปหรือไม่',
      'ใช้ผ้าไมโครไฟเบอร์ไร้ขนชุบแอลกอฮอล์ Isopropyl 99% หมาดๆ เช็ดทำความสะอาดแถบพลาสติกใส Encoder Strip ตลอดแนวจากซ้ายไปขวาอย่างเบามือ',
      'หยดน้ำมันหล่อลื่นซิลิโคนสังเคราะห์ 1-2 หยดลงบนเพลาเหล็กสแตนเลส (Carriage Rod) แล้วเลื่อนชุดหัวพิมพ์ไปมาด้วยมือเบาๆ',
      'เสียบปลั๊กและเปิดเครื่องใหม่ สังเกตชุดหัวพิมพ์วิ่งกลับ Home Position และไฟสถานะ LED เปลี่ยนเป็นสีฟ้าคงที่'
    ],
    tags: ['Error 0x01', 'Carriage Lock', 'หัวพิมพ์ติด', 'ไฟกะพริบ', 'Encoder Strip'],
    sourceUrl: 'https://punehod.vercel.app/#categories',
    views: 2940,
    downloads: 654,
    updatedAt: '2026-03-18T14:30:00Z',
    isPinned: true
  },
  {
    id: 'punehod-error-0x50',
    title: 'วิธีแก้รหัสข้อผิดพลาด Error 0x50 (Paper Feed Jam / เล่มพาสปอร์ตไม่ฟีดเข้า)',
    category: 'troubleshooting',
    categoryName: 'การแก้ปัญหา & รหัสข้อผิดพลาด',
    description: 'เกิดจากเซนเซอร์ตรวจจับกระดาษ (Optical Sensor) ฝุ่นจับ หรือตั้งระยะหนีบถาดเล่มพาสปอร์ตแน่นเกินพิกัดความหนา',
    errorCode: '0x50',
    steps: [
      'ตรวจสอบระดับความหนาของเล่มพาสปอร์ต (มาตรฐานเล่มทั่วไป 32-64 หน้า)',
      'คลายลูกบิดตั้งระดับความสูงของแท่นพิมพ์ (Platen Height Knob) ทวนเข็มนาฬิกาประมาณ 1/2 รอบ',
      'ใช้ลูกยางเป่าลมเป่าทำความสะอาดเซนเซอร์แสงสะท้อน (Reflective Sensor) บริเวณถาดป้อนเล่ม',
      'ทำความสะอาดลูกกลิ้งยางดึงเล่ม (Pick-up Rubber Roller) ด้วยผ้าชุบน้ำสะอาดบิดหมาดเพื่อขจัดคราบฝุ่นกระดาษ',
      'กดปุ่ม Eject / Feed เพื่อทดสอบการเคลื่อนที่ของถาดพิมพ์'
    ],
    tags: ['Error 0x50', 'Paper Jam', 'ฟีดกระดาษ', 'เล่มติด', 'ถาดป้อน'],
    sourceUrl: 'https://punehod.vercel.app/#categories',
    views: 1890,
    downloads: 310,
    updatedAt: '2026-03-20T08:15:00Z'
  },
  {
    id: 'punehod-tray-setup',
    title: 'การตั้งค่าขนาดเล่มพาสปอร์ตและการปรับระดับความสูงแท่นพิมพ์ (Platen Height)',
    category: 'platen',
    categoryName: 'การปรับตั้งค่าแท่นพิมพ์ & ถาดพาสปอร์ต',
    description: 'ขั้นตอนการจัดวางถาดพาสปอร์ตมาตรฐาน ICAO Doc 9303 ขนาด 125 x 88 มม. และการวัดระยะ Clearance ไม่ให้หัวพิมพ์ชนเล่ม',
    steps: [
      'กางเล่มพาสปอร์ตไปยังหน้าวีซ่าหรือหน้าบันทึกข้อมูลที่ต้องการพิมพ์',
      'วางเล่มลงบนถาดพิมพ์แม่เหล็ก PUNEHOD Alignment Jig โดยให้สันเล่มแนบชิดกับขอบซ้าย',
      'ปรับลูกบิดวัดระดับ Clearance ให้ไฟเซนเซอร์อินฟราเรด (Infrared Height Sensor) ตรวจจับระยะห่าง 1.5 - 2.0 มม. ระหว่างหน้าเล่มกับหัวพิมพ์',
      'ล็อกคันโยกถาดพิมพ์ให้แน่นหนาเพื่อป้องกันการขยับระหว่างพิมพ์',
      'กดปุ่ม Flatbed Position ในซอฟต์แวร์เพื่อเลื่อนถาดเข้าไปยังจุดพิมพ์เริ่มต้น (Home Print)'
    ],
    tags: ['พาสปอร์ต', 'ถาดพิมพ์', 'Platen Height', 'เซนเซอร์', 'ICAO 9303'],
    sourceUrl: 'https://punehod.vercel.app/#categories',
    views: 1720,
    downloads: 412,
    updatedAt: '2026-03-10T11:20:00Z',
    isPinned: true
  },
  {
    id: 'punehod-head-cleaning',
    title: 'การล้างหัวพิมพ์ (Head Cleaning) และระบบหมุนเวียนหมึกขาว (White Ink Circulation)',
    category: 'maintenance',
    categoryName: 'การบำรุงรักษา & หัวพิมพ์',
    description: 'วิธีป้องกันหัวพิมพ์อุดตันและการจัดการหมึกขาวตกตะกอนด้วยระบบ WIMS ประจำวันอย่างมีประสิทธิภาพ',
    steps: [
      'ก่อนเริ่มงานทุกเช้า ให้กดปุ่ม "WIMS White Ink Circulation" ค้างไว้ 3-5 นาที เพื่อให้ระบบปั๊มกวนหมึกขาวไม่ให้ตกตะกอน',
      'เปิดโปรแกรม PUNEHOD Control Utility แล้วเลือกคำสั่ง "Nozzle Check" พิมพ์ลงบนแผ่นใสหรือกระดาษทดสอบ',
      'หากพบว่าเส้นสีขาดหาย ให้กดคำสั่ง "Normal Head Cleaning" 1 รอบ และรอ 2 นาที',
      'หากเส้นสียังไม่เต็ม ให้แช่หัวพิมพ์ลงบนฟองน้ำ Capping Station ที่หยดน้ำยา Cleaning Solution ทิ้งไว้ 15-30 นาที',
      'ตรวจสอบถังเก็บน้ำหมึกทิ้ง (Waste Ink Bottle) ด้านหลังเครื่อง หากเกิน 80% ให้ถ่ายทิ้งและรีเซ็ตตัวนับ'
    ],
    tags: ['ล้างหัวพิมพ์', 'Head Cleaning', 'หมึกขาว', 'Nozzle Check', 'WIMS', 'หมึกตัน'],
    sourceUrl: 'https://punehod.vercel.app/#categories',
    views: 3120,
    downloads: 940,
    updatedAt: '2026-03-22T09:00:00Z',
    isPinned: true
  },
  {
    id: 'punehod-rip-config',
    title: 'การกำหนดค่า AcroRIP / Punehod RIP สำหรับการพิมพ์หนังสือเดินทางและตราประทับ',
    category: 'rip_software',
    categoryName: 'ซอฟต์แวร์ RIP & สี',
    description: 'การตั้งค่าโปรไฟล์สี ICC, ความละเอียด 1440x1440 DPI, การพิมพ์เลเยอร์ White Underbase และการตั้งค่า Spot Color',
    steps: [
      'เปิดซอฟต์แวร์ AcroRIP / Punehod RIP เวอร์ชัน V10.5 ขึ้นไป',
      'ในแท็บ Layout กำหนดขนาดหน้ากระดาษเป็น 125 x 88 mm (มาตรฐาน Passport B7)',
      'ในแท็บ Color เลือก Channel Order: K C M Y W W และกำหนด ICC Profile ให้ตรงกับชนิดหมึก UV PUNEHOD Eco Series',
      'ในแท็บ White Layer ให้เลือก "100% White Under Any Colored Pixels" เพื่อให้สีคมชัดไม่จมลงเนื้อกระดาษพิเศษ',
      'กำหนดความละเอียด Resolution เป็น 1440 x 1440 DPI สำหรับงานเอกสารความคมชัดสูง หรือ 2880 x 1440 DPI สำหรับงาน Micro-text',
      'คลิกไอคอน Print และเลือกส่งข้อมูลผ่าน Direct USB Spooler'
    ],
    tags: ['AcroRIP', 'Punehod RIP', 'ICC Profile', 'White Underbase', 'ความละเอียด', '1440 DPI'],
    sourceUrl: 'https://punehod.vercel.app/#categories',
    views: 2210,
    downloads: 580,
    updatedAt: '2026-03-24T16:00:00Z'
  },
  {
    id: 'punehod-video-passport-print',
    title: 'วิดีโอสาธิตการพิมพ์หน้าวีซ่าและภาพเสมือนลงบนเล่มหนังสือเดินทาง PUNEHOD A4',
    category: 'videos',
    categoryName: 'วิดีโอสาธิตการใช้งาน',
    description: 'คลิปสาธิตขั้นตอนจริงตั้งแต่การเตรียมไฟล์อาร์ตเวิร์ค กางเล่มพาสปอร์ต และเริ่มพิมพ์ด้วยหลอด UV LED Curing',
    steps: [
      'ชมขั้นตอนการเปิดไฟล์แม่แบบ Template และการตรวจสอบมาร์กเกอร์',
      'การกางเล่มพาสปอร์ตหนีบด้วยแคลมป์แม่เหล็กและเปิดไฟ UV Dual Lamp',
      'การสั่งพิมพ์โดยใช้เวลาเพียง 45 วินาทีต่อเล่ม หมึกแห้งสนิททันที กันน้ำ ทนต่อสารเคมี และทนต่อแสงแดด UV'
    ],
    tags: ['วิดีโอ', 'สาธิต', 'Passport', 'UV LED', 'Step-by-Step'],
    sourceUrl: 'https://punehod.vercel.app/#videos',
    views: 4500,
    downloads: 1240,
    updatedAt: '2026-03-25T13:45:00Z'
  },
  {
    id: 'punehod-contact-support',
    title: 'ช่องทางติดต่อทีมงานช่างเทคนิค PUNEHOD ตลอด 24 ชั่วโมง',
    category: 'troubleshooting',
    categoryName: 'การแก้ปัญหา & รหัสข้อผิดพลาด',
    description: 'ข้อมูลการติดต่อศูนย์บริการเทคนิค PUNEHOD Call Center, LINE Official และการส่งเครื่องเข้าตรวจเช็ค',
    steps: [
      'LINE Official: @punehod_th (แอดมินและวิศวกรเทคนิคสแตนด์บายตลอด 24 ชั่วโมง)',
      'เบอร์โทรด่วนศูนย์บริการเทคนิค: 02-xxx-xxxx / 081-xxx-xxxx',
      'อีเมลฝ่ายสนับสนุน: support@punehod.co.th / contact@punehod.vercel.app',
      'สำหรับเคสเร่งด่วนสามารถเปิดรีโมทผ่าน TeamViewer หรือ AnyDesk ให้วิศวกรตั้งค่าไดรเวอร์และโปรแกรม RIP ได้ทันที'
    ],
    tags: ['ติดต่อเรา', '24 ชั่วโมง', 'LINE', 'เบอร์โทร', 'ช่างเทคนิค', 'TeamViewer'],
    sourceUrl: 'https://punehod.vercel.app/#contact',
    views: 3890,
    downloads: 0,
    updatedAt: '2026-03-28T09:10:00Z'
  }
];

export const INITIAL_ANALYTICS: {
  totalChats: number;
  totalMessages: number;
  avgResponseTimeMs: number;
  satisfactionRate: number;
  resolutionRate: number;
  intentDistribution: { [key: string]: number };
  dailyVolume: { date: string; count: number }[];
  topQuestions: { query: string; count: number; category: string }[];
} = {
  totalChats: 1280,
  totalMessages: 6420,
  avgResponseTimeMs: 820,
  satisfactionRate: 98.4,
  resolutionRate: 96.5,
  intentDistribution: {
    'การแก้ปัญหา & รหัสข้อผิดพลาด': 42,
    'การติดตั้ง & ไดรเวอร์': 26,
    'การบำรุงรักษา & หัวพิมพ์': 18,
    'การปรับตั้งค่าถาดพาสปอร์ต': 8,
    'ซอฟต์แวร์ RIP & อื่นๆ': 6
  },
  dailyVolume: [
    { date: 'วันจันทร์', count: 184 },
    { date: 'วันอังคาร', count: 212 },
    { date: 'วันพุธ', count: 245 },
    { date: 'วันพฤหัสบดี', count: 198 },
    { date: 'วันศุกร์', count: 230 },
    { date: 'วันเสาร์', count: 110 },
    { date: 'วันอาทิตย์', count: 101 }
  ],
  topQuestions: [
    { query: 'วิธีแก้ไฟกะพริบ Error 0x01 Carriage Lock', count: 342, category: 'การแก้ปัญหา & รหัสข้อผิดพลาด' },
    { query: 'ขอลิงก์ดาวน์โหลดไดรเวอร์ Windows 11', count: 278, category: 'การติดตั้ง & ไดรเวอร์' },
    { query: 'หมึกขาวตัน ล้างหัวพิมพ์และหมุนเวียนหมึกยังไง', count: 245, category: 'การบำรุงรักษา & หัวพิมพ์' },
    { query: 'ตั้งระยะห่างเซนเซอร์ถาดพิมพ์พาสปอร์ตเท่าไหร่', count: 167, category: 'การปรับตั้งค่าแท่นพิมพ์' },
    { query: 'ติดต่อช่างเทคนิค PUNEHOD 24 ชั่วโมงทางไหน', count: 148, category: 'การสนับสนุน' }
  ]
};
