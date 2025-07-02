import { Empty } from '@/Components/Empty';
import { Button } from '@/Components/Button';
import { useNavigate } from 'react-router-dom';

export const InDevelop = () => {
    const navigate = useNavigate();

    const handleBack = () => navigate(-1);

    return (
        <Empty title={'Раздел в разработке...'}>
            <div style={{ display: 'flex', gap: '16px', paddingBottom: 24 }}>
                <Button onClick={handleBack}>Вернуться назад</Button>
            </div>
        </Empty>
    );
};
