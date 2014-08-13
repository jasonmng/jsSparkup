'use strict';

(function(root, factory){

  if (typeof define === 'function' && define.amd) {
    define([], function() { return factory( root ); });
  } else if (typeof exports !== 'undefined') {
    module.exports = factory( root );
  } else {
      var previousSparkup = root.sparkup, sparkup = factory( root );

      sparkup.noConflict = function(){
         root.sparkup = previousRequest;
         return sparkup;
      }

      root.sparkup = sparkup;
  }

})( window, function( root ){

   return (function sparky(){

      var parents = [], pos = 0;

      return {

         previousParent: function(){
            pos--;
         },

         addParent: function( element ) {

            parents.splice( pos, 0, element );
            pos++;

         },

         getParent: function(){

            var _pos = pos - 1;
            if ( _pos < 0 ) _pos = 0;

            return parents[_pos];

         },

         build: function( string ) {

            var html = document.createDocumentFragment(), parentEL;

            // reset
            parents = []; pos = 0;

            this.addParent(html);

            var doc = string.split('>'), elements, idx, line;

            for( var i = 0, l = doc.length; i < l; i++ )
            {
               // remove extra white space
               line = doc[i].toString().trim().replace(/\s{2,}/,'');

               idx = line.indexOf('<');
               if ( idx !== false && idx !== -1 ) 
               {
                 elements = line.split('<'); 

                 // process element with current parent
                 this.processDepth( elements[0] );

                 for( var j = 1, len = elements.length; j < len; j++ ){
                    this.previousParent();
                    this.processDepth( elements[j] );
                 }

               }
               else
               {
                  this.processDepth( line );
               }
            }
            

            return html;

         },

         processDepth: function( group ) {

            group = group.trim();
            if ( !group || group == '' ) return;

            var siblings = group.match(/[^\s]*{[^}]*}[^\s]*|[^\s^{^}]+/g);
            var parentEL = this.getParent();

            var elem, sibling;

            for( var j = 0, len = siblings.length; j < len; j++ ){

               sibling = siblings[j].trim();
               if ( sibling == '' ) continue;

               elem = this.createElement( sibling );
               parentEL.appendChild( elem );
            }

            this.addParent( elem );
         },

         createElement: function( elem ) {

            var id, classes, attributes, element, text;

            if ( !(element = this.getElement( elem )) ){
               return false;
            }

            element = document.createElement( element );

            if ( (id = this.getID( elem )) ){
               element.id = id;
            }

            if ( (classes = this.getClasses( elem )) ){
               element.className = classes.join(' ');
            }

            if ( (attributes = this.getAttributes( elem )) ){

               for( var attribute in attributes ){
                  element.setAttribute( attribute, attributes[attribute] );
               }

            }

            if ( (text = this.getText( elem )) ){

               if ( element.textContent !== undefined ) element.textContent = text;
               else if ( element.innerText !== undefined ) element.innerText = text;
               else element.innerHTML = text;

            }

            return element;

         },

         getElement: function( elem ){

            var m;

            if ( ( m = elem.match(/#|\.|\[|\{/) ) ){
               return elem.substring(0,m.index);
            } else {
               return elem;
            }

         },

         getID: function( elem ) {

            var matches;

            if ( (matches = elem.match(/#([\w_-]+)/)) ){
               return matches[1];
            }

            return false;

         },

         getClasses: function( elem ) {

            var matches;

            if ( (matches = elem.match(/\.[\w_-]+/g)) ){

               for( var i = 0, l = matches.length; i < l; i++ ){
                  matches[i] = matches[i].substring(1);
               }
               
               return matches;
            }

            return false;

         },

         getText: function( elem ) {

            var matches;

            if ( (matches = elem.match(/\{([\W\w]+)\}/)) ){
               return matches[1];
            }

            return false;

         },

         getAttributes: function( elem ) {

            var matches, attributes = {}, pair, match;

            if ( (matches = elem.match(/\[[\w\W]+\]/g)) ){

               for( var i = 0, l = matches.length; i<l; i++ ){

                  match = matches[i];
                  pair = match.substring(1,match.length-1);
                  pair = pair.split('=');

                  attributes[pair[0]] = pair[1];

               }

               return attributes;
            }

            return false;
         }

      }

   })();

});
