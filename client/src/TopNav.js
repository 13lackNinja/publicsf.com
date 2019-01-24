import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TypeLogo from './TypeLogo.js'

import './styles/TopNav.css'

import hamburgerMenuImage from './images/hamburger_menu.svg'

const MyNavLink = (props) => (
  <a href={`/${props.path}`}>
    <button>{props.text}</button>
  </a>
)

class HamburgerMenu extends Component {
  constructor(props) {
    super(props);
    this.rotate = this.rotate.bind(this);
    this.state = {
      isHorizontal: true
    }
  }

  rotate() {
    const topNav = document.getElementById('topnav');

    if (this.state.isHorizontal) {
      topNav.className += 'expanded';
      this.setState({ isHorizontal: false });
    } else {
      topNav.className = '';
      this.setState({ isHorizontal: true });
    }
  }

  render() {
    if (this.state.isHorizontal) {
      return (
        <img
          id="hamburger-menu"
          src={hamburgerMenuImage}
          alt="hamburger_menu.svg"
          onClick={this.rotate}
        />
      )
    } else {
      return (
        <img
          id="hamburger-menu"
          src={hamburgerMenuImage}
          alt="hamburger_menu.svg"
          onClick={this.rotate}
          style={{ transform: 'rotate(90deg)' }}
        />
      )
    }

  }
}

class TopNav extends Component {
  constructor(props) {
    super(props);
    this.navRespond = this.navRespond.bind(this);
    this.state = {
      isResponsive: null
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.navRespond);
  }

  navRespond() {
    if (!this.state.isResponsive) {
      (window.innerWidth >= 908) ?
      this.setState({ isResponsive: true }) :
      this.setState({ isResponsive: false })
    }
    if (
      window.innerWidth >= 908 &&
      this.state.isResponsive
    ) {
      this.setState({ isResponsive: false });
    } else if (
      window.innerWidth < 908 &&
      !this.state.isResponsive
    ) {
      this.setState({ isResponsive: true })
    }
  }

  render() {
    const width = window.innerWidth;

    if (!this.state.isResponsive && width >= 908) {
      return (
        <div id="topnav">
          <div id="topnav-position-div">
            <Link to={"/"}>
              <TypeLogo type="nav"/>
            </Link>
            <MyNavLink path="connect" text="connect"></MyNavLink>
            <MyNavLink path="privateevents" text="private events"></MyNavLink>
            <MyNavLink path="about" text="about"></MyNavLink>
            <MyNavLink path="calendar" text="calendar"></MyNavLink>
          </div>
        </div>
      )
    } else {
      return (

        <div id="topnav">
          <div id="topnav-position-div">
            <Link to={"/"}>
              <TypeLogo type="nav"/>
            </Link>
            <MyNavLink path="calendar" text="calendar"></MyNavLink>
            <MyNavLink path="about" text="about"></MyNavLink>
            <MyNavLink path="privateevents" text="private events"></MyNavLink>
            <MyNavLink path="connect" text="connect"></MyNavLink>
            <HamburgerMenu isVisible={this.state.isResponsive}/>
          </div>
        </div>
      )
    }

  }
}

export default TopNav
