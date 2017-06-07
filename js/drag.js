$(function() {
	var _move_target;
	function dragChange(mainId,dragId){
		var main_content_w=$('.main-content').width();
		var main_content_h=$('.main-content').height();
		var $box = $(mainId).mousedown(function(e) {
			var offset = $(this).offset();
			this.posix = {'x': e.pageX - offset.left, 'y': e.pageY - offset.top};
			$.extend(document, {'move': true, 'move_target': this});
		}).on('mousedown', dragId, function(e) {
			_move_target=$(this).parent();
			var posix = {
				'w': $box.innerWidth(),
				'h': $box.innerHeight(),
				'x': e.pageX,
				'y': e.pageY
			};

			$.extend(document, {'move': true, 'call_down': function(e) {
				$box.css({
					'width': Math.max(30, e.pageX - posix.x + posix.w),
					'height': Math.max(30, e.pageY - posix.y + posix.h)
				});
			}});
			return false;
		});

		$(document).mousemove(function(e) {
			if (!!this.move) {
				var posix = !document.move_target ? {'x': 0, 'y': 0} : document.move_target.posix,
					callback = document.call_down || function() {
							var this_move_target=$(this.move_target);
							var max_top=main_content_h-this_move_target.outerHeight();
							var max_left=main_content_w-this_move_target.outerWidth();
							$(this.move_target).css({
								'top': e.pageY - posix.y,
								'left': e.pageX - posix.x
							});
							if(parseInt(this_move_target.css('top'))>=max_top){
								this_move_target.css('top',max_top+'px');
							}else if(parseInt(this_move_target.css('top'))<=0){
								this_move_target.css('top',0);
							}
							if(parseInt(this_move_target.css('left'))>=max_left){
								this_move_target.css('left',max_left+'px');
							}else if(parseInt(this_move_target.css('left'))<=0){
								this_move_target.css('left',0);
							}
						};
				_move_target=$(this.move_target);
				callback.call(this, e, posix);
			}
		}).mouseup(function(e) {
			if (!!this.move) {
				var callback = document.call_up || function(){};
				callback.call(this, e);
				$.extend(this, {
					'move': false,
				 	'move_target': this,
					'call_down': false,
					'call_up': false
				});
				console.log(_move_target.prop('id'));
			}
		});
	}
	$('#isScale').click(function(){
		if($(this).is(':checked')){
			$('#isMove').attr("disabled",true);
			$('.move-div').hover(function(){
				$(this).css({
					border : '2px dashed #FFF'
				})
				$(this).find('.coor').removeClass('hide');
				$(this).find('.moveDiv-nameIco').removeClass('hide')
			}, function(){
				$(this).css({
					border : 'none'
				})
				$(this).find('.coor').addClass('hide');
				$(this).find('.moveDiv-nameIco').addClass('hide')
			});
			dragChange('#chat-content','.coor');
			dragChange('#rank-content','.coor');
			dragChange('#adv-content1','.coor');
			dragChange('#welcome-content','.coor');
			dragChange('#hiChat-content','.coor');
			dragChange('#carousel-content','.coor');
			dragChange('#logo-content','.coor');
		}else {
			$('#isMove').attr("disabled",false);
			$('.move-div').off();
		}
	})
});