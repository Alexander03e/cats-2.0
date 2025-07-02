import Modal from 'react-modal';
import { ReactElement, useEffect, useState } from 'react';
import styles from './HelpPopup.module.scss';
import { TEXT } from '@/Components/HelpPopup/consts.ts';
import { Button } from '@/Components/Button';
import parse from 'html-react-parser';
import SVG from 'react-inlinesvg';

interface IProps {
    renderTrigger: ({ open, onClick }: { open: boolean; onClick: () => void }) => ReactElement;
}
export const HelpPopup = ({ renderTrigger }: IProps) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [open]);

    const contactUs = () => {
        window.open('https://t.me/+79023235350', '_blank');
    };

    return (
        <>
            {renderTrigger({ open, onClick: handleOpen })}
            <Modal
                shouldCloseOnOverlayClick={true}
                isOpen={open}
                onRequestClose={handleClose}
                onAfterClose={handleClose}
                shouldCloseOnEsc
                overlayClassName={styles.overlay}
                className={styles.wrapper}
                preventScroll
            >
                <div className={styles.content}>
                    <SVG onClick={handleClose} className={styles.close} src={'/icons/close.svg'} />
                    <h3 className={styles.title}>Помощь вещами</h3>

                    <p>{parse(TEXT)}</p>
                </div>

                <Button onClick={contactUs}>Связаться</Button>
            </Modal>
        </>
    );
};
