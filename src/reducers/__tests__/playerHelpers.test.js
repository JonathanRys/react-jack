import { replaceAtIndex, addCard } from "../playerHelpers";

describe("test playerHelpers", () => {
  it("replaces a card at a given index", () => {
    const testArray = ["a", "b", "c"];
    expect(replaceAtIndex(testArray, 2, 0)).toEqual([2, "b", "c"]);
    expect(replaceAtIndex(testArray, 2, 1)).toEqual(["a", 2, "c"]);
    expect(replaceAtIndex(testArray, 2, 2)).toEqual(["a", "b", 2]);
  });

  it("adds an item to a nested array", () => {
    const testArray = [["a", "b", "c"], ["e", "f", "g"], ["i", "j", "k"]];

    expect(addCard(testArray, "d")).toEqual({
      hands: [["a", "b", "c", "d"], ["e", "f", "g"], ["i", "j", "k"]]
    });

    expect(addCard(testArray, "d", 0)).toEqual({
      hands: [["a", "b", "c", "d"], ["e", "f", "g"], ["i", "j", "k"]]
    });

    expect(addCard(testArray, "h", 1)).toEqual({
      hands: [["a", "b", "c"], ["e", "f", "g", "h"], ["i", "j", "k"]]
    });

    expect(addCard(testArray, "l", 2)).toEqual({
      hands: [["a", "b", "c"], ["e", "f", "g"], ["i", "j", "k", "l"]]
    });
  });
});
