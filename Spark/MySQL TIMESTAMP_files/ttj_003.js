!function(){function n(n){try{if(!window.location.ancestorOrigins)return;for(var r=0,o=window.location.ancestorOrigins.length;o>r;r++)n.call(null,window.location.ancestorOrigins[r],r)}catch(t){}return[]}function r(n){var r,o=[];do try{r=r?r.parent:window,n.call(null,r,o)}catch(t){return o.push({referrer:null,location:null,isTop:!1}),o}while(r!==window.top);return o}function o(n){var r,o=[],t=null,l=null,e=null,c=null,i=null,u=null,a=null;for(r=n.length-1;r>=0;r--){try{e=n[r].location}catch(s){}if(e)l=encodeURIComponent(e),o.push(l),a||(a=l);else if(0!==r){c=n[r-1];try{i=c.referrer,u=c.ancestor}catch(s){}i?(l=encodeURIComponent(i),o.push(l),a||(a=l)):u?(l=encodeURIComponent(u),o.push(l),a||(a=l)):o.push(t)}else o.push(t)}return{stack:o,detectUrl:a}}var t=r(function(n,r){try{r.push({referrer:n.document.referrer||null,location:n.location.href||null,isTop:n===window.top})}catch(o){r.push({referrer:null,location:null,isTop:n===window.top})}});n(function(n,r){t[r].ancestor=n});var l=t.length-1,e=null!==t[l].location||l>0&&null!==t[l-1].referrer,c=o(t),i="&bdref="+c.detectUrl+"&bdtop="+e+"&bdifs="+l+"&bstk="+c.stack;document.write('<script src="http://g.adnxs.com/ttj?ttjb=1&bdc=1435779928&bdh=tVOylUAMrF1mfmqkFeWYFaurUgY.'+i+'&id=5081150&cb=1435779927&pubclick=http://sin1.g.adnxs.com/click?uB6F61G4nj-EfNCzWfWZP-xRuB6F67E_hHzQs1n1mT-4HoXrUbieP-eA__tgkeAjnr8rU3jms1tXQ5RVAAAAALGhDQA2AQAAUAMAAAIAAACqN-kBiIMCAAAAAQBVU0QAVVNEACwB-gCoAQAAiocAAgUAAQIAAAAAxCo0UwAAAAA./cnd=%21KwYSPgj0t8YEEKrvpA8YiIcKIAA./referrer=http%3A%2F%2Fwww.mysqltutorial.org%2Fmysql-timestamp.aspx/clickenc="></scr'+'ipt>')}();