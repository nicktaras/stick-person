
var coordinateTemplate = `<div id="coords" style="float: left; border: 1px solid black; font-size: 10.4pt; padding: 20px; float: right; margin: 0px; position: relative; z-index: 100;">
    <span>Coords:</span>
    <p><b>Head:</b><span id="headCircle"></span></p>
    <p><b>Shoulders:</b> <span id="shoulderCircle"></span></p>
    <p><b>Hips:</b> <span id="hipsCircle"></span></p>
    <p><b>Left Elbow:</b> <span id="leftElbowCircle"></span></p>
    <p><b>Right Elbow:</b> <span id="rightElbowCircle"></span></p>
    <p><b>Right Hand:</b> <span id="rightHandCircle"></span></p>
    <p><b>Left Hand:</b> <span id="leftHandCircle"></span></p>
    <p><b>Left Knee:</b> <span id="leftKneeCircle"></span></p>
    <p><b>Right Knee:</b> <span id="rightKneeCircle"></span></p>
    <p><b>Left Foot:</b> <span id="leftFootCircle"></span></p>
    <p><b>Left Ankle:</b> <span id="leftAnkleCircle"></span></p>
    <p><b>Right Foot:</b> <span id="rightFootCircle"></span></p>
    <p><b>Right Ankle:</b> <span id="rightAnkleCircle"></span></p>
    <button onClick="exportData()">Export Data</button>
  </div>`;
