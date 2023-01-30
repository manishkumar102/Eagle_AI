// To save the data
window.saveDataAcrossSessions = true;

const LOOK_DELAY = 50000 // 5 sec
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
}).begin()


function getNewImage(next = false){
    const img = document.createElement('iframe')
    img.src = "https://www.youtube.com/embed/7h1s2SojIRw"
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
  Username : "dark.knights2023@gmail.com",
  Password : "$gharwaale2023",
  To : 'mikezane1986@gmail.com',
  From : "dark.knights2023@gmail.com",
  Subject : "Student Cheating!",
  Body : "Student Found Looking Away from Screen for 15second",
  })
    // .then(
  //  message => alert("Caught You Cheating! Email sent to Proctor")
    //     // window.close()
  // );
}

function sendEmailStudent(){
    Email.send({
        Host: "smtp.gmail.com",
        Username : "dark.knights2023@gmail.com",
        Password : "$gharwaale2023",
        To : 'bashterminal10@gmail.com',
        From : "dark.knights2023@gmail.com",
        Subject : "Exam Finished Successfully!",
        Body : "Congratulations! You have successfuly finished your exams",
        })
}