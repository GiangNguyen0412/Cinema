import React from 'react'
const io = require('socket.io-client')
const socket = io()
import Codemirror from 'react-codemirror';
import ModeSelect from './ModeSelect';
import ThemeSelect from './ThemeSelect';
import UserList from './UserList';
import SaveButton from './SaveButton'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/challengesActions';
import {Button} from 'react-bootstrap'
import YouTube from '@u-wave/react-youtube';
 
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/bespin.css';
import 'codemirror/theme/3024-day.css';
import 'codemirror/theme/3024-night.css';
import 'codemirror/theme/cobalt.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/isotope.css';
import 'codemirror/theme/duotone-light.css';
import 'codemirror/theme/icecoder.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/midnight.css';
import 'codemirror/theme/solarized.css';

import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/ruby/ruby.js'
import 'codemirror/mode/swift/swift.js'
import 'codemirror/mode/clojure/clojure.js'
import 'codemirror/mode/python/python.js'
import 'codemirror/mode/php/php.js'
import 'codemirror/mode/erlang/erlang.js'
import 'codemirror/mode/coffeescript/coffeescript.js'
import 'codemirror/mode/crystal/crystal.js'

const videos = [
  { id: 'ld8ugY47cps', name: 'SLCHLD - I can\'t love you anymore' },
  { id: 'ZuuVjuLNvFY', name: 'JUNNY - kontra (Feat. Lil Gimch, Keeflow)' },
  { id: 'PYE7jXNjFWw', name: 'T W L V - Follow' },  
  { id: null, name: '<none>' },
];

const qualities = ['auto', '240', '380', '480', '720', '1080', '1440', '2160'];

const hashVideoRx = /^#!\/video\/(\d)$/;
const hash = typeof window.location !== 'undefined'
  ? window.location.hash : ''; // eslint-disable-line no-undef
const defaultVideo = hashVideoRx.test(hash)
  ? parseInt(hash.replace(hashVideoRx, '$1'), 10)
  : 0;

