	var twitinstance = 0;
	var refresh;
	
	var broadcastStatus = $('#broadcast-status');
	var broadcastLivestream = $('#broadcast-livestream');
	var broadcastTV = $('#broadcast-tv');
	var broadcastFm = $('#broadcast-fm');
	var socialMedia = $('section#social-media');
	var sitePosts = $('section#site-posts div.posts');
	
	var currentLocalTime = new Date();
	var currentTime = new Date(currentLocalTime.getUTCFullYear(), currentLocalTime.getUTCMonth(), currentLocalTime.getUTCDate(),  currentLocalTime.getUTCHours(), currentLocalTime.getUTCMinutes(), currentLocalTime.getUTCSeconds());
	var day = currentTime.getDay();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	var totalMinutes = (hours*60)+minutes;
	var timer;
	timer = setInterval(function() {
		currentLocalTime = new Date();
		currentTime = new Date(currentLocalTime.getUTCFullYear(), currentLocalTime.getUTCMonth(), currentLocalTime.getUTCDate(),  currentLocalTime.getUTCHours(), currentLocalTime.getUTCMinutes(), currentLocalTime.getUTCSeconds());		
		day = currentTime.getDay();
		hours = currentTime.getHours();
		minutes = currentTime.getMinutes();
		totalMinutes = (hours*60)+minutes;
/* 		$('#clock').html('day:' + day + ' hour: ' + hours + ' mins: ' + minutes); */
	}, 1000);
		
	var live = true;
/*
	function updateLive() {
		console.log('updating live status' + totalMinutes);
		if (day === 2) {
			if (totalMinutes > 763 && totalMinutes < 765) {
					live = true;
					setTimeout(function() {
						updateLive();
					}, 30000);
				}
		}
		console.log(live);
		setTimeout(function() {
			updateLive();
		}, 30000);
	}
	updateLive();
*/
	
	function initFm() {
	if (live) {
		broadcastFm.show();
		socialMedia.show();
	
		var stream = {
			title: "Renosance FM",
			mp3: "http://icecast.commedia.org.uk:8000/resonance_hi.mp3"
		},
			ready = false;
		// Local copy of jQuery selectors, for performance.
		var my_jPlayer = $("#jplayer"),
			my_playState = $("#jp_container .play-state"),
			my_extraPlayInfo = $("#jp_container .extra-play-info");
		// Some options
		var opt_text_playing = "Now playing",
			// Text when playing
			opt_text_selected = "Track selected"; // Text when not playing
		// Change the time format
		$.jPlayer.timeFormat.padMin = false;
		$.jPlayer.timeFormat.padSec = false;
		$.jPlayer.timeFormat.sepMin = " min ";
		$.jPlayer.timeFormat.sepSec = " sec";
		// Initialize the play state text
		my_playState.text(opt_text_selected);
		// Instance jPlayer
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
			supplied: "mp3",
			preload: "none",
			wmode: "window"
		});
		broadcastFm.css('opacity', 1);

		/*
searchTwitter('#novarafm+OR+#novaramedia', '#social-media-hashtag');	
		searchTwitter('@novaramedia', '#social-media-nm');
		$('#social-media-hashtag h3').html('#novarafm');
*/
		socialMedia.css('opacity', 1);

		
		broadcastStatus.html('FM Live');
	} else {
		initPosts();
	}		
	}
	
	function searchTwitter(query, target, since) {
	twitinstance++;
	console.log(twitinstance);
	$.getJSON("https://search.twitter.com/search.json?callback=?", {
		q: query,
		result_type: 'recent',
		rpp: 15,
		since_id: since
	}, function(data, textStatus) {
		console.log(textStatus);
		var insert = [];
		$.each(data.results, function(i, item) {
			insert.push('<a target="_blank" href="http://www.twitter.com/' + item.from_user + '/status/' + item.id_str + '"><li id="' + item.id + '">@' + item.from_user + ': ' + item.text + '</li></a>');
		});
		$('<ul/>', {
			'class': 'results',
			html: insert.join('')
		}).prependTo(target + ' div.tweets');
		var refresh = {};
		data.refresh_url.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function() {
			function decode(s) {
				return decodeURIComponent(s.split("+").join(" "));
			}
			refresh[decode(arguments[1])] = decode(arguments[2]);
		});
		console.log(refresh);
		setTimeout(function(query, target) {
			searchTwitter(query, target);
		}, 5000);
	});	
	
	}
	
	function initPosts() {
		$.getJSON("http://novaramedia.com/api/fm/?callback=?", null, function(data) {
			var posts_insert = [];
				$.each(data.posts, function(i, item) {
					posts_insert.push('<a target="_blank" href="' + item.permalink + '"><li>' + item.title + '</li></a>');
					});
					$('<ul/>', {
						'id': 'site-posts-posts',
						html: posts_insert.join('')
					}).prependTo(sitePosts);
		});		
		$('section#site-posts').show().css('opacity', 1);
	}

$(document).ready(function() {	
	
	initFm();

/* 	initPosts(); */
		
	/*
$('#social-media ul li').on({
			click: function() {}
	});
*/
});