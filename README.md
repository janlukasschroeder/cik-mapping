# sec.gov EDGAR CIK-Ticker-Name Mapping

https://mapping-api.herokuapp.com

# Endpoints

GET:

- `/cik/:cik`
- `/ticker/:ticker`
- `/name/:name`

Uses regular expressions. Returns an array.

# Examples

## By CIK

Request:
GET `https://mapping-api.herokuapp.com/cik/0000927355`

Response:

```json
[
  {
    "cik": "0000927355",
    "ticker": "TESS",
    "name": "Tessco Technologies Inc",
    "sic": "5065",
    "irs": "520729657"
  }
]
```

Removing trailing `0` from the CIK also works. Instead of using `0000927355`,
you can use `927355`.

## By Ticker

Request:
GET `https://mapping-api.herokuapp.com/ticker/tsla`

Response:

```json
[
  {
    "cik": "0001318605",
    "ticker": "TSLA",
    "name": "Tesla Motors Inc",
    "sic": "3711",
    "irs": "912197729"
  },
  {
    "cik": "0000863456",
    "ticker": "WTSLA",
    "name": "Wet Seal Inc",
    "sic": "5621",
    "irs": "330415940"
  }
]
```

Note: two companies are returned because `WTSLA` contains `tsla`.
If you only want to retrieve exact matches, then use `^` as prefix,
and `$` as suffix. For example, `^tsla&` (see below).

Request:
GET `https://mapping-api.herokuapp.com/ticker/^tsla$`

Response:

```json
[
  {
    "cik": "0001318605",
    "ticker": "TSLA",
    "name": "Tesla Motors Inc",
    "sic": "3711",
    "irs": "912197729"
  }
]
```

## By Name

Request:
GET `https://mapping-api.herokuapp.com/name/Tesla`

```json
[
  {
    "cik": "0001318605",
    "ticker": "TSLA",
    "name": "Tesla Motors Inc",
    "sic": "3711",
    "irs": "912197729"
  }
]
```

Using `Tesla` or `TESLA MOTORS` returns the same result.

# Data Integrity

Update CSV every 12 hours

# Heroku

```bash
heroku logs --tail -a mapping-api
```
