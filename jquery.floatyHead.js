(function( $ ){
	var settings = {
		positionFixed: false
	}
	
	var methods = {
		init : function( options ) {
			// check if position:fixed is supported
			var container = document.body;
			if (document.createElement && container && container.appendChild && container.removeChild) {
				var el = document.createElement("div");
				if (!el.getBoundingClientRect) {
					return null;
				}
				el.innerHTML = "x";
				el.style.cssText = "position:fixed;top:100px;";
				container.appendChild(el);
				var originalHeight = container.style.height, originalScrollTop = container.scrollTop;
				container.style.height = "3000px";
				container.scrollTop = 500;
				var elementTop = el.getBoundingClientRect().top;
				container.style.height = originalHeight;
				settings.positionFixed = elementTop === 100;
				container.removeChild(el);
				container.scrollTop = originalScrollTop;
			}
			
			$(window).bind('scroll.floatyHead', methods.update);
			$(window).bind('resize.floatyHead', methods.update);
			
			return this.each(function() {
				var Offset = $(this).offset();
				
				$(this).data('offset', Offset );
				$(this).data('maxOffset', $(this).height() + Offset.top);
				
				$(this).find('thead th').each(function() {
					var Width = $(this).css('width');
					$(this).css('width', Width);
				});
				
				$(this).clone(true).addClass('floatyHead').css('position', 'fixed').css('left', $(this).data('offset').left).css('top', $(this).data('offset').top).find('tbody').remove().end().appendTo('body');
			});
			
			
		},
		
		update: function() {
			var ScrollTop = $(window).scrollTop();
			$('.floatyHead').each(function() {
				var Offset = $(this).data('offset').top;
				var MaxOffset = $(this).data('maxOffset');
				
				if( ScrollTop > Offset && ScrollTop < MaxOffset ) {
					if( settings.positionFixed ) {
						$(this).css('top', 0).show();
					} else {
						$(this).css('position','absolute').css('top', ScrollTop + 'px').show();
					}
				} else {
					$(this).hide();
				}
			});
		}
	};

	$.fn.floatyHead = function( method ) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.floatyHead' );
		}
	};

})( jQuery );




		
		
		

		