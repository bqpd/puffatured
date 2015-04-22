window.boxite = {}

window.boxite.compile = function(interstitial) {
$(window).ready(function() {

var newlines = / *\n */g;
var paragraphs = /\n *\n/g;
var title = interstitial.header.title;
var title_lines = 1 + title.match(newlines).length;
var header_title = "";
for (var i=title_lines; i<3; i++)
    header_title += "<br>"
header_title += title.replace(newlines, "<br>")

window.document.title = title;
$("#title").html(header_title);
$("#header").attr({style: "background-image: url("+interstitial.header.image+")"})
if (interstitial.header.whitegradient) {
    $("#lens").addClass("white");
    $("#title").addClass("white");
}

var lastwasimage = false;
for (var i=0; i<interstitial.content.length; i++) {
    var block = interstitial.content[i];
    var html = "";

    if ($.type(block) === "string") {
        if (block) {
            html = block.replace(paragraphs, "<p>");
            if (lastwasimage)
                html = "<p>"+html;
            lastwasimage = false;
        }
    } else if ("image" in block) {
        var height = block.height ? "height: "+block.height+"; " : "";
        var white = block.whitegradient ? "white " : "";
        var place = block.place ? '<span class="place">'+block.place+'</span>' : "";
        var date = block.date ? '<span class="date">'+block.date+'</span>' : "";
        html = '<div class="'+white+'project-outer" style="'+height+'background-image: url('+block.image+');"><div class="'+white+'gradient"><div class="project-inner">'+place+block.caption+date+'</div></div></div>';
        lastwasimage = true;
    } else if ("header" in block) {
        html = '<h1>'+block.header+'</h1>';
        if (lastwasimage)
            html = "<p>"+html;
        lastwasimage = false;
    } else {
        console.log("Unknown object:");
        console.log(block);
    }

    $("#content").append(html);
}

$("#content").append('<div id="content-footer"></div>')

}) };
