/************************************************************
*************************************************************

** Contributors:	Jason Ardener

** Reader configuration and setup.

** @Functions:		initReader()
				
*************************************************************
************************************************************/

function initReader() {

	/**
	* Config and variables.
	*
	*/
	viewer										= new Seadragon.Viewer("reader");	// Create new viewer object.
	
	Seadragon.Config.minZoomImageRatio			= 1;								// Minimum zoom ratio to the viewer.
	Seadragon.Config.transformOverlays			= true;								// Scales overlays with CSS.
	Seadragon.Config.springStiffness			= 1;								// How stiff the spring effect is.
	Seadragon.Config.imageLoaderLimit			= 10;								// Limit how many images load at once.
	Seadragon.Config.animationTime				= 0;								// How long animations last.
	Seadragon.Config.blendTime					= 0;								// How long blend animation takes.
	Seadragon.Config.debugMode					= false;							// Debug mode.
	Seadragon.Config.maxZoomPixelRatio			= 1;								// Maximum zoom pixel ratio.
	Seadragon.Config.visibilityRatio			= 0.5;								// The minimum portion of the viewport that must show visible content in both dimensions.
	Seadragon.Config.zoomPerClick				= 1;								// Zoom ratio per click.
	var swipeDistance							= 100;								// Swipe distance in pixels.
	var swipeThres								= 40;								// The Y threshold for swipe.
	
	viewer.clearControls();															// Remove native Seadragon controls.
    viewer.openDzi("pages/doublePages/"+cPage+".xml");								// Open the pages dzi file.
		
	var timer;
	// When the viewer starts, do the below:
	viewer.addEventListener("open", function(){
		window.clearTimeout(timer);
		timer = window.setTimeout(function(){loader();},1000);
	});
	
	
	function loader() {
		maxZoomOut = viewer.viewport.getZoom();					// Set the maximum zoom out level, this is the size of the viewer.
		// getMedia();												// Call the function to sort out media stuff.
		//swipeInit();
	}
	
	function swipeInit() {
		var swipe1 = new Swipe("reader");
		swipe1.onswipeleft = function() {
			
			curZoom = viewer.viewport.getZoom();
			
			if (curZoom == maxZoomOut) {
				nextButton();
			}
		};
		swipe1.onswiperight = function() {
			
			curZoom = viewer.viewport.getZoom();
			if (curZoom == maxZoomOut) {
				previousButton();
			}
		};
	}

	/**
	* Touch event stuff.
	*
	*/
	function coord(e) {
		// iOS devices expose "changedTouches"
		var t = e.touches;
		if(t){
			if(t.length>1){
				e = {
					clientX : t[0].clientX + ((t[0].clientX-t[1].clientX)/2),
					clientY : t[0].clientY + ((t[0].clientY-t[1].clientY)/2)
				};
			}
			else
				e = e.changedTouches[0];
		}
		return e;
	}
	
	var startX;
	var startY;
	var t1 = 0;
	var t2 = 0;
	
	var nowX0;
	var nowX1;
	var xdOld;
	
	var nowY0;
	var nowY1;
	var ydOld;
	
	
	$('#reader > div > div:eq(0)')
	.bind('dblclick', function(e){
		var zoomPerClick = (viewer.viewport.getMaxZoom()/2)+1;
		var p = coord(e.originalEvent),
			d = $(this).data(),
			c = viewer.viewport.getCenter(),
			b = viewer.viewport.getBounds(),
			dX = (b.width/viewer.viewport.getContainerSize().x);
		
		curZoom = viewer.viewport.getZoom();
		maxZoom = viewer.viewport.getMaxZoom();
		
		
		if ((Math.round(curZoom*100)/100) < (Math.round(maxZoom*100)/100)) {
			viewer.viewport.zoomBy(zoomPerClick,new Seadragon.Point(b.x+(p.clientX*dX), b.y+(p.clientY*dX)));
			viewer.viewport.panTo(new Seadragon.Point(b.x+(p.clientX*dX), b.y+(p.clientY*dX)));
		} else {
			viewer.viewport.goHome();
		}
		
	})
	
	.bind('touchstart MSPointerDown', function(e){
		// Check number of touches.
		if (event.touches.length != 1) {
			e.preventDefault();
			e.stopPropagation();
		}

		var p = coord(e.originalEvent);
		p.start = true;
		p.scale = 1;
		if(e.originalEvent.pointerType === 4) return;
		else if(e.originalEvent.pointerType !== undefined) e.originalEvent.preventMouseEvent();

		startX = p.clientX;
		startY = p.clientY;
		curZoom = viewer.viewport.getZoom();
		
		$(this).data(p);
	})
	
	.bind('touchmove MSGestureChange', function(e){
		var p = coord(e.originalEvent),
			d = $(this).data(),
			v = viewer.viewport,
			b = v.getBounds(),
			c = v.getCenter(),
			s = v.getContainerSize(),
			dx = p.clientX - d.clientX,
			dy = p.clientY - d.clientY,
			dX = (b.width/s.x);
		if(e.originalEvent.pointerType === 4) return;
		else if(e.originalEvent.pointerType !== undefined) e.originalEvent.preventMouseEvent();
		
		
		
		
		
		// SCALE
		if(event.touches.length == 2){
			nowX0 = event.touches[0].pageX;
			nowX1 = event.touches[1].pageX;
			
			nowY0 = event.touches[0].pageY;
			nowY1 = event.touches[1].pageY;
			
			var xdNow = Math.abs(nowX0 - nowX1);
			var ydNow = Math.abs(nowY0 - nowY1);
			
			var i = Math.pow(1+(e.originalEvent.scale-d.scale), 0.5);
			var j = 1;
			//log("scale", i, e.originalEvent.scale, d.scale, (p.clientX*dX), (p.clientY*dX) );
			
				if (xdNow > xdOld && ydNow > ydOld) {
					j = 1.1;
				} else if (xdNow < xdOld && ydNow < ydOld) {
					j = 0.9;
				}

				viewer.viewport.zoomBy(j, new Seadragon.Point(b.x+(p.clientX*dX), b.y+(p.clientY*dX)), true);
				
				xdOld = xdNow;
				ydOld = ydNow;
		}

		// MOVE
		else {
			e.preventDefault();
			e.stopPropagation();
			if ((Math.round(curZoom*100)/100) != (Math.round(maxZoomOut*100)/100)) {
				viewer.viewport.panTo(new Seadragon.Point(c.x-(dx*dX), c.y-(dy*dX)));
			} else {
				// SWIPE
				if ((p.clientY - startY < swipeThres) && (p.clientY - startY > -swipeThres))
					if (p.clientX - startX > swipeDistance) {
							previousButton();
					} else if (startX - p.clientX > swipeDistance) {
							nextButton();
					}
			}
		}
		
		// SCALE
		// if(e.originalEvent.scale&&e.originalEvent.scale!==1){
			// alert("test");
			// var i = Math.pow(1+(e.originalEvent.scale-d.scale), 0.5);
			// log("scale", i, e.originalEvent.scale, d.scale, (p.clientX*dX), (p.clientY*dX) );
			// if(i>0){
				// viewer.viewport.zoomBy(i, new Seadragon.Point(b.x+(p.clientX*dX), b.y+(p.clientY*dX)), true);
			// }
		// }

		// MOVE
		// else {
			// e.preventDefault();
			// e.stopPropagation();
			// if (event.touches.length == 1) {
				// if ((Math.round(curZoom*100)/100) != (Math.round(maxZoomOut*100)/100)) {
					// viewer.viewport.panTo(new Seadragon.Point(c.x-(dx*dX), c.y-(dy*dX)));
				// } else {
					// SWIPE
					// if ((p.clientY - startY < swipeThres) && (p.clientY - startY > -swipeThres))
						// if (p.clientX - startX > swipeDistance) {
								// previousButton();
						// } else if (startX - p.clientX > swipeDistance) {
								// nextButton();
						// }
				// }
			// }
		// }

		// save defaults
		p.start = false;
		p.scale = e.originalEvent.scale;

		$(this).data(p);

		//log("touchmove", p.clientX, p.clientY);
	
		viewer.viewport.applyConstraints();

		e.preventDefault();
		e.stopPropagation();
	})
	.bind("touchend MSPointerUp", function(e){
		xdOld = null;
		tdOld = null;
	
		var p = coord(e.originalEvent),
			d = $(this).data(),
			c = viewer.viewport.getCenter(),
			b = viewer.viewport.getBounds(),
			dX = (b.width/viewer.viewport.getContainerSize().x);
	
		if(e.originalEvent.pointerType === 4) return;
		else if(e.originalEvent.pointerType !== undefined) e.originalEvent.preventMouseEvent();
		/**
		* We check whether the start event was the last event fired.
		* And then we can treat this as a mouse "click"
		* Android 2.1 fires a touchmove in between, but we'll work on that another time.
		*/

		if(d.start){
			// viewer.viewport.zoomBy(1.5,new Seadragon.Point(b.x+(p.clientX*dX), b.y+(p.clientY*dX)));
			// log("zoom", b.x+(p.clientX*dX), b.y+(p.clientY*dX));
			
			if (t1 <= new Date().getTime() - 500) {
				t1 = new Date().getTime();
			}  else {
				curZoom = viewer.viewport.getZoom();
				maxZoom = viewer.viewport.getMaxZoom();
				if ((Math.round(curZoom*100)/100) != (Math.round(maxZoom*100)/100) || (Math.round(curZoom*100)/100) > (Math.round(maxZoom*100)/100)) {
					viewer.viewport.zoomBy(2,new Seadragon.Point(b.x+(p.clientX*dX), b.y+(p.clientY*dX)));
					viewer.viewport.panTo(new Seadragon.Point(b.x+(p.clientX*dX), b.y+(p.clientY*dX)));
				} else {
					viewer.viewport.goHome();
				}
			}
		}
		
		viewer.viewport.applyConstraints();
		
		setTimeout(function(){
			curZoom = viewer.viewport.getZoom();
			if ((Math.round(curZoom*100)/100) == (Math.round(maxZoomOut*100)/100)) {
				var t=setTimeout("viewer.viewport.goHome();");
			}
		}, 2500);
	});
}