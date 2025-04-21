import styles from './HomePage.module.scss';
import { HomeProjects } from '@/Pages/Home/components/Projects';
import { OurCats } from '@/Pages/Home/components/OurCats';
import { Help } from '@/Pages/Home/components/Help';
import { News } from '@/Pages/Home/components/News';

export const HomePage = () => {
    return (
        <div className={styles.wrapper}>
            <HomeProjects />
            <OurCats />
            <Help />
            <News />
        </div>
    );
};
