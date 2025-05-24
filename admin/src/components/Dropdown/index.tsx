import { ComponentProps } from 'react';
import RcDropdown from 'rc-dropdown';
import styles from './Dropdown.module.scss';
import 'rc-dropdown/assets/index.css';

type TProps = ComponentProps<typeof RcDropdown>;

export const Dropdown = ({ ...props }: TProps) => {
    return <RcDropdown overlayClassName={styles.body} trigger={['click']} {...props} />;
};
