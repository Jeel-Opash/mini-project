import { useState } from "react"
import words from "./wordlist.json";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";

export const App=()=>{
  const[word,setword]=useState(()=>{
    return words[Math.floor[Math.random() * words.length]]
  })

  const[guessletter,setguessletter]=useState<string>([])

  console.log(word)
  return(

<div>
  <div>
    Lose Win
  </div>
  <HangmanDrawing/>
  <HangmanWord/>
  <Keyboard/>
</div>  )
}