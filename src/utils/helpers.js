export const changeFavicon = (img) => {
  const link = document.querySelector('link[rel="icon"]');
  link.setAttribute("href", img);
};
