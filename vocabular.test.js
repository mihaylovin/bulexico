const vocabular = require('./vocabular');

test('char map', () => {
    expect(vocabular.getCharsMap("abbacddd")).toEqual({"a": 2, "b":2, "c": 1, "d": 3});
});

test('compare char maps => true', () => {
    expect(vocabular.compareCharsMaps({"a": 2, "b": 1, "c": 3}, {"a": 1, "c": 1})).toBe(true);
});

test('compare char maps => false', () => {
    expect(vocabular.compareCharsMaps({"a": 2, "b": 1, "c": 3}, {"b": 2, "c": 1})).toBe(false);
});

test('compare char maps of words', () => {
    expect(vocabular.compareCharsMaps(vocabular.getCharsMap("абонамент"), vocabular.getCharsMap("мента"))).toBe(true);
});