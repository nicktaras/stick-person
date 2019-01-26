var positionStateStore = require('./moves');
var canvas = this.__canvas = new fabric.Canvas('c', { selection: false, backgroundColor : "white" } );
fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

// for MVP only.
// Turn off when adding new moves
// then back on when recording - sorry :) 
var offsetX = 20;
var offsetY = 40;
var fillColor = 'white';
var lineColor = 'black';

function makeCircle(uid, left, top, line1, line2, line3, line4, radius=5) {

  if(radius > 4) {
    var fill = 'none';
    var strokeWidth = 4;
  }

  var c = new fabric.Circle({
    left: left,
    top: top,
    strokeWidth: strokeWidth || 0,
    radius: radius || 0,
    fill: fillColor,
    stroke: lineColor
  });

  c.hasControls = c.hasBorders = false;
  c.line1 = line1;
  c.line2 = line2;
  c.line3 = line3;
  c.line4 = line4;
  c.uid = uid;

  assignDebugCoords({ uid: uid, left: left, top: top });

  return c;
}

function makeLine(coords) {
  return new fabric.Line(coords, {
    fill: fillColor,
    stroke: lineColor,
    strokeWidth: 4,
    selectable: false,
    evented: false,
  });
}

//                   sx   sy  ex    ey
var lines = {
  head: makeLine([ 250 + offsetX, 125 + offsetY, 250 + offsetX, 175 + offsetY ]),
  hips: makeLine([ 250 + offsetX, 175 + offsetY, 250 + offsetX, 250 + offsetY ]),
  rightElbow: makeLine([ 250 + offsetX, 175 + offsetY, 285 + offsetX, 200 + offsetY ]),
  rightHand: makeLine([ 285 + offsetX, 200 + offsetY, 320 + offsetX, 225 + offsetY ]),
  leftElbow: makeLine([ 250 + offsetX, 175 + offsetY, 215 + offsetX, 200 + offsetY ]),
  leftHand: makeLine([ 215 + offsetX, 200 + offsetY, 180 + offsetX, 225 + offsetY ]),
  rightKnee: makeLine([ 250 + offsetX, 250 + offsetY, 270 + offsetX, 280 + offsetY]),
  rightAnkle: makeLine([ 270 + offsetX, 280 + offsetY, 280 + offsetX, 315 + offsetY]),
  rightFoot: makeLine([ 280 + offsetX, 315 + offsetY, 300 + offsetX, 315 + offsetY]),
  leftKnee: makeLine([ 250 + offsetX, 250 + offsetY, 235 + offsetX, 275 + offsetY]),
  leftAnkle: makeLine([ 235 + offsetX, 275 + offsetY, 220 + offsetX, 315 + offsetY]),
  leftFoot: makeLine([ 220 + offsetX, 315 + offsetY, 200 + offsetX, 315 + offsetY])
}
    
canvas.add(
  lines.head, 
  lines.hips, 
  lines.rightElbow, 
  lines.rightHand, 
  lines.leftElbow,
  lines.leftHand,
  lines.rightKnee,
  lines.rightAnkle, 
  lines.rightFoot,
  lines.leftKnee,
  lines.leftAnkle,
  lines.leftFoot
);

