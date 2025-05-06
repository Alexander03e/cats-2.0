import { Details } from '@/Components/DetailsTempalates';
import styles from './CatDetails.module.scss';
import { TakeCatForm } from '@/Features/take-cat';
import { useQuery } from '@tanstack/react-query';
import { catsQueries } from '@/Shared/api/cats.ts';
import { useParams } from 'react-router-dom';
import map from 'lodash/map';
import { CatAttribute } from '@/Components/CatAttribute';
import size from 'lodash/size';
import { Loader } from '@/Components/Loader';

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
                {size(data?.attributes) > 0 && (
                    <div className={styles.attributes}>
                        {map(data?.attributes, (item, index) => {
                            return <CatAttribute key={`atr-cat-${index}`}>{item}</CatAttribute>;
                        })}
                    </div>
                )}
                <div className={styles.desc}>{data.description}</div>
            </Details.Info>
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
        </Details>
    );
};
