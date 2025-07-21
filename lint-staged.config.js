// @ts-check

/** @type {Record<string, string[]>} */
export default {
  '*.{js,ts}': ['prettier --write --ignore-unknown', 'eslint --fix'],
};
