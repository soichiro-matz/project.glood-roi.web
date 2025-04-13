import { nanoid } from "nanoid";
import styles from "@/styles/pages/home/services.module.scss";
import SectionTitle from "@/components/parts/SectionTitle";
import Service from "@/pages/home/Service";
const Items = [
  {
    name: "国内EC事業",
    description: [
      "国内主要ECモール（楽天市場、Amazon、Yahooショッピング、Qoo10、Aupayマーケット）を中心にECショップを運営しております。",
      "医薬品、衛生用品、日用品、美容品、ペット用品、食品など、日々のくらしを支える商品を厳選し、多様なニーズにお応えしています。",
      "私たちの取り扱う製品は品質と信頼性を重視しており、お客様に安心してお選びいただけるラインアップを提供しています。",
      "また、利便性を高めるための迅速な配送と丁寧なカスタマーサポートを徹底し、快適なショッピング体験をお届けすることに注力しています。",
    ],
    image: "/assets/img/home/img-service-01.jpg",
  },
  {
    name: "越境EC事業",
    description: [
      "日本が誇る高品質な製品をECプラットフォームを通じて世界中で販売をしております。",
      "各国の市場ニーズを的確に把握し、文化や習慣に寄り添った商品展開やプロモーションを行うことで、日本製品の新たな価値を広げています。",
      "そして、取引先やパートナー企業との強固なネットワークを築きながら、グローバル市場での競争力を高めています。",
      "お客様一人ひとりに感動を届けるため、信頼性と迅速なサービスを追求し、文化を超えて人々をつなぎ、世界中のくらしに日本の魅力を広げます。",
    ],
    image: "/assets/img/home/img-service-02.jpg",
  },
  {
    name: "卸売事業",
    description: [
      "医薬品、衛生用品、日用品、美容品、食品、ペット用品など、多岐にわたる分野でお取引先の多様なニーズにお応えしています。",
      "私たちの強みは、厳選された高品質な製品の供給体制と、お取引先との信頼関係を基盤とした柔軟な対応力です。市場の動向をいち早く捉え、競争力のある商品とサービスを提供することで、ビジネスパートナー様の成長をサポートします。",
      "また、物流ネットワークを活用した迅速な納品体制や、商品の付加価値を高める提案型サービスにも力を注いでいます。",
      "お取引先企業様と共に成長し、ビジネスの可能性を広げるパートナーとして、新たな市場開拓に挑戦し続けます。",
    ],
    image: "/assets/img/home/img-service-03.jpg",
  },
];

export default function Services() {
  return (
    <section
      className={`${styles.services} relative`}
      id="service"
      data-offset-sp="-120"
      data-offset-md="-140"
      data-offset-lg="-160"
    >
      <div className="-translate-y-1/2 transform text-center">
        <SectionTitle tag="h2" titleEn="service" titleJp="サービス" />
      </div>
      <ul>
        {Items.map((service, index) => (
          <Service key={nanoid()} service={service} index={index} />
        ))}
      </ul>
    </section>
  );
}
