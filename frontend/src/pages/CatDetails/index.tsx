import { Details } from '@/Components/DetailsTempalates';
import styles from './CatDetails.module.scss';
import { TakeCatForm } from '@/Features/take-cat';
import { useQuery } from '@tanstack/react-query';
import { catsQueries } from '@/Shared/api/cats.ts';
import { useNavigate, useParams } from 'react-router-dom';
import map from 'lodash/map';
import { CatAttribute } from '@/Components/CatAttribute';
import { Loader } from '@/Components/Loader';
import { ECatStatus, EGender, EHealthStatus } from '@/Shared/types/cats.ts';
import isNil from 'lodash/isNil';
import SVG from 'react-inlinesvg';
import { useMobile } from '@/Shared/hooks/useMobile.ts';
import { PATHS } from '@/Shared/consts';

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

    const isMobile = useMobile();
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(PATHS.CATS);
    };

    if (isLoading) {
        return <Loader />;
    }

    if (!data) return null;

    return (
        <>
            {isMobile && (
                <div className={styles.mobileTitle}>
                    <button onClick={handleBack}>
                        <SVG src={'/icons/arrow-back-btn.svg'} />
                    </button>
                    <p>Ко всем животным</p>
                </div>
            )}
            <Details className={styles.wrapper}>
                <Details.Image needBackendSuffixImg images={data?.photos} />
                <Details.Info title={data.name}>
                    <div className={styles.attributes}>
                        {!isNil(data?.age) && (
                            <CatAttribute>Возраст (годы): {data.age}</CatAttribute>
                        )}
                        {!isNil(data?.color) && <CatAttribute>Цвет: {data.color}</CatAttribute>}
                        {!isNil(data?.breed) && <CatAttribute>Порода: {data.breed}</CatAttribute>}
                        {!isNil(data?.gender) && <CatAttribute>{gender[data.gender]}</CatAttribute>}
                        {!isNil(data?.health_status) && (
                            <CatAttribute>{health[data.health_status]}</CatAttribute>
                        )}
                        {map(data?.attributes, (item, index) => {
                            return (
                                <CatAttribute key={`atr-cat-${index}`}>{item.name}</CatAttribute>
                            );
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
        </>
    );
};
