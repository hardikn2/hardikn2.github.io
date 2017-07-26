var breweriesbypopulationSpec = {
"$schema": "https://vega.github.io/schema/vega-lite/v2.json",
"description": "Total Breweries by state population",
"data": { "url": "data/totalbreweriesbypopulation.csv"},
"mark": "bar",
"encoding": {
"x": {
  "field": "State", "type": "nominal",
  "axis": {"title": "State"}
},
"y": {
  "field": "Breweries", "type": "quantitative",
  "axis": {"title": "# of Breweries"}
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


vega.embed('#breweriesbypopulationchart', breweriesbypopulationSpec, opt2, function(error, result) {
// result.view is the Vega View, vlSpec is the original Vega-Lite specification
var tooltipOption = {
showAllFields: true,
fields: [
  {
    field: "StateName",
    title: "State",
    formatType : "string"
  },
  {
    field: "Breweries",
    title: "# of Breweries",
    formatType : "number"
  }
],
delay: 50,
colorTheme: "light"
};
vegaTooltip.vegaLite(result.view, breweriesbypopulationSpec,tooltipOption);
});
