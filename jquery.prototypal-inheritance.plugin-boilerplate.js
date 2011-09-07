/*!
 * jQuery prototypal inheritance plugin boilerplate
 * Author: Alex Sexton, Scott Gonzalez
 * Further changes: @addyosmani
 * Licensed under the MIT license
 */


/*
 * Object.create support test and fallback for browsers without it
*/
if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}


/**
 * myObject
 * An object representing a concept you wish to model (eg. a car)
 */
var myObject = {
  init: function(options, elem) {
    // Mix in the passed in options with the default options
    this.options = $.extend({},this.options,options);

    // Save the element reference, both as a jQuery
    // reference and a normal reference
    this.elem  = elem;
    this.$elem = $(elem);

    // Build the dom initial structure
    this._build();

    // return this so we can chain/use the bridge with less code.
    return this;
  },
  options: {
    name: "No name"
  },
  _build: function(){
    this.$elem.html('<h1>'+this.options.name+'</h1>');
  },
  myMethod: function(msg){
    // You have direct access to the associated and cached jQuery element
    this.$elem.append('<p>'+msg+'</p>');
  }
};




/*
 * Create a plugin based on a passed object
 */
$.plugin = function(name, object) {
  $.fn[name] = function(options) {
    return this.each(function() {
      if ( ! $.data(this, name) ) {
        $.data(this, name, Object.create(object).init(options, this));
      }
    });
  };
};

// With myObject, we could now essentially do this:
$.plugin('myobj', myObject);

// and at this point we could do the following
$('#elem').myobj({name: "John"});
var inst = $('#elem').data('myobj');
inst.myMethod('I am a method');