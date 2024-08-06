/**
 *Here are some reusable method that will interact with local-storage
 */

/**
 * @param {key} to get the target item
 * @returns {value}
 */
export const getItem = (key: string): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
};

/**
 * @param {key} to set the target item
 */
export const setItem = (key: string, value: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  }
};

/**
 * @param {key} to removed the target item
 */
export const removeItem = (key: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

/**
 * destroy local-storage
 */
export const destroyLocalStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.clear();
  }
};
