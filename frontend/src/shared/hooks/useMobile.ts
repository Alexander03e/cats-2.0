import { useLayoutEffect, useState } from 'react';

type IBreakpoints = boolean;

export const useMobile = (): IBreakpoints => {
    const [isMobile, setMobile] = useState<boolean>(false);

    useLayoutEffect(() => {
        if (typeof window === 'undefined') return;

        const mql = window.matchMedia(
            'screen and (max-width: 768px) and (max-height: 1423px) and (orientation: portrait)',
        );

        const handleResize = (event: MediaQueryListEvent | MediaQueryList): void => {
            setMobile(event.matches);
        };

        mql.addEventListener('change', handleResize);
        handleResize(mql);

        return () => mql.removeEventListener('change', handleResize);
    }, []);

    return isMobile;
};
