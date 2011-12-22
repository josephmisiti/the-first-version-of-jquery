http://web.archive.org/web/20060205022911/http://jquery.com/src/minifx/minifx-latest.js




/*
     FILE ARCHIVED ON 2:29:11 Feb 5, 2006 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 5:43:05 Dec 22, 2011.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/* mini.fx
 * By John Resig (http://web.archive.org/web/20060205022911/http://ejohn.org)
 * Based upon moo.fx (http://web.archive.org/web/20060205022911/http://moofx.mad4milk.net)
 * MIT-style LICENSE
 */
function fx(el,op,ty,tz){
	var z = this;
	z.a = function(){z.el.style[ty]=z.now+z.o.unit};
	z.max = function(){return z.io||z.el["natural"+tz]||z.el["scroll"+tz]||z.cur()};
	z.cur = function(){return z.el["offset"+tz]||parseInt(z.el.style[ty])};
  z.show = function(){z.ss("block");z.custom(0,z.el.$o||z.max())};
	z.hide = function(){z.el.$o=z.max();z.custom(z.max(),0)};
	z.ss = function(a){if(y.display!=a)y.display=a};
	z.toggle = function(){if(z.cur()>0)z.hide();else z.show()};
	z.modify = function(a){z.custom(z.cur(),z.cur()+a)};
	z.clear = function(){clearInterval(z.timer);z.timer=null};
	z.el = el.constructor==String?document.getElementById(el):el;
	var y = z.el.style;
	y.overflow = "hidden";
  z.io = this.cur();
	z.o = { duration: 400, unit: "px" };
	z.step = function(f,tt){
		var t = (new Date).getTime();
		var p = (t - z.s) / z.o.duration;
		if (t >= z.o.duration+z.s) {
			z.now = tt;
			z.clear();
			setTimeout(function(){
				if(y.height=="0px"||y.width=="0px")z.ss("none");
				if(z.o.onComplete){z.el.$_ = z.o.onComplete;z.el.$_();}
			},13);
		} else
			z.now = ((-Math.cos(p*Math.PI)/2) + 0.5) * (tt-f) + f;
		z.a();
	};
	z.custom = function(f,t){
		if(z.timer)return;this.now=f;z.a();z.io=z.cur();z.s=(new Date).getTime();
		z.timer=setInterval(function(){z.step(f,t);}, 13);
	};
	if(op)for(var i in op)z.o[i]=op[i];
}
fx.fn = new Array("show","hide","toggle");
fx.ty = new Array("Height","Width","Left","Top");
for(var i in fx.ty){(function(){
	var c = fx.ty[i];
	fx[c] = function(a,b){
		return new fx(a,b,c.toLowerCase(),c);};
})()}
fx.Opacity = function(a,b){
	var o = new fx(a,b,"opacity");
	o.cur = function(){return parseFloat(o.el.style.opacity);};
	o.a = function() {
		var e = o.el.style;
		if (o.now == 1) o.now = 0.9999;
		if (window.ActiveXObject)
			e.filter = "alpha(opacity=" + o.now*100 + ")";
    e.opacity = o.now;
	};
	o.io = o.now = 1;
	o.a();
	return o;
};
fx.Text = function(a,b){
	if(!b)var b = {};
	if(!b.unit) b.unit = "em";
	return new fx(a,b,"fontSize");
};
fx.Resize = function(e,o){
	var z = this;
	var h = new fx.Height(e,o);
	if(o) o.onComplete = null;
	var w = new fx.Width(e,o);
	function c(a,b,c){return (!a||a==c||b==c);}
	for(var i in fx.fn){(function(){
		var j = fx.fn[i];
		z[j] = function(a,b){
			if(c(a,b,"height")) h[j]();
			if(c(a,b,"width")) w[j]();
		};
	})()}
	z.modify = function(c,d){
		h.modify(c);
		w.modify(d);
	};
};
fx.FadeSize = function(e,o){
	var z = this;
	var p = new fx.Opacity(e,o);
	if(o) o.onComplete = null;
	var r = new fx.Resize(e,o);
	for(var i in fx.fn){(function(){
		var j = fx.fn[i];
		z[j] = function(a,b){p[j]();r[j](a,b);};
	})()}
};
fx.MultiFadeSize = function(e,o){
	var z = this, el=[];
	for(var i in e)
		el[i]=new fx.FadeSize(e[i],o);
	for(var i in fx.fn){(function(){
		var j = fx.fn[i];
		z[j] = function(){for(var i in el)el[i][j]();};
	})()}
};
