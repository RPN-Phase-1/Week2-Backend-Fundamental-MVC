module.exports={
	encrypt:function(str){
		var s='';
		for(i in str){
			var c=str.charCodeAt(i);
			var x=c-random(40,c/2);
			c-=x;
			s+=(String.fromCharCode(c)+String.fromCharCode(x)+'#');
		}
		return s;
	},
	decrypt:function(str){
		var s='';
		var ar=str.split('#');
		for(i in ar){
			s+=String.fromCharCode(ar[i].charCodeAt(0)+ar[i].charCodeAt(1));
		}
		return s.substr(0,s.length-1);
	}
};
function random(f,t){
	return Math.floor(Math.random()*t+f);
}