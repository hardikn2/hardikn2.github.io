var breweriesbypopulationSpec = {
  "$schema": "https://vega.github.io/schema/vega/v3.0.json",
   "data": [
    {
      "name": "totalbreweriesbypopulation",
      "url": "data/data/totalbreweriesbypopulation.csv",
      "format": {"type": "csv", "parse": "auto"},
    }
   ], 
  "signals": [
    {
      "name": "tooltip",
      "value": {},
      "on": [
        {"events": "rect:mouseover", "update": "datum"},
        {"events": "rect:mouseout",  "update": "{}"}
      ]
    }
  ],

  "scales": [
    {
      "name": "xscale",
      "type": "band",
      "domain": {"data": "totalbreweriesbypopulation", "field": "State"},
      "range": "width",
      "padding": 0.05,
      "round": true
    },
    {
      "name": "yscale",
      "domain": {"data": "totalbreweriesbypopulation", "field": "Breweries"},
      "nice": true,
      "range": "height"
    }
  ],

  "axes": [
    { "orient": "bottom", "scale": "xscale" },
    { "orient": "left", "scale": "yscale" }
  ],

  "marks": [
    {
      "type": "rect",
      "from": {"data":"totalbreweriesbypopulation"},
      "encode": {
        "enter": {
          "x": {"scale": "xscale", "field": "State"},
          "width": {"scale": "xscale", "band": 1},
          "y": {"scale": "yscale", "field": "Breweries"},
          "y2": {"scale": "yscale", "value": 0},
          "fill": {"value": "#FFCD5D"}
        },
        "update": {
          "fill": {"value": "#FFCD5D"}
        },
        "hover": {
          "fill": {"value": "#FF8000"}
        }
      }
    },
    {
      "type": "text",
      "encode": {
        "enter": {
          "align": {"value": "center"},
          "baseline": {"value": "bottom"},
          "fill": {"value": "#333"}
        },
        "update": {
          "x": {"scale": "xscale", "signal": "tooltip.category", "band": 0.5},
          "y": {"scale": "yscale", "signal": "tooltip.amount", "offset": -2},
          "text": {"signal": "tooltip.amount"},
          "fillOpacity": [
            {"test": "datum === tooltip", "value": 0},
            {"value": 1}
          ]
        }
      }
    }
  ]
}

var opt = {
mode: "vega",
actions: false
};


vega.embed('#breweriesbypopulationchart', breweriesbypopulationSpec, opt, function(error, result) {
// result.view is the Vega View, vlSpec is the original Vega-Lite specification
var tooltipOption = {
showAllFields: false,
fields: [
  {
    field: "StateName",
    title: "State",
    formatType : "string"
  },
  {
    field: "City",
    title: "City",
    formatType : "string"
  },
  {
    field: "Breweries",
    title: "Total # of Breweries",
    formatType : "number"
  }
],
delay: 50,
colorTheme: "light"
};
vegaTooltip.vegaLite(result.view, breweriesbypopulationSpec,tooltipOption);
});