var circles = {
  headCircle: makeCircle('headCircle', lines.head.get('x1'), lines.head.get('y1'), null, lines.head, null, null, 24),
  shoulderCircle: makeCircle('shoulderCircle', lines.head.get('x2'), lines.head.get('y2'), lines.head, lines.hips, lines.rightElbow, lines.leftElbow),
  hipsCircle: makeCircle('hipsCircle', lines.hips.get('x2'), lines.hips.get('y2'), lines.hips, lines.rightKnee, lines.leftKnee),
  rightElbowCircle: makeCircle('rightElbowCircle', lines.rightElbow.get('x2'), lines.rightElbow.get('y2'), lines.rightElbow, lines.rightHand),
  rightHandCircle: makeCircle('rightHandCircle', lines.rightHand.get('x2'), lines.rightHand.get('y2'), lines.rightHand),
  leftElbowCircle: makeCircle('leftElbowCircle' , lines.leftElbow.get('x2'), lines.leftElbow.get('y2'), lines.leftElbow, lines.leftHand),
  leftHandCircle: makeCircle('leftHandCircle', lines.leftHand.get('x2'), lines.leftHand.get('y2'), lines.leftHand),
  rightKneeCircle: makeCircle('rightKneeCircle', lines.rightKnee.get('x2'), lines.rightKnee.get('y2'), lines.rightKnee, lines.rightAnkle),
  rightAnkleCircle: makeCircle('rightAnkleCircle', lines.rightAnkle.get('x2'), lines.rightAnkle.get('y2'), lines.rightAnkle, lines.rightFoot),
  rightFootCircle: makeCircle('rightFootCircle', lines.rightFoot.get('x2'), lines.rightFoot.get('y2'), lines.rightFoot),
  leftKneeCircle: makeCircle('leftKneeCircle', lines.leftKnee.get('x2'), lines.leftKnee.get('y2'), lines.leftKnee, lines.leftAnkle),
  leftAnkleCircle: makeCircle('leftAnkleCircle', lines.leftAnkle.get('x2'), lines.leftAnkle.get('y2'), lines.leftAnkle, lines.leftFoot),
  leftFootCircle: makeCircle('leftFootCircle', lines.leftFoot.get('x2'), lines.leftFoot.get('y2'), lines.leftFoot)
}

canvas.add(
  circles.shoulderCircle,
  circles.hipsCircle,
  circles.rightKneeCircle,
  circles.rightAnkleCircle,
  circles.rightFootCircle,
  circles.rightElbowCircle,
  circles.rightHandCircle,
  circles.leftHandCircle,
  circles.headCircle,
  circles.leftElbowCircle,
  circles.leftKneeCircle,
  circles.leftAnkleCircle,
  circles.leftFootCircle
);

function assignDebugCoords(p){
  var el = document.getElementById(p.uid);
  if(el) el.innerHTML = " Top: " + Math.round(p.top) + " Left: " + Math.round(p.left);
}

canvas.on('object:moving', function(e) {
  animLines(e.target);
});

// Well done SVG - Show when exporting celebration
var cSize = 550;
var welldoneImgURL = 'welldone.svg';
var welldoneImg = new Image();
welldoneImg.onload = function (img) {    
    var welldone = new fabric.Image(welldoneImg, {
        angle: 0,
        width: 1800,
        height: 550,
        left: cSize / 2 + 50,
        top: 470,
        scaleX: .15,
        scaleY: .15
    });
    // canvas.add(welldone);
};
welldoneImg.src = welldoneImgURL;

// logo
var imgURL = 'logo.svg';
var logoImg = new Image();
logoImg.onload = function (img) {    
    var logo = new fabric.Image(logoImg, {
        angle: 0,
        width: 1800,
        height: 550,
        left: cSize / 2 + 27,
        top: 60,
        scaleX: .08,
        scaleY: .08
    });
    canvas.add(logo);
};
logoImg.src = imgURL;

