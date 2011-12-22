/*
     FILE ARCHIVED ON 2:16:03 Feb 5, 2006 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 5:41:55 Dec 22, 2011.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
if ( fx.MultiFadeSize ) {
	$.fn.speed = {"slow":600,"fast":200,"medium":400};
	
	$.fn.show = function(a,o) {
		if ( a ) {
			if ( o == null ) var o = {};
			o.duration = this.speed[a];
			new fx.MultiFadeSize(this.cur,o).show();
		} else {
			this._show();
		}
		return this;
	};
	
	$.fn.slideDown = function(a,o) {
		if ( o == null ) var o = {};
		if ( this.speed[a] ) o.duration = this.speed[a];
		for ( var i = 0; i < this.cur.length; i++ ) {
			this.cur[i].style.height = '0px';
			this.cur[i].style.display = 'block';
			this.cur[i].$o = 0;
			new fx.Height(this.cur[i],o).custom(0,this.cur[i].scrollHeight);
		}
		return this;
	};
	
	$.fn.slideUp = function(a,o) {
		if ( o == null ) var o = {};
		o.duration = this.speed[a];
		for ( var i = 0; i < this.cur.length; i++ ) {
			new fx.Resize(this.cur[i],o).hide("height");
		}
		return this;
	};
	
	$.fn.hide = function(a,o) {
		if ( a ) {
			if ( o == null ) var o = {};
			o.duration = this.speed[a];
			new fx.MultiFadeSize(this.cur,o).hide();
		} else {
			this._hide();
		}
		return this;
	};
}
