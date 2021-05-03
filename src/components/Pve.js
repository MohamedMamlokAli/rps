import React,{useState,useEffect} from 'react'
import headerIcon from '../images/logo.svg'
import {data} from "./data"
import close from "../images/icon-close.svg"
import gsap from "gsap"
import { Timeline } from 'gsap/gsap-core'

const Pve = () => {
 const {background,icons,rules} = data
 const [currentScore,setCurrentScore] = useState(0)
 const [playerPick,setPlayerPick] = useState(0)
 const [computerPick,setComputerPick] = useState(0)
 const [picked,setPicked] = useState(false)
 const [won,setWon] = useState(false)
 
 const tl = new Timeline()
 useEffect(() => {
   gsap.from("#main-img",{rotateZ:360,opacity:0,duration:1})
 }, [playerPick])
 useEffect(() => {
   if(playerPick){
      tl.from("#player-pick",1,{rotateZ:360,opacity:0,x:-100})
      .from("#your",1,{x:-100,opacity:0},"-=.7")
      .from("#computer-pick",1,{rotateZ:180,opacity:0,x:100})
      .to("#com-img",1,{rotateY:180},"-=1")
      .from("#his",1,{x:100,opacity:0},"-=.7")
      .from("#res",1,{opacity:0,ease:won?"elastic":"back",y:-50})
      .from("#again",1,{opacity:0},"-=.8")
   }
 }, [playerPick])
 const showRules =()=>{
  document.getElementById('rulesModal').classList.toggle("hidden")
  document.getElementById('show-rules-button').classList.toggle("hidden")
}
const closeRules=()=>{
  document.getElementById('rulesModal').classList.toggle("hidden")
    document.getElementById('show-rules-button').classList.toggle("hidden")
}
const playerPicked = (e)=>{
  setPicked(true)
  setPlayerPick(e.target.id)
  setComputerPick(Math.floor(Math.random() * (3 - 1 + 1) + 1))
}
if(picked){
if(playerPick > computerPick){
    if(playerPick == 3 && computerPick == 1){
      setCurrentScore(currentScore == 0 ? 0 : currentScore-1)
      setWon(false)
    }else{
      setCurrentScore(currentScore+1)
      setWon(true)
    }
  }else if(playerPick == computerPick){
      setCurrentScore(currentScore)
      setWon("draw")
  }else if(playerPick < computerPick){
    if(playerPick == 1 && computerPick == 3){
      setCurrentScore(currentScore+1)
      setWon(true)
    }else{
      setCurrentScore(currentScore == 0 ? 0 : currentScore-1)
      setWon(false)
    }
  }
 setPicked(false)
}

 return (
  <section className="text-white flex flex-col h-screen justify-between p-7 items-center  overflow-hidden" >
   <header id="mainpage-header" className="border border-gray-100 w-full rounded-lg p-3 lg:w-1/2 flex flex-row justify-between items-center ">
   <img className="h-14" src={headerIcon} alt="Rock Paper Scissors"/>
   <div id="score" className="bg-white text-gray-800 flex flex-col justify-evenly text-xl font-bold items-center p-4 rounded-lg">
     <h2>Score</h2>
     <h2>{currentScore}</h2>
   </div>
   </header>
    {playerPick == 0 ? <div
    >   <div id="main-img" className="relative">
    <img className="relative inline-block w-48 h-44" src={background} alt=""/>
    <div  id="1" onClick={(e)=>playerPicked(e)} className="bg-gray-100 cursor-pointer w-32 h-32 rounded-full absolute inset-0 -top-11 -left-12 flex flex-col items-center justify-center circleBorder border-blue-500">
        <img id="1" onClick={(e)=>playerPicked(e)} className="w-11 h-12 inline-block" src={icons[1]} alt="Paper"/>
      </div>
      <div id="2" onClick={(e)=>playerPicked(e)}  className="absolute cursor-pointer -right-11 -top-11 bg-gray-100 w-32 h-32 rounded-full flex flex-col items-center justify-center circleBorder border-yellow-500">
        <img id="2" onClick={(e)=>playerPicked(e)} className="w-11 h-12 inline-block" src={icons[2]} alt="Scissors"/>
      </div>
      <div id="3" onClick={(e)=>playerPicked(e)}  className=" absolute cursor-pointer -bottom-14 left-8 bg-gray-100 w-32 h-32 rounded-full flex flex-col items-center justify-center circleBorder border-red-500">
        <img id="3" onClick={(e)=>playerPicked(e)} className="w-11 h-12 inline-block" src={icons[0]} alt="Rock"/>
      </div>
   </div>
</div>:<div className="relative w-full h-2/3 flex flex-col justify-around items-center lg:w-1/2">
  <div id="pickes" className="flex flex-row justify-between w-full">
    <div id="player-pick-full" className="h-full flex flex-col justify-between items-center">
      <div id="player-pick" className="bg-gray-100 lg:w-40 lg:h-40 w-32 h-32 rounded-full relative inset-0 top-10  flex flex-col items-center justify-center circleBorder border-blue-500">
        <img className="w-11 h-12 inline-block" src={playerPick==3?icons[0]:icons[playerPick]} alt=""/>
      </div>
      <p id="your" className="relative mt-12 text-lg font-semibold ">Your pick</p>
    </div>
    <div id="computer-pick-full" className="h-full flex flex-col justify-between items-center">
        <div id="computer-pick" className="relative top-10 bg-gray-100 w-32 h-32 rounded-full flex flex-col items-center justify-center circleBorder border-yellow-500">
          <img id="com-img" className="w-11 h-12 inline-block" src={computerPick==3?icons[0]:icons[computerPick]} alt=""/>
        </div>
        <p id="his" className="relative mt-12 text-center font-medium ">HOUSE PICKED</p>

    </div>
  </div>
  <div id="final-results" className="text-center w-3/4">
      <h1 id="res" className="text-4xl font-bold mb-2">{won=="draw"?"Draw":won?"YOU WIN":"YOU LOSE"}</h1>
      <button id="again" className="mt-2 font-semibold bg-white text-gray-800 text-xl w-full lg:w-1/2 px-6 py-3 rounded-xl" onClick={()=>setPlayerPick(0)}>PLAY AGAIN</button>
  </div>
  </div>}
   <div className="">
    <button id="show-rules-button" className="uppercase text-xl border-2 rounded-lg px-8 py-1" onClick={()=>showRules()}>rules</button>
    </div>
  <div id="rulesModal" className="hidden absolute w-screen flex flex-col justify-between items-center bg-gray-800 h-5/6 pt-7 ">
      <img className="inline-block h-5/6" src={rules[0]} alt="Rock beats Scissors,Scissors beats Paper, Paper beats Rock"/>
          <div id="close-how">
      <button id="hide-rules-button" onClick={()=>closeRules()}><img src={close} alt="close"></img></button>
    </div>
  </div>
  </section>
 )
}

export default Pve
