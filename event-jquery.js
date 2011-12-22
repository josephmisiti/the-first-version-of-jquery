http://web.archive.org/web/20060205034528/http://jquery.com/src/event/event-latest.js




/*
     FILE ARCHIVED ON 3:45:28 Feb 5, 2006 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 5:41:08 Dec 22, 2011.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
var e = ["blur","focus","contextmenu","load","resize","scroll","unload",
	"click","dblclick","mousedown","mouseup","mouseenter","mouseleave",
	"mousemove","mouseover","mouseout","change","reset","select","submit",
	"keydown","keypress","keyup","abort","error","ready"];
for ( var i = 0; i < e.length; i++ ) {
	(function(){
		var o = e[i];
		$.fn[o] = function(f){ return this.bind(o, f); };
		$.fn["un"+o] = function(f){ return this.unbind(o, f); };
		$.fn["one"+o] = function(f){ return this.bind(o, function(e){
			if ( this[o+f] != null ) return true;
			this[o+f]++;
			this.$$exec = f;
			return this.$$exec(e);
		}); };
		
		// Deprecated
		$.fn["on"+o] = function(f){ return this.bind(o, f); };
	})();
}

$.fn.hover = function(f,g) {
	// Check if mouse(over|out) are still within the same parent element
	return this.each(function(){
		var obj = this;
		addEvent(this, "mouseover", function(e) {
			var p = ( e.fromElement != null ? e.fromElement : e.relatedTarget );
			while ( p && p != obj ) p = p.parentNode;
			if ( p == obj ) return false;
			obj["$$mouseover"] = f;
			return obj["$$mouseover"](e);
		});
		addEvent(this, "mouseout", function(e) {
			var p = ( e.toElement != null ? e.toElement : e.relatedTarget );
			while ( p && p != obj ) p = p.parentNode;
			if ( p == obj ) return false;
			obj["$$mouseout"] = g;
			return obj["$$mouseout"](e);
		});
	});
};

// Deprecated
$.fn.onhover = $.fn.hover;

$.fn.ready = function(f) {
	return this.each(function(){
		var obj = this;
		this.$$timer = setInterval( function(){
			if ( obj && typeof obj.getElementsByTagName != 'undefined'
			     && typeof obj.getElementById != 'undefined'
					 && obj.body ) {
				clearInterval( obj.$$timer );
				obj.$$timer = null;
				obj["doready"] = f;
				obj["doready"]();
			}
		}, 13 );
	});
};

// Deprecated
$.fn.onready = $.fn.ready;

$.fn.toggle = function(a,b) {
	if ( a && b ) {
		return this.each(function(){
			$(this).click(function(e){
				this.$$exec = this.$$last = this.$$last == a ? b : a;
				return this.$$exec(e) || false;
			});
		});
	} else
		return this._toggle();
};
