/* CACHE STUFF */
var broadcastStatus = $('#broadcast-status');
var broadcastLivestream = $('#broadcast-livestream');
var broadcastTV = $('#broadcast-tv');
var broadcastFm = $('#broadcast-fm');
var socialMedia = $('section#social-media');
var sitePostsSection = $('section#site-posts');
var sitePosts = $('section#site-posts div.posts');

function initStream() {

var stream = {
			title: "NovaraFM Archive",
			oga: "http://stream.fm.novaramedia.com:8000/novarafm_archive.ogg"
		},
			ready = false;
		var my_jPlayer = $("#jplayer"),
			my_playState = $("#jp_container .play-state"),
			my_extraPlayInfo = $("#jp_container .extra-play-info");
		var opt_text_playing = "Now playing",
			opt_text_selected = "Track selected";
		$.jPlayer.timeFormat.padMin = false;
		$.jPlayer.timeFormat.padSec = false;
		$.jPlayer.timeFormat.sepMin = " min ";
		$.jPlayer.timeFormat.sepSec = " sec";
		my_playState.text(opt_text_selected);
		my_jPlayer.jPlayer({
			ready: function() {
				ready = true;
				$(this).jPlayer("setMedia", stream);
			},
			timeupdate: function(event) {
				my_extraPlayInfo.text(parseInt(event.jPlayer.status.currentPercentAbsolute, 10) + "%");
			},
			play: function(event) {
				my_playState.text(opt_text_playing);
			},
			pause: function(event) {
				my_playState.text(opt_text_selected);
				$(this).jPlayer("clearMedia");
			},
			ended: function(event) {
				my_playState.text(opt_text_selected);
			},
			error: function(event) {
				if (ready && event.jPlayer.error.type === $.jPlayer.error.URL_NOT_SET) {
					$(this).jPlayer("setMedia", stream).jPlayer("play");
				}
			},
			swfPath: "js",
			cssSelectorAncestor: "#jp_container",
			supplied: "oga",
			preload: "none",
			wmode: "window"
		});
}

$(document).ready(function() {

	initStream();

	$.getJSON("http://novaramedia.com/api/all/?callback=?", null, function(data) {
			var posts_insert = [];
			$.each(data.posts, function(i, item) {
				posts_insert.push('<a target="_blank" href="' + item.permalink + '"><li>' + item.title + '</li></a>');
			});
			$('<ul/>', {
				'id': 'site-posts-posts',
				'class': 'clearfix',
				html: posts_insert.join('')
			}).prependTo(sitePosts);
		});

});