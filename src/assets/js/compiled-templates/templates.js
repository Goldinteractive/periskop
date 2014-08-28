this["JST"] = this["JST"] || {};

this["JST"]["components/slide/tpl.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<img width=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.slide)),stack1 == null || stack1 === false ? stack1 : stack1.big)),stack1 == null || stack1 === false ? stack1 : stack1.width)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" height=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.slide)),stack1 == null || stack1 === false ? stack1 : stack1.big)),stack1 == null || stack1 === false ? stack1 : stack1.height)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" src=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.slide)),stack1 == null || stack1 === false ? stack1 : stack1.big)),stack1 == null || stack1 === false ? stack1 : stack1.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" />\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<img width=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.slide)),stack1 == null || stack1 === false ? stack1 : stack1.small)),stack1 == null || stack1 === false ? stack1 : stack1.width)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" height=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.slide)),stack1 == null || stack1 === false ? stack1 : stack1.small)),stack1 == null || stack1 === false ? stack1 : stack1.height)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" src=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.slide)),stack1 == null || stack1 === false ? stack1 : stack1.small)),stack1 == null || stack1 === false ? stack1 : stack1.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" />\n";
  return buffer;
  }

  stack1 = (helper = helpers.compare || (depth0 && depth0.compare),options={hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.viewport)),stack1 == null || stack1 === false ? stack1 : stack1.width), ">=", 600, options) : helperMissing.call(depth0, "compare", ((stack1 = (depth0 && depth0.viewport)),stack1 == null || stack1 === false ? stack1 : stack1.width), ">=", 600, options));
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });