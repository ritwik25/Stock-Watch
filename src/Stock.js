import React from 'react';
import Plot from 'react-plotly.js';

class Stock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: [],
            StockSymbol: ""
        }
    }


    componentDidMount() {
        this.fetchStock();
    }

    fetchStock() {
        let pointerToThis = this;
        const API_KEY = demo;
        const StockSymbol = 'AMZN';
        let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];

        fetch(API_CALL)
            .then(
                function (response) {
                    return response.json();
                }
            )
            .then(
                function (data) {
                    console.log(data)

                    for (var key in data['Time Series (Daily)']) {
                        stockChartXValuesFunction.push(key);
                        stockChartYValuesFunction.push(data['Time Series (Daily)'][key]["1. open"]);
                    }
                    // console.log(stockChartYValuesFunction);

                    pointerToThis.setState({
                        stockChartXValues: stockChartXValuesFunction,
                        stockChartYValues: stockChartYValuesFunction,
                        StockSymbol: StockSymbol
                    })
                }
            )
    }

    render() {
        return (
            <div>
                <h1>Stock Market</h1>
                <p></p>

                <Plot
                    data={[
                        {
                            x: this.state.stockChartXValues,
                            y: this.state.stockChartYValues,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: 'red' },
                        },
                        
                    ]}
                    layout={{ width: 1920, height: 500, title: this.state.StockSymbol }}
                />

            </div>
        )
    }
}

export default Stock;