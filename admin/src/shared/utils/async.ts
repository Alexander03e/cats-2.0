export const asyncHandle = async (
    cb: () => Promise<unknown>,
    {
        successMsg,
        errorMsg,
    }:
        | {
              successMsg?: string;
              errorMsg?: string;
          }
        | undefined = {},
) => {
    try {
        const t = await cb();
        if (successMsg) {
            alert(successMsg);
        }

        return t;
    } catch (error) {
        console.error('Async error:', error);
        if (errorMsg) {
            alert(errorMsg);
        }
        throw error;
    }
};
