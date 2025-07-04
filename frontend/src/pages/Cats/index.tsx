import styles from './CatsPage.module.scss';
import { Section } from '@/Components/Section';
import map from 'lodash/map';
import { CatCard } from '@/Components/CatCard';
import { useNavigate } from 'react-router-dom';
import { PATHS, UNAVAILABLE_CATS } from '@/Shared/consts';
import { useQuery } from '@tanstack/react-query';
import { catsQueries } from '@/Shared/api/cats.ts';
import { getBackendImage } from '@/Shared/utils/getImage.ts';
import { Loader } from '@/Components/Loader';
import { Filters } from '@/Components/Filters';
import { useEffect, useMemo, useState } from 'react';
import { clearObj } from '@/Shared/utils/common.ts';
import { Error } from '@/Components/Error';
import filter from 'lodash/filter';
import size from 'lodash/size';
import { Empty } from '@/Components/Empty';
import { useMobile } from '@/Shared/hooks/useMobile.ts';
import SVG from 'react-inlinesvg';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { includes, split, values } from 'lodash';
import { Button } from '@/Components/Button';

export const CatsPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const title = 'Наши <span data-accent="true">подопечные</span>';
    const [openedFilers, setOpenedFilters] = useState(false);
    const isMobile = useMobile();
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [visibleCount, setVisibleCount] = useState(6);

    const params = clearObj(filters);
    const { data, isLoading, isFetching, isError } = useQuery(catsQueries.list(params));

    const handleFiltersChange = (obj: Record<string, string>) => {
        setFilters(obj);
    };
    const navigate = useNavigate();

    const searchedValues = useMemo(() => {
        const items = filter(data?.results, item => !includes(UNAVAILABLE_CATS, item.status));
        if (!searchValue) return items;

        return filter(items, item => item.name.toLowerCase()?.includes(searchValue.toLowerCase()));
    }, [data, searchValue]);

    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 6); // Increase visible items by 6
    };

    useEffect(() => {
        document.body.style.overflow = openedFilers ? 'hidden' : 'auto';
    }, [openedFilers]);

    const filtersSize = size(map(values(filters), item => split(item, ',')).flat());

    if (isError) {
        return <Error />;
    }

    if (isLoading && !isFetching) {
        return <Loader />;
    }

    return (
        <Section innerClass={styles.inner} contentClass={styles.section} title={title}>
            {!isMobile && (
                <Filters
                    loading={isFetching}
                    onFilter={handleFiltersChange}
                    onSearch={setSearchValue}
                    title={'Поиск по кличке'}
                    className={styles.filters}
                    filters={data?.filters}
                />
            )}
            {isMobile && (
                <>
                    <button className={styles.filtersBtn} onClick={() => setOpenedFilters(true)}>
                        <SVG src={'/icons/filters.svg'} />
                        <p>
                            Фильтры{' '}
                            {filtersSize > 0 && (
                                <span className={styles.counter}>{filtersSize}</span>
                            )}
                        </p>
                    </button>

                    <AnimatePresence>
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: openedFilers ? 0 : '-100%' }}
                            exit={{ x: '-100%' }}
                            transition={{ duration: 0.3 }}
                            className={cn(styles.mobileFilters, {
                                [styles.opened]: openedFilers,
                            })}
                        >
                            <div className={styles.filtersTop}>
                                <p>Фильтры</p>
                                <button onClick={() => setOpenedFilters(false)}>
                                    <SVG src={'/icons/close.svg'} />
                                </button>
                            </div>
                            <Filters
                                isMobile
                                onSubmitClick={() => {
                                    setOpenedFilters(false);
                                }}
                                loading={isFetching}
                                onFilter={handleFiltersChange}
                                onSearch={setSearchValue}
                                className={styles.filters}
                                title={'Поиск по кличке'}
                                filters={data?.filters}
                            />
                        </motion.div>
                    </AnimatePresence>
                </>
            )}

            {size(searchedValues) > 0 ? (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 12,
                    }}
                >
                    <div className={styles.content}>
                        <>
                            {map(searchedValues.slice(0, visibleCount), item => (
                                <CatCard
                                    onClick={() => navigate(PATHS.CATS_DETAILS.ABSOLUTE(item.id))}
                                    status={item.status}
                                    className={styles.card}
                                    title={item.name}
                                    description={item?.short_description}
                                    img={getBackendImage(item?.photos?.[0])}
                                    key={`our-cats-item-${item.id}`}
                                />
                            ))}
                        </>
                    </div>
                    {visibleCount < size(searchedValues) && (
                        <Button
                            style={{ margin: '0 auto' }}
                            variant={'light'}
                            className={styles.showMoreBtn}
                            onClick={handleShowMore}
                        >
                            Показать ещё
                        </Button>
                    )}
                </div>
            ) : (
                <Empty />
            )}
        </Section>
    );
};
