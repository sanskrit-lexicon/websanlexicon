//web/webtc/main_webtc.js


function getWord() {
  var word = "";
  if (document.getElementById("key").value) {
    word = document.getElementById("key").value;
  }
  if ((word.length < 1)) {
   alert('Please specify a citation.');
   return;
  }
  
  var filter = document.getElementById("filter").value;
  var transLit = document.getElementById("transLit").value;
  var accent = document.getElementById("accent").value;
 
  var noLit;
  if (! document.getElementById("noLit")) {
   noLit='off';
  }else if ( document.getElementById("noLit").checked) {
   noLit = 'on';
  } else {
   noLit = 'off';
  }
  
  var url =  "getword.php" +  
   "?key=" +escape(word) + 
   "&filter=" +escape(filter) +
   "&noLit=" + escape(noLit) +
   "&accent=" + escape(accent) +
   "&transLit=" + escape(transLit);

    jQuery.ajax({
	url:url,
	type:"GET",
        success: function(data,textStatus,jqXHR) {
            var useragent = navigator.userAgent;
	    if (!useragent) {useragent='';}
            //alert('useragent=' + useragent);
	    //alert(filter + ',' + transLit);
	    jQuery("#disp").html(data);
	    if (filter == 'deva') {
                 modifyDeva();
	    }
	},
	error:function(jqXHR, textStatus, errorThrown) {
	    alert("Error: " + textStatus);
	}
    });

}

function cookieUpdate(flag) {
 // 1. Cookie named 'mwiobasic' for holding transLit and filter values;
 // this cookie name is different from that used in the 'Preferences'
 // logic of webtc5(wb).
 // 2. The 'transLit' and 'filter' DOM elements are used to reset the cookie 
 // value when either (a) flag is TRUE, or (b) there is no old cookie value.
 // After the cookie value is set, then the cookie values are used to
 // set the DOM elements 'transLit', 'filter', 'input_input', 'input_output'.
 // 3. For the webtc logic (indexcaller.php), it is further desired to reset 
 // thecookie when there are parameters passed to the indexcaller.php program.
 // This is accomplished by checking the 'indexcaller' DOM element value; 
 // namely, when 'flag' is false and 'indexcaller' DOM element has value='YES',
 // then the cookie value is set as in 2, from the 'transLit' and 'filter' DOM
 // elements.

 // Leave cookieName to mwiobasic, so all dictionaries made this way will
 // share the user preferences
 var cookieName = 'mwiobasic';
 var cookieOptions = {expires: 365, path:'/'}; // 365 days
 var cookieValue = $.cookie(cookieName);
 var cookieValue_DOM = document.getElementById("transLit").value + "," + 
    document.getElementById("filter").value;

 if ((! flag) && (jQuery("#indexcaller").val() == "YES")) {
   // override cookie value
     cookieValue =  cookieValue_DOM;
 }else if ((! cookieValue) || flag) {
     cookieValue =  cookieValue_DOM;
 }
 $.cookie(cookieName,cookieValue,cookieOptions);
 // Now, make DOM elements consistent with cookieValue
 cookieValue = $.cookie(cookieName);
 //alert('cookie check1: ' + cookieValue);
 // set transLit and filter from cookieValue
 var values = cookieValue.split(",");
 document.getElementById("transLit").value = values[0];
 document.getElementById("filter").value = values[1];
 document.getElementById("input_input").value = values[0];
 document.getElementById("input_output").value = values[1];
 //alert('cookie check2: ' + cookieValue);
};
$(document).ready(function() {
 // initialize handlers
  $('#key').keydown(function(event) {
   if (event.keyCode == '13') {
    event.preventDefault();
    getWord();
   }
   });
  $('#transLit').change(function(event) {
  cookieUpdate(true);   
  });
  $('#filter').change(function(event) {
  cookieUpdate(true);   
  });
  // other initializations
  cookieUpdate(false);  // for initializing cookie
  win_ls=null; // initialize 'literary source' window. This is global
  jQuery("#disp").html=""; // blank the display
  // respond to RESTFUL requests
  var word=jQuery("#key").val();
  if (word) {getWord();}
});
function getFontClass() {
 return "sdata_siddhanta"; // 10-30-2017.
 var family = document.getElementById("devafont").value;
 if (family === "system") {return "sdata_system";}
 if (family === "praja") {return "sdata_praja";}
 if (family === "oldstandard") {return "sdata_oldstandard";}   
 if (family === "sanskrit2003") {return "sdata_sanskrit2003";}   
 if (family === "siddhanta") {return "sdata_siddhanta";}   
 return "sdata";
}
function modifyDeva() {
    var fontclass = getFontClass();
    console.log('modifyDeva: fontclass=',fontclass);
    var useragent = navigator.userAgent;
    if (!useragent) {useragent='';}
    if ((useragent.match(/Windows/i)) || (useragent.match(/Macintosh/i))){
  jQuery(".sdata").removeClass("sdata").addClass(fontclass);
 }else {
	//alert('useragent not "Windows"=' + useragent);
 }
}
