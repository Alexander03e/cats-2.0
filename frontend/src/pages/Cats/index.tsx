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
import { useMemo, useState } from 'react';
import { clearObj } from '@/Shared/utils/common.ts';
import { Error } from '@/Components/Error';
import filter from 'lodash/filter';
import size from 'lodash/size';
import { Empty } from '@/Components/Empty';

export const CatsPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const title = 'Наши <span data-accent="true">подопечные</span>';

    const [filters, setFilters] = useState<Record<string, string>>({});

    const params = clearObj(filters);
    const { data, isLoading, isFetching, isError } = useQuery(catsQueries.list(params));

    const handleFiltersChange = (obj: Record<string, string>) => {
        console.log(obj);
        console.log(searchValue);
        setFilters(obj);
    };
    const navigate = useNavigate();

    const searchedValues = useMemo(() => {
        const items = data?.results;
        if (!searchValue) return items;

        return filter(items, item => item.name.toLowerCase()?.includes(searchValue.toLowerCase()));
    }, [data, searchValue]);

    if (isError) {
        return <Error />;
    }

    if (isLoading && !isFetching) {
        return <Loader />;
    }

    return (
        <Section innerClass={styles.inner} contentClass={styles.section} title={title}>
            <Filters
                loading={isFetching}
                onFilter={handleFiltersChange}
                onSearch={setSearchValue}
                className={styles.filters}
                title={'Поиск по кличке'}
                filters={data?.filters}
            />
            <div className={styles.content}>
                {size(searchedValues) > 0 ? (
                    map(searchedValues, (item, index) => (
                        <CatCard
                            onClick={() => navigate(PATHS.CATS_DETAILS.ABSOLUTE(item.id))}
                            status={item.status}
                            className={styles.card}
                            title={item.name}
                            description={item.description}
                            img={getBackendImage(item?.photos?.[0])}
                            key={`our-cats-item-${index}`}
                        />
                    ))
                ) : (
                    <Empty />
                )}
            </div>
        </Section>
    );
};
