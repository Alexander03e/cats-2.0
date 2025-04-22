import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import styles from './Slider.module.scss';
import { ReactNode, useState } from 'react';
import { mockSlides } from '@/Pages/Home/mocks';
import map from 'lodash/map';
import { Button } from '@/Components/Button';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import 'swiper/css';
import SVG from 'react-inlinesvg';
import size from 'lodash/size';

export interface ISlide {
    title?: string;
    description?: string;
    renderButton?: ReactNode;
    onButton?: () => void;
    bgImage?: string;
}

export const HomeSlider = () => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperClass | undefined>(undefined);
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNext = () => {
        swiperInstance?.slideNext();
    };

    const handlePrev = () => {
        swiperInstance?.slidePrev();
    };

    const isNextDisabled = currentSlide === size(mockSlides) - 1;
    const isPrevDisabled = currentSlide === 0;

    return (
        <div className={styles.wrapper}>
            <Swiper
                onSlideChange={swiper => setCurrentSlide(swiper.activeIndex)}
                className={styles.swiper}
                onSwiper={setSwiperInstance}
                spaceBetween={20}
                slidesPerView={1}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                // modules={[Autoplay, Pagination, Navigation]}
            >
                {map(mockSlides, (item, index) => (
                    <SwiperSlide key={`swiper-slide-home-${index}`}>
                        <div className={styles.slide}>
                            <img src={item.bgImage} />
                            <div className={styles.info}>
                                <h6>{item.title}</h6>
                                <p>{item.description}</p>
                                {item?.renderButton || (
                                    <Button onClick={item?.onButton}>Подробнее</Button>
                                )}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                <div className={styles.navigation}>
                    <button onClick={handlePrev} disabled={isPrevDisabled}>
                        <SVG
                            style={{ transform: 'rotate(180deg)' }}
                            src={'/icons/arrow-right.svg'}
                        />
                    </button>
                    <button onClick={handleNext} disabled={isNextDisabled}>
                        <SVG src={'/icons/arrow-right.svg'} />
                    </button>
                </div>
            </Swiper>
        </div>
    );
};