function animLines (target){

  var p = target;
  // Set lines to meet the circles.
  if (p.line1) {
    p.line1 && p.line1.set({ 'x2': p.left, 'y2': p.top });
  }
  if (p.line2) {
    p.line2 && p.line2.set({ 'x1': p.left, 'y1': p.top });
  }
  if (p.line3) {
    p.line3 && p.line3.set({ 'x1': p.left, 'y1': p.top });
  }
  if (p.line4) {
    p.line4 && p.line4.set({ 'x1': p.left, 'y1': p.top });
  }

  // make sure all the body parts are connected each render.
  // Head is connected to the shoulders.
  lines.head.set({ 
    'x1': circles.headCircle.left,
    'y1': circles.headCircle.top, 
    'x2': circles.shoulderCircle.left,
    'y2': circles.shoulderCircle.top
  });
  // Shoulders are connected to the head
  lines.hips.set({ 
    'x1': circles.shoulderCircle.left,
    'y1': circles.shoulderCircle.top, 
    'x2': circles.hipsCircle.left,
    'y2': circles.hipsCircle.top  
  });
  // Left Elbow is connected to the 
  lines.leftElbow.set({ 
    'x1': circles.shoulderCircle.left,
    'y1': circles.shoulderCircle.top, 
    'x2': circles.leftElbowCircle.left,
    'y2': circles.leftElbowCircle.top
  });
  // Right Elbow is connected to the 
  lines.rightElbow.set({ 
    'x1': circles.shoulderCircle.left,
    'y1': circles.shoulderCircle.top, 
    'x2': circles.rightElbowCircle.left,
    'y2': circles.rightElbowCircle.top
  });
  // Left Elbow is connected to the 
  lines.leftHand.set({ 
    'x1': circles.leftElbowCircle.left,
    'y1': circles.leftElbowCircle.top, 
    'x2': circles.leftHandCircle.left,
    'y2': circles.leftHandCircle.top
  });
  // Right Elbow is connected to the 
  lines.rightHand.set({ 
    'x1': circles.rightElbowCircle.left,
    'y1': circles.rightElbowCircle.top, 
    'x2': circles.rightHandCircle.left,
    'y2': circles.rightHandCircle.top
  });
  // Left Elbow is connected to the 
  lines.leftKnee.set({ 
    'x1': circles.hipsCircle.left,
    'y1': circles.hipsCircle.top, 
    'x2': circles.leftKneeCircle.left,
    'y2': circles.leftKneeCircle.top
  });
  // Right Elbow is connected to the 
  lines.rightKnee.set({ 
    'x1': circles.hipsCircle.left,
    'y1': circles.hipsCircle.top, 
    'x2': circles.rightKneeCircle.left,
    'y2': circles.rightKneeCircle.top
  });
  // Left Elbow is connected to the 
  lines.leftAnkle.set({ 
    'x1': circles.leftKneeCircle.left,
    'y1': circles.leftKneeCircle.top, 
    'x2': circles.leftAnkleCircle.left,
    'y2': circles.leftAnkleCircle.top
  });
  // Right Elbow is connected to the 
  lines.rightAnkle.set({ 
    'x1': circles.rightKneeCircle.left,
    'y1': circles.rightKneeCircle.top, 
    'x2': circles.rightAnkleCircle.left,
    'y2': circles.rightAnkleCircle.top
  });
  // Left Elbow is connected to the 
  lines.leftFoot.set({ 
    'x1': circles.leftAnkleCircle.left,
    'y1': circles.leftAnkleCircle.top, 
    'x2': circles.leftFootCircle.left,
    'y2': circles.leftFootCircle.top
  });
  // Right Elbow is connected to the 
  lines.rightFoot.set({ 
    'x1': circles.rightAnkleCircle.left,
    'y1': circles.rightAnkleCircle.top, 
    'x2': circles.rightFootCircle.left,
    'y2': circles.rightFootCircle.top
  });

  assignDebugCoords(p);

  canvas.bringToFront(circles.headCircle);

  // render
  canvas.renderAll();

}

function ani(state) {
  var objList = positionStateStore[state];
  for (var i = 0; i < objList.coords.length; i++) {
    var obj = positionStateStore[state].coords[i];
    var speed = positionStateStore[state].speed;
    var ref = circles[obj.ref];
    ref.animate('top', obj.top + offsetY, {
      duration: speed,
      easing: undefined,
      onChange: function (){ animLines(ref); }
    }).animate('left', obj.left + offsetX, {
      duration: speed,
      easing: undefined,
      onChange: function (){
        animLines(ref);
      },
      onComplete: function() {
        if (i < objList.coords.length -1){ 
          i++;
          ani(state);
        }
      }
    });
  }
}

