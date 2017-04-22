export const errorLoading = err => {
  console.error("Dynamic page loading failed", err); // eslint-disable-line no-console
};

export const loadModule = cb => components => {
  cb(null, components);
};
