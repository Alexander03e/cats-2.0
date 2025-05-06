import SVG from 'react-inlinesvg';
import styles from './CatAttribute.module.scss';
import { ReactNode } from 'react';

export const CatAttribute = ({ children }: { children: ReactNode }) => {
    return (
        <div className={styles.wrapper}>
            <SVG src={'/icons/cat-mark.svg'} />
            <p>{children}</p>
        </div>
    );
};
