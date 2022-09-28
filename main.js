function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet', ModelLoaded);
}

function ModelLoaded(){
console.log("Model is loaded.");
}

function draw(){
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResult);
}

var previous_result = "";

function gotResult(error, results){
if(error){
console.error(Error);

}
 
else{
if((results[0].confidence>0.5)&&(previous_result!=results[0].label)){
console.log(results);
previous_result = results[0].label;
var synth = window.speechSynthesis;
speakData = 'object detected is '+results[0].label;
var UtterThis = new SpeechSynthesisUtterance(speakData);
synth.speak(UtterThis);
document.getElementById("object").innerHTML = results[0].label;
document.getElementById("accuracy").innerHTML = results[0].confidence.toFixed(3);
}
}

}