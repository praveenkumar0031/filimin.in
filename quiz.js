const questions = [
    {
        question: "Which",
        answers:[
            { text:"S",correct:false},
            { text:"A",correct:true},
            { text:"B",correct:false},
            { text:"C",correct:false},
        ]
    },
    {
        question: "Who",
        answers:[
            { text:"a",correct:false},
            { text:"b",correct:true},
            { text:"c",correct:false},
            { text:"d",correct:false},
        ]
    }
];
const questionelement= document.getElementById("question");
const answerbutton= document.getElementById("answer-button");
const nextbutton= document.getElementById("next-btn");
 let currentquestindex=0;
 let score=0;
 function start(){
    currentquestindex=0;
    score=0;
    nextbutton.innerHTML="Next";
    showquestion();
 }
 function showquestion(){
    let currentquest=questions[currentquestindex];
    let questionno= currentquestindex+1;
    questionelement.innerHTML=questionno + ". " + currentquest.question;
    currentquest.answers.array.forEach(answer => {
        const button=document.createElement("button");
        button.innerHTML=answer.txt;
        button.classList.add("btn");
        answerbutton.appendChild(button);
    });
 }
 start();