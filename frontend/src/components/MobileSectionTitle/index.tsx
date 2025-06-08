import styles from './MobileSectionTitle.module.scss';
import SVG from 'react-inlinesvg';
import cn from 'classnames';

interface IProps {
    onBack?: () => void;
    title: string;
    className?: string;
}

export const MobileTitle = ({ title, className, onBack }: IProps) => {
    return (
        <div className={cn(styles.mobileTitle, className)}>
            <button onClick={onBack}>
                <SVG src={'/icons/arrow-back-btn.svg'} />
            </button>
            <p>{title}</p>
        </div>
    );
};
