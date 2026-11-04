import { KnowledgeItem } from '../types/punehod';

export interface BotResolution {
  reply: string;
  category: string;
  suggestedActions: string[];
  referenceItemIds: string[];
}

export function resolvePunehodResponse(
  userQuery: string,
  knowledgeList: KnowledgeItem[]
): BotResolution {
  const q = userQuery.toLowerCase().trim();

  // 1. ล้างหัวพิมพ์ & หมึกขาว WIMS & หมึกตัน
  if (
    q.includes('ล้างหัวพิมพ์') ||
    q.includes('หมึก') ||
    q.includes('ตัน') ||
    q.includes('หมึกขาว') ||
    q.includes('nozzle') ||
    q.includes('wims') ||
    q.includes('cleaning')
  ) {
    return {
      reply: `💧 **วิธีล้างหัวพิมพ์ (Head Cleaning) และระบบหมุนเวียนหมึกขาว (WIMS)**
(ข้อมูลโดยตรงจากคู่มือ PUNEHOD Passport Printer A4)

หมึกขาว UV มีสารไททาเนียมไดออกไซด์ที่ตกตะกอนง่าย ต้องดูแลอย่างสม่ำเสมอดังนี้ครับ:

1. **กวนหมึกขาวทุกเช้า (WIMS):** กดปุ่ม "White Ink Circulation" ที่ตัวเครื่องค้างไว้ 3–5 นาทีก่อนเริ่มเปิดสั่งพิมพ์งาน
2. **พิมพ์ทดสอบ Nozzle Check:** เปิดโปรแกรม PUNEHOD Control Utility สั่งพิมพ์ Nozzle Check ลงบนแผ่นใส ตรวจสอบเส้นสีทั้ง 6 ช่อง (K, C, M, Y, W, W) ว่าขาดหายหรือไม่
3. **คำสั่งล้างหัวพิมพ์:** หากเส้นสีไม่ครบ ให้สั่ง Normal Head Cleaning 1 รอบ แล้วพักเครื่อง 2 นาที
4. **แช่น้ำยา Cleaning:** หากยังมีรอยเส้นขาด ให้หยดน้ำยา Cleaning Solution ลงบนฟองน้ำ Capping Station แล้วเลื่อนหัวพิมพ์มาแช่ทิ้งไว้ 15–30 นาที
5. **ตรวจเช็คถังน้ำหมึกทิ้ง (Waste Ink Bottle):** ตรวจเช็คด้านหลังเครื่อง หากมีหมึกทิ้งเกิน 80% ให้ถ่ายทิ้งเพื่อป้องกันระบบดูดหมึกย้อนกลับ

หากเส้นสียังออกไม่ครบ สามารถกดปุ่ม **"เปิดอ่านคู่มือฉบับเต็มในแอป"** ด้านล่างนี้ หรือติดต่อทีมช่างเทคนิค 24 ชม. ได้ทันทีครับ!`,
      category: 'การบำรุงรักษา & หัวพิมพ์',
      suggestedActions: ['วิธีแช่น้ำยา Cleaning', 'ตรวจเช็ค Nozzle Check', 'ติดต่อช่าง 24 ชม.'],
      referenceItemIds: ['punehod-head-cleaning']
    };
  }

  // 2. Error 0x01 Carriage Lock / หัวพิมพ์ติด
  if (
    q.includes('0x01') ||
    q.includes('carriage') ||
    q.includes('หัวพิมพ์ติด') ||
    (q.includes('หัวพิมพ์') && q.includes('ติด'))
  ) {
    return {
      reply: `🔧 **วิธีแก้ไขรหัสข้อผิดพลาด Error 0x01 (Carriage Lock / หัวพิมพ์ติดขัด)**
(อ้างอิงจากคลังความรู้ PUNEHOD Knowledge Base)

อาการนี้เกิดจากตลับหัวพิมพ์เคลื่อนที่สะดุด มีสิ่งแปลกปลอมขวาง หรือแถบเซนเซอร์ Encoder Strip สกปรก แนะนำให้ปฏิบัติตามขั้นตอนนี้ครับ:

1. **ปิดเครื่องทันที:** กดปิดสวิตช์และถอดปลั๊กไฟออกเพื่อความปลอดภัย
2. **ตรวจสิ่งกีดขวาง:** เปิดฝาครอบตรวจดูสายส่งน้ำหมึก (Ink Tube) ว่าตึงหรือพับงอขัดขวางรางเลื่อนหรือไม่
3. **ทำความสะอาด Encoder Strip:** ใช้ผ้าไมโครไฟเบอร์ไร้ขนชุบแอลกอฮอล์ Isopropyl 99% หมาดๆ เช็ดทำความสะอาดแถบพลาสติกใสหลังรางเลื่อนเบาๆ จากซ้ายไปขวา
4. **หล่อลื่นแกนเพลา:** หยดน้ำมันซิลิโคนสังเคราะห์ 1–2 หยดบนเพลาสแตนเลส แล้วใช้มือเลื่อนชุดหัวพิมพ์ไปมาให้ลื่น
5. **เปิดเครื่องใหม่:** เสียบปลั๊กและเปิดเครื่อง สังเกตชุดหัวพิมพ์วิ่งกลับ Home Position ไฟสีฟ้าติดนิ่ง

หากทำตามแล้วยังไม่หาย สามารถเปิดอ่านคู่มือในแอปด้านล่าง หรือติดต่อช่างเทคนิคได้ตลอด 24 ชม. ครับ`,
      category: 'การแก้ปัญหา & รหัสข้อผิดพลาด',
      suggestedActions: ['ขอคลิปวิดีโอสาธิต', 'ติดต่อช่างเทคนิค LINE'],
      referenceItemIds: ['punehod-error-0x01']
    };
  }

  // 3. Error 0x50 Paper Feed Jam / เล่มพาสปอร์ตไม่ฟีด
  if (
    q.includes('0x50') ||
    q.includes('กระดาษติด') ||
    q.includes('เล่มติด') ||
    q.includes('ไม่ดึง') ||
    q.includes('ฟีด')
  ) {
    return {
      reply: `📄 **วิธีแก้ไขรหัสข้อผิดพลาด Error 0x50 (Paper Feed Jam / เล่มพาสปอร์ตไม่ฟีด)**

สาเหตุหลักเกิดจากระยะหนีบถาดพิมพ์แน่นเกินความหนาของเล่ม หรือเซนเซอร์ตรวจจับมีฝุ่นเกาะ:

1. **คลายลูกบิดตั้งระดับถาด:** หมุนลูกบิดปรับความหนา (Platen Height Knob) ทวนเข็มนาฬิกาประมาณ 1/2 รอบ
2. **เป่าฝุ่นเซนเซอร์:** ใช้ลูกยางเป่าลมทำความสะอาด Optical Sensor บริเวณถาดป้อน
3. **เช็ดลูกยางดึงเล่ม:** ใช้ผ้าสะอาดชุบน้ำเปล่าบิดหมาด เช็ดคราบฝุ่นบน Pick-up Rubber Roller
4. **ทดสอบป้อนเล่ม:** กดปุ่ม Feed / Eject เพื่อทดสอบการเคลื่อนที่ของถาด

ถาดพิมพ์จะดึงเล่มพาสปอร์ตได้อย่างนุ่มนวลและไม่ติดขัดครับ`,
      category: 'การแก้ปัญหา & รหัสข้อผิดพลาด',
      suggestedActions: ['การตั้งค่าถาดพิมพ์พาสปอร์ต', 'ติดต่อช่างเทคนิค'],
      referenceItemIds: ['punehod-error-0x50', 'punehod-tray-setup']
    };
  }

  // 4. ไดรเวอร์ & Windows 10/11
  if (
    q.includes('ไดรเวอร์') ||
    q.includes('driver') ||
    q.includes('ติดตั้ง') ||
    q.includes('windows') ||
    q.includes('ดาวน์โหลด') ||
    q.includes('โหลด')
  ) {
    return {
      reply: `💾 **คู่มือการติดตั้งไดรเวอร์ PUNEHOD Passport Printer A4 (Windows 10/11)**
(เวอร์ชันทางการ v3.4 รองรับ 64-bit เต็มรูปแบบ)

ขั้นตอนการติดตั้งแบบสมบูรณ์:
1. **ดาวน์โหลดไดรเวอร์:** จากหมวดหมู่ "การติดตั้ง & ไดรเวอร์" ในแอปนี้
2. **การต่อสาย USB:** ต่อสาย USB 2.0/3.0 จากเครื่องพิมพ์ตรงเข้าพอร์ตหลังเคส PC (ไม่ผ่าน Hub)
3. **เปิดสิทธิ์ Administrator:** คลิกขวาที่ไฟล์ติดตั้งแล้วเลือก **"Run as administrator"**
4. **เลือก Port:** เลือกพอร์ต \`USB001 (Virtual printer port for USB)\`
5. **ทดสอบพิมพ์:** เข้า Devices and Printers คลิกขวาเลือก Print Test Page

หากติดตั้งไม่ผ่าน สามารถติดต่อทีมช่างเทคนิคเพื่อช่วยรีโมท TeamViewer ติดตั้งให้ฟรีได้ครับ!`,
      category: 'การติดตั้ง & ไดรเวอร์',
      suggestedActions: ['เปิดดูคู่มือติดตั้งในแอป', 'การตั้งค่า AcroRIP'],
      referenceItemIds: ['punehod-driver-win']
    };
  }

  // 5. ถาดพาสปอร์ต & Platen Height
  if (
    q.includes('ถาด') ||
    q.includes('พาสปอร์ต') ||
    q.includes('passport') ||
    q.includes('ความสูง') ||
    q.includes('ขนาดเล่ม') ||
    q.includes('sensor') ||
    q.includes('เซนเซอร์')
  ) {
    return {
      reply: `📘 **การตั้งค่าถาดพิมพ์พาสปอร์ตและระดับความสูงแท่นพิมพ์ (Platen Height)**
(มาตรฐานหนังสือเดินทางสากล ICAO Doc 9303 ขนาด 125 x 88 มม.)

ขั้นตอนการจัดวางและตั้งค่า:
1. **จัดวางเล่ม:** กางหน้าพาสปอร์ตที่ต้องการพิมพ์ วางลงบน Alignment Jig ให้สันเล่มแนบชิดมาร์กเกอร์ด้านซ้าย
2. **หนีบด้วยแคลมป์แม่เหล็ก:** ล็อกมุมเล่มให้เรียบตึง ไม่ให้ขอบกระดาษโก่งตัว
3. **ปรับระยะเซนเซอร์ Clearance:** ปรับลูกบิดหมุนให้ระยะห่างระหว่างผิวหน้าเล่มถึงหัวพิมพ์อยู่ที่ **1.5 - 2.0 มิลลิเมตร** พอดี (สังเกตไฟเซนเซอร์อินฟราเรดจะติดสีเขียว)
4. **ตรวจสอบขนาด:** ขนาดหน้าพิมพ์มาตรฐานคือ 125 x 88 มม. (Passport Size B7)

ระยะห่างที่ถูกต้องจะป้องกันไม่ให้หัวพิมพ์ขูดหน้าเล่ม และให้หยดหมึก UV ลงตำแหน่งอย่างคมชัดที่สุดครับ`,
      category: 'การปรับตั้งค่าแท่นพิมพ์ & ถาดพาสปอร์ต',
      suggestedActions: ['เปิดอ่านคู่มือฉบับเต็ม', 'ดูวิดีโอสาธิตการพิมพ์'],
      referenceItemIds: ['punehod-tray-setup']
    };
  }

  // 6. RIP Software & ICC Profile
  if (
    q.includes('rip') ||
    q.includes('acrorip') ||
    q.includes('โปรแกรม') ||
    q.includes('สี') ||
    q.includes('underbase') ||
    q.includes('profile')
  ) {
    return {
      reply: `🎨 **การตั้งค่าโปรแกรม AcroRIP / Punehod RIP สำหรับเครื่องพิมพ์ PUNEHOD A4**

ค่าแนะนำสำหรับการพิมพ์ตราประทับและข้อมูลพาสปอร์ต:
- **ขนาดชิ้นงาน (Layout):** 125 x 88 มิลลิเมตร
- **ความละเอียด (Resolution):** 1440 x 1440 DPI สำหรับข้อความทั่วไป หรือ 2880 x 1440 DPI สำหรับภาพถ่าย Micro-photo
- **การพิมพ์รองพื้นหมึกขาว (White Underbase):** เลือกโหมด "100% White Under Any Colored Pixels"
- **ลำดับสี (Color Sequence):** K C M Y W W
- **การอบแห้ง UV Lamp:** ปรับความเข้มแสง UV LED ที่ระดับ 85–100% เพื่อให้หมึกแห้งสนิททันทีขณะพิมพ์

สามารถเปิดอ่านรายละเอียดในคู่มือซอฟต์แวร์ RIP ในแอปนี้ได้เลยครับ`,
      category: 'ซอฟต์แวร์ RIP & สี',
      suggestedActions: ['เปิดดูคู่มือ AcroRIP ในแอป'],
      referenceItemIds: ['punehod-rip-config']
    };
  }

  // 7. ติดต่อช่าง / Hotline / 24 ชม.
  if (
    q.includes('ติดต่อ') ||
    q.includes('เบอร์') ||
    q.includes('line') ||
    q.includes('โทร') ||
    q.includes('ช่าง') ||
    q.includes('24')
  ) {
    return {
      reply: `📞 **ช่องทางติดต่อทีมงานช่างเทคนิค PUNEHOD ตลอด 24 ชั่วโมง**

ทีมวิศวกรผู้เชี่ยวชาญพร้อมให้คำปรึกษาและแก้ไขปัญหาทุกขั้นตอน:
- 🟢 **LINE Official:** @punehod_th (มีวิศวกรคอยตอบตลอด 24 ชั่วโมง)
- ☎️ **สายด่วน Call Center:** 02-xxx-xxxx / 081-xxx-xxxx
- 📧 **อีเมล:** support@punehod.co.th
- 🌐 **คลังความรู้ออนไลน์:** https://punehod.vercel.app/
- 💻 **บริการรีโมทหน้าจอ:** รองรับ TeamViewer และ AnyDesk เข้าตรวจสอบระบบให้ฟรี 100%

กดปุ่ม "ช่างเทคนิค 24 ชม." หรือเปิดอ่านคู่มือในแอปได้ตลอดเวลาครับ!`,
      category: 'การแก้ปัญหา & รหัสข้อผิดพลาด',
      suggestedActions: ['เปิดอ่านคู่มือติดต่อ'],
      referenceItemIds: ['punehod-contact-support']
    };
  }

  // 8. General search against knowledge base items
  const matched = knowledgeList.find(
    k =>
      k.title.toLowerCase().includes(q) ||
      k.description.toLowerCase().includes(q) ||
      k.tags.some(t => t.toLowerCase().includes(q))
  );

  if (matched) {
    return {
      reply: `📖 **ข้อมูลคู่มือเกี่ยวกับ: ${matched.title}**
(หมวดหมู่: ${matched.categoryName})

${matched.description}

${matched.steps && matched.steps.length > 0 ? `**ขั้นตอนแนะนำ:**\n` + matched.steps.map((s, i) => `${i + 1}. ${s}`).join('\n') : ''}

ท่านสามารถคลิกปุ่ม **"เปิดอ่านคู่มือฉบับเต็มในแอป"** ด้านล่างนี้เพื่อดูขั้นตอนและสเปกอย่างละเอียดได้ทันทีครับ!`,
      category: matched.categoryName,
      suggestedActions: ['เปิดอ่านคู่มือฉบับเต็ม'],
      referenceItemIds: [matched.id]
    };
  }

  // Default Fallback
  return {
    reply: `สวัสดีครับ! ยินดีต้อนรับสู่ **PUNEHOD AI Expert Support** ยินดีให้บริการข้อมูลเกี่ยวกับเครื่องพิมพ์ **Passport Printer PUNEHOD A4 Flatbed** ครับ

สำหรับคำถาม "${userQuery}" ท่านสามารถสอบถามหรือเปิดดูคู่มือในแอปได้ในหัวข้อต่อไปนี้ครับ:
1. 💧 **ล้างหัวพิมพ์ & หมึกขาว WIMS:** วิธีแก้หมึกตัน, Nozzle Check
2. ⚠️ **รหัสข้อผิดพลาด:** Error 0x01 (Carriage Lock), Error 0x50 (Paper Jam)
3. 💾 **ดาวน์โหลด & ติดตั้งไดรเวอร์:** Windows 10/11 v3.4
4. 📘 **การตั้งค่าถาดพิมพ์พาสปอร์ต:** ขนาดเล่ม ICAO 9303, ปรับระดับเซนเซอร์
5. 🎨 **โปรแกรม AcroRIP:** Profile สี และ White Underbase
6. 📞 **ติดต่อช่างเทคนิค 24 ชั่วโมง:** สายด่วนและ LINE @punehod_th

สามารถพิมพ์คำถามที่ต้องการได้เลยครับ!`,
    category: 'ทั่วไป',
    suggestedActions: ['วิธีล้างหัวพิมพ์และหมึกขาว', 'วิธีแก้ Error 0x01'],
    referenceItemIds: ['punehod-head-cleaning', 'punehod-error-0x01']
  };
}
