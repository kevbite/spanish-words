import './App.css'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SpeakerIcon from '@mui/icons-material/Speaker';

const synth = window.speechSynthesis;


function speak(text: string) {
  const spanishVoice = synth.getVoices().find(voice => voice.lang.startsWith('es')) || null;

  if(spanishVoice){
    console.warn('No es-ES voice')
  }
  const utterThis = new SpeechSynthesisUtterance(text);
  utterThis.voice = spanishVoice
  utterThis.lang = spanishVoice!.lang // // Android Chrome required
  utterThis.pitch = 1;
  utterThis.rate = 1;

  utterThis.onend = function () {
    console.log("SpeechSynthesisUtterance.onend");
  };

  utterThis.onerror = function () {
    console.error("SpeechSynthesisUtterance.onerror");
  };

  synth.speak(utterThis);
}


const wordGroups = [{
  question: { english: 'What is your name?', spanish: '¿Cómo te llamas?'},
  answer: { english: 'Hello my Name Is', spanish: 'Hola, me llamo'},
  words: [ ],
},{
  question: { english: 'How are you?', spanish: '¿Cómo estás?'},
  answer: { english: 'I am', spanish: 'Yo estoy'},
  words: [
    { english: 'Happy', spanish: 'Feliz' },
    { english: 'Sad', spanish: 'Triste' },
    { english: 'Angry', spanish: 'Enojado' },
    { english: 'Scared', spanish: 'Asustado' },
    { english: 'Surprised', spanish: 'Sorprendido' },
    { english: 'Bored', spanish: 'Aburrido' },
    { english: 'Nervous', spanish: 'Nervioso' },
    { english: 'Excited', spanish: 'Emocionado' },
    { english: 'Tired', spanish: 'Cansado' },
    { english: 'Relaxed', spanish: 'Relajado' },
  ],
}];


function App() {
  return (
    <>
      <Box>
      <Stack spacing={2}>

      {wordGroups.map(wordGroup => 
      <Box>

        <Stack spacing={2}>
            <Button color="primary" variant="contained" endIcon={<SpeakerIcon />}  onClick={() => {
                speak(wordGroup.question.spanish)
            }}>
                {wordGroup.question.spanish} ({wordGroup.question.english})
            </Button>
            <Button color="primary" variant="outlined" endIcon={<SpeakerIcon />}  onClick={() => {
                speak(wordGroup.answer.spanish)
            }}>
                {wordGroup.answer.spanish} ({wordGroup.answer.english})
            </Button>
            {wordGroup.words.map(word =><Button color="secondary" variant="text" endIcon={<SpeakerIcon />}  onClick={() => {
                speak(word.spanish)
              }}>
                {word.spanish} ({word.english})
              </Button>)}
              
          </Stack>
      </Box>
        
        )}
          </Stack>
     
      </Box>
    </>
  )
}

export default App
