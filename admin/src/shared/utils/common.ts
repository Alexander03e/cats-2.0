import isUndefined from 'lodash/isUndefined';
import omitBy from 'lodash/omitBy';

export const clearObj = <T extends Record<string, unknown>>(obj: T): T => {
    return omitBy(obj, isUndefined) as T;
};
