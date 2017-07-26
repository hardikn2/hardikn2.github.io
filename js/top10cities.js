    var top10citiesSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
  "description": "Top 10 Cities",
  "data": { "url": "data/top10cities.csv"},
  "mark": "bar",
  "encoding": {
    "x": {
      "field": "Total", "type": "quantitative",
      "axis": {"title": "# of Breweries" , "grid":false}
    },
    "y": {
      "field": "City", "type": "nominal",
      "axis": {"title": "City"},
      "sort": {"field": "Total"}
    },
    "color": { "value": "#FFCD5D"},
    "size": {"value": 10},
  }
}

var opt = {
  mode: "vega-lite",
  actions: false
};


vega.embed('#top10citieschart', top10citiesSpec, opt, function(error, result) {
  // result.view is the Vega View, vlSpec is the original Vega-Lite specification
  var tooltipOption = {
    showAllFields: false,
    fields: [
      {
        field: "City",
        title: "City",
        formatType : "string"
      },
      {
        field: "Total",
        title: "Total # of Breweries",
        formatType : "number"
      }
    ],
    delay: 50,
    colorTheme: "light"
  };
  vegaTooltip.vegaLite(result.view, top10citiesSpec,tooltipOption);
  });
