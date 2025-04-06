import styles from "@/styles/pages/index.module.scss";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/sections/home/Hero";
import AboutUs from "@components/sections/home/AboutUs";
import Services from "@components/sections/home/Services";
import ProductLines from "@components/sections/home/ProductLines";

export default function Home() {
  return (
    <Layout>
      <div className={styles.home}>
        <Hero />
        <AboutUs />
        <Services />
        <ProductLines />
      </div>
    </Layout>
  );
}
