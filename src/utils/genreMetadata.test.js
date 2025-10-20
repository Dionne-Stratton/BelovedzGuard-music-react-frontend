import {
  getGenreMetadata,
  getGenreIcon,
  getGenreLabel,
  GENRE_META,
  DEFAULT_META,
} from "./genreMetadata";

describe("Genre Metadata Utilities", () => {
  describe("getGenreMetadata", () => {
    test("returns correct metadata for known genres", () => {
      const rockMeta = getGenreMetadata("Rock");
      expect(rockMeta).toEqual({ icon: "🎸", label: "Rock" });

      const popMeta = getGenreMetadata("Pop");
      expect(popMeta).toEqual({ icon: "⭐", label: "Pop" });
    });

    test("returns default metadata for unknown genres", () => {
      const unknownMeta = getGenreMetadata("UnknownGenre");
      expect(unknownMeta).toEqual(DEFAULT_META);
    });

    test("returns default metadata for undefined input", () => {
      const undefinedMeta = getGenreMetadata();
      expect(undefinedMeta).toEqual(DEFAULT_META);
    });
  });

  describe("getGenreIcon", () => {
    test("returns correct icon for known genres", () => {
      expect(getGenreIcon("Rock")).toBe("🎸");
      expect(getGenreIcon("Pop")).toBe("⭐");
      expect(getGenreIcon("Ballad")).toBe("💖");
    });

    test("returns default icon for unknown genres", () => {
      expect(getGenreIcon("UnknownGenre")).toBe(DEFAULT_META.icon);
    });
  });

  describe("getGenreLabel", () => {
    test("returns correct label for known genres", () => {
      expect(getGenreLabel("Rock")).toBe("Rock");
      expect(getGenreLabel("Pop")).toBe("Pop");
      expect(getGenreLabel("Ballad")).toBe("Ballad");
    });

    test("returns default label for unknown genres", () => {
      expect(getGenreLabel("UnknownGenre")).toBe(DEFAULT_META.label);
    });
  });

  describe("GENRE_META constant", () => {
    test("contains expected genres", () => {
      expect(GENRE_META).toHaveProperty("Rock");
      expect(GENRE_META).toHaveProperty("Pop");
      expect(GENRE_META).toHaveProperty("Ballad");
      expect(GENRE_META).toHaveProperty("Theatrical");
      expect(GENRE_META).toHaveProperty("Praise");
    });

    test("each genre has icon and label", () => {
      Object.values(GENRE_META).forEach((genre) => {
        expect(genre).toHaveProperty("icon");
        expect(genre).toHaveProperty("label");
        expect(typeof genre.icon).toBe("string");
        expect(typeof genre.label).toBe("string");
      });
    });
  });
});
