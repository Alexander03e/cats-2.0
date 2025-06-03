import { useLayoutEffect, useState } from 'react';

type IBreakpoints = boolean;

export const useMobile = (breakpoint?: number): IBreakpoints => {
    const [isMobile, setMobile] = useState<boolean>(false);

    useLayoutEffect(() => {
        if (typeof window === 'undefined') return;

        const mql = window.matchMedia(`screen and (max-width: ${breakpoint || 768}px)`);

        const handleResize = (event: MediaQueryListEvent | MediaQueryList): void => {
            setMobile(event.matches);
        };

        mql.addEventListener('change', handleResize);
        handleResize(mql);

        return () => mql.removeEventListener('change', handleResize);
    }, [breakpoint]);

    return isMobile;
};
