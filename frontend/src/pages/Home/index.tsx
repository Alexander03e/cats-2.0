import styles from './HomePage.module.scss';
import { HomeProjects } from '@/Pages/Home/components/Projects';
import { OurCats } from '@/Pages/Home/components/OurCats';
import { Help } from '@/Pages/Home/components/Help';
import { News } from '@/Pages/Home/components/News';
import { FAQ } from '@/Pages/Home/components/FAQ';
import { HomeSlider } from '@/Pages/Home/components/Slider';

export const HomePage = () => {
    return (
        <div className={styles.wrapper}>
            <HomeSlider />
            <HomeProjects />
            <OurCats />
            <Help />
            <News />
            <FAQ />
        </div>
    );
};
