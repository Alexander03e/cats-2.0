import { Details } from '@/Components/DetailsTempalates';
import styles from './CatDetails.module.scss';
import { TakeCatForm } from '@/Features/take-cat';
import { useQuery } from '@tanstack/react-query';
import { catsQueries } from '@/Shared/api/cats.ts';
import { useParams } from 'react-router-dom';
import map from 'lodash/map';
import { CatAttribute } from '@/Components/CatAttribute';
import { Loader } from '@/Components/Loader';
import { ECatStatus, EGender, EHealthStatus } from '@/Shared/types/cats.ts';
import isNil from 'lodash/isNil';

const health = {
    [EHealthStatus.HEALTHY]: 'Здоров',
    [EHealthStatus.SICK]: 'Болеет',
    [EHealthStatus.RECOVERING]: 'Восстанавливается',
};

const gender = {
    [EGender.FEMALE]: 'Девочка',
    [EGender.MALE]: 'Мальчик',
};

export const CatDetails = () => {
    const { catId } = useParams();

    const { data, isLoading } = useQuery(catsQueries.detail(catId!));

    if (isLoading) {
        return <Loader />;
    }

    if (!data) return null;

    return (
        <Details className={styles.wrapper}>
            <Details.Image needBackendSuffixImg images={data?.photos} />
            <Details.Info title={data.name}>
                <div className={styles.attributes}>
                    {!isNil(data?.age) && <CatAttribute>Возраст (годы): {data.age}</CatAttribute>}
                    {!isNil(data?.color) && <CatAttribute>Цвет: {data.color}</CatAttribute>}
                    {!isNil(data?.breed) && <CatAttribute>Порода: {data.breed}</CatAttribute>}
                    {!isNil(data?.gender) && <CatAttribute>{gender[data.gender]}</CatAttribute>}
                    {!isNil(data?.health_status) && (
                        <CatAttribute>{health[data.health_status]}</CatAttribute>
                    )}
                    {map(data?.attributes, (item, index) => {
                        return <CatAttribute key={`atr-cat-${index}`}>{item}</CatAttribute>;
                    })}
                </div>
                <div className={styles.desc}>{data.description}</div>
            </Details.Info>
            {data?.status !== ECatStatus.ADOPTED && (
                <Details.Bottom
                    title={'Забрать котика'}
                    subtitle={
                        'Если вас заинтересовал этот котик, оставьте свои контакты, мы с вами свяжемся.'
                    }
                >
                    <div className={styles.form}>
                        <TakeCatForm id={String(catId)} />
                    </div>
                </Details.Bottom>
            )}
        </Details>
    );
};
