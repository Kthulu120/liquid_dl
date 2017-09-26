def findPotentialInsiderTraders(datafeed):
    trades = []
    stock_changes = []
    flagged = []
    s = 0
    for x in datafeed:
        if s is not 0:
            if x.count("|") is 1:
                stock_changes.append(x.split("|"))
            else:
                trades.append(x.split("|"))
        else:
            s += 1
    for trade in trades:
        # day | Trader | Trade Type | Amt
        this_trade = (int(trade[0]), trade[1], trade[2], int(trade[3]))
        our_range = range((this_trade[0]) - 3, (this_trade[0]) + 3)
        last_amt = (int(stock_changes[0][0]), int(stock_changes[1][1]))

        for stock_change in stock_changes:
            # DAY | Stock Price
            stock_change = (int(stock_change[0]), int(stock_change[1]))

            if stock_change[0] in our_range:
                if this_trade[2] == "BUY":
                    if ((stock_change[1] - last_amt[1]) * this_trade[3]) >= 500000:
                        flagged.append(str(trade[0]) + "|" + str(trade[1]))
                if this_trade[2] == "SELL" and ((stock_change[1] - last_amt[1]) * this_trade[3] * -1) >= 500000:
                    flagged.append(str(trade[0]) + "|" + str(trade[1]))
    if flagged:
        return flagged
    else:
        return ["ALL CLEAR"]
