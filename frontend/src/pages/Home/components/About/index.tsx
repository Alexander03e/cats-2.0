import styles from './About.module.scss';
import SVG from 'react-inlinesvg';
export const About = () => {
    return (
        <div id={'#about'} className={styles.wrapper}>
            <div className={styles.text}>
                <h1>
                    <span>КотоДом</span> — частный приют в Самаре
                </h1>
                <p>
                    <strong>«КотоДом» — это независимый благотворительный проект из Самары,</strong>{' '}
                    созданный, чтобы спасать кошек и помогать им обрести дом. Мы существуем на
                    волонтёрских началах и поддержке неравнодушных людей — и каждый день стараемся
                    делать мир немного добрее.
                    <br />
                    <br />
                    Приют работает без выходных, и каждый день — это забота, уборка, корм, лечение.
                    <br />
                    <br />
                    Помочь можно разными способами: взять кота домой, стать волонтёром, пожертвовать
                    или просто рассказать о нас. Каждое участие — ценно. Каждый хвостик — важен.
                </p>
            </div>
            <div className={styles.image}>
                <div className={styles.img}>
                    <img src={'/icons/flower-cat.png'} />
                </div>
                <div className={styles.flower}>
                    <SVG src={'/icons/flower.svg'} />
                </div>
            </div>
        </div>
    );
};
