import styles from './Filters.module.scss';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import size from 'lodash/size';
import { Button } from '@/Components/Button';
import { BeatLoader } from 'react-spinners';

export interface IFilterItem {
    [key: string]: string;
}

const FilterTranslate = {
    gender: 'Пол',
    coat_type: 'Тип шерсти',
    health_status: 'Статус здоровья',
    color: 'Цвет',
};

export interface IFilterProps {
    className?: string;
    title: string;
    onSearch?: (value: string) => void;
    filters?: Record<string, IFilterItem>;
    onChange?: (key: string, value: string) => void;
    onFilter?: (obj: Record<string, string>) => void;
    loading?: boolean;
}

export const Filters = ({
    filters = {},
    title,
    className,
    onFilter,
    onChange,
    onSearch,
    loading,
}: IFilterProps) => {
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
    const [searchValue, setSearchValue] = useState('');

    const handleFilterChange = (filterKey: string, itemKey: string) => {
        const newSelectedFilters = { ...selectedFilters };

        // Для радио-кнопок просто устанавливаем новое значение
        newSelectedFilters[filterKey] = itemKey;

        setSelectedFilters(newSelectedFilters);

        if (onChange) {
            onChange(filterKey, itemKey);
        }
    };

    const handleResetGroup = (filterKey: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setSelectedFilters(prev => {
            const newFilters = { ...prev, [filterKey]: null };

            if (onChange) {
                onChange(filterKey, '');
            }

            return newFilters;
        });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
    };

    useEffect(() => {
        onFilter?.(selectedFilters);
    }, [selectedFilters]);

    return (
        <div className={cn(styles.wrapper, className)}>
            <div className={styles.top}>
                <div className={styles.topTitle}>
                    <h3 className={styles.title}>{title}</h3>
                    {loading && <BeatLoader color={'var(--accent-color)'} size={6} />}
                </div>
                <div className={styles.search}>
                    {onSearch && (
                        <>
                            <input
                                type='text'
                                placeholder='Поиск...'
                                value={searchValue}
                                onChange={handleSearchChange}
                                className={styles.searchInput}
                            />
                            <Button onClick={() => onSearch?.(searchValue)}>Найти</Button>
                        </>
                    )}
                </div>
            </div>
            <div className={styles.filters}>
                {size(filters) > 0 &&
                    Object.entries(filters).map(([filterKey, filterItems]) => (
                        <div key={filterKey} className={styles.group}>
                            <div className={styles.groupTop}>
                                <h4 className={styles.title}>
                                    {FilterTranslate[filterKey as keyof typeof FilterTranslate] ||
                                        filterKey}
                                </h4>
                                <button onClick={handleResetGroup.bind(null, filterKey)}>
                                    Очистить
                                </button>
                            </div>
                            <div className={styles.items}>
                                {Object.entries(filterItems).map(([itemKey, itemValue]) => {
                                    const isChecked = selectedFilters[filterKey] === itemKey;
                                    return (
                                        <label key={itemKey} className={styles.filterItem}>
                                            <input
                                                type='radio'
                                                name={filterKey} // Группируем радио-кнопки по name
                                                checked={isChecked}
                                                onChange={() =>
                                                    handleFilterChange(filterKey, itemKey)
                                                }
                                                className={styles.radio}
                                            />
                                            <span
                                                className={cn(styles.radioMark, {
                                                    [styles.radioMarkChecked]: isChecked,
                                                })}
                                            />
                                            <span className={styles.checkmark}></span>
                                            {itemValue}
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};
