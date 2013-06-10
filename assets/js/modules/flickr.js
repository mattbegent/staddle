/* ==========================================================================
   Flickr.js
   ========================================================================== */

!function(global) {

    var wrap = function($) {

        var StaddleFlickr = function(element, options) {
            this.options = options;
            this.element = element;
            this.getFeed();
        };
 
        StaddleFlickr.prototype = {
        
            getFeed: function() {
                var self = this;
                var options = self.options; 
                var images = [];
                $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
                    id: options.userid,
                    format: 'json' 
                }).done(function(data) {        
                    var noImages = data.items.length;
                    $.each(data.items, function(i,item){
                        var imageData = {
                            image: item.media.m.replace(/_m/i, "_c"),
                            thumb: item.media.m.replace(/_m/i, "_q"),
                            title: item.title,
                            author: item.author,
                            date:  item.date_taken,
                            description: item.description,
                            link: item.link,
                            published: item.published
                        };                  
                        images.push(self.template(options.html, imageData));
                        //Limit results
                        if( i === (options.imagecount - 1) || i === (noImages - 1)) {
                            self.element.append(images.join(""));
                            return false;
                        }
                    });
                }).fail(function(jqxhr, textStatus, error) {
                    var err = textStatus + ', ' + error;
                    console.log( "Staddle Flickr Request Failed: " + err);
                });
            },
            
            template: function(s, d) {
                for (var p in d)
                    s = s.replace(new RegExp('{{' + p + '}}', 'g'), d[p]);
                return s;
            }
        };
 
        $.fn.staddleflickr = function(options) {
            options = $.extend({}, $.fn.staddleflickr.defaults, options);
            return this.each(function() {
                new StaddleFlickr($(this), options);
            });
        };
        
        $.fn.staddleflickr.defaults = {
            userid : '90478545@N02',
            imagecount : 8,
            html : '<a href="{{link}}" title="{{title}}"><img src="{{thumb}}" title="{{title}}" alt="{{image}}"/></a>'
        };
    };
 
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], wrap);
    } else {
        wrap(global.jQuery);
    }
 
}(this);   