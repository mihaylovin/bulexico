const fs = require("fs");

const vocabular = () => {
    const words = JSON.parse(fs.readFileSync("./data/all_words_cleaned_up.json")).words;
    console.log("Vocabular initialized. Currently " + words.length + " words in the database");
    const joinedWords = "#" + words.join("##") + "#";
    const alphabet = "абвгдежзийклмнопрстуфхцчшщъьюя";
    const testWords = ["абонамент", "керемида", "живот", "паралел", "въртолет", "хамбар", "иконоборец", "евангелист", "майка"];
    return {
        getAlphabet: () => {
            return alphabet;
        },

        scrambles: (scrambledWords) => {
            const patterns = scrambledWords.map((sw) => {
                return {
                    pattern: prepareRegexCon(sw),
                    original: sw
                }
            });

            return patterns.map(({pattern, original}) => {
                return {
                    original,
                    scrambles: joinedWords.match(pattern).map((m) => {
                        const matchedWord = m.slice(1, m.length-1);
                        //remove one letter words and words using letters more letters than the original
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

        getExtendedAnagrams: (searchWords, max = 13) => {
            let anagrams = {};

            const patterns = searchWords.map((word) => {
                anagrams[word] = [];
                let charsPattern = constructCharMapPattern(word);
                return {original: word, p: new RegExp("^" + charsPattern + ".{" + word.length + "," + max + "}$", "i")};
            });

            words.forEach((w) => {
                patterns.forEach((pattern) => {
                    const match = w.match(pattern.p);

                    if (match) {
                        anagrams[pattern.original].push(match[0]);
                    }
                });
                
            });

            console.log(anagrams);

            return anagrams;
        },

        getCleanedUpSet: () => {
            //remove duplicate words
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

            let cleaned_up_words = Object.keys(map);
            //Remove names
            cleaned_up_words.filter((w) => {
                return alphabet.indexOf(w[0]) > -1;
            })
            //remove prefixes
            .filter((w) => {
                return w.match(/-$/) == null;
            })

            return Object.keys(map);
        },

        getStatistics: () => {
            let letterStatsGlobal = stringToObjectKeys(alphabet, 0);
            let mostUsedInASingleWord = stringToObjectKeys(alphabet, 0);
            let wordLengths = []

            words.forEach((w) => {
                wordLengths[w.length] = wordLengths[w.length] ? ++wordLengths[w.length] : 1;
                const wordLetters = getCharsMap(w);
                Object.keys(wordLetters).forEach((l) => {
                    letterStatsGlobal[l] += wordLetters[l];
                    if (wordLetters[l] > mostUsedInASingleWord[l]) mostUsedInASingleWord[l] = wordLetters[l];
                });
            });

            return {letterStatsGlobal, mostUsedInASingleWord, wordLengths};
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
    word.replace(" ", "").split("").forEach((c) => {
        if (typeof map[c] !== 'undefined') {
            map[c]++;
        } else {
            map[c] = 1;
        }
    });
    return map;
}

const constructCharMapPattern = (word) => {
    const cMap = getCharsMap(word);
    let cmRegex = "";
    for(const k in cMap) {
        cmRegex += "(?=.*";
        for(let i = 0; i < cMap[k]; i++) {
            cmRegex += k + ".*";
        }

        cmRegex += ")";
    }

    return cmRegex;
}

const stringToObjectKeys = (str, initialValue = 1) => {
    let obj = {}

    str.split("").forEach((c) => {
        obj[c] = initialValue;
    });

    return obj;
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
exports.constructCharMapPattern = constructCharMapPattern;
