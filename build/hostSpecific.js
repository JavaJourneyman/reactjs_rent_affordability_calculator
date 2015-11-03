var pasteContent = ''; 
var randomLinkText = [
'The <a href="http://www.movingtonewyorkguide.com/tools/how-much-rent-calculator/">How Much Rent Can I Afford?</a> calculator was made by the folks at <a href="http://www.movingtonewyorkguide.com">Moving to New York Guide</a>', 
'This <a href="http://www.movingtonewyorkguide.com/tools/how-much-rent-calculator/">apartment rent calculator</a> was made by the folks at <a href="http://www.movingtonewyorkguide.com">Moving to New York Guide</a>', 
'This <a href="http://www.movingtonewyorkguide.com/tools/how-much-rent-calculator/">rent budget calculator</a> was made by the folks at <a href="http://www.movingtonewyorkguide.com">Moving to New York Guide</a>',
'This <a href="http://www.movingtonewyorkguide.com/tools/how-much-rent-calculator/">rent affordability calculator</a> was made by the folks at <a href="http://www.movingtonewyorkguide.com">Moving to New York Guide</a>',
'The "<a href="http://www.movingtonewyorkguide.com/tools/how-much-rent-calculator/">how much apartment can i afford?</a>" calculator was made by the folks at <a href="http://www.movingtonewyorkguide.com">Moving to New York Guide</a>',
];
var rand = randomLinkText[Math.floor(Math.random() * randomLinkText.length)];
// insert random text link at bottom of html 
$('#calcApp_linkTextArea').html(rand); 
regularPasteContent = $('#copyThis').html(); 
formattedPasteContent = regularPasteContent.replace(/</g, "&lt;").replace(/>/g, "&gt;"); 
$('#calcApp_codeContainer').html(formattedPasteContent);
function copyToClipboard(text) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
  }