// -- LEGS:
// LUNGES
// STANDING_QUAD_STRETCH
// BUTTERFLY_INIT
// DOUBLE_HEAL_LIFT_DOWN
// SINGLE HEALS - TODO!
// -- ARMS:
// PUSH_UP_UP
// EASY PUSH UP - TODO!
// ARM_TEST - TODO!
// -- STOMACH:
// TWIST_FRONT
// SIT_UP
// SEMI_SIT_UP - TODO!
// -- BACK:
// SQUAT
// TOUCH TOES - TODO!
// LAYING - TODO!
// PLANKING - TODO!
// AEROBIC
// STAR_JUMPS - TODO fix up

// EXERCISE TOTAL: 45

// STANDING_QUAD_STRETCH tells us what mustlces are being used
// https://www.self.com/gallery/essential-stretches-slideshow

// Light - Arm low
// Medium - Arm Higher
// Hard - Jump upside down one hand

setTimeout(() => {
  startRecording();
  ani('HEEL_DOWN_CALF_STRETCH_RIGHT'); 
}, 100);
setTimeout(() => {
  ani('KARATEKID'); 
}, 1700);
setTimeout(() => {
  ani('EXERCISE_LEVEL_HARD'); 
}, 2800);
setTimeout(() => {
  ani('COLLAPSED'); 
}, 4800);
setTimeout(() => {
  ani('LAY_POSING'); 
}, 6000);
setTimeout(() => {
  stopRecording();
}, 8000);

// AWESOME
// setTimeout(() => {
//   ani('STANDING_HANDS_UP'); 
// }, 100);
// setTimeout(() => {
//   ani('STANDING_HANDS_UP'); 
//   startRecording();
// }, 1100);
// setTimeout(() => {
//   ani('STANDING_HANDS_UP'); 
// }, 1400);
// setTimeout(() => {
//   ani('STANDING_HANDS_UP_CHEER'); 
// }, 1700);
// setTimeout(() => {
//   ani('STANDING_HANDS_UP'); 
// }, 2000);
// setTimeout(() => {
//   ani('STANDING_HANDS_UP_CHEER'); 
// }, 2300);
// setTimeout(() => {
//   ani('STANDING_HANDS_UP'); 
// }, 2600);
// setTimeout(() => {
//   ani('STANDING_HANDS_UP_CHEER'); 
// }, 2900);
// setTimeout(() => {
//   ani('STANDING_HANDS_UP'); 
// }, 3100);
// setTimeout(() => {
//   ani('STANDING_HANDS_UP_CHEER'); 
// }, 3400);
// setTimeout(() => {
//   ani('STANDING_HANDS_UP'); 
// }, 3700);
// setTimeout(() => {
  // ani('STANDING_HANDS_UP'); 
  // stopRecording();
// }, 4100);

// 3 - reach for toes
// 10 - 

// setTimeout(() => {
//   startRecording(); 
//   ani('TOUCH_TOES_STRAIGHT_EASY_START'); 
// }, 0);
// setTimeout(() => {
//   ani('TOUCH_TOES_STRAIGHT_EASY'); 
// }, 3000);
// setTimeout(() => {
//   ani('TOUCH_TOES_STRAIGHT_EASY_STRETCH'); 
// }, 10000);
// setTimeout(() => {
//   ani('IDLE'); 
// }, 25000);
// setTimeout(() => {
//   stopRecording(); 
// }, 30000);

// Bad animation.
// setTimeout(() => {
//   ani('STANDING_RIGHT'); 
// }, 0);
// setTimeout(() => {
//   ani('TOUCH_TOES_RIGHT_EASY'); 
// }, 2000);
// setTimeout(() => {
//   ani('TOUCH_TOES_RIGHT_FULL_STRETCH_EASY'); 
// }, 4000);
// setTimeout(() => {
//   ani('TOUCH_TOES_RIGHT_EASY'); 
// }, 6000);

// AWESOME!!!!
// setTimeout(() => {
//   ani('STANDING_RIGHT'); 
// }, 0);
// setTimeout(() => {
//   ani('HEEL_DOWN_CALF_STRETCH_RIGHT');
// }, 2000);
// setTimeout(() => {
//   ani('STANDING_RIGHT');
// }, 5000);
// setTimeout(() => {
//   ani('HEEL_DOWN_CALF_STRETCH_RIGHT');
// }, 8000);

