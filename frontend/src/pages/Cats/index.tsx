import styles from './CatsPage.module.scss';
import { Section } from '@/Components/Section';
import map from 'lodash/map';
import { CatCard } from '@/Components/CatCard';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/Shared/consts';
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

export const CatsPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const title = 'Наши <span data-accent="true">подопечные</span>';
    const [openedFilers, setOpenedFilters] = useState(false);
    const isMobile = useMobile();

    const [filters, setFilters] = useState<Record<string, string>>({});

    const params = clearObj(filters);
    const { data, isLoading, isFetching, isError } = useQuery(catsQueries.list(params));

    const handleFiltersChange = (obj: Record<string, string>) => {
        setFilters(obj);
    };
    const navigate = useNavigate();

    const searchedValues = useMemo(() => {
        const items = data?.results;
        if (!searchValue) return items;

        return filter(items, item => item.name.toLowerCase()?.includes(searchValue.toLowerCase()));
    }, [data, searchValue]);

    useEffect(() => {
        document.body.style.overflow = openedFilers ? 'hidden' : 'auto';
    }, [openedFilers]);

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
                        <p>Фильтры</p>
                    </button>

                    <AnimatePresence>
                        {openedFilers && (
                            <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
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
                                    loading={isFetching}
                                    onFilter={handleFiltersChange}
                                    onSearch={setSearchValue}
                                    className={styles.filters}
                                    title={'Поиск по кличке'}
                                    filters={data?.filters}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}

            <div className={styles.content}>
                {size(searchedValues) > 0 ? (
                    map(searchedValues, item => (
                        <CatCard
                            onClick={() => navigate(PATHS.CATS_DETAILS.ABSOLUTE(item.id))}
                            status={item.status}
                            className={styles.card}
                            title={item.name}
                            description={item?.short_description}
                            img={getBackendImage(item?.photos?.[0])}
                            key={`our-cats-item-${item.id}`}
                        />
                    ))
                ) : (
                    <Empty />
                )}
            </div>
        </Section>
    );
};
