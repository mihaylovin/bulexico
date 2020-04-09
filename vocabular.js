const fs = require("fs");

const vocabular = () => {
    const words = JSON.parse(fs.readFileSync("./data/all_words_cleaned_up.json")).words;
    console.log("Vocabular initialized. Currently " + words.length + " words in the database");
    const joinedWords = "#" + words.join("##") + "#";
    const testWords = ["абонамент", "керемида", "живот", "паралел", "въртолет", "хамбар", "иконоборец", "евангелист", "майка"];
    return {
        scrambles: (scrambledWords) => {
            const patterns = testWords.map((tw) => {
                return {
                    pattern: prepareRegexCon(tw),
                    original: tw
                }
            });

            return patterns.map(({pattern, original}) => {
                return {
                    original,
                    findings: joinedWords.match(pattern).map((m) => {
                        const matchedWord = m.slice(1, m.length-1);
                        if (matchedWord.length > 1 && compareCharsMaps(getCharsMap(original), getCharsMap(matchedWord)))
                        return matchedWord;
                    }).filter((v) => v != null)
                }
            });
        },

        scrambles2: () => {
            const patterns = testWords.map((tw) => {
                return prepareRegexIt(tw);
            });

            words.forEach((w) => {
                patterns.forEach((p) => {
                    const res = w.match(p);
                    if (res) console.log(res);
                });
            });
        },

        getDuplicates: () => {
            let map = {};
            let result = {};
            words.forEach((w) => {
                if (typeof map[w] !== 'undefined') {
                    map[w]++;
                } else {
                    map[w] = 1;
                }
            })

            Object.keys(map).map((word) => {
                if (map[word] > 1) result[word] = map[word];
            })

            return result;
        },

        getCleanedUpSet: () => {
            let map = {};
            words.forEach((w) => {
                if (typeof map[w] !== 'undefined') {
                    map[w]++;
                } else {
                    map[w] = 1;
                }
            });

            words.map((w) => {
                //check if every word is there
                if (typeof map[w] == 'undefined') {
                    console.log(w + " is missing");
                }
            });

            return Object.keys(map);
        }
    }
}

const prepareRegexIt = (w) => {
    return new RegExp("^["+w+"]+$");
}

const prepareRegexCon = (w) => {
    return new RegExp("#["+w+"]+#", "g");
}

const getCharsMap = (word) => {
    let map = {};
    word.split("").forEach((c) => {
        if (typeof map[c] !== 'undefined') {
            map[c]++;
        } else {
            map[c] = 1;
        }
    });
    return map;
}

const compareCharsMaps = (biggerSet, smallerSet) => {
    let valid = true;
    Object.keys(smallerSet).forEach((c) => {
        valid = valid && (typeof biggerSet[c] !== 'undefined' && smallerSet[c] <= biggerSet[c]);
    });

    return valid;
}

exports = module.exports = vocabular;

exports.getCharsMap = getCharsMap;
exports.compareCharsMaps = compareCharsMaps;
