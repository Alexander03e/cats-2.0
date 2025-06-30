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
    onSubmitClick?: () => void;
    loading?: boolean;
    isMobile?: boolean;
}

export const Filters = ({
    filters = {},
    title,
    className,
    onFilter,
    onChange,
    onSearch,
    loading,
    onSubmitClick,
    isMobile = false,
}: IFilterProps) => {
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
    const [searchValue, setSearchValue] = useState('');
    const [mobileFilters, setMobileFilters] = useState<Record<string, string>>({});

    const handleFilterChange = (filterKey: string, itemKey: string) => {
        const newSelectedFilters = isMobile ? { ...mobileFilters } : { ...selectedFilters };

        const currentValue = newSelectedFilters[filterKey]?.split(',').filter(Boolean) || [];
        if (currentValue.includes(itemKey)) {
            newSelectedFilters[filterKey] = currentValue
                .filter(value => value !== itemKey)
                .join(',');
        } else {
            newSelectedFilters[filterKey] = [...currentValue, itemKey].join(',');
        }

        if (isMobile) {
            setMobileFilters(newSelectedFilters);
        } else {
            setSelectedFilters(newSelectedFilters);
            if (onChange) {
                onChange(filterKey, newSelectedFilters[filterKey]);
            }
        }
    };

    const handleResetGroup = (filterKey: string) => {
        if (isMobile) {
            setMobileFilters(prev => ({ ...prev, [filterKey]: '' }));
        } else {
            setSelectedFilters(prev => {
                const newFilters = { ...prev, [filterKey]: '' };
                if (onChange) {
                    onChange(filterKey, '');
                }
                return newFilters;
            });
        }
    };

    const handleResetAll = () => {
        if (isMobile) {
            setMobileFilters({});
            setSelectedFilters({});
            setSearchValue('');
            onSearch?.('');
            onSubmitClick?.();
        } else {
            setSelectedFilters({});
            Object.keys(filters).forEach(filterKey => {
                if (onChange) {
                    onChange(filterKey, '');
                }
            });
        }
    };

    const handleApplyFilters = () => {
        setSelectedFilters(mobileFilters);
        onSubmitClick?.();
        Object.entries(mobileFilters).forEach(([filterKey, value]) => {
            if (onChange) {
                onChange(filterKey, value);
            }
        });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
    };

    useEffect(() => {
        const nonEmptyFilters = Object.fromEntries(
            Object.entries(selectedFilters).filter(([_, value]) => value.trim() !== ''),
        );
        onFilter?.(nonEmptyFilters);
    }, [selectedFilters]);

    if (isMobile) {
        return (
            <div style={{ height: 'fit-content' }} className={cn(styles.wrapper, className)}>
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
                                <Button
                                    onClick={() => {
                                        onSearch?.(searchValue);
                                        onSubmitClick?.();
                                    }}
                                >
                                    Найти
                                </Button>
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
                                        {FilterTranslate[
                                            filterKey as keyof typeof FilterTranslate
                                        ] || filterKey}
                                    </h4>
                                </div>
                                <div className={styles.items}>
                                    {Object.entries(filterItems).map(([itemKey, itemValue]) => {
                                        const currentValue =
                                            mobileFilters[filterKey]?.split(',') || [];
                                        const isChecked = currentValue.includes(itemKey);

                                        return (
                                            <label key={itemKey} className={styles.filterItem}>
                                                <input
                                                    type='checkbox'
                                                    name={filterKey}
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
                <div className={styles.mobileButtons}>
                    <Button onClick={handleResetAll} variant='default'>
                        Сбросить
                    </Button>
                    <Button onClick={handleApplyFilters}>Применить</Button>
                </div>
            </div>
        );
    }

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
                                    const currentValue =
                                        selectedFilters[filterKey]?.split(',') || [];
                                    const isChecked = currentValue.includes(itemKey);

                                    return (
                                        <label key={itemKey} className={styles.filterItem}>
                                            <input
                                                type='checkbox'
                                                name={filterKey}
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
