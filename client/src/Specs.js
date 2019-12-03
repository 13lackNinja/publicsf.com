// Content for Specs page.

import React from 'react'
import NewsletterSignUp from './NewsletterSignUp.js'
import DocLink from './DocLink';

import './styles/Specs.css'

const SpecsInfo = () => (
  <div id="specs">
    <h1 id="specs-header">Specifications</h1>

    <p className="spec-paragraph">Public Works is a diverse and adaptable event space in San Francisco’s Mission District. The venue features state of the art audio, video, and production capabilities suitable for all types of events.</p>

    <p className="spec-paragraph">Whether you’re looking to host a corporate event with slideshow-style presentations featuring crisp text and rich graphics or promote a cutting-edge music event, Public Works has everything you need to create an immersive, eye-popping visual experience.</p>

    <h2>Main Room</h2>

    <h4>Audio</h4>

    <ul>
      <div>
        <li>(2) Funktion-One BR 221 Subwoofer</li>
        <li>(2) Funktion-One Resolution 3 Full Range</li>
        <li>(2) Funktion-One Resolution 2 Full Range fills</li>
        <li>(2) Funktion-One F88 Rear fills</li>
      </div>
      <div>
        <li>(2) Funktion-One F101 Front Fills</li>
        <li>(4) Funktion-One F101 Loudspeakers on Balcony</li>
        <li>All speakers are discreetly processed and amped.</li>
      </div>
    </ul>

    <h4>Monitors</h4>

    <ul>
      <div>
        <li>(2) Funktion-One PSM12 Wedge Monitors</li>
        <li>(2) Funktion-One BR118 Subwoofers</li>
      </div>
    </ul>

    <h4>Video</h4>

    <ul>
      <div>
        <li>(3) Epson 720 WXGA 3.2k lumen projectors (1280x800 res) [covering side & rear walls]</li>
        <li>(1) 8x8 HDMI Switcher</li>
        <li>(2) LG Blu-Ray Players (DVD, Blu-Ray, MP2, MP4, JPEG via optical disc & USB)</li>
        <li>XLR stereo audio feed, adapters available</li>
      </div>
      <div>
        <li>(1) InFocus IN5535 7k lumen projector (12800x800 nativ res, up to 1080i) [rear wall only]</li>
        <li>(1) Matrix Triplehead (feeds the (3) PJL7211s projectors to create a continuous 3072x800 projection covering rear & side walls)</li>
        <li>(1) Custom build PC video server running Windows 7, Resolume Arena 4, nVidea GTX 1080</li>
        <li>Various HDMI, VGA, DVI, mini-DisplayPort, and composite video converters/adapters</li>
      </div>
    </ul>

    <h4>Lighting</h4>

    <ul>
      <div>
        <li>(4) 15w RGBA+UV LED Light (FOH Lights)</li>
        <li>(11) Tomshine Moving Head Stage Lights</li>
        <li>(4) American DJ MegaHex RGBWA+UV Parcan (Downstage+Upstage Lights)</li>
        <li>(2) American DJ Mega Flash DMX (Strobe LIght)</li>
        <li>(1) PC running MagicQ for DMX control of all lighting</li>
      </div>
      <div>
        <li>(4) Clay Paky 2R Sharpy (Moving Lights)</li>
        <li>(1) Martin Magnum 2500hz (Hazer)</li>
        <li>(2) MARQ Gesture beam 400 (Moving light)</li>
        <li>(2) American DJ Megabar LED</li>
        <li>Assorted track lighting + fixtures</li>
      </div>
    </ul>

    <h2>Loft</h2>

    <h4>Audio</h4>

    <ul>
      <div>
        <li>(1) Funktion-One BR220 Subwoofer</li>
        <li>(2) PK Sound Klarity 8 Fills</li>
      </div>
      <div>
        <li>(2) Funktion-One Resolution 2 Full Range</li>
        <li>All speakers are discreetly processed and amped</li>
      </div>
    </ul>

    <h4>Monitors (shared between both rooms)</h4>

    <ul>
      <div>
        <li>(2) QSC KW112</li>
        <li>(2) QSC KSub (Dual 12" Subwoofer)</li>
      </div>
      <div>
        <li>(4) QSC K12</li>
      </div>
    </ul>

    <h4>Video</h4>

    <ul>
      <div>
        <li>(2) NEC NP-M300XS 3k lumen projectors (1024×768 native resolution, support up to 1080p)</li>
      </div>
      <div>
        <li>(1) HDMI to VGA adapter – Extron 4×4 VGA Matrix</li>
      </div>
    </ul>

    <h4>Outputs</h4>

    <ul>
      <div>
        <li>Side Wall NP-M300XS</li>
      </div>
      <div>
        <li>Rear Wall NP-M300XS</li>
      </div>
    </ul>

    <h4>Inputs</h4>

    <ul>
      <div>
        <li>Main Room Feed</li>
        <li>LG Blu-Ray Player</li>
      </div>
      <div>
        <li>Aux VGA 1</li>
        <li>Aux VGA 2</li>
      </div>
    </ul>

    <p className="download-links">
      Download our &nbsp;
      <DocLink
        text="PW EQUIPMENT AND SPECIFICATIONS DOCUMENT"
        url="https://firebasestorage.googleapis.com/v0/b/publicsf-ef5ca.appspot.com/o/docs%2Fpw_equipment.pdf?alt=media&token=851a0018-dd0c-4079-99fb-f8743f4e737f"
      />
    </p>
  </div>
)

const Specs = () => (
  <div id="specs">
    <SpecsInfo />
    <NewsletterSignUp />
  </div>
)

export default Specs
