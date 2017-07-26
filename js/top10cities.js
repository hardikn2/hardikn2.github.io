    var yourVlSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
  "description": "Top 10 Cities",
  "data": { "url": "data/top10cities.csv"},
  "mark": "bar",
  "encoding": {
    "x": {
      "field": "Total", "type": "quantitative",
      "axis": {"title": "# of Breweries"}
    },
    "y": {
      "field": "City", "type": "nominal",
      "axis": {"title": "City"},
      "sort": {"field": "Total"}
    },
    "size": {"value": 10}
  }
}


var opt = {
  "renderer": "canvas",
  "actions": {
    "export": false,
    "source": false,
    "editor": false
  }
}

var opt2 = {
  mode: "vega-lite",
  actions: false
};


vega.embed('#top10citieschart', yourVlSpec, opt2, function(error, result) {
  // result.view is the Vega View, vlSpec is the original Vega-Lite specification
  var tooltipOption = {
    showAllFields: false,
    fields: [
      {
        field: "Total",
        title: "Total # of Breweries",
        formatType : "number"
      },
      {
        field: "City",
        title: "City",
        formatType : "string"
      }
    ],
    delay: 50,
    colorTheme: "light"
  };
  vegaTooltip.vegaLite(result.view, yourVlSpec,tooltipOption);
  });
