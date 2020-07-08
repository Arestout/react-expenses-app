## Expenses management app

Personal expenses management web client application (static files) that allows
users to track how much money have they spent.

### `Commands`

**add 2017-04-25 12 USD Jogurt** — adds expense entry to the list of user expenses.
Expenses for various dates could be added in any order.
Command accepts following parameters:
2017-04-25 — is the date when expense occurred<
12 — is an amount of money spent
USD — the currency in which expense occurred
Jogurt — is the name of product purchased

**list** — shows the list of all expenses sorted by date
**clear 2017-04-25** — removes all expenses for specified date, where: 2017-04-25 — is the date for which all expenses should be removed
**total EUR** — this command should take a list of exchange rates from http://fixer.io, calculate the total amount of money spent and present it to user in specified currency, where:
EUR — is the currency in which total amount of expenses should be presented
