/**
 * Created by TF on 2017/3/17.
 */
$(document).ready(function() {
    var ref = new Wilddog("https://dan1.wilddogio.com");
    var arr = [];

    $(".s_sub").click(function() {
        var text = $(".s_txt").val();
        ref.child('dminfo').push(text);
        $(".s_txt").val('');
    });

    $(".s_txt").keypress(function(event) {
        if (event.keyCode == "13") {
            $(".s_sub").trigger('click');
        }
    });

    $(".s_del").click(function() {
        ref.remove();
        arr = [];
        $(".dm_show").empty();
    });

    ref.child('dminfo').on('child_added', function(snapshot) {
        var text = snapshot.val();
        arr.push(text);
        var textObj = $("<div class = \"dm_message\"></div>");
        textObj.text(text);
        $(".dm_show").append(textObj);
        moveObj(textObj);
    });

    ref.on('child_removed', function() {
        arr = [];
        $(".dm_show").empty();
    });

    var topMin = $(".dm_mask").offset().top;
    var topMax = topMin + $(".dm_mask").height();
    var _top = topMin;

    var moveObj = function(obj) {
        var _left = $(".dm_mask").width() - obj.width() + 20;
        _top += 50;

        if (_top > (topMax - 50)) {
            _top = topMin;
        }

        obj.css({
            left: _left,
            top: _top,
            color: getRandomColor()
        });
        var time = 5000 + 10000 * Math.random();
        obj.animate({
            left: 25 + "px"
        }, time, function() {
            obj.remove();
        });
        if ($(".dm_message").offset().left <= 20 ) {
            obj.remove();
        }
    }
    var getRandomColor = function() {
        return '#' + (function(h) {
                return new Array(7 - h.length).join("0") + h
            })((Math.random() * 0x1000000 << 0).toString(16))
    }

    var getAndRun = function() {
        if (arr.length > 0) {
            var n = Math.floor(Math.random() * arr.length + 1) - 1;
            var textObj = $("<div class='dm_message'>" + arr[n] + "</div>");
            $(".dm_show").append(textObj);
            moveObj(textObj);
        }

        setTimeout(getAndRun, 3000);
    }

    jQuery.fx.interval = 50;
    getAndRun();
});