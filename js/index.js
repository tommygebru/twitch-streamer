$(document).ready(function() {
    // var clientID = "3fe05j8mavwd68cjoqwqs2e9oqsou02";
    var twitchAPI = "https://wind-bow.gomix.me/twitch-api",
        streams = "/streams/",
        channels = "/channels/",
        freecodecamp = "freecodecamp",
        callback = "?callback=?",
        regStreamers = ["ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];
    regStreamers.map(function(val) {
        $.getJSON(twitchAPI + streams + val + callback, function(data1) {
            if (data1.status === 404) {
                $(".wrap").append("<div class='streamers offline delete'><span class='i-fix'><span class='x'>X</span><img src='https://68.media.tumblr.com/2bab580406f69a3ff294bd0782d83c5a/tumblr_ohkte1EwLM1sj6gx1o1_540.png'></span><div class='info'><span>" + val + " </span><span>does not exist</span></div></div>");
                $(".offline .x").click(function() {
                    $(this.closest(".delete")).remove();
                });
            } else if (data1.stream === null) {
                $.getJSON(twitchAPI + channels + val + callback, function(data2) {
                    $(".wrap").append("<a href=" + data2.url + "><div class='streamers offline'><img src='https://68.media.tumblr.com/2bab580406f69a3ff294bd0782d83c5a/tumblr_ohkte1EwLM1sj6gx1o1_540.png'><div class='info'><span>" + val + "</span><span> is currently offline</span></div></div></a>");
                }); //data2
            } else {
                $(".wrap").append("<a href=" + data1.stream.channel.url + "><div class='streamers online'><img src=" + data1.stream.channel.logo + "><div class='info'><span>" + val + " </span><span class='game'>streaming " + data1.stream.game + "</span><span>" + data1.stream.viewers + " viewers</span></div></div></a>");
            } //ELSE
        }); //data1
    }); //map

    $.getJSON(twitchAPI + channels + freecodecamp + callback, function(fccData) {
        $(".current-header").append("<img src=" + fccData.logo + "><div><a href=" + fccData.url + ">" + fccData.display_name + "</span></div>");
        $(".current-body").append("<span>Streaming <em>" + fccData.game + "</em></span>");
        $(".current-body").append("<span>" + fccData.status + "</span>");
        $(".current-footer").append("<span><em>Views: " + fccData.views + "</em></span>");
        $(".current-footer").append("<span><em>Followers: " + fccData.followers + "</em></span>");
        $(".current-footer").append("<span><a href='https://www.freecodecamp.com'>Visit Freecodecamp.com</a></span>");
    }); //fccData

    $("#streamers").append("<span class='more-title'>MORE FROM TWITCH</span><div class='more'><div><span>About</span><span>Blog</span><span>Cookie Policy</span><span>Help</span><span>Language</span><span>Partners</span><span>Store</span></div><div><span>Advertisers</span><span>Creative</span><span>Developers</span><span>Jobs</span><span>Music</span><span>Press</span><span>Terms</span></div></div>");
    $("#streamers").append("<div class='streamers prime'><img src='https://68.media.tumblr.com/b01c74040cf2f9d80201f2bba6b0a88a/tumblr_ohnedqqqIV1sj6gx1o1_400.png'><span><a href='https://twitch.amazon.com/prime'><em>Try</em> Twitch Prime <em>Free for 30 days</em></a></span>");

    $(".navigation span").click(function() {
        $(".streamers").show();
        $("#all").click(function() {
            $(".streamers").show();
        });
        $("#offline").click(function() {
            $(".offline").hide();
        });
        $("#online").click(function() {
            $(".online").hide();
        });
    }); //toggling the nav
}); //END
