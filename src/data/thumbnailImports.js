function importAll(r) {
  const images = {};
  r.keys().forEach((key) => {
    const name = key.replace(/^.*[\\/]/, "").replace(/\.\w+$/, ""); // strip folder & extension
    images[name] = r(key);
  });
  return images;
}

const songThumbnails = importAll(
  require.context("../images/songThumbnails", false, /\.(png|jpe?g|svg)$/)
);

const videoThumbnails = importAll(
  require.context("../images/videoThumbnails", false, /\.(png|jpe?g|svg)$/)
);

export { songThumbnails, videoThumbnails };
