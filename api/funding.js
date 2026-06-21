export default async function handler(req, res) {
    const response = await fetch(
        "https://fapi.binance.com/fapi/v1/premiumIndex?symbol=BTCUSDT"
    );

    const data = await response.json();

    res.status(200).json({
        symbol: data.symbol,
        fundingRate: data.lastFundingRate,
        markPrice: data.markPrice
    });
}
