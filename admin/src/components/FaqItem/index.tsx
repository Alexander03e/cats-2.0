import { Collapsible } from '@/Components/Collapsible';
import styles from './FaqItem.module.scss';
import SVG from 'react-inlinesvg';
import cn from 'classnames';

export interface IFaqItemProps {
    title?: string;
    body?: string;
}

export const FaqItem = ({ body, title }: IFaqItemProps) => {
    return (
        <Collapsible
            className={styles.wrapper}
            renderHeader={({ isActive, toggle }) => (
                <div className={cn(styles.header, { [styles.active]: isActive })} onClick={toggle}>
                    <h6>{title}</h6>
                    <div className={styles.icon}>
                        <SVG src={'/icons/plus.svg'} />
                    </div>
                </div>
            )}
        >
            <p className={styles.body}>{body}</p>
        </Collapsible>
    );
};
