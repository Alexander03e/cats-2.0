import styles from './DetailsTemplates.module.scss';
import { HTMLAttributes, useState } from 'react';
import cn from 'classnames';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import size from 'lodash/size';
import map from 'lodash/map';

type TProps = HTMLAttributes<HTMLDivElement>;

const Details = ({ className, children, ...props }: TProps) => {
    return (
        <div className={cn(styles.wrapper, className)} {...props}>
            {children}
        </div>
    );
};

interface IInfoProps extends TProps {
    title?: string;
}

Details.Info = ({ title, children, className, ...props }: IInfoProps) => {
    return (
        <div className={cn(styles.infoWrapper, className)} {...props}>
            {!!title && <h5 className={styles.title}>{title}</h5>}
            <div className={styles.infoContent}>{children}</div>
        </div>
    );
};

interface IFormProps extends TProps {
    title?: string;
    subtitle?: string;
    noStyle?: boolean;
}

Details.Bottom = ({ title, noStyle, subtitle, children, className, ...props }: IFormProps) => {
    return (
        <div
            className={cn(styles.formWrapper, className, { [styles.noStyle]: noStyle })}
            {...props}
        >
            <div className={styles.top}>
                {!!title && <h6 className={styles.title}>{title}</h6>}
                {!!subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
            <div className={styles.content}>{children}</div>
        </div>
    );
};

interface IImageProps extends TProps {
    images: string[] | string;
}

Details.Image = ({ images }: IImageProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeIndex, setActiveIndex] = useState(0);

    const imagesIsArray = isArray(images) && size(images) > 1;
    const imagesIsString = isString(images);

    const getCurrentImage = () => {
        if (imagesIsArray) {
            return images[activeIndex];
        }

        if (imagesIsString) {
            return images;
        }

        if (size(images) === 1) {
            return images[0];
        }
    };

    const currentImage = getCurrentImage();

    console.log(currentImage);

    return (
        <div className={styles.imageWrapper}>
            {(imagesIsString || size(images) === 1) && (
                <div className={styles.onlyImage}>
                    <img src={currentImage} />
                </div>
            )}
            {imagesIsArray && (
                <div className={styles.arrayImage}>
                    <div className={styles.mainImage}>
                        <img src={currentImage} />
                    </div>

                    <div className={styles.scrollWrapper}>
                        <div className={styles.restImages}>
                            {map(images, (item, index) => (
                                <button className={styles.imgButton}>
                                    <img onClick={setActiveIndex.bind(null, index)} src={item} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export { Details };
