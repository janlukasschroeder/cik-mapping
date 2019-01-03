# sec.gov EDGAR CIK-Ticker-Name Mapping

https://mapping-api.herokuapp.com

# Endpoints

GET:

- `/cik/:cik`
- `/ticker/:ticker`
- `/name/:name`
- `/exchange/:exchange`
- `/sic/:sic`
- `/irs/:irs`

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
    "industryTitle": "WHOLESALE-ELECTRONIC PARTS & EQUIPMENT, NEC",
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
    "industryTitle": "MOTOR VEHICLES & PASSENGER CAR BODIES",
    "irs": "912197729"
  },
  {
    "cik": "0000863456",
    "ticker": "WTSLA",
    "name": "Wet Seal Inc",
    "sic": "5621",
    "industryTitle": "RETAIL-WOMEN'S CLOTHING STORES",
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
    "industryTitle": "MOTOR VEHICLES & PASSENGER CAR BODIES",
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
    "industryTitle": "MOTOR VEHICLES & PASSENGER CAR BODIES",
    "irs": "912197729"
  }
]
```

Using `Tesla` or `TESLA MOTORS` returns the same result.

## List Companies by Exchange

Request: GET https://mapping-api.herokuapp.com/exchange/:exchange

Replace `:exchange` at the end of the URL with the exchange you are looking for, e.g. NASDAQ, or NYSE.

You can use regular expressions to retrieve companies listed on different exchanges. For example, if you want to list all companies listed on NASDAQ and NYSE, you can use `https://mapping-api.herokuapp.com/exchange/NASDAQ|NYSE`

Example: https://mapping-api.herokuapp.com/exchange/NASDAQ

Response:

    [
        {
            "cik": "0001099290",
            "ticker": "AAC",
            "name": "Sinocoking Coal & Coke Chemical Industries Inc",
            "sic": "3312",
            "exchange": "NASDAQ",
            "irs": "593404233"
        },
        {
            "cik": "0000006201",
            "ticker": "AAL",
            "name": "American Airlines Group Inc",
            "sic": "4512",
            "exchange": "NASDAQ",
            "irs": "751825172"
        },
        {
            "cik": "0000008177",
            "ticker": "AAME",
            "name": "Atlantic American Corp",
            "sic": "6311",
            "exchange": "NASDAQ",
            "irs": "581027114"
        },
        // cut for brevity
    ]

# Data Integrity

Update CSV every 12 hours

# Heroku

```bash
heroku logs --tail -a mapping-api
```
