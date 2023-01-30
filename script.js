var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

var Content = '';

// recognition.continuous = true;
recognition.interimResults = true;

recognition.start()
const words = []

recognition.onresult = function(event) {

  var current = event.resultIndex;
  var transcript = event.results[current][0].transcript;
  // Content += transcript;
  // // Content += ' ';
  // console.log(Content);
  var color = event.results[0][0].transcript;
  // diagnostic.textContent = 'Result received: ' + color + '.';
  // bg.style.backgroundColor = color;
  // console.log( transcript + ', Confidence Score: ' + event.results[0][0].confidence);
words.push(transcript + ', Confidence Score: ' + event.results[0][0].confidence)
  // console.log(words)
  recognition.addEventListener('end', recognition.start);
};

window.saveDataAcrossSessions = true;

const LOOK_DELAY = 10000 // 10 sec
const LEFT_CUTOFF = window.innerWidth / 4;
const RIGHT_CUTOFF = window.innerWidth - window.innerWidth / 4;


let startLookTime = Number.POSITIVE_INFINITY
let lookDirection = null
let imageElement = getNewImage()
let nextImageElement = getNewImage(true)


webgazer.setGazeListener((data, timestamp) => {    
    if (data == null) return 

    // For Left Turn
    if (data.x < LEFT_CUTOFF && lookDirection !== 'LEFT'){
        startLookTime = timestamp
        lookDirection = 'LEFT'
    }

    // For Right Turn
    else if (data.x > RIGHT_CUTOFF && lookDirection !== 'RIGHT'){
        startLookTime = timestamp
        lookDirection = 'RIGHT'
    }

    // For Looking at the center
    else if (data.x >= LEFT_CUTOFF && data.x <=RIGHT_CUTOFF){
        startLookTime = Number.POSITIVE_INFINITY
        lookDirection = null
    }

    // Student found cheating
    if(startLookTime + LOOK_DELAY < timestamp){
        console.log("here")
        sendEmailProctor()
    recognition.abort()
        // alert("Caught you cheating!"); 
        
        // TODO: Contact Your Administrator page
        window.location.href="cheated.html";

        webgazer.end()
    }
}).begin()
// webgazer.showPredictionPoints(false)


function getNewImage(next = false){
    const img = document.createElement('img')
    img.src = "question-paper.png"
    img.classList.add("blur");
      setTimeout(function() {
        img.classList.remove("blur");
        timer();
      }, 9000);

      if(next) img.classList.add("next")
    document.body.append(img)
    return img
}

function sendEmailProctor() {
  Email.send({
  Host: "smtp.gmail.com",
  Username : "email-app",
  Password : "***********",
  To : 'email-proctor',
  From : "email-app",
  Subject : "Student Cheating!",
  Body : "Student Found Looking Away from Screen for 10second \n The list of words found are" + words.join("---------------"),
  })
    // .then(
  //  message => alert("Caught You Cheating! Email sent to Proctor")
    //     // window.close()
  // );
}

function sendEmailSpeech() {
  Email.send({
  Host: "smtp.gmail.com",
  Username : "email-app",
  Password : "***********",
  To : 'email-proctor',
  From : "email-app",
  Subject : "Student Finished The Exam",
  Body : "Student Finished The Exam Properly Here Is The List Of Words" + words.join("---------------"),
  })
    // .then(
  //  message => alert("Caught You Cheating! Email sent to Proctor")
    //     // window.close()
  // );
}

function timer(){
    var timeleft = 30;
      var downloadTimer = setInterval(function(){
        if(timeleft <= 0){
          clearInterval(downloadTimer);
          document.getElementById("countdown").innerHTML = "Finished";
          sendEmailStudent()
      sendEmailSpeech()
        recognition.abort()
          window.location.href="end.html";

          // TODO: Display Thank You Page

          // TODO: DAfter 10 sec, display login page
          webgazer.end()
        } else {
          document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
        }
        timeleft -= 1;
      }, 1000);
}


function sendEmailStudent(){
    Email.send({
        Host: "smtp.gmail.com",
        Username : "email-app",
        Password : "************",
        To : 'email-student',
        From : "email-app",
        Subject : "Exam Finished Successfully!",
        Body : "Congratulations! You have successfuly finished your exams",
        })
}
