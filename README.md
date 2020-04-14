# bulexico

A Node JS app with operations over (not) all the words in the Bulgarian language

# Usage

To instal:

```sh
npm install
```
or
```sh
yarn install
```

To start:

```sh
npm start
```
or
```sh
yarn start
```


# REST API

### POST /scrambles 
Get all the words in the dictionary, which can be constructed using the letters of each parameter word.

**Request** - an arrays of words
```
["дума", "магьосница"]
```

**Response** - an object of scrambles, where each parameter word is a key and the value are the scrambles
```
{
    "дума": ["ум", "да", "дума", ...],
    "магьосница": ["сьомга", "гьон", "магьосница", ...]
}
```

### POST /extended-anagrams 
Get all words in the dictionary, which contain at least all the letters in the parameter word.

**Request** - an arrays of words
```
["гьон", "дюля"]
```

**Response** - an object of extended anagrams, where each parameter word is a key and the value are the anagrams
```
{
  'гьон': ['гьон', 'гальовен', 'магьосен', ...],
  'дюля': ['гюрултаджия', 'дюстабанлия', 'хилядадюймов', 'дюля', ...]
}

```