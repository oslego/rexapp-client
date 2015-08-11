"use strict";function _setupCache(data){return window.cache.banks=data.banks,data}function _setupCurrencySelect(data){var code,name,currencies=data.currencies,host=qs("#currency"),currCode=qs("#active_currency_code"),currName=qs("#active_currency_name"),tags=[];for(code in currencies)name=currencies[code].name,tags.push('<option value="'+code+'" data-name="'+name+'">'+code+" - "+name+"</option>\n");host.innerHTML=tags.join(""),host.addEventListener("change",function(e){currCode.textContent=e.target.value,currName.textContent=e.target.selectedOptions[0].dataset.name,e.target.blur()}),host.selectedIndex=0,host.dispatchEvent(new Event("change"))}function _setupSearchForm(){var form=qs("#search");form.addEventListener("submit",function(e){var query={operation:"buy"===e.target.operation.value?"sell":"buy",currency:e.target.currency.value,amount:e.target.amount.value};_getResults(query).then(_renderResults),e.preventDefault()})}function _getResults(query){return new Promise(function(resolve,reject){var URL="http://api.rexapp.ro/v1/rates/"+query.currency;JSONP({url:URL,success:function(data){var results=data.rates.map(function(rate){var amount=query.amount*rate[query.operation];return{bank:cache.banks[rate.id].name,amount:amount,operation:query.operation}}).sort(function(a,b){return"sell"===query.operation?a.amount>b.amount:a.amount<b.amount});resolve(results)}})})}function _renderResults(results){var amount,delta,sign,host=qs("#results"),best=results[0].amount;host.innerHTML=results.map(function(result){return amount=result.amount,delta=-1*(best-amount),sign=delta>0?"+":"",rateClass=0===delta?"best-rate":"",delta=0===delta?"cel mai bun curs":result.amount<1e3?Number(delta).toLocaleString("ro-RO",{minimumFractionDigits:2,maximumFractionDigits:2}):Number(delta).toLocaleString("ro-RO",Math.round(delta)),amount=result.amount<1e3?Number(amount).toLocaleString("ro-RO",{minimumFractionDigits:2,maximumFractionDigits:2}):Number(amount).toLocaleString("ro-RO",Math.round(amount)),'<li class="result__item">\n      <span class="bank">'+result.bank+'</span>\n      <div class="rate">\n        <div class="total">'+amount+'</div>\n        <div class="delta '+rateClass+'">'+sign+delta+"</div>\n      </div>\n    </li>"}).join("")}function _init(){qs("#search").submit.click()}(function(){var JSONP,computedUrl,createElement,encode,noop,objectToURI,random,randomString;createElement=function(tag){return window.document.createElement(tag)},encode=window.encodeURIComponent,random=Math.random,JSONP=function(options){var callback,done,head,params,script;if(options=options?options:{},params={data:options.data||{},error:options.error||noop,success:options.success||noop,beforeSend:options.beforeSend||noop,complete:options.complete||noop,url:options.url||""},params.computedUrl=computedUrl(params),0===params.url.length)throw new Error("MissingUrl");return done=!1,params.beforeSend({},params)!==!1?(callback=params.data[options.callbackName||"callback"]="jsonp_"+randomString(15),window[callback]=function(data){params.success(data,params),params.complete(data,params);try{return delete window[callback]}catch(_error){return void(window[callback]=void 0)}},script=createElement("script"),script.src=computedUrl(params),script.async=!0,script.onerror=function(evt){return params.error({url:script.src,event:evt}),params.complete({url:script.src,event:evt},params)},script.onload=script.onreadystatechange=function(){return done||this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState?void 0:(done=!0,script.onload=script.onreadystatechange=null,script&&script.parentNode&&script.parentNode.removeChild(script),script=null)},head=head||window.document.getElementsByTagName("head")[0]||window.document.documentElement,head.insertBefore(script,head.firstChild)):void 0},noop=function(){return void 0},computedUrl=function(params){var url;return url=params.url,url+=params.url.indexOf("?")<0?"?":"&",url+=objectToURI(params.data)},randomString=function(length){var str;for(str="";str.length<length;)str+=random().toString(36)[2];return str},objectToURI=function(obj){var data,key,value;data=[];for(key in obj)value=obj[key],data.push(encode(key)+"="+encode(value));return data.join("&")},"undefined"!=typeof define&&null!==define&&define.amd?define(function(){return JSONP}):"undefined"!=typeof module&&null!==module&&module.exports?module.exports=JSONP:this.JSONP=JSONP}).call(this),function(){function lib$es6$promise$utils$$objectOrFunction(x){return"function"==typeof x||"object"==typeof x&&null!==x}function lib$es6$promise$utils$$isFunction(x){return"function"==typeof x}function lib$es6$promise$utils$$isMaybeThenable(x){return"object"==typeof x&&null!==x}function lib$es6$promise$asap$$setScheduler(scheduleFn){lib$es6$promise$asap$$customSchedulerFn=scheduleFn}function lib$es6$promise$asap$$setAsap(asapFn){lib$es6$promise$asap$$asap=asapFn}function lib$es6$promise$asap$$useNextTick(){return function(){process.nextTick(lib$es6$promise$asap$$flush)}}function lib$es6$promise$asap$$useVertxTimer(){return function(){lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush)}}function lib$es6$promise$asap$$useMutationObserver(){var iterations=0,observer=new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush),node=document.createTextNode("");return observer.observe(node,{characterData:!0}),function(){node.data=iterations=++iterations%2}}function lib$es6$promise$asap$$useMessageChannel(){var channel=new MessageChannel;return channel.port1.onmessage=lib$es6$promise$asap$$flush,function(){channel.port2.postMessage(0)}}function lib$es6$promise$asap$$useSetTimeout(){return function(){setTimeout(lib$es6$promise$asap$$flush,1)}}function lib$es6$promise$asap$$flush(){for(var i=0;lib$es6$promise$asap$$len>i;i+=2){var callback=lib$es6$promise$asap$$queue[i],arg=lib$es6$promise$asap$$queue[i+1];callback(arg),lib$es6$promise$asap$$queue[i]=void 0,lib$es6$promise$asap$$queue[i+1]=void 0}lib$es6$promise$asap$$len=0}function lib$es6$promise$asap$$attemptVertx(){try{var r=require,vertx=r("vertx");return lib$es6$promise$asap$$vertxNext=vertx.runOnLoop||vertx.runOnContext,lib$es6$promise$asap$$useVertxTimer()}catch(e){return lib$es6$promise$asap$$useSetTimeout()}}function lib$es6$promise$$internal$$noop(){}function lib$es6$promise$$internal$$selfFulfillment(){return new TypeError("You cannot resolve a promise with itself")}function lib$es6$promise$$internal$$cannotReturnOwn(){return new TypeError("A promises callback cannot return that same promise.")}function lib$es6$promise$$internal$$getThen(promise){try{return promise.then}catch(error){return lib$es6$promise$$internal$$GET_THEN_ERROR.error=error,lib$es6$promise$$internal$$GET_THEN_ERROR}}function lib$es6$promise$$internal$$tryThen(then,value,fulfillmentHandler,rejectionHandler){try{then.call(value,fulfillmentHandler,rejectionHandler)}catch(e){return e}}function lib$es6$promise$$internal$$handleForeignThenable(promise,thenable,then){lib$es6$promise$asap$$asap(function(promise){var sealed=!1,error=lib$es6$promise$$internal$$tryThen(then,thenable,function(value){sealed||(sealed=!0,thenable!==value?lib$es6$promise$$internal$$resolve(promise,value):lib$es6$promise$$internal$$fulfill(promise,value))},function(reason){sealed||(sealed=!0,lib$es6$promise$$internal$$reject(promise,reason))},"Settle: "+(promise._label||" unknown promise"));!sealed&&error&&(sealed=!0,lib$es6$promise$$internal$$reject(promise,error))},promise)}function lib$es6$promise$$internal$$handleOwnThenable(promise,thenable){thenable._state===lib$es6$promise$$internal$$FULFILLED?lib$es6$promise$$internal$$fulfill(promise,thenable._result):thenable._state===lib$es6$promise$$internal$$REJECTED?lib$es6$promise$$internal$$reject(promise,thenable._result):lib$es6$promise$$internal$$subscribe(thenable,void 0,function(value){lib$es6$promise$$internal$$resolve(promise,value)},function(reason){lib$es6$promise$$internal$$reject(promise,reason)})}function lib$es6$promise$$internal$$handleMaybeThenable(promise,maybeThenable){if(maybeThenable.constructor===promise.constructor)lib$es6$promise$$internal$$handleOwnThenable(promise,maybeThenable);else{var then=lib$es6$promise$$internal$$getThen(maybeThenable);then===lib$es6$promise$$internal$$GET_THEN_ERROR?lib$es6$promise$$internal$$reject(promise,lib$es6$promise$$internal$$GET_THEN_ERROR.error):void 0===then?lib$es6$promise$$internal$$fulfill(promise,maybeThenable):lib$es6$promise$utils$$isFunction(then)?lib$es6$promise$$internal$$handleForeignThenable(promise,maybeThenable,then):lib$es6$promise$$internal$$fulfill(promise,maybeThenable)}}function lib$es6$promise$$internal$$resolve(promise,value){promise===value?lib$es6$promise$$internal$$reject(promise,lib$es6$promise$$internal$$selfFulfillment()):lib$es6$promise$utils$$objectOrFunction(value)?lib$es6$promise$$internal$$handleMaybeThenable(promise,value):lib$es6$promise$$internal$$fulfill(promise,value)}function lib$es6$promise$$internal$$publishRejection(promise){promise._onerror&&promise._onerror(promise._result),lib$es6$promise$$internal$$publish(promise)}function lib$es6$promise$$internal$$fulfill(promise,value){promise._state===lib$es6$promise$$internal$$PENDING&&(promise._result=value,promise._state=lib$es6$promise$$internal$$FULFILLED,0!==promise._subscribers.length&&lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish,promise))}function lib$es6$promise$$internal$$reject(promise,reason){promise._state===lib$es6$promise$$internal$$PENDING&&(promise._state=lib$es6$promise$$internal$$REJECTED,promise._result=reason,lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection,promise))}function lib$es6$promise$$internal$$subscribe(parent,child,onFulfillment,onRejection){var subscribers=parent._subscribers,length=subscribers.length;parent._onerror=null,subscribers[length]=child,subscribers[length+lib$es6$promise$$internal$$FULFILLED]=onFulfillment,subscribers[length+lib$es6$promise$$internal$$REJECTED]=onRejection,0===length&&parent._state&&lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish,parent)}function lib$es6$promise$$internal$$publish(promise){var subscribers=promise._subscribers,settled=promise._state;if(0!==subscribers.length){for(var child,callback,detail=promise._result,i=0;i<subscribers.length;i+=3)child=subscribers[i],callback=subscribers[i+settled],child?lib$es6$promise$$internal$$invokeCallback(settled,child,callback,detail):callback(detail);promise._subscribers.length=0}}function lib$es6$promise$$internal$$ErrorObject(){this.error=null}function lib$es6$promise$$internal$$tryCatch(callback,detail){try{return callback(detail)}catch(e){return lib$es6$promise$$internal$$TRY_CATCH_ERROR.error=e,lib$es6$promise$$internal$$TRY_CATCH_ERROR}}function lib$es6$promise$$internal$$invokeCallback(settled,promise,callback,detail){var value,error,succeeded,failed,hasCallback=lib$es6$promise$utils$$isFunction(callback);if(hasCallback){if(value=lib$es6$promise$$internal$$tryCatch(callback,detail),value===lib$es6$promise$$internal$$TRY_CATCH_ERROR?(failed=!0,error=value.error,value=null):succeeded=!0,promise===value)return void lib$es6$promise$$internal$$reject(promise,lib$es6$promise$$internal$$cannotReturnOwn())}else value=detail,succeeded=!0;promise._state!==lib$es6$promise$$internal$$PENDING||(hasCallback&&succeeded?lib$es6$promise$$internal$$resolve(promise,value):failed?lib$es6$promise$$internal$$reject(promise,error):settled===lib$es6$promise$$internal$$FULFILLED?lib$es6$promise$$internal$$fulfill(promise,value):settled===lib$es6$promise$$internal$$REJECTED&&lib$es6$promise$$internal$$reject(promise,value))}function lib$es6$promise$$internal$$initializePromise(promise,resolver){try{resolver(function(value){lib$es6$promise$$internal$$resolve(promise,value)},function(reason){lib$es6$promise$$internal$$reject(promise,reason)})}catch(e){lib$es6$promise$$internal$$reject(promise,e)}}function lib$es6$promise$enumerator$$Enumerator(Constructor,input){var enumerator=this;enumerator._instanceConstructor=Constructor,enumerator.promise=new Constructor(lib$es6$promise$$internal$$noop),enumerator._validateInput(input)?(enumerator._input=input,enumerator.length=input.length,enumerator._remaining=input.length,enumerator._init(),0===enumerator.length?lib$es6$promise$$internal$$fulfill(enumerator.promise,enumerator._result):(enumerator.length=enumerator.length||0,enumerator._enumerate(),0===enumerator._remaining&&lib$es6$promise$$internal$$fulfill(enumerator.promise,enumerator._result))):lib$es6$promise$$internal$$reject(enumerator.promise,enumerator._validationError())}function lib$es6$promise$promise$all$$all(entries){return new lib$es6$promise$enumerator$$default(this,entries).promise}function lib$es6$promise$promise$race$$race(entries){function onFulfillment(value){lib$es6$promise$$internal$$resolve(promise,value)}function onRejection(reason){lib$es6$promise$$internal$$reject(promise,reason)}var Constructor=this,promise=new Constructor(lib$es6$promise$$internal$$noop);if(!lib$es6$promise$utils$$isArray(entries))return lib$es6$promise$$internal$$reject(promise,new TypeError("You must pass an array to race.")),promise;for(var length=entries.length,i=0;promise._state===lib$es6$promise$$internal$$PENDING&&length>i;i++)lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]),void 0,onFulfillment,onRejection);return promise}function lib$es6$promise$promise$resolve$$resolve(object){var Constructor=this;if(object&&"object"==typeof object&&object.constructor===Constructor)return object;var promise=new Constructor(lib$es6$promise$$internal$$noop);return lib$es6$promise$$internal$$resolve(promise,object),promise}function lib$es6$promise$promise$reject$$reject(reason){var Constructor=this,promise=new Constructor(lib$es6$promise$$internal$$noop);return lib$es6$promise$$internal$$reject(promise,reason),promise}function lib$es6$promise$promise$$needsResolver(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function lib$es6$promise$promise$$needsNew(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function lib$es6$promise$promise$$Promise(resolver){this._id=lib$es6$promise$promise$$counter++,this._state=void 0,this._result=void 0,this._subscribers=[],lib$es6$promise$$internal$$noop!==resolver&&(lib$es6$promise$utils$$isFunction(resolver)||lib$es6$promise$promise$$needsResolver(),this instanceof lib$es6$promise$promise$$Promise||lib$es6$promise$promise$$needsNew(),lib$es6$promise$$internal$$initializePromise(this,resolver))}function lib$es6$promise$polyfill$$polyfill(){var local;if("undefined"!=typeof global)local=global;else if("undefined"!=typeof self)local=self;else try{local=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var P=local.Promise;(!P||"[object Promise]"!==Object.prototype.toString.call(P.resolve())||P.cast)&&(local.Promise=lib$es6$promise$promise$$default)}var lib$es6$promise$utils$$_isArray;lib$es6$promise$utils$$_isArray=Array.isArray?Array.isArray:function(x){return"[object Array]"===Object.prototype.toString.call(x)};var lib$es6$promise$asap$$vertxNext,lib$es6$promise$asap$$customSchedulerFn,lib$es6$promise$asap$$scheduleFlush,lib$es6$promise$utils$$isArray=lib$es6$promise$utils$$_isArray,lib$es6$promise$asap$$len=0,lib$es6$promise$asap$$asap=({}.toString,function(callback,arg){lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len]=callback,lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len+1]=arg,lib$es6$promise$asap$$len+=2,2===lib$es6$promise$asap$$len&&(lib$es6$promise$asap$$customSchedulerFn?lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush):lib$es6$promise$asap$$scheduleFlush())}),lib$es6$promise$asap$$browserWindow="undefined"!=typeof window?window:void 0,lib$es6$promise$asap$$browserGlobal=lib$es6$promise$asap$$browserWindow||{},lib$es6$promise$asap$$BrowserMutationObserver=lib$es6$promise$asap$$browserGlobal.MutationObserver||lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver,lib$es6$promise$asap$$isNode="undefined"!=typeof process&&"[object process]"==={}.toString.call(process),lib$es6$promise$asap$$isWorker="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,lib$es6$promise$asap$$queue=new Array(1e3);lib$es6$promise$asap$$scheduleFlush=lib$es6$promise$asap$$isNode?lib$es6$promise$asap$$useNextTick():lib$es6$promise$asap$$BrowserMutationObserver?lib$es6$promise$asap$$useMutationObserver():lib$es6$promise$asap$$isWorker?lib$es6$promise$asap$$useMessageChannel():void 0===lib$es6$promise$asap$$browserWindow&&"function"==typeof require?lib$es6$promise$asap$$attemptVertx():lib$es6$promise$asap$$useSetTimeout();var lib$es6$promise$$internal$$PENDING=void 0,lib$es6$promise$$internal$$FULFILLED=1,lib$es6$promise$$internal$$REJECTED=2,lib$es6$promise$$internal$$GET_THEN_ERROR=new lib$es6$promise$$internal$$ErrorObject,lib$es6$promise$$internal$$TRY_CATCH_ERROR=new lib$es6$promise$$internal$$ErrorObject;lib$es6$promise$enumerator$$Enumerator.prototype._validateInput=function(input){return lib$es6$promise$utils$$isArray(input)},lib$es6$promise$enumerator$$Enumerator.prototype._validationError=function(){return new Error("Array Methods must be provided an Array")},lib$es6$promise$enumerator$$Enumerator.prototype._init=function(){this._result=new Array(this.length)};var lib$es6$promise$enumerator$$default=lib$es6$promise$enumerator$$Enumerator;lib$es6$promise$enumerator$$Enumerator.prototype._enumerate=function(){for(var enumerator=this,length=enumerator.length,promise=enumerator.promise,input=enumerator._input,i=0;promise._state===lib$es6$promise$$internal$$PENDING&&length>i;i++)enumerator._eachEntry(input[i],i)},lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry=function(entry,i){var enumerator=this,c=enumerator._instanceConstructor;lib$es6$promise$utils$$isMaybeThenable(entry)?entry.constructor===c&&entry._state!==lib$es6$promise$$internal$$PENDING?(entry._onerror=null,enumerator._settledAt(entry._state,i,entry._result)):enumerator._willSettleAt(c.resolve(entry),i):(enumerator._remaining--,enumerator._result[i]=entry)},lib$es6$promise$enumerator$$Enumerator.prototype._settledAt=function(state,i,value){var enumerator=this,promise=enumerator.promise;promise._state===lib$es6$promise$$internal$$PENDING&&(enumerator._remaining--,state===lib$es6$promise$$internal$$REJECTED?lib$es6$promise$$internal$$reject(promise,value):enumerator._result[i]=value),0===enumerator._remaining&&lib$es6$promise$$internal$$fulfill(promise,enumerator._result)},lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt=function(promise,i){var enumerator=this;lib$es6$promise$$internal$$subscribe(promise,void 0,function(value){enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED,i,value)},function(reason){enumerator._settledAt(lib$es6$promise$$internal$$REJECTED,i,reason)})};var lib$es6$promise$promise$all$$default=lib$es6$promise$promise$all$$all,lib$es6$promise$promise$race$$default=lib$es6$promise$promise$race$$race,lib$es6$promise$promise$resolve$$default=lib$es6$promise$promise$resolve$$resolve,lib$es6$promise$promise$reject$$default=lib$es6$promise$promise$reject$$reject,lib$es6$promise$promise$$counter=0,lib$es6$promise$promise$$default=lib$es6$promise$promise$$Promise;lib$es6$promise$promise$$Promise.all=lib$es6$promise$promise$all$$default,lib$es6$promise$promise$$Promise.race=lib$es6$promise$promise$race$$default,lib$es6$promise$promise$$Promise.resolve=lib$es6$promise$promise$resolve$$default,lib$es6$promise$promise$$Promise.reject=lib$es6$promise$promise$reject$$default,lib$es6$promise$promise$$Promise._setScheduler=lib$es6$promise$asap$$setScheduler,lib$es6$promise$promise$$Promise._setAsap=lib$es6$promise$asap$$setAsap,lib$es6$promise$promise$$Promise._asap=lib$es6$promise$asap$$asap,lib$es6$promise$promise$$Promise.prototype={constructor:lib$es6$promise$promise$$Promise,then:function(onFulfillment,onRejection){var parent=this,state=parent._state;if(state===lib$es6$promise$$internal$$FULFILLED&&!onFulfillment||state===lib$es6$promise$$internal$$REJECTED&&!onRejection)return this;var child=new this.constructor(lib$es6$promise$$internal$$noop),result=parent._result;if(state){var callback=arguments[state-1];lib$es6$promise$asap$$asap(function(){lib$es6$promise$$internal$$invokeCallback(state,child,callback,result)})}else lib$es6$promise$$internal$$subscribe(parent,child,onFulfillment,onRejection);return child},"catch":function(onRejection){return this.then(null,onRejection)}};var lib$es6$promise$polyfill$$default=lib$es6$promise$polyfill$$polyfill,lib$es6$promise$umd$$ES6Promise={Promise:lib$es6$promise$promise$$default,polyfill:lib$es6$promise$polyfill$$default};"function"==typeof define&&define.amd?define(function(){return lib$es6$promise$umd$$ES6Promise}):"undefined"!=typeof module&&module.exports?module.exports=lib$es6$promise$umd$$ES6Promise:"undefined"!=typeof this&&(this.ES6Promise=lib$es6$promise$umd$$ES6Promise),lib$es6$promise$polyfill$$default()}.call(this);var cache={},qs=document.querySelector.bind(document),getConfigData=new Promise(function(resolve,reject){var CONFIG_URL="http://api.rexapp.ro/v1/config";JSONP({url:CONFIG_URL,success:function(data){return resolve(data.config)}})});getConfigData.then(_setupCache).then(_setupCurrencySelect).then(_setupSearchForm).then(_init);
