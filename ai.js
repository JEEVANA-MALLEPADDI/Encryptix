
document.getElementById('open-popup').addEventListener('click', function(event) {
  event.preventDefault();
  document.getElementById('popup').style.display = 'block';
});

document.getElementById('close-popup').addEventListener('click', function() {
  document.getElementById('popup').style.display = 'none';
});



const API_kEY="sk-aPH7DC0mCzcKUZMMjTGG97xnEdj4MEYfLjBjY5RnFtT3BlbkFJOHbGOqLbFtlkN4gd0L2c012yGCupXyG51z8nK8UdMA"
const API_URL="https://api.openai.com/v1/chat/completions"

const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const stopBtn = document.getElementById("stopBtn");
const resultText = document.getElementById("resultText");


const generate = async ()=>{
  if(!promptInput.value){
    alert("Please enter a prompt");
    return;
  }
  generateBtn.disabled=true;
  resultText.innerText="Generating...."
  try{
    
    const response=await fetch(API_URL,{
      method:"post",
      headers:{

        "Content-Type":"application/json",
        "Authorization":`Bearer ${API_kEY}`
      },
      body:JSON.stringify({
        model:"gpt-3.5-turbo",
        messages:[{ role: "system", content: "You are an expert assistant specializing in automotive topics, including car reviews, maintenance advice, buying tips, and technical specifications. Please ensure all responses are relevant to cars and automotive issues." },{role:"user",content:promptInput.value}],
        max_tokens:100
      }),
    });
    const data=await response.json();
    console.log(data.choices[0].message.content);
    resultText.innerText=data.choices[0].message.content;
  }
  catch(error){
    console.log(error);
    resultText.innerText="An error occurred. Please try again later.";
  }
  finally{
    generateBtn.diabled=false;
  }
  
};
generateBtn.addEventListener("click", generate);
promptInput.addEventListener("keyup",(event)=>{
  if(event.key==="Enter"){
    generate();
  }
});
stopBtn.addEventListener("click", stop);
