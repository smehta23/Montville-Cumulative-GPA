var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-99015999-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

//Run the script
$('#gpa_calc').on('click', () => {
    chrome.tabs.executeScript({
        file: './src/contentscript.js'
      });
});