// 3 seconds - take step forward.
// 12-14 seconds - bend knee forward
// 20 seconds - move back to standing position
// repeat anim

// setTimeout(() => {
//   startRecording(); 
//   ani('STANDING_RIGHT'); 
// }, 0);
// setTimeout(() => {
//   ani('HEEL_DOWN_CALF_STRETCH_RIGHT');
// }, 2000);
// setTimeout(() => {
//   ani('HEEL_DOWN_CALF_STRETCH_RIGHT_DEEPER');
// }, 10000);
// setTimeout(() => {
//   ani('STANDING_RIGHT');
// }, 20000);
// setTimeout(() => {
//   ani('STANDING_RIGHT'); 
// }, 23000); 
// setTimeout(() => {
//   ani('HEEL_DOWN_CALF_STRETCH_RIGHT');
// }, 24000);
// setTimeout(() => {
//   ani('HEEL_DOWN_CALF_STRETCH_RIGHT_DEEPER');
// }, 33000);
// setTimeout(() => {
//   ani('STANDING_RIGHT');
// }, 43000);
// setTimeout(() => {
//   ani('STANDING_RIGHT');
// }, 43000);
// setTimeout(() => {
//   stopRecording();
// }, 50000);





// setTimeout(() => {
//   ani('PUSH_UP_DOWN_BEGINNER');
// }, 2000);
// setTimeout(() => {
//   ani('PUSH_UP_UP_BEGINNER');
// }, 5000);
// setTimeout(() => {
//   ani('PUSH_UP_DOWN_BEGINNER');
// }, 7000);
// setTimeout(() => {
//   ani('PUSH_UP_UP_BEGINNER');
// }, 10000);

// setTimeout(() => {
//   ani('LUNGING_HIP_FLEXER'); 
// }, 0);
// setTimeout(() => {
//   ani('LUNGING_HIP_FLEXER_DEEPER');
// }, 2000);
// setTimeout(() => {
//   ani('LUNGING_HIP_FLEXER');
// }, 5000);
// setTimeout(() => {
//   ani('LUNGING_HIP_FLEXER_DEEPER');
// }, 7000);
// setTimeout(() => {
//   ani('LUNGING_HIP_FLEXER');
// }, 10000);

// setTimeout(() => {
//   ani('STANDING_STRAIGHT'); 
// }, 0);
// setTimeout(() => {
//   ani('STANDING_QUAD_STRETCH');
// }, 2000);
// setTimeout(() => {
//   ani('STANDING_STRAIGHT');
// }, 5000);
// setTimeout(() => {
//   ani('STANDING_QUAD_STRETCH');
// }, 7000);
// setTimeout(() => {
//   ani('STANDING_STRAIGHT');
// }, 10000);

// Hamstrings

// setTimeout(() => {
//   ani('BUTTERFLY_INIT'); 
// }, 0);
// setTimeout(() => {
//   ani('BUTTERFLY_STRETCH');
// }, 2000);
// setTimeout(() => {
//   ani('BUTTERFLY_INIT');
// }, 5000);
// setTimeout(() => {
//   ani('BUTTERFLY_STRETCH');
// }, 7000);
// setTimeout(() => {
//   ani('BUTTERFLY_INIT');
// }, 10000);

// squat
// setTimeout(() => {
//   ani('SQUAT_STANDING'); 
// }, 0);
// setTimeout(() => {
//   ani('SQUAT_POSITION_EASY');
// }, 2000);
// setTimeout(() => {
//   ani('SQUAT_STANDING');
// }, 5000);
// setTimeout(() => {
//   ani('SQUAT_POSITION_EASY');
// }, 7000);
// setTimeout(() => {
//   ani('SQUAT_STANDING');
// }, 10000);

// twist
// setTimeout(() => {
//   ani('TWIST_FRONT'); 
// }, 0);
// setTimeout(() => {
//   ani('TWIST_SIDE');
// }, 2000);
// setTimeout(() => {
//   ani('TWIST_FRONT');
// }, 4000);
// setTimeout(() => {
//   ani('TWIST_SIDE');
// }, 6000);
// setTimeout(() => {
//   ani('TWIST_FRONT');
// }, 8000);

