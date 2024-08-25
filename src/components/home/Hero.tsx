import Image from "next/image";
import { TiTick } from "react-icons/ti";
import CloudImage from "../../../public/cloud-hosting.png";
import styles from "./hero.module.css";

const Hero = () => {
  return (
    <div className={styles.hero}>
        <div className={styles.heroLeft}>
        <h1 className={styles.title}>Cloud Hosting</h1>
        <p className={styles.desc}>The best cloud hosting solution for your online success</p>
      

      <div className={styles.services}>
      <div className={styles.serviceItem}> <TiTick/> Easy to use control panel</div>
        <div className={styles.serviceItem}> <TiTick/> Secure Hosting</div>
        <div className={styles.serviceItem}> <TiTick/> website Maintenence</div>
      </div>
      </div>

      <div>
        <Image src={CloudImage} alt="Cloud" width={500} height={500}/>
      </div>
    </div>
  )
}

export default Hero;