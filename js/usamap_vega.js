var usamapSpec = {
  "$schema": "https://vega.github.io/schema/vega/v3.0.json",
  "width": 960,
  "height": 500,
  "autosize": "none",

  "data": [
    {
      "name": "breweries",
      "url": "data/breweries.csv",
      "format": {"type": "csv", "parse": "auto"},
      "transform": [
        {
          "type": "geopoint",
          "projection": "projection",
          "fields": ["long", "lat"]
        },
        {
          "type": "filter",
          "expr": "datum.x != null && datum.y != null"
        }
      ]
    },
    {
      "name": "states",
      "url": "data/us-10m.json",
      "format": {"type": "topojson", "feature": "states"},
      "transform": [
        {
          "type": "geopath",
          "projection": "projection"
        }
      ]
    }
  ],

  "projections": [
    {
      "name": "projection",
      "type": "albersUsa"
    }
  ],

  "scales": [
    {
      "name": "color",
      "type": "quantize",
      "domain": [0, 0.15],
      "range": {"scheme": "blues-9"}
    }
  ],

  "legends": [
    {
      "fill": "color",
      "orient": "bottom-right",
      "title": "Unemployment",
      "format": "0.1%",
      "encode": {
        "symbols": {
          "update": {
            "shape": {"value": "square"},
            "stroke": {"value": "#ccc"},
            "strokeWidth": {"value": 0.2}
          }
        }
      }
    }
  ],

  "marks": [
  {
    "type": "path",
    "from": {"data": "states"},
    "encode": {
      "enter": {
        "fill": {"value": "#dedede"},
        "stroke": {"value": "white"}
      },
      "update": {
        "path": {"field": "path"}
      }
    }
  },
  {
      "type": "symbol",
      "from": {"data": "breweries"},
      "encode": {
        "enter": {
          "size": {"value": 16},
          "fill": {"value": "steelblue"},
          "fillOpacity": {"value": 0.8},
          "stroke": {"value": "white"},
          "strokeWidth": {"value": 1.5}
        },
        "update": {
          "x": {"field": "x"},
          "y": {"field": "y"}
        }
      }
    }
  ]
}

var opt2 = {
mode: "vega",
actions: false
};


vega.embed('#usamap', usamapSpec, opt2, function(error, result) {
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
    field: "Breweries",
    title: "# of Breweries",
    formatType : "number"
  }
],
delay: 50,
colorTheme: "light"
};
vegaTooltip.vegaLite(result.view, usamapSpec,tooltipOption);
});
