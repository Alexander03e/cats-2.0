import styles from './Empty.module.scss';
import SVG from 'react-inlinesvg';
import { ReactNode } from 'react';

interface IProps {
    title?: string;
    children?: ReactNode;
}

export const Empty = ({ title, children }: IProps) => {
    return (
        <div className={styles.wrapper}>
            <h3>{title || `Ничего не найдено :(`}</h3>

            <SVG src={'/icons/empty.svg'} />

            {children}
        </div>
    );
};
