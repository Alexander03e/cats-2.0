import { BeatLoader } from 'react-spinners';

export const Loader = () => {
    return (
        <>
            <div
                style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                }}
            />
            <BeatLoader color={'white'} style={{ position: 'fixed', top: '50%', left: '50%' }} />
        </>
    );
};
