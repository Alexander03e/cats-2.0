import styles from './Empty.module.scss';
import SVG from 'react-inlinesvg';

export const Empty = () => {
    return (
        <div className={styles.wrapper}>
            <h3>Ничего не найдено :(</h3>

            <SVG src={'/icons/empty.svg'} />
        </div>
    );
};