//push ups Fix this up a bit.
// setTimeout(() => {
//   ani('PUSH_UP_UP');
// }, 0);
// setTimeout(() => {
//   ani('PUSH_UP_DOWN');
// }, 2000);
// setTimeout(() => {
//   ani('PUSH_UP_UP');
// }, 4000);
// setTimeout(() => {
//   ani('PUSH_UP_UP');
// }, 6000);
// setTimeout(() => {
//   ani('PUSH_UP_DOWN');
// }, 8000);

// Situps
// setTimeout(() => {
//   ani('LAYING');
// }, 0);
// setTimeout(() => {
//   ani('SIT_UP');
// }, 2000);
// setTimeout(() => {
//   ani('LAYING');
// }, 4000);
// setTimeout(() => {
//   ani('SIT_UP');
// }, 6000);
// setTimeout(() => {
//   ani('LAYING');
// }, 8000);

// Star jumps
// setTimeout(() => {
//   ani('STANDING_STRAIGHT');
// }, 0);
// setTimeout(() => {
//   ani('HALFWAY_STAR_JUMP');
// }, 1500);
// setTimeout(() => {
//   ani('STAR_JUMP_LAND');
// }, 3000);
// setTimeout(() => {
//   ani('HALFWAY_STAR_JUMP');
// }, 4500);
// setTimeout(() => {
//   ani('STANDING_STRAIGHT');
// }, 6000);

// setTimeout(() => {
//   ani('STANDING_STRAIGHT');
// }, 0);
// setTimeout(() => {
//   // startRecording(); 
//   ani('STANDING_STRAIGHT');
// }, 3000);
// setTimeout(() => {
//   ani('IDLE');
// }, 7000);

// setTimeout(() => {
//   startRecording(); 
//   ani('DOUBLE_HEAL_LIFT_DOWN');
// }, 0);
// setTimeout(() => {
//   ani('DOUBLE_HEAL_LIFT_UP');
// }, 2000);
// setTimeout(() => {
//   ani('DOUBLE_HEAL_LIFT_ALMOST_DOWN');
// }, 17000);
// setTimeout(() => {
//   ani('DOUBLE_HEAL_LIFT_UP');
// }, 31000);
// setTimeout(() => {
//   ani('DOUBLE_HEAL_LIFT_ALMOST_DOWN');
// }, 44000);
// setTimeout(() => {
//   ani('DOUBLE_HEAL_LIFT_DOWN');
// }, 52000);
// setTimeout(() => {
//   stopRecording(); 
// }, 58000);

// Single Heal lift.
// setTimeout(() => {
//   ani('HEAL_LIFT_LEFT_UP');
// }, 2000);
// setTimeout(() => {
//   ani('HEAL_LIFT_LEFT_DOWN');
// }, 4000);
// setTimeout(() => {
//   ani('HEAL_LIFT_LEFT_UP');
// }, 6000);

// setTimeout(() => {
//   stopRecording();
// }, 20000);

// setTimeout(() => {
//   ani('BOLT');
// }, 0);
// setTimeout(() => {
//   ani('MICHEALJACKSON');
// }, 2000);
// setTimeout(() => {
//   ani('LEG_STAND');
// }, 4000);
// setTimeout(() => {
//   ani('JACKIECHAN');
// }, 8000);
// setTimeout(() => {
//   ani('KARATEKID');
// }, 10000);
// setTimeout(() => {
//   ani('JEDI_1');
// }, 12000);
// setTimeout(() => {
//   ani('JEDI_2');
// }, 14000);
// setTimeout(() => {
//   ani('JEDI_3');
// }, 16000);
// setTimeout(() => {
//   ani('IDLE');
// }, 18000);

var exportData = function () {
  var out = [];
  for (var key in circles) {
    out.push ({
      ref: circles[key].uid,
      left:  Math.round(circles[key].left),
      top:  Math.round(circles[key].top)
    })
  }
  console.log(out);
}
