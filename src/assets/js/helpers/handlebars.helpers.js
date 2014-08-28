define(['handlebars'], function() {
  /*


  // this helper compares 2 values

  /*

  {{#compare unicorns "<" ponies }}
  I knew it, unicorns are just low - quality ponies!
  {{/compare}}

  */

  Handlebars.registerHelper('compare', function(lvalue, operator, rvalue, options) {

    if (arguments.length < 3) {
      throw new Error("Handlerbars Helper 'compare' needs 3 parameters");
    }

    var operators = {
      '==': function(l, r) {
        return l == r;
      },
      '===': function(l, r) {
        return l === r;
      },
      '!=': function(l, r) {
        return l != r;
      },
      '<': function(l, r) {
        return l < r;
      },
      '>': function(l, r) {
        return l > r;
      },
      '<=': function(l, r) {
        return l <= r;
      },
      '>=': function(l, r) {
        return l >= r;
      },
      'typeof': function(l, r) {
        return typeof l === r;
      }
    };

    if (!operators[operator]) {
      throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
    }
    var result = false;
    if (typeof rvalue === "string") {
      var valuesToCompareArray = rvalue.split(",");

      _.each(valuesToCompareArray, function(value) {
        if (operators[operator](lvalue, value)) {
          result = true;
        } else {
          return;
        }
      });
    } else {
      result = operators[operator](lvalue, rvalue);
    }

    if (result) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }

  });
});