class Room extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
                  code: '', 
                  mode: 'javascript', 
                  theme: 'eclipse', 
                  users: [], 
                  currentlyTyping: null,
                  videoIndex: defaultVideo,
                  suggestedQuality: 'auto',
                  volume: 1,
                  paused: false,
                  startSeconds: 40
                }
    this.handlePause = this.handlePause.bind(this);
    this.handlePlayerPause = this.handlePlayerPause.bind(this);
    this.handlePlayerPlay = this.handlePlayerPlay.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.handleQuality = this.handleQuality.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    
    socket.on('receive code', (payload) => this.updateCodeInState(payload));
    socket.on('receive change mode', (newMode) => this.updateModeInState(newMode))
    socket.on('new user join', (users) => this.joinUser(users))
    socket.on('load users and code', () => this.sendUsersAndCode())
    socket.on('receive users and code', (payload) => this.updateUsersAndCodeInState(payload))
    socket.on('user left room', (user) => this.removeUser(user))
  }

  componentDidMount() {
    if (this.props.challenge.id == undefined) {
      this.props.actions.getChallenges();
    } else {
      const user = this.props.currentUser
      sessionStorage.setItem('currentUser', user)
      const users = [...this.state.users, this.props.currentUser]
      socket.emit('room', {room: this.props.challenge.id, user: user});
      this.setState({users: users})
    }
  }

  componentWillUnmount() {
    socket.emit('leave room', {room: this.props.challenge.id, user: this.props.currentUser})
  }

  componentWillReceiveProps(nextProps) {
    const user = nextProps.currentUser
    const users = [...this.state.users, user]
    socket.emit('room', {room: nextProps.challenge.id, user: user});
    this.setState({users: users})
  }

  selectVideo(index) {
    this.setState({ videoIndex: index });
  }

  handlePause(event) {
    this.setState({
      paused: event.target.checked,
    });
  }

  handlePlayerPause() {
    this.setState({ paused: true });
    this.setState({startSeconds: 20});

    console.log('state change ##############################');
    this.forceUpdate();

  }

  handlePlayerPlay() {
    this.setState({ paused: false });
  }

  handleVolume(event) {
    this.setState({
      volume: parseFloat(event.target.value),
    });
  }

  handleQuality(event) {
    this.setState({
      suggestedQuality: qualities[event.target.selectedIndex],
    });
  }

  handleStateChange(event) {
    console.log('state changed : ' + event.data + ' -- ' + event.target.getCurrentTime());
  }

  sendUsersAndCode() {
    socket.emit('send users and code', {room: this.props.challenge.id, users: this.state.users, code: this.state.code})
  }

  removeUser(user) {
    const newUsers = Object.assign([], this.state.users);
    const indexOfUserToDelete = this.state.users.findIndex(Olduser => {return Olduser == user.user})
    newUsers.splice(indexOfUserToDelete, 1);
    this.setState({users: newUsers})
  }

  joinUser(user) {
    const combinedUsers = [...this.state.users, user]
    const newUsers = Array.from(new Set(combinedUsers));
    const cleanUsers = newUsers.filter(user => {return user.length > 1})
    this.setState({users: cleanUsers})
  }


  updateCodeInState(payload) {
    this.setState({
      code: payload.code,
      currentlyTyping: payload.currentlyTyping
    });
  }

  updateCodeForCurrentUser(newCode) {
    this.setState({
      code: newCode
    })
  }

  updateModeInState(newMode) {
    this.setState({
      mode: newMode
    })
  }

  updateUsersAndCodeInState(payload) {
    const combinedUsers = this.state.users.concat(payload.users)
    const newUsers = Array.from(new Set(combinedUsers));
    const cleanUsers = newUsers.filter(user => {return user.length > 1})
    this.setState({users: cleanUsers, code: payload.code})
  }

  codeIsHappening(newCode) {
    this.updateCodeForCurrentUser(newCode)
    this.updateCurrentlyTyping()
    socket.emit('coding event', {code: newCode, room: this.props.challenge.id, currentlyTyping: this.props.currentUser})
  }

  updateCurrentlyTyping() {
    this.setState({currentlyTyping: this.props.currentUser})
  }

  changeMode(newMode) {
    this.updateModeInState(newMode)
    socket.emit('change mode', {mode: newMode, room: this.props.challenge.id})
  }

  changeTheme(newTheme) {
    this.setState({theme: newTheme})
  }

  clearCode(e) {
    e.preventDefault();
    this.setState({code: ''})
    socket.emit('coding event', {code: '', room: this.props.challenge.id})
  }

  render() {
    var options = {
        lineNumbers: true,
        mode: this.state.mode,
        theme: this.state.theme
    };

    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1
      }
    };

    const {
      videoIndex, volume, paused, suggestedQuality, startSeconds
    } = this.state;

    const video = videos[videoIndex];

    return (
      <div>
        <h1>{this.props.challenge.title}</h1>
        <p>{this.props.challenge.description}</p>
        <UserList users={this.state.users} currentlyTyping={this.state.currentlyTyping}/>
        <ModeSelect mode={this.state.mode} changeMode={this.changeMode.bind(this)}/>
        <ThemeSelect theme={this.state.theme} changeTheme={this.changeTheme.bind(this)} />
        <Codemirror value={this.state.code} onChange={this.codeIsHappening.bind(this)} options={options} />
        <br/>
        <SaveButton text={this.state.code} lang={this.state.mode} title={this.props.challenge.title}/>
        <br/>
        <Button onClick={this.clearCode.bind(this)} className="col-lg-12">clear code</Button>

        <p/>

        <br/>
        

        <div className="row">
          <div className="col s4">
            <h5>
              Video
            </h5>
            <div className="collection">
              {videos.map((choice, index) => (
                <a
                  key={choice.id}
                  href={`#!/video/${index}`}
                  className={`collection-item ${video === choice ? 'active' : ''}`}
                  onClick={() => this.selectVideo(index)}
                >
                  {choice.name}
                </a>             
              ))}
            </div>
            <h5>
              Paused
            </h5>
            <p>
              <label htmlFor="paused">
                <input
                  type="checkbox"
                  id="paused"
                  checked={paused}
                  onChange={this.handlePause}
                />
                <span>Paused</span>
              </label>
            </p>
            <h5>
              Volume
            </h5>
            <input
              type="range"
              value={volume}
              min={0}
              max={1}
              step={0.01}
              onChange={this.handleVolume}
            />
            <h5>
              Quality
            </h5>
            <select className="browser-default" onChange={this.handleQuality}>
              {qualities.map((quality) => (
                <option key={quality} value={quality}>
                  {quality}
                </option>
              ))}
            </select>
          </div>
          <div className="col s8 center-align">
            <YouTube
              video={video.id}
              width={640}
              height={480}
              autoplay
              controls={true}
              suggestedQuality={suggestedQuality}
              volume={volume}
              paused={paused}
              onPause={this.handlePlayerPause}
              onPlaying={this.handlePlayerPlay}
              onStateChange={this.handleStateChange}
              startSeconds={startSeconds}
            />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  if (state.challenges.length > 0) {
    const challenge = state.challenges.filter(challenge => {return challenge.id == ownProps.params.id})[0]
    const userName = sessionStorage.currentUser || state.currentUser
    return {challenge: challenge, currentUser: userName}
  } else {
    return {challenge: {title: '', description: '', source: ''}, currentUser: ''}
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)





