const rawCardImages = import.meta.glob(
  "../assets/Playing_Cards/SVG-cards-1.3/*.svg",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

// Make the keys like "queen_of_clubs"
const cardImages = Object.fromEntries(
  Object.entries(rawCardImages).map(([fullPath, url]) => {
    const fileName = fullPath.split("/").pop().replace(".svg", "");
    return [fileName, url];
  })
);

export default cardImages;
