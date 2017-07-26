var usamapSpec = {
  "$schema": "https://vega.github.io/schema/vega/v3.0.json",

  "data": [
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
    },
    {
      "name": "breweries",
      "url": "data/breweries.csv",
      "format": {"type": "csv", "parse": "auto"},
      "transform": [
        {
          "type": "geopoint",
          "projection": "projection",
          "fields": ["Long", "Lat"]
        },
        {
          "type": "filter",
          "expr": "datum.x != null && datum.y != null"
        }
      ]
    }
  ],

  "projections": [
    {
      "name": "projection",
      "type": "albersUsa",
      "translate": [{"signal": "width / 2"}, {"signal": "height / 2"}]
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
          "size": {"value": 30},
          "fill": {"value": "#FFCD5D"},
          "fillOpacity": {"value": 0.8},
          "stroke": {"value": "white"},
          "strokeWidth": {"value": 0.3}
        },
        "update": {
          "x": {"field": "x"},
          "y": {"field": "y"},
          "fill": {"value": "#FFCD5D"},
          "fillOpacity": {"value": 0.8},
          "size": {"value": 30},
          "strokeWidth": {"value": 0.3}
        },
        "hover": {
          "fill": {"value": "#FF8000"},
          "size": {"value": 100},
          "strokeWidth": {"value": 3}
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
    field: "Name",
    title: "Name",
    formatType : "string"
  },
  {
    field: "City",
    title: "City",
    formatType : "string"
  },
  {
    field: "State",
    title: "State",
    formatType : "string"
  },
  {
    field: "Postal Code",
    title: "Zip",
    formatType : "string"
  }
],
delay: 50,
colorTheme: "light"
};
vegaTooltip.vegaLite(result.view, usamapSpec,tooltipOption);
});
