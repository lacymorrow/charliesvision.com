﻿package  https:https:
{
	import flash.display.*;
	import flash.events.*;
	import flash.media.*;
	import flash.net.*;
	import flash.text.*;
	import flash.system.*;

	import flash.media.Video;
	import flash.net.NetConnection;
	import flash.net.NetStream;
	
	import flash.geom.ColorTransform;

	import flash.filters.DropShadowFilter;
	import flash.utils.Timer;
	import flash.external.ExternalInterface;
	import flash.geom.Rectangle;

	import htmlelements.IMediaElement;
	import htmlelements.VideoElement;
	import htmlelements.AudioElement;
	
	public class FlashMediaElement extends MovieClip {

		private var _mediaUrl:String;
		private var _autoplay:Boolean;
		private var _preload:String;
		private var _debug:Boolean;
		private var _isVideo:Boolean;
		private var _video:Video;
		private var _timerRate:Number;
		private var _stageWidth:Number;
		private var _stageHeight:Number;
		private var _enableSmoothing:Boolean;
		private var _allowedPluginDomain:String;
		private var _isFullScreen:Boolean = false;
		private var _startVolume:Number;
		private var _controlStyle:String;
		private var _autoHide:Boolean = true;

		// native video size (from meta data)
		private var _nativeVideoWidth:Number = 0;
		private var _nativeVideoHeight:Number = 0;

		// visual elements
		private var _output:TextField;
		private var _fullscreenButton:SimpleButton;

		// media
		private var _mediaElement:IMediaElement;

		// connection to fullscreen 
		private var _connection:LocalConnection;
		private var _connectionName:String;

		//private var fullscreen_btn:SimpleButton;

		// CONTROLS
		private var _alwaysShowControls:Boolean;
		private var _controlBar:MovieClip;
		private var _controlBarBg:MovieClip;
		private var _scrubBar:MovieClip;
		private var _scrubTrack:MovieClip;
		private var _scrubOverlay:MovieClip;
		private var _scrubLoaded:MovieClip;
		private var _hoverTime:MovieClip;
		private var _hoverTimeText:TextField;
		private var _playButton:SimpleButton;
		private var _pauseButton:SimpleButton;
		private var _duration:TextField;
		private var _currentTime:TextField;
		private var _fullscreenIcon:SimpleButton;
		private var _volumeMuted:SimpleButton;
		private var _volumeUnMuted:SimpleButton;
		private var _scrubTrackColor:String;
		private var _scrubBarColor:String;
		private var _scrubLoadedColor:String;
		
		// IDLE Timer for mouse for showing/hiding controls
		private var _inactiveTime:int;
        private var _timer:Timer;
        private var _idleTime:int;
        private var _isMouseActive:Boolean
		private var _isOverStage:Boolean = false;


		public function FlashMediaElement() {

			// show allow this player to be called from a different domain than the HTML page hosting the player
			Security.allowDomain("*");

			// get parameters
			var params:Object = LoaderInfo(this.root.loaderInfo).parameters;
			_mediaUrl = (params['file'] != undefined) ? String(params['file']) : "";
			_autoplay = (params['autoplay'] != undefined) ? (String(params['autoplay']) == "true") : false;
			_debug = (params['debug'] != undefined) ? (String(params['debug']) == "true") : false;
			_isVideo = (params['isvideo'] != undefined) ? ((String(params['isvideo']) == "false") ? false : true  ) : true;
			_timerRate = (params['timerrate'] != undefined) ? (parseInt(params['timerrate'], 10)) : 250;
			_alwaysShowControls = (params['controls'] != undefined) ? (String(params['controls']) == "true") : false;
			_enableSmoothing = (params['smoothing'] != undefined) ? (String(params['smoothing']) == "true") : false;
			_startVolume = (params['startvolume'] != undefined) ? (parseFloat(params['startvolume'])) : 0.8;
			_preload = (params['preload'] != undefined) ? params['preload'] : "none";
			_controlStyle = (params['controlstyle'] != undefined) ? (String(params['controlstyle'])) : ""; // blank or "floating"
			_autoHide = (params['autohide'] != undefined) ? (String(params['autohide'])) : true;
			_scrubTrackColor = (params['scrubtrackcolor'] != undefined) ? (String(params['scrubtrackcolor'])) : "0x333333";
			_scrubBarColor = (params['scrubbarcolor'] != undefined) ? (String(params['scrubbarcolor'])) : "0xefefef";
			_scrubLoadedColor = (params['scrubloadedcolor'] != undefined) ? (String(params['scrubloadedcolor'])) : "0x3CACC8";

			
			if (isNaN(_timerRate))
				_timerRate = 250;

			// setup stage and player sizes/scales
			stage.align = StageAlign.TOP_LEFT;
			stage.scaleMode = StageScaleMode.NO_SCALE;
			_stageWidth = stage.stageWidth;
			_stageHeight = stage.stageHeight;

			//_autoplay = true;
			//_mediaUrl  = "http://mediafiles.dts.edu/chapel/mp4/20100609.mp4";
			//_alwaysShowControls = true;
			//_mediaUrl  = "../media/Parades-PastLives.mp3";
			//_mediaUrl  = "../media/echo-hereweare.mp4";

			//_mediaUrl = "http://video.ted.com/talks/podcast/AlGore_2006_480.mp4";
			//_mediaUrl = "rtmp://stream2.france24.yacast.net/france24_live/en/f24_liveen";

			//_debug=true;
			
			// debugging
			_output = new TextField();
			_output.textColor = 0xeeeeee;
			_output.width = stage.stageWidth - 100;
			_output.height = stage.stageHeight;
			_output.multiline = true;
			_output.wordWrap = true;
			_output.border = false;
			_output.filters = [new DropShadowFilter(1, 0x000000, 45, 1, 2, 2, 1)];

			_output.text = "Initializing...\n";
			addChild(_output);
			_output.visible = _debug;
			

			// position and hide
			_fullscreenButton = getChildByName("fullscreen_btn") as SimpleButton;
			//_fullscreenButton.visible = false;
			_fullscreenButton.alpha = 0;
			_fullscreenButton.addEventListener(MouseEvent.CLICK, fullscreenClick, false);
			_fullscreenButton.x = stage.stageWidth - _fullscreenButton.width;
			_fullscreenButton.y = stage.stageHeight - _fullscreenButton.height;
			
			
			
			// lower right
			//_fullscreenButton.visible = true;
			//_fullscreenButton.x = stage.stageWidth - _fullscreenButton.width
			//_fullscreenButton.y = stage.stageHeight - _fullscreenButton.height;

			// create media element
			if (_isVideo) {
				_mediaElement = new VideoElement(this, _autoplay, _preload, _timerRate, _startVolume);
				_video = (_mediaElement as VideoElement).video;
				_video.width = _stageWidth;
				_video.height = _stageHeight;
				_video.smoothing = _enableSmoothing;
				(_mediaElement as VideoElement).setReference(this);
				//_video.scaleMode = VideoScaleMode.MAINTAIN_ASPECT_RATIO;
				addChild(_video);
			} else {
				
				//_mediaElement = new AudioElement2(this, _autoplay, _preload, _timerRate, _startVolume);
				
				//var player2:AudioDecoder = new com.automatastudios.audio.audiodecoder.AudioDecoder();
				
				
				_mediaElement = new AudioElement(this, _autoplay, _preload, _timerRate, _startVolume);
			}


			// controls!
			_controlBar = getChildByName("controls_mc") as MovieClip;
			_controlBarBg = _controlBar.getChildByName("controls_bg_mc") as MovieClip;
			_scrubTrack = _controlBar.getChildByName("scrubTrack") as MovieClip;
			_scrubBar = _controlBar.getChildByName("scrubBar") as MovieClip;
			_scrubOverlay = _controlBar.getChildByName("scrubOverlay") as MovieClip;
			_scrubLoaded = _controlBar.getChildByName("scrubLoaded") as MovieClip;
			
			_scrubOverlay.buttonMode = true;
			_scrubOverlay.useHandCursor = true
			
			applyColor(_scrubTrack, _scrubTrackColor);
			applyColor(_scrubBar, _scrubBarColor);
			applyColor(_scrubLoaded, _scrubLoadedColor);
			
			_fullscreenIcon = _controlBar.getChildByName("fullscreenIcon") as SimpleButton;
			
			// New fullscreenIcon for new fullscreen floating controls
			//if(_alwaysShowControls && _controlStyle.toUpperCase()=="FLOATING") {
				_fullscreenIcon.addEventListener(MouseEvent.CLICK, fullScreenIconClick, false);
			//}
			
			_volumeMuted = _controlBar.getChildByName("muted_mc") as SimpleButton;
			_volumeUnMuted = _controlBar.getChildByName("unmuted_mc") as SimpleButton;
			
			_volumeMuted.addEventListener(MouseEvent.CLICK, toggleVolume, false);
			_volumeUnMuted.addEventListener(MouseEvent.CLICK, toggleVolume, false);
			
			_playButton = _controlBar.getChildByName("play_btn") as SimpleButton;
			_playButton.addEventListener(MouseEvent.CLICK, function(e:MouseEvent) {
				_mediaElement.play();					 
			});
			_pauseButton = _controlBar.getChildByName("pause_btn") as SimpleButton;
			_pauseButton.addEventListener(MouseEvent.CLICK, function(e:MouseEvent) {
				_mediaElement.pause();					 
			});
			_pauseButton.visible = false;
			_duration = _controlBar.getChildByName("duration_txt") as TextField;
			_currentTime = _controlBar.getChildByName("currentTime_txt") as TextField;
			_hoverTime = _controlBar.getChildByName("hoverTime") as MovieClip;
			_hoverTimeText = _hoverTime.getChildByName("hoverTime_txt") as TextField;
			_hoverTime.visible=false;
			_hoverTime.y=(_hoverTime.height/2)+1;
			_hoverTime.x=0;
			

			
			// Add new timeline scrubber events
			_scrubOverlay.addEventListener(MouseEvent.MOUSE_MOVE, scrubMove);
			_scrubOverlay.addEventListener(MouseEvent.CLICK, scrubClick);
			_scrubOverlay.addEventListener(MouseEvent.MOUSE_OVER, scrubOver);
			_scrubOverlay.addEventListener(MouseEvent.MOUSE_OUT, scrubOut);
			
			if (_autoHide) { // && _alwaysShowControls) {
				// Add mouse activity for show/hide of controls
				stage.addEventListener(Event.MOUSE_LEAVE, mouseActivityLeave);
				stage.addEventListener(MouseEvent.MOUSE_MOVE, mouseActivityMove);
				_inactiveTime = 2500;
				_timer = new Timer(_inactiveTime)
				_timer.addEventListener(TimerEvent.TIMER, idleTimer);
				_timer.start();
				// set
			}
			
			if(_alwaysShowControls) {
				if(_startVolume<=0) {
					trace("INITIAL VOLUME: "+_startVolume+" MUTED");
					_volumeMuted.visible=true;
					_volumeUnMuted.visible=false;
				} else {
					trace("INITIAL VOLUME: "+_startVolume+" UNMUTED");
					_volumeMuted.visible=false;
					_volumeUnMuted.visible=true;
				}
			}
	
			_controlBar.visible = _alwaysShowControls;
			addChild(_controlBar);

			// put back on top
			addChild(_fullscreenButton);
			//_fullscreenButton.alpha = 0;
			//_fullscreenButton.visible = true;

			_output.appendText("stage: " + stage.stageWidth + "x" + stage.stageHeight + "\n");
			_output.appendText("file: " + _mediaUrl + "\n");
			_output.appendText("autoplay: " + _autoplay.toString() + "\n");
			_output.appendText("preload: " + _preload.toString() + "\n");
			_output.appendText("isvideo: " + _isVideo.toString() + "\n");
			_output.appendText("smoothing: " + _enableSmoothing.toString() + "\n");
			_output.appendText("timerrate: " + _timerRate.toString() + "\n");
			_output.appendText("displayState: " +(stage.hasOwnProperty("displayState")).toString() + "\n");

			// attach javascript
			_output.appendText("ExternalInterface.available: " + ExternalInterface.available.toString() + "\n");
			_output.appendText("ExternalInterface.objectID: " + ((ExternalInterface.objectID != null)? ExternalInterface.objectID.toString() : "null") + "\n");

			if (_mediaUrl != "") {
				_mediaElement.setSrc(_mediaUrl);
			}

			positionControls();
			
			// Fire this once just to set the width on some dynamically sized scrub bar items;
			_scrubBar.scaleX=0;
			_scrubLoaded.scaleX=0;
			

			if (ExternalInterface.available) { //  && !_alwaysShowControls

				_output.appendText("Adding callbacks...\n");
				try {
					if (ExternalInterface.objectID != null && ExternalInterface.objectID.toString() != "") {
						
						// add HTML media methods
						ExternalInterface.addCallback("playMedia", playMedia);
						ExternalInterface.addCallback("loadMedia", loadMedia);
						ExternalInterface.addCallback("pauseMedia", pauseMedia);
						ExternalInterface.addCallback("stopMedia", stopMedia);
	
						ExternalInterface.addCallback("setSrc", setSrc);
						ExternalInterface.addCallback("setCurrentTime", setCurrentTime);
						ExternalInterface.addCallback("setVolume", setVolume);
						ExternalInterface.addCallback("setMuted", setMuted);
	
						ExternalInterface.addCallback("setFullscreen", setFullscreen);
						ExternalInterface.addCallback("setVideoSize", setVideoSize);
						
						ExternalInterface.addCallback("positionFullscreenButton", positionFullscreenButton);
						ExternalInterface.addCallback("hideFullscreenButton", hideFullscreenButton);
	
						// fire init method					
						ExternalInterface.call("mejs.MediaPluginBridge.initPlugin", ExternalInterface.objectID);
					}

					_output.appendText("Success...\n");

				} catch (error:SecurityError) {
					_output.appendText("A SecurityError occurred: " + error.message + "\n");
				} catch (error:Error) {
					_output.appendText("An Error occurred: " + error.message + "\n");
				}

			}

			if (_preload != "none") {
				_mediaElement.load();
				
				if (_autoplay) {
					_mediaElement.play();
				}
			} else if (_autoplay) {
				_mediaElement.load();
				_mediaElement.play();
			}




			// connection to full screen
			//_connection = new LocalConnection();
			//_connection.client = this;
			//_connection.connect(ExternalInterface.objectID + "_player");

			// listen for resize
			stage.addEventListener(Event.RESIZE, resizeHandler);

			// test
			stage.addEventListener(MouseEvent.MOUSE_DOWN, stageClicked);
			
			// resize
			stage.addEventListener(FullScreenEvent.FULL_SCREEN, stageFullScreenChanged);	
		}
				
		// START: Controls and events
		function mouseActivityMove(event:MouseEvent):void {
			
			// if mouse is in the video area
			if (_autoHide && (mouseX>=0 && mouseX<=stage.stageWidth) && (mouseY>=0 && mouseY<=stage.stageHeight)) {

				// This could be move to a nice fade at some point...
				_controlBar.visible = (_alwaysShowControls || _isFullScreen);
				_isMouseActive = true;
				_idleTime = 0;
				_timer.reset();
				_timer.start()
			}
		}
		
		function mouseActivityLeave(event:Event):void {
			if (_autoHide) {
				_isOverStage = false;
				// This could be move to a nice fade at some point...
				_controlBar.visible = false;
				_isMouseActive = false;
				_idleTime = 0;
				_timer.reset();
				_timer.stop();
			}
		}
		
		function idleTimer(event:TimerEvent):void    {
          
			if (_autoHide) {
				// This could be move to a nice fade at some point...
				_controlBar.visible = false;
				_isMouseActive = false;
				_idleTime += _inactiveTime;
				_idleTime = 0;
				_timer.reset();
				_timer.stop();
			} 
		}
        
		
		function scrubMove(event:MouseEvent):void {
			
			//if (_alwaysShowControls) {
				if (_hoverTime.visible) {
					var seekBarPosition:Number =  ((event.localX / _scrubTrack.width) *_mediaElement.duration())*_scrubTrack.scaleX;
					var hoverPos:Number = (seekBarPosition / _mediaElement.duration()) *_scrubTrack.scaleX;
					
					if (_isFullScreen) {
						_hoverTime.x=event.target.parent.mouseX;
					} else {
						_hoverTime.x=mouseX;
					}
					_hoverTime.y = _scrubBar.y - (_hoverTime.height/2);
					_hoverTimeText.text = secondsToTimeCode(seekBarPosition);
				}
			//}
			//trace(event);
		}
		
		function scrubOver(event:MouseEvent):void {
			_hoverTime.y = _scrubBar.y-(_hoverTime.height/2)+1;
			_hoverTime.visible = true;
			trace(event);
		}
		
		function scrubOut(event:MouseEvent):void {
			_hoverTime.y = _scrubBar.y+(_hoverTime.height/2)+1;
			_hoverTime.visible = false;
			//_hoverTime.x=0;
			//trace(event);
		}
		
		function scrubClick(event:MouseEvent):void {
			//trace(event);
			var seekBarPosition:Number =  ((event.localX / _scrubTrack.width) *_mediaElement.duration())*_scrubTrack.scaleX;

			var tmp:Number = (_mediaElement.currentTime()/_mediaElement.duration())*_scrubTrack.width;
			var canSeekToPosition:Boolean = _scrubLoaded.scaleX > (seekBarPosition / _mediaElement.duration()) *_scrubTrack.scaleX;
			
			/*
			amountLoaded = ns.bytesLoaded / ns.bytesTotal;
			loader.loadbar._width = amountLoaded * 208.9;
			loader.scrub._x = ns.time / duration * 208.9;
			*/
			
			trace("seekBarPosition:"+seekBarPosition, "CanSeekToPosition: "+canSeekToPosition);
			
			if (seekBarPosition>0 && seekBarPosition<_mediaElement.duration() && canSeekToPosition) {
					_mediaElement.setCurrentTime(seekBarPosition);
			}
		}
		
		function toggleVolume(event:MouseEvent):void {
			trace(event.currentTarget.name);
			switch(event.currentTarget.name) {
				case "muted_mc":
					setMuted(false);
					break;
				case "unmuted_mc":
					setMuted(true);
					break;
			}
		}
		
		function toggleVolumeIcons(volume:Number) {
			if(volume<=0) {
				_volumeMuted.visible = true;
				_volumeUnMuted.visible = false;
			} else {
				_volumeMuted.visible = false;
				_volumeUnMuted.visible = true;
			}
		}
		
		public function positionControls(forced:Boolean=false) {
			
			
			if ( _controlStyle.toUpperCase() == "FLOATING" && _isFullScreen) {

				trace("CONTROLS: floating");
				_hoverTime.y=(_hoverTime.height/2)+1;
				_hoverTime.x=0;
				_controlBarBg.width = 300;
				_controlBarBg.height = 93;
				//_controlBarBg.x = (stage.stageWidth/2) - (_controlBarBg.width/2);
				//_controlBarBg.y  = stage.stageHeight - 300;
				
				_pauseButton.scaleX = _playButton.scaleX=3.5;
				_pauseButton.scaleY= _playButton.scaleY=3.5;
				// center the play button and make it big and at the top
				_pauseButton.x = _playButton.x = (_controlBarBg.width/2)-(_playButton.width/2)+7;
				_pauseButton.y = _playButton.y = _controlBarBg.height-_playButton.height-(14)
								
				_controlBar.x = (stage.stageWidth/2) -150;
				_controlBar.y = stage.stageHeight - _controlBar.height-100;
				
				
				// reposition the time and duration items
				
				_duration.x = _controlBarBg.width - _duration.width - 10;
				_duration.y = _controlBarBg.height - _duration.height -7;
				//_currentTime.x = _controlBarBg.width - _duration.width - 10 - _currentTime.width - 10;
				_currentTime.x = 5
				_currentTime.y= _controlBarBg.height - _currentTime.height-7;
				
				_fullscreenIcon.x = _controlBarBg.width - _fullscreenIcon.width - 7;
				_fullscreenIcon.y = 7;
				
				_volumeMuted.x = _volumeUnMuted.x = 7;
				_volumeMuted.y = _volumeUnMuted.y = 7;
				
				_scrubLoaded.x = _scrubBar.x = _scrubOverlay.x = _scrubTrack.x =_currentTime.x+_currentTime.width+7;
				_scrubLoaded.y = _scrubBar.y = _scrubOverlay.y = _scrubTrack.y=_controlBarBg.height-_scrubTrack.height-10;
				
				_scrubBar.width =  _scrubOverlay.width = _scrubTrack.width = (_duration.x-_duration.width-14);

				
			} else {
				trace("CONTROLS: normal, original");
				
				/*
				// Original style bottom display
				_hoverTime.y=(_hoverTime.height/2)+1;
				_hoverTime.x=0;
				_controlBarBg.width = stage.stageWidth;
				_controlBar.y = stage.stageHeight - _controlBar.height;
				_duration.x = stage.stageWidth - _duration.width - 10;
				//_currentTime.x = stage.stageWidth - _duration.width - 10 - _currentTime.width - 10;
				_currentTime.x = _playButton.x+_playButton.width;
				_scrubTrack.width = (_duration.x-_duration.width-10)-_duration.width+10;
				_scrubOverlay.width = _scrubTrack.width;
				_scrubBar.width = _scrubTrack.width;
				*/
				
				// FLOATING MODE BOTTOM DISPLAY - similar to normal
				trace("THAT WAY!");
				_hoverTime.y=(_hoverTime.height/2)+1;
				_hoverTime.x=0;
				_controlBarBg.width = stage.stageWidth;
				_controlBarBg.height = 30;
				_controlBarBg.y=0;
				_controlBarBg.x=0;
				// _controlBarBg.x = 0;
				// _controlBarBg.y  = stage.stageHeight - _controlBar.height;
				
				_pauseButton.scaleX = _playButton.scaleX=1;
				_pauseButton.scaleY = _playButton.scaleY=1;
				
				_pauseButton.x = _playButton.x = 7;
				_pauseButton.y = _playButton.y = _controlBarBg.height-_playButton.height-2;
				
				
				//_currentTime.x = stage.stageWidth - _duration.width - 10 - _currentTime.width - 10;
				_currentTime.x = _playButton.x+_playButton.width;
				
				_fullscreenIcon.x = _controlBarBg.width - _fullscreenIcon.width - 7;
				_fullscreenIcon.y = 8;
				
				_volumeMuted.x = _volumeUnMuted.x = _fullscreenIcon.x - _volumeMuted.width - 10;
				_volumeMuted.y = _volumeUnMuted.y = 10;
				
				_duration.x = _volumeMuted.x - _volumeMuted.width - _duration.width + 5;
				_duration.y = _currentTime.y = _controlBarBg.height - _currentTime.height - 7;
				
				_scrubLoaded.x = _scrubBar.x = _scrubOverlay.x = _scrubTrack.x = _currentTime.x + _currentTime.width + 10;
				_scrubLoaded.y = _scrubBar.y = _scrubOverlay.y = _scrubTrack.y = _controlBarBg.height - _scrubTrack.height - 9;
				
				_scrubBar.width =  _scrubOverlay.width = _scrubTrack.width =  (_duration.x-_duration.width-10)-_duration.width+5;
				_controlBar.x = 0;
				_controlBar.y = stage.stageHeight - _controlBar.height;
				
			}
			
		}
		
		// END: Controls
		

		function stageClicked(e:MouseEvent):void {
			//_output.appendText("click: " + e.stageX.toString() +","+e.stageY.toString() + "\n");
			sendEvent("click", "");
		}

		function resizeHandler(e:Event):void {
			//_video.scaleX = stage.stageWidth / _stageWidth;
			//_video.scaleY = stage.stageHeight / _stageHeight;
			//positionControls();
			
			repositionVideo();
		}

		// START: Fullscreen		
		function enterFullscreen() {
			var screenRectangle:Rectangle = new Rectangle(_video.x, _video.y, flash.system.Capabilities.screenResolutionX, flash.system.Capabilities.screenResolutionY); 
			stage.fullScreenSourceRect = screenRectangle;
			
			stage.displayState = StageDisplayState.FULL_SCREEN;
			
			repositionVideo(true);
			
			_controlBar.visible = true;
			
			_isFullScreen = true;
		}
		
		function exitFullscreen() {
		
			stage.displayState = StageDisplayState.NORMAL;
				
			
			_controlBar.visible = false;
			
			_isFullScreen = false;	
		}

		function setFullscreen(gofullscreen:Boolean) {

			try {
				//_fullscreenButton.visible = false;

				if (gofullscreen) {
					enterFullscreen();

				} else {
					exitFullscreen();
				}

			} catch (error:Error) {

				// show the button when the security error doesn't let it work
				//_fullscreenButton.visible = true;
				_fullscreenButton.alpha = 1;

				_isFullScreen = false;

				_output.appendText("error setting fullscreen: " + error.toString() + "\n");   
			}
		}
		
		// control bar button/icon 
		function fullScreenIconClick(e:MouseEvent) {
			try {
				_controlBar.visible = true;
				setFullscreen(!_isFullScreen);
				repositionVideo(_isFullScreen);
			} catch (error:Error) {
			}
		}

		// special floating fullscreen icon
		function fullscreenClick(e:MouseEvent) {
			//_fullscreenButton.visible = false;
			_fullscreenButton.alpha = 0

			try {
				_controlBar.visible = true;
				setFullscreen(true);
				repositionVideo(true);
				positionControls();
			} catch (error:Error) {
			}
		}
		
		
		function stageFullScreenChanged(e:FullScreenEvent) {
			_output.appendText("fullscreen event: " + e.fullScreen.toString() + "\n");   

			//_fullscreenButton.visible = false;
			_fullscreenButton.alpha = 0;
			_isFullScreen = e.fullScreen;
			
			sendEvent(HtmlMediaEvent.FULLSCREENCHANGE, "isFullScreen:" + e.fullScreen );

			if (!e.fullScreen) {
				_controlBar.visible = _alwaysShowControls;
			}
		}
		// END: Fullscreen

		// START: external interface 
		function playMedia() {
			_output.appendText("play\n");
			_mediaElement.play();
		}

		function loadMedia() {
			_output.appendText("load\n");
			_mediaElement.load();
		}

		function pauseMedia() {
			_output.appendText("pause\n");
			_mediaElement.pause();
		}

		function setSrc(url:String) {
			_output.appendText("setSrc: " + url + "\n");
			_mediaElement.setSrc(url);
		}

		function stopMedia() {
			_output.appendText("stop\n");
			_mediaElement.stop();
		}

		function setCurrentTime(time:Number) {
			_output.appendText("seek: " + time.toString() + "\n");
			_mediaElement.setCurrentTime(time);
		}

		function setVolume(volume:Number) {
			_output.appendText("volume: " + volume.toString() + "\n");
			_mediaElement.setVolume(volume);
			toggleVolumeIcons(volume);
		}

		function setMuted(muted:Boolean) {
			_output.appendText("muted: " + muted.toString() + "\n");
			_mediaElement.setMuted(muted);
			toggleVolumeIcons(_mediaElement.getVolume());
		}

		function setVideoSize(width:Number, height:Number) {
			_output.appendText("setVideoSize: " + width.toString() + "," + height.toString() + "\n");

			_stageWidth = width;
			_stageHeight = height;

			if (_video != null) {
				repositionVideo();
				positionControls();
				//_fullscreenButton.x = stage.stageWidth - _fullscreenButton.width - 10;
			}

			_output.appendText("result: " + _video.width.toString() + "," + _video.height.toString() + "\n");
		}
		
		function positionFullscreenButton(x:Number, y:Number, visibleAndAbove:Boolean ) {
			
			_output.appendText("position FS: " + x.toString() + "x" + y.toString() + "\n");
			
			// bottom corner
			/*
			_fullscreenButton.x = stage.stageWidth - _fullscreenButton.width
			_fullscreenButton.y = stage.stageHeight - _fullscreenButton.height;
			*/
			
			// position just above
			if (visibleAndAbove) {
				_fullscreenButton.x = x+1;
				_fullscreenButton.y = y - _fullscreenButton.height+1;	
			} else {
				_fullscreenButton.x = x;
				_fullscreenButton.y = y;	
			}
			
			// check for oversizing
			if ((_fullscreenButton.x + _fullscreenButton.width) > stage.stageWidth)
				_fullscreenButton.x = stage.stageWidth - _fullscreenButton.width;
			
			// show it!
			if (visibleAndAbove) {
				_fullscreenButton.alpha = 1;
			}
		}
		
		function hideFullscreenButton() {
		
			//_fullscreenButton.visible = false;
			_fullscreenButton.alpha = 0;
		}		
		
		// END: external interface
		

		function repositionVideo(fullscreen:Boolean = false):void {

			if (_nativeVideoWidth <= 0 || _nativeVideoHeight <= 0) {
				//_mediaElement.play();
				return;
			}

			_output.appendText("positioning video\n");

			// calculate ratios
			var stageRatio, nativeRatio;
			
			_video.x = 0;
			_video.y = 0;			
			
			if(fullscreen == true) {
				stageRatio = flash.system.Capabilities.screenResolutionX/flash.system.Capabilities.screenResolutionY;
				nativeRatio = _nativeVideoWidth/_nativeVideoHeight;
	
				// adjust size and position
				if (nativeRatio > stageRatio) {
					_video.width = flash.system.Capabilities.screenResolutionX;
					_video.height = _nativeVideoHeight * flash.system.Capabilities.screenResolutionX / _nativeVideoWidth;
					_video.y = flash.system.Capabilities.screenResolutionY/2 - _video.height/2;
				} else if (stageRatio > nativeRatio) {
					_video.height = flash.system.Capabilities.screenResolutionY;
					_video.width = _nativeVideoWidth * flash.system.Capabilities.screenResolutionY / _nativeVideoHeight;
					_video.x = flash.system.Capabilities.screenResolutionX/2 - _video.width/2;
				} else if (stageRatio == nativeRatio) {
					_video.height = flash.system.Capabilities.screenResolutionY;
					_video.width = flash.system.Capabilities.screenResolutionX;

				}
			} else {
				stageRatio = _stageWidth/_stageHeight;
				nativeRatio = _nativeVideoWidth/_nativeVideoHeight;
	
				// adjust size and position
				if (nativeRatio > stageRatio) {
					_video.width = _stageWidth;
					_video.height = _nativeVideoHeight * _stageWidth / _nativeVideoWidth;
					_video.y = _stageHeight/2 - _video.height/2;
				} else if (stageRatio > nativeRatio) {
					_video.height = _stageHeight;
					_video.width = _nativeVideoWidth * _stageHeight / _nativeVideoHeight;
					_video.x = _stageWidth/2 - _video.width/2;
				} else if (stageRatio == nativeRatio) {
					_video.height = _stageHeight;
					_video.width = _stageWidth;
				}
			}

			positionControls();
		}

		// SEND events to JavaScript
		public function sendEvent(eventName:String, eventValues:String) {			

			// special video event
			if (eventName == HtmlMediaEvent.LOADEDMETADATA && _isVideo) {
				trace("METADATA RECEIVED!");
				_nativeVideoWidth = (_mediaElement as VideoElement).videoWidth;
				_nativeVideoHeight = (_mediaElement as VideoElement).videoHeight;

				 if(stage.displayState == "fullScreen" ) {
					setVideoSize(_nativeVideoWidth, _nativeVideoHeight);
					repositionVideo(true);
				 } else {
					repositionVideo();
				 }
			}

			// update controls
			switch (eventName) {
				case "pause":
				case "paused":
				case "ended":
					_playButton.visible = true;
					_pauseButton.visible = false;
					break;
				case "play":
				case "playing":
					_playButton.visible = false;
					_pauseButton.visible = true;
					break;
			}
			//_duration.text = (_mediaElement.duration()*1).toString(); 
			_duration.text =  secondsToTimeCode(_mediaElement.duration());
			//_currentTime.text = (_mediaElement.currentTime()*1).toString(); 
			_currentTime.text =  secondsToTimeCode(_mediaElement.currentTime());

			var pct:Number =  (_mediaElement.currentTime() / _mediaElement.duration()) *_scrubTrack.scaleX;
			
			_scrubBar.scaleX = pct;
			_scrubLoaded.scaleX = (_mediaElement.currentProgress()*_scrubTrack.scaleX)/100;
			
			//trace((_mediaElement.duration()*1).toString() + " / " + (_mediaElement.currentTime()*1).toString());
			//trace("CurrentProgress:"+_mediaElement.currentProgress());
			
			if (ExternalInterface.objectID != null && ExternalInterface.objectID.toString() != "") {
				
				//_output.appendText("event:" + eventName + " : " + eventValues);
				trace("event", eventName, eventValues);
	
				if (eventValues == null)
					eventValues == "";

				if (_isVideo) {
					eventValues += (eventValues != "" ? "," : "") + "isFullScreen:" + _isFullScreen;
				}

				eventValues = "{" + eventValues + "}";
	
				/*
				OLD DIRECT METHOD
				ExternalInterface.call(
					"function(id, name) { mejs.MediaPluginBridge.fireEvent(id,name," + eventValues + "); }", 
					ExternalInterface.objectID, 
					eventName);
				*/				
				
				// use set timeout for performance reasons
				//if (!_alwaysShowControls) {
					ExternalInterface.call("setTimeout", "mejs.MediaPluginBridge.fireEvent('" + ExternalInterface.objectID + "','" + eventName + "'," + eventValues + ")",0);
				//}
			}
		}


		// START: utility
		function secondsToTimeCode(seconds:Number):String {
			var timeCode:String = "";
			seconds = Math.round(seconds);
			var minutes:Number = Math.floor(seconds / 60);
			timeCode = (minutes >= 10) ? minutes.toString() : "0" + minutes.toString();
			seconds = Math.floor(seconds % 60);
			timeCode += ":" + ((seconds >= 10) ? seconds.toString() : "0" + seconds.toString());
			return timeCode; //minutes.toString() + ":" + seconds.toString();
		}
		
		function applyColor(item:Object, color:String):void {
			
			var myColor:ColorTransform = item.transform.colorTransform;
			myColor.color = Number(color);
			item.transform.colorTransform = myColor;
		}
		// END: utility

	}
}