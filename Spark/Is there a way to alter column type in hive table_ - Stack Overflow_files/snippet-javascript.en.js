!function(e,t,n){function a(e){return this._state={"html":null,"css":null,"js":null,"hide":!1},this._readonly=!1,this._codeArea=null,this._snip=null,this._menu=null,this._footer=null,this._jQuerySelect=null,this._d3Select=null,this._knockoutSelect=null,this._angularJSSelect=null,this._hide=!1,this._boxHtml=null,this._boxCss=null,this._boxJs=null,this._boxResult=null,this._codeMirrorHtml=null,this._codeMirrorCss=null,this._codeMirrorJs=null,e.readonly!==n&&e.readonly&&(this._readonly=!0),this}function i(){return this._state={"html":null,"css":null,"js":null,"hide":!1},this._menu=null,this._snip=null,this._results=null,this._boxResult=null,this}function o(e,t,n){return e.replace(/^(?=.)/gm,new Array(t*n+1).join(" "))}function r(e){var t="\n\n<!-- begin snippet: js hide: "+e.hide+" -->\n\n";return""!=e.js&&(t+="<!-- language: lang-js -->\n\n"+o(e.js,1,4)+"\n\n"),""!=e.css&&(t+="<!-- language: lang-css -->\n\n"+o(e.css,1,4)+"\n\n"),""!=e.html&&(t+="<!-- language: lang-html -->\n\n"+o(e.html,1,4)+"\n\n"),t+="<!-- end snippet -->\n\n"}function s(e,t){var n=/<!--\s+language:\s*lang-js\s+-->([\s\S]*?)(?:<!--\s+language:|$)/gi,a=/<!--\s+language:\s*lang-css\s+-->([\s\S]*?)(?:<!--\s+language:|$)/gi,i=/<!--\s+language:\s*lang-html\s+-->([\s\S]*?)(?:<!--\s+language:|$)/gi;try{var o=n.exec(e),r=a.exec(e),s=i.exec(e),c="",l="",u="";if(null!=o&&(c=o[1].trim().replace(/^    /gm,"")),null!=r&&(l=r[1].trim().replace(/^    /gm,"")),null!=s&&(u=s[1].trim().replace(/^    /gm,"")),""==c&&""==l&&""==u)return null;var d={"js":c,"css":l,"html":u,"hide":t};return d}catch(p){return null}}function c(e){if(!StackExchange.snippets.renderer)return e;var t="sandbox"in document.createElement("iframe");if(!t)return e;var n=/<!--\s+begin snippet:\s*[a-z]+\s*(?:hide:\s*([a-zA-Z]+))?\s+-->([\s\S]*?)<!--\s+end snippet\s+-->/gi;return e=e.replace(n,function(e,t,n){return StackExchange.snippets.renderer(n,t)})}function l(){StackExchange.snippets.renderer&&StackExchange.snippets.redraw||(StackExchange.snippets.redraw=function(){e("div.snippet").each(function(){var t=e(this);return t.closest(".downvoted-answer").length>0?!0:(u(t),void 0)})},StackExchange.snippets.renderer=function(t,n){n||(n=!1);var a=s(t,n);if(null==a)return t;var i=e('<div class="snippet" data-lang="js" data-hide="'+n+'"></div>'),o=e('<div class="snippet-code"></div>');n&&o.addClass("snippet-currently-hidden"),i.append(o),""!=a.js&&o.append(e('<pre class="snippet-code-js lang-js prettyprint-override">').append(e("<code>").text(a.js))),""!=a.css&&o.append(e('<pre class="snippet-code-css lang-css prettyprint-override">').append(e("<code>").text(a.css))),""!=a.html&&o.append(e('<pre class="snippet-code-html lang-html prettyprint-override">').append(e("<code>").text(a.html)));var r=d();return o.snippet({"state":a}),f[r]=i,"<pre>"+r+"</pre>"},StackExchange.snippets.redraw())}function u(t){var n=t.find(".snippet-code");0==n.length&&(n=t);var a=n.find("pre.snippet-code-js").text(),i=n.find("pre.snippet-code-css").text(),o=n.find("pre.snippet-code-html").text(),r={"js":a,"css":i,"html":o};if(n.snippet({"state":r}),(StackExchange.options.user.isAnonymous||0==t.parent().length||0==e("textarea#wmd-input").length||e(".popup-suggested-edit").length)&&t.find(".copySnippet").hide(),t.data("hide")===!0){n.hide(),n.addClass("snippet-currently-hidden"),t.find(".snippet-display").remove();var s=e('<div class="snippet-display" style="vertical-align: center"></div>').append(e("<p></p>").append(e('<a class="snippet-show-link-chevron"><span class="expander-arrow-hide" style="vertical-align: middle;"></span><a class="snippet-show-link"><span class="show-hide" data-ishidden="true" style="vertical-align: middle">Show code snippet</span></a>')));s.click(function(){n.toggle();var t=e(this).find(".show-hide");t.data("ishidden")===!0?(t.text("Hide code snippet"),e(this).find(".expander-arrow-hide").removeClass("expander-arrow-hide").addClass("expander-arrow-show"),t.data("ishidden",!1)):(t.text("Show code snippet"),e(this).find(".expander-arrow-show").removeClass("expander-arrow-show").addClass("expander-arrow-hide"),t.data("ishidden",!0))}),t.prepend(s)}else n.show(),n.removeClass("snippet-currently-hidden"),t.find(".snippet-display").remove()}var d=function(){function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return function(){return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()}}(),p=StackExchange.options.snippets.domain;e.fn.snippet=function(o){return o=o||{},this.each(function(){var r=e(this),s=r.data("_snippet");if(!s){var c=o.markdownPluginMode!==n&&o.markdownPluginMode;if(s=c?new a(o):new i(o),c){var l=function(){s.generate(r),s.resize(),e(t).resize(function(){s.resize()}),r.data("_snippet",s),o.resize!==n&&o.resize&&s.resize(),o.state!==n&&null!=o.state&&s.load(o.state)};StackExchange.using("snippetsJsCodeMirror",function(){setTimeout(l,1)})}else s.generate(r),r.data("_snippet",s),o.resize!==n&&o.resize&&s.resize(),o.state!==n&&null!=o.state&&s.load(o.state)}})},a.prototype={"createExternalLibSelect":function(t,n){var a=e('<select class="snippet-menu-select"></select>').append('<option value="">No '+t+"</option>");return e.each(n,function(e,n){a.append('<option value="'+n+'">'+t+" "+n+"</option>")}),a},"registerExternalLibChange":function(t,n,a,i){t.change(function(){var t=e(this).val(),o=i.getValue(),r=!1,s=n.replace("*version*",t);return o=o.replace(a,function(){return r=!0,""==t&&(s=""),s}),o=o.trim(),r?(i.setValue(o),void 0):(""!=t&&(i.setValue(s+"\n"+o),i.save()),void 0)})},"generate":function(t){var n=this;if(n._snip)return n._snip;var a=e('<div class="popup-close"><a title="close this popup (or hit Esc)">×</a></div>').click(function(t){return StackExchange.helpers.closePopups(e(this).closest(".popup"),"esc"),t.preventDefault(),!1}),i=["2.1.1","2.1.0","2.0.3","2.0.2","2.0.1","2.0.0","1.11.1","1.11.0","1.10.2","1.10.1","1.10.0","1.9.1","1.9.0","1.8.3","1.8.2","1.8.1","1.8.0","1.7.2","1.7.1","1.7.0","1.6.4","1.6.3","1.6.2","1.6.1","1.6.0","1.5.2","1.5.1","1.5.0","1.4.4","1.4.3","1.4.2","1.4.1","1.4.0","1.3.2","1.3.1","1.3.0","1.2.6","1.2.3"];n._jQuerySelect=n.createExternalLibSelect("jQuery",i);var o=["3.4.11","3.4.10","3.4.9","3.4.8","3.4.7","3.4.6","3.4.5","3.4.4","3.4.3","3.4.2","3.4.1","3.4.0","3.3.13","3.3.12","3.3.11","3.3.10","3.3.9","3.3.8","3.3.7","3.3.6","3.3.5","3.3.4","3.3.3","3.3.2","3.3.1","3.3.0","3.2.8","3.2.7","3.2.6","3.2.5","3.2.4","3.2.3","3.2.2","3.2.1","3.2.0","3.1.10","3.1.9","3.1.8","3.1.7","3.1.6","3.1.5","3.1.4","3.1.3","3.1.2","3.1.1","3.1.0","3.0.8","3.0.7","3.0.6","3.0.5","3.0.4","3.0.3","3.0.2","3.0.1","3.0.0","2.10.0","2.8.1","2.7.5","2.7.4","2.7.3","2.7.2","2.7.0","2.6.0","2.5.2","2.5.1","2.4.2","2.4.1","2.4.0","2.3.4","2.3.3","2.3.2","2.3.0","2.2.1","2.1.3"];n._d3Select=n.createExternalLibSelect("d3",o);var r=["3.2.0","3.1.0","3.0.0","2.3.0","2.2.1","2.2.0","2.1.0","2.0.0","1.2.1"];n._knockoutSelect=n.createExternalLibSelect("Knockout",r);var s=["1.2.23","1.2.22","1.2.21","1.2.20","1.2.19","1.2.18","1.2.17","1.2.16","1.2.15","1.2.14","1.2.13","1.2.12","1.2.11","1.2.10","1.2.9","1.2.8","1.2.7","1.2.6","1.2.5","1.2.4","1.2.3","1.2.2","1.2.1","1.2.0","1.0.8","1.0.7","1.0.6","1.0.5","1.0.4","1.0.3","1.0.2","1.0.1"];n._angularJSSelect=n.createExternalLibSelect("AngularJS",s);var c=e('<a class="snippet-menu-button">external library</a>');n._menu=e('<div class="snippet-menu"></div>');var l=e('<div style="float: left;"></div>'),u=e('<div style="float: right;"></div>'),p=e('<div style="clear: both;"></div>');n._menu.append(l).append(u).append(p),n._readonly||l.append(n._jQuerySelect).append(n._d3Select).append(n._knockoutSelect).append(n._angularJSSelect).append(c),u.append(a),n._boxHtml=e('<textarea class="snippet-box-edit" spellcheck="false"></textarea>'),n._boxCss=e('<textarea class="snippet-box-edit" spellcheck="false"></textarea>'),n._boxJs=e('<textarea class="snippet-box-edit" spellcheck="false"></textarea>'),n._boxResult=e('<iframe name="'+d()+'" sandbox="allow-scripts" class="snippet-box-edit" frameBorder="0"></iframe>'),e.each([n._boxHtml,n._boxCss,n._boxJs,n._boxResult],function(t,n){n.focus(function(){e(this).parent().children(".snippet-box-label").fadeOut()}).blur(function(){e(this).parent().children(".snippet-box-label").fadeIn()})}),n._codeArea=e('<div class="snippet-code-area"></div>').append(e('<table class="snippet-code-area-table"></table>').append(e("<tbody></tbody>").append(e("<tr></tr>").append(e('<td class="snippet-box-top snippet-box-left"></td>').append(e('<div class="snippet-box-container"></div>').append(n._boxHtml).append('<div class="snippet-box-label">HTML</div>'))).append(e('<td class="snippet-box-top snippet-box-right"></td>').append(e('<div class="snippet-box-container"></div>').append(n._boxCss).append('<div class="snippet-box-label">CSS</div>')))).append(e("<tr></tr>").append(e('<td class="snippet-box-bottom snippet-box-left"></td>').append(e('<div class="snippet-box-container"></div>').append(n._boxJs).append('<div class="snippet-box-label">JavaScript</div>'))).append(e('<td class="snippet-box-bottom snippet-box-right"></td>').append(e('<div class="snippet-box-container"></div>').append(n._boxResult).append('<div class="snippet-box-label">Result</div>'))))));var f=e('<input type="button" value="&#x25ba; Run"></input>').click(function(){n.run()}),h=e('<input type="button" value="Tidy" style="margin-left: 5px;"></input>').click(function(){n._codeMirrorHtml.setValue(html_beautify(n._codeMirrorHtml.getValue(),{"indent_size":2,"indent_char":" "})),n._codeMirrorCss.setValue(css_beautify(n._codeMirrorCss.getValue(),{"indent_size":2,"indent_char":" "})),n._codeMirrorJs.setValue(js_beautify(n._codeMirrorJs.getValue(),{"indent_size":2,"indent_char":" "}))}),g=e('<input type="button" value="Insert into Post" style="margin-left: 5px;"></input>').click(function(){StackExchange.helpers.closePopups(e(".popup-snippet"))}),v=e('<input type="button" value="Reset" style="margin-left: 5px;"></input>').click(function(){n.clear()}),m=d();n._hide=e('<input type="checkbox" id="'+m+'" name="hideByDefault" value="true" style="margin: 0 5px 0 20px;"></input>');var b=e('<label for="'+m+'"></label>').text("Hide snippet by default (you should include the relevant code above the snippet)");n._footer=e('<div class="snippet-footer"></div>'),n._footer.append(e('<div class="snippet-footer-content"></div>').append(n._hide).append(b)).append(e('<div class="snippet-footer-content"></div>').append(f).append(h).append(g).append(v)),n._snip=e('<div class="snippet-holder"></div>').append(n._menu).append(n._codeArea).append(n._footer),t.empty().append(n._snip),n._codeMirrorHtml=CodeMirror.fromTextArea(n._boxHtml[0],{"electricChars":!1,"lineNumbers":!0,"lineWrapping":!0,"mode":"htmlmixed","extraKeys":{"Tab":function(e){var t=Array(e.getOption("indentUnit")+1).join(" ");e.replaceSelection(t)}},"readOnly":n._readonly}),n._codeMirrorCss=CodeMirror.fromTextArea(n._boxCss[0],{"electricChars":!1,"lineNumbers":!0,"lineWrapping":!0,"mode":"css","extraKeys":{"Tab":function(e){var t=Array(e.getOption("indentUnit")+1).join(" ");e.replaceSelection(t)}},"readOnly":n._readonly}),n._codeMirrorJs=CodeMirror.fromTextArea(n._boxJs[0],{"electricChars":!1,"lineNumbers":!0,"lineWrapping":!0,"mode":"javascript","extraKeys":{"Tab":function(e){var t=Array(e.getOption("indentUnit")+1).join(" ");e.replaceSelection(t)}},"readOnly":n._readonly}),n._codeMirrorHtml.on("change",function(){n._codeMirrorHtml.save()}),n._codeMirrorCss.on("change",function(){n._codeMirrorCss.save()}),n._codeMirrorJs.on("change",function(){n._codeMirrorJs.save()}),n.registerExternalLibChange(n._jQuerySelect,'<script src="https://ajax.googleapis.com/ajax/libs/jquery/*version*/jquery.min.js"></script>',/^<script src="https:\/\/ajax\.googleapis\.com\/ajax\/libs\/jquery\/.*?\/jquery\.min\.js"><\/script>/gim,n._codeMirrorHtml),n.registerExternalLibChange(n._d3Select,'<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/*version*/d3.min.js"></script>',/^<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/d3\/.*?\/d3\.min\.js"><\/script>/gim,n._codeMirrorHtml),n.registerExternalLibChange(n._knockoutSelect,'<script src="https://cdnjs.cloudflare.com/ajax/libs/knockout/*version*/knockout-min.js"></script>',/^<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/knockout\/.*?\/knockout-min\.js"><\/script>/gim,n._codeMirrorHtml),n.registerExternalLibChange(n._angularJSSelect,'<script src="https://ajax.googleapis.com/ajax/libs/angularjs/*version*/angular.min.js"></script>',/^<script src="https:\/\/ajax\.googleapis\.com\/ajax\/libs\/angularjs\/.*?\/angular\.min\.js"><\/script>/gim,n._codeMirrorHtml),c.click(function(){function e(e,t){return e.length<t.length?!1:(e=e.toLowerCase(),0!=e.indexOf("https://")&&0!=e.indexOf("http://")&&0!=e.indexOf("//")?!1:e.substr(e.length-t.length,t.length).toLowerCase()==t.toLowerCase()?!0:!1)}var t=prompt("Please enter the URL of an external JS or CSS file");if(null!=t&&""!=t&&""!=t.trim()){var a=n._codeMirrorHtml.getValue();if(e(t,".css")){var i='<link href="'+t+'" rel="stylesheet"/>';n._codeMirrorHtml.setValue(i+"\n"+a)}else if(e(t,".js")){var i='<script src="'+t+'"></script>';n._codeMirrorHtml.setValue(i+"\n"+a)}else alert("Sorry, but that resource is invalid. Resources must begin with http:// or https:// and allowed extensions are: .css, .js")}}),e.each([n._codeMirrorHtml,n._codeMirrorCss,n._codeMirrorJs],function(t,n){n.on("focus",function(){e(n.getInputField()).closest(".snippet-box-container").children(".snippet-box-label").fadeOut()}),n.on("blur",function(){e(n.getInputField()).closest(".snippet-box-container").children(".snippet-box-label").fadeIn()})})},"run":function(){this.save(),this.writeResult()},"load":function(e){null!=e.html&&(this._state.html=e.html,this._boxHtml.val(e.html)),null!=e.css&&(this._state.css=e.css,this._boxCss.val(e.css)),null!=e.js&&(this._state.js=e.js,this._boxJs.val(e.js)),null!=e.hide&&(this._state.hide=e.hide,e.hide===!0&&this._hide.prop("checked",e.hide)),this._codeMirrorHtml.setValue(e.html),this._codeMirrorCss.setValue(e.css),this._codeMirrorJs.setValue(e.js);var t=null,n=this._codeMirrorHtml.getValue();t=/^<script src="https:\/\/ajax\.googleapis\.com\/ajax\/libs\/jquery\/(.*?)\/jquery\.min\.js"><\/script>/gim.exec(n),t&&t.length>1&&this._jQuerySelect.val(t[1]),t=/^<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/d3\/(.*?)\/d3\.min\.js"><\/script>/gim.exec(n),t&&t.length>1&&this._d3Select.val(t[1]),t=/^<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/knockout\/(.*?)\/knockout-min\.js"><\/script>/gim.exec(n),t&&t.length>1&&this._knockoutSelect.val(t[1]),t=/^<script src="https:\/\/ajax\.googleapis\.com\/ajax\/libs\/angularjs\/(.*?)\/angular\.min\.js"><\/script>/gim.exec(n),t&&t.length>1&&this._angularJSSelect.val(t[1])},"clear":function(){this._boxHtml.val(""),this._boxCss.val(""),this._boxJs.val(""),this._jQuerySelect.val(""),this._d3Select.val(""),this._knockoutSelect.val(""),this._angularJSSelect.val(""),this._hide.prop("checked",!1);var t="";null!=p&&(t="//"+p);var n=t+"/js",a=e('<form style="display: none;" action="'+n+'" method="GET" target="'+this._boxResult.attr("name")+'"></form>').appendTo("body");a.submit(),this._codeMirrorHtml.setValue(""),this._codeMirrorCss.setValue(""),this._codeMirrorJs.setValue("")},"save":function(){var e=this;return e._state.html=e._boxHtml.val(),e._state.css=e._boxCss.val(),e._state.js=e._boxJs.val(),e._state.hide=e._hide.prop("checked"),e._state},"writeResult":function(){var t=this,n=t._state.css,a=t._state.js,i=t._state.html;if(""!=n||""!=a||""!=i){var o="";null!=p&&(o="//"+p);var r=o+"/js",s=e('<form style="display: none;" action="'+r+'" method="POST" target="'+t._boxResult.attr("name")+'"></form>').append(e("<textarea></textarea>",{"name":"js","value":a}),e("<textarea></textarea>",{"name":"css","value":n}),e("<textarea></textarea>",{"name":"html","value":i})).appendTo("body");s.submit(),s.remove()}},"resize":function(){var e=this._menu.outerHeight(!0),t=this._footer.outerHeight(!0),n=this._snip.height()-e-t;this._codeArea.css({"height":n}),this._codeMirrorHtml.refresh(),this._codeMirrorCss.refresh(),this._codeMirrorJs.refresh()}},i.prototype={"generate":function(t){var n=this;if(n._snip)return n._snip;n._boxResult=e('<iframe name="'+d()+'" sandbox="allow-scripts" class="snippet-box-edit" frameBorder="0"></iframe>'),n._snip=!0;var a=e('<input type="button" value="&#x25ba; Run code snippet" style="margin: 1em 0 1em 0.5em; float: none;"></input>').click(function(){n.run()}),i=e('<input class="hideResults" type="button" value="Hide results" style="margin: 1em 0 1em 0.5em; float: none;"></input>').click(function(){n.hide()});i.hide();var o=e('<input class="copySnippet" type="button" value="Copy snippet to answer" style="margin: 1em 0 1em 0.5em; float: none;"></input>').click(function(){var t=e("#show-editor-button"),a=e("#post-editor").find("textarea.wmd-input");if(t.is(":visible")){var i=t.offset().top;e("html").animate({"scrollTop":i-60}),e("body").animate({"scrollTop":i-60},{"complete":function(){t.children("input").click()}})}else{var o=a.offset().top;e("html, body").animate({"scrollTop":o-60})}var s=n._state,c=r(s);a.val(a.val()+"\n\n"+c),StackExchange.MarkdownEditor.refreshAllPreviews()}),s=e('<div style="width: 100%; margin: 0px 5px;"></div>').append(a).append(o).append(i);n._results=e('<div style="position: relative; width: 100%; height: 200px; border-top: 1px solid #AAAAAA;"></div>').append(n._boxResult),n._results.hide();var c=e('<div class="snippet-result" style="width: 100%; border: 1px solid #AAAAAA;"></div>').append(s).append(n._results);return t.append(c),n._snip},"run":function(){var t=this;t._boxResult||(t._boxResult=e('<iframe name="'+d()+'" sandbox="allow-scripts" class="snippet-box-edit" frameBorder="0"></iframe>'),t._results.append(t._boxResult)),t._boxResult.parent().is(":hidden")&&(t._boxResult.closest(".snippet-result").find(".hideResults").css("display",""),t._boxResult.parent().slideDown(200,function(){var n=e('<div class="popout" style="position: absolute; top: 20px; right: 20px; padding: 3px; border: 1px solid #AAAAAA; background-color: #FFFFFF;"><a>Full page</a></div>'),a=e('<div class="popin" style="position: fixed; top: 35px; right: 35px; padding: 3px; border: 1px solid #AAAAAA; background-color: #FFFFFF; z-index: 10001"><a>Close</a></div>').hide();n.click(function(){t._boxResult.data("_style",t._boxResult.attr("style")),t._boxResult.css({"position":"fixed","top":0,"left":0,"width":"100%","height":"100%","background-color":"#FFFFFF","z-index":1e4}),t._boxResult.parent().css("position",""),e(this).hide(),a.show(),e("body").css("overflow","hidden")}),a.click(function(){t._boxResult.removeAttr("style"),t._boxResult.attr("style",t._boxResult.data("_style")),t._boxResult.parent().css("position","relative"),e(this).hide(),n.show(),e("body").css("overflow","")}),e(this).append(n).append(a)})),this.writeResult()},"hide":function(){var t=this;t._boxResult.parent().is(":visible")&&(t._boxResult.closest(".snippet-result").find(".hideResults").hide(),t._boxResult.parent().children(".popout").remove(),t._boxResult.parent().children(".popin").remove(),t._boxResult.parent().slideUp(200,function(){e(this).hide(),t._boxResult.remove(),delete t._boxResult}))},"load":function(e){null!=e.css&&(this._state.css=e.css),null!=e.js&&(this._state.js=e.js),null!=e.html&&(this._state.html=e.html),null!=e.hide&&(this._state.hide=e.hide)},"writeResult":function(){var t=this,n=t._state.css,a=t._state.js,i=t._state.html;if(""!=n||""!=a||""!=i){var o="";null!=p&&(o="//"+p);var r=o+"/js",s=e('<form style="display: none;" action="'+r+'" method="POST" target="'+t._boxResult.attr("name")+'"></form>').append(e("<textarea></textarea>",{"name":"js","value":a}),e("<textarea></textarea>",{"name":"css","value":n}),e("<textarea></textarea>",{"name":"html","value":i})).appendTo("body");s.submit(),s.remove()}},"resize":function(){}};var f={};StackExchange.snippets=function(){function t(e,t,n,a,i){function o(e,t,n){for(var a=-1,i=-1;;){if(i=t.indexOf(e,i+1),-1==i)break;(0>a||Math.abs(i-n)<Math.abs(i-a))&&(a=i)}return a}return e.replace(/<!--\s+begin snippet:\s*[a-z]+\s*(?:hide:\s*([a-zA-Z]+))?\s+-->([\s\S]*?)<!--\s+end snippet\s+-->/gi,function(e,r,s,c){var l={"payload":{"code":s,"hide":null!=r&&"true"===r.toLowerCase()},"pos":o(e,t,c),"len":e.length};return-1===l.pos?e:(i.push(l),e+"\n\n"+n+a+"-"+(i.length-1)+"%")})}function n(){l(),StackExchange.externalEditor&&a&&(a=!1,StackExchange.externalEditor.init({"thingName":"snippet","thingFinder":t,"getDivContent":function(t){var n=null;t&&(n=s(t.code,t.hide));var a=e('<div class="popup popup-snippet" style="display: block; padding: 0; width: 100%; height: 100%; text-align: left;"></div>');return a.snippet({"markdownPluginMode":!0,"state":n}),a},"buttonTooltip":"JavaScript snippet","buttonImageUrl":"/content/balsamiq/wmd-mockup-button.png?v=4","onShow":function(t){var n=e(".popup-snippet"),a=function(e){var a=n.data("_snippet").save();if(e||""==a.html&&""==a.css&&""==a.js)t(null);else{var i=r(a);t(i,i)}};n.on("popupClosing",function(e){var t="esc"==e.closeTrigger;return t&&!confirm("Are you sure you want to abandon any changes?")?(e.preventDefault(),void 0):(a(t),void 0)})}})),StackExchange.MarkdownEditor&&StackExchange.MarkdownEditor.creationCallbacks.add(function(t,n){var a=t.getConverter().hooks;a.chain("preConversion",c);var i=e("#wmd-preview"+n);i.on("wmdrefresh",function(){i.find("pre").each(function(){var t=e(this),n=t.text();if(f[n]){var a=f[n];delete f[n],u(a),t.replaceWith(e("<p></p>").append(a))}})})})}var a=!0;return{"init":n,"initSnippetRenderer":l,"makeSnippets":c}}()}(jQuery,window);