import './HelpPage.css';
import HeaderBar from './assets/HeaderBar';

const HelpPage = () => {

  return (
    <div className='help-page'>
      <HeaderBar/>
      <h1>How to Play</h1>
      <div>
        <div className='general-container'>
          <h3 className='general-header'>General Rules</h3>
          <p>Keep your investigation card on you at all times when not dead</p>
          <p>Log actions on this app</p>
          <p>You may only carry one regular knife, and one red knife at a time</p>
        </div>

        <div className='kill-container'>
          <h3 className='kill-header'>Kill</h3>
          <p>Touch someone with a plastic knife. Leave the knife with the victim. (+3 points if not caught, -1 point from victim)</p>
          <p>Log on this app at earliest convenience (need name of victim). Log a red knife kill TWICE</p>
          <p>You cannot investigate a murder you committed</p>
        </div>

        <div className='solve-container'>
          <h3 className='solve-header'>Solve</h3>
          <p>Find a dead body with their investigation card on them. Take their investigation card.</p>
          <p>You have until their timer expires to guess their killer (+4 points, -3 from killer)</p>
          <p>Confirm the guess with the victim and return their investigation card</p>
          <p>IF correct, log on this app (need name of victim AND killer). Log a red knife solve TWICE</p>
          <p>You can only investigate one murder at a time</p>
          <p>You cannot kill or be killed while investigating a murder (i.e. holding someone else's investigation card)</p>
        </div>

        <div className='die-container'>
          <h3 className='die-header'>Die</h3>
          <p>If you are killed, lie down in place, take out your death card and start a 6 minute timer (-1 point)</p>
          <p>Make sure you know who killed you</p>
          <p>You must lie down quietly and not attempt to alert potential detectives</p>
          <p>You are revived when the timer expires, or when your detective asks you to confirm their guess</p>
        </div>

        <div className='missions-container'>
          <h3 className='missions-header'>Missions</h3>
          <p>Follow mission instructions. Some missions may require proof. </p>
          <p>Missions should be kept personal. Some people have the same missions</p>
          <p>If you complete a mission, log it on this app</p>
          <p>Upon completion, you are rewarded with (X) points. Some missions can be completed multiple times</p>
        </div>

        <div className='chungus-container'>
          <h3 className='chungus-header'>Chungus</h3>
          <p>The chungus is a physical object hidden somewhere in the house</p>
          <p>If you have it, log it on this app</p>
          <p>In intervals of 20 minutes after obtaining the chungus, you can "farm" it (+2 points)</p>
          <p>If you are killed while in posession of the chungus, you must discreetly relinquish posession to your killer</p>
        </div>

        <div className='mysteries-container'>
          <h3 className='mysteries-header'>Mysteries</h3>
          <p>Mysteries lead to clues or advantages found around the house</p>
        </div>
      </div>
    </div>
  )
}

export default HelpPage;