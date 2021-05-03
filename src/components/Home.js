import React,{useState,useEffect} from 'react'
import {data} from "./data"
import headerIcon from '../images/logo.svg'
import {Howl} from "howler"
import click from "./audios/click.mp3"
import close from "../images/icon-close.svg"
import {Link} from "react-router-dom"
import gsap from "gsap"
import { random } from 'gsap/gsap-core'
const Home = () => {
  const [sound] = useState(click)
  const [imgs , setImgs] = useState(0)
  const {buttons,playPlayers,images,imagesText,rules,playShort} = data;
  const clicked = new Howl({
    src:[sound]
  })
useEffect(() => {
  gsap.from(".homescreenButtons",{opacity:0,duration:1,stagger:.2,x:random(-100,100),rotateZ:360,rotateY:360,rotateX:360})
}, [])
const playOptions =()=>{
document.getElementById('play-options').classList.toggle("hidden")
document.getElementById('play-options').classList.toggle("flex")
document.getElementById('options').classList.toggle("hidden")
}
const backButton =()=>{
document.getElementById('play-options').classList.toggle("hidden")
document.getElementById('play-options').classList.toggle("flex")
document.getElementById('options').classList.toggle("hidden")
}
const showHowToPlay =()=>{
  document.getElementById('how-to-imgs').classList.toggle("hidden")
  document.getElementById('options').classList.toggle("hidden")
  document.getElementById('mainpage-header').classList.toggle("hidden")
}
const closeHowToPlay=()=>{
  document.getElementById('how-to-imgs').classList.toggle("hidden")
  document.getElementById('options').classList.toggle("hidden")
  document.getElementById('mainpage-header').classList.toggle("hidden")
  setImgs(0)
}
const showRules =()=>{
  document.getElementById('rulesModal').classList.toggle("hidden")
  document.getElementById('options').classList.toggle("hidden")
  document.getElementById('mainpage-header').classList.toggle("hidden")
}
const closeRules=()=>{
  document.getElementById('rulesModal').classList.toggle("hidden")
  document.getElementById('options').classList.toggle("hidden")
  document.getElementById('mainpage-header').classList.toggle("hidden")
}

return (
<section id="Home-screen" className="text-gray-50 p-8 h-full flex flex-col justify-center items-center">
  <header id="mainpage-header" className="border border-gray-100 w-full rounded-lg p-3 lg:w-1/2 ">
  <img className="h-12" src={headerIcon} alt="Rock Paper Scissors"/>
  </header>
  <div id="options" className="flex flex-col my-20 h-4/6 justify-evenly">

  {buttons.map((button,index)=>{
    return <button key={index} id={button.split(" ")[0]} onClick={()=>{
    clicked.play()
    if(document.getElementById('Play').innerHTML === button){
      return playOptions()
    }else if(document.getElementById('How').innerHTML === button){
      return showHowToPlay()
    }else if(document.getElementById('Rules').innerHTML === button){
      return showRules()
    }
    }} className="text-xl font-bold uppercase homescreenButtons">{button}</button>
  })}
  </div>
  <div id="play-options" className="hidden flex-col my-20 h-4/6 p-10 justify-evenly">
        {playPlayers.map((option,index)=>{
    return <Link id={`${playShort[index]}`}  className="text-xl font-bold uppercase text-center" key={index} onClick={()=>clicked.play()} to={option==='Player vs Computer'?'pve':'pvp'}>{option}</Link>
  })}
  <button className="text-xl font-bold uppercase" onClick={()=>{
    backButton();
    clicked.play()
  }}>Back</button>

  </div>
  <div id="how-to-imgs" className="hidden absolute py-auto w-screen flex flex-col items-center bg-gray-800 h-screen lg:py-10 overflow-hidden">
    <div id="next-back" className="text-3xl flex w-full px-1 flex-row justify-between  items-center lg:px-40 absolute z-40 text-white bottom-1/2">
      <div className="flex flex-row justify-between">
              <div> <button onClick={()=>{
        if(imgs === 0){
          setImgs(4)
        }
        else{
          setImgs(imgs-1)
        }
      }}>⇐</button></div>
    </div>
      <div> <button onClick={()=>{
        if(imgs === 4){
          setImgs(0)
        }
        else{
          setImgs(imgs+1)
        }
      }}>⇒</button></div>

      </div>
    <div id="img-text" className="flex flex-col items-center ">
        {<img src={images[imgs]} alt="How to img" className="inline-block h-2/3 lg:h-full"/>}
        <p className="text-center text-lg mt-4">{imagesText[imgs]}</p>
      </div>
    <div id="close-how" className="absolute bottom-1 lg:bottom-10">
      <button onClick={()=>closeHowToPlay()}><img src={close} alt="close"></img></button>
    </div>
  </div>
  <div id="rulesModal" className="hidden absolute w-screen flex flex-col justify-between items-center bg-gray-800 h-screen py-10">
      <img className="inline-block h-5/6" src={rules[0]} alt="Rock beats Scissors,Scissors beats Paper, Paper beats Rock"/>
          <div id="close-how">
      <button onClick={()=>closeRules()}><img src={close} alt="close"></img></button>
    </div>

  </div>
</section>
)
}
export default Home