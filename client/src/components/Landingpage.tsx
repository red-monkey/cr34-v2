import logo from "../images/logo.png";
import creaCubedLogo from "../images/creacubedlogo.png";
import img from "../images/3d-gift-box-scene-with-clouds 1.png";
import img2 from "../images/image1.png";
import img3 from "../images/kickstarterimg.png";
import prize from "../images/prize.png";
import trophy from "../images/emojione_trophy.png";
import gift from "../images/noto_wrapped-gift.png";
import copy from "../images/copy.png";
import submitPredictionimg from "../images/submitprediction.png";
import submitAdvocateimg from "../images/submitadvocate.png";
import twitterLogo from "../images/twitter.png";
import linkedinLogo from "../images/linkedin.png";
import facebookLogo from "../images/facebook.png";
import device from "../images/device.png";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import GradientSVG from "./gradientSVG";

type Props = {};

type id = {
  id: string;
};

type advocator = {
  _id: string;
  fullName: string;
  email: string;
  referralNumber: number;
};

function Landingpage({}: Props) {
  const [predictorFullName, setPredictorFullName] = useState("");
  const [predictorEmail, setPredictorEmail] = useState("");
  const [predictorPrediction, setPredictorPrediction] = useState("");
  const [advocatorFullName, setAdvocatorFullName] = useState("");
  const [advocatorEmail, setAdvocatorEmail] = useState("");
  const [predictionModalIsOpen, setPredictionModalIsOpen] =
    React.useState(false);
  const [advocateModalIsOpen, setAdvocateModalIsOpen] = React.useState(false);
  const [predictionSubmitted, setPredictionSubmitted] = React.useState(false);
  const [advocateSubmitted, setadvocateSubmitted] = React.useState(false);

  const [data, setData] = useState([{}]);
  const [advocatorData, setAdvocatorData] = useState<advocator>();
  const [advocatorsData, setAdvocatorsData] = useState<advocator>({
    _id: "",
    fullName: "",
    email: "",
    referralNumber: 0,
  });

  const baseURL = "http://localhost:8000/";

  const { id } = useParams<id>();

  const referralCode = localStorage.getItem("REFERRAL_CODE");

  const getAdvocator = (id: any) => {
    if (id) {
      axios.get(baseURL + "advocators/" + id).then((response) => {
        setAdvocatorsData(response.data);
      });
    }
  };

  const increaseReferralNumber = (advocator: advocator) => {
    if (advocator._id && !referralCode) {
      let newReferralNumber;
      newReferralNumber = advocator.referralNumber + 1;
      console.log(newReferralNumber);
      axios
        .patch(baseURL + "advocators/" + advocator._id, {
          referralNumber: newReferralNumber,
        })
        .then((response) => {
          console.log(response.data);
        });

      localStorage.setItem("REFERRAL_CODE", advocator._id);
    }
  };

  React.useEffect(() => {
    getAdvocator(id);
  }, []);

  React.useEffect(() => {
    increaseReferralNumber(advocatorsData);
  }, [advocatorsData]);

  function createPostforPredictions() {
    axios
      .post(baseURL + "predictions", {
        fullName: predictorFullName,
        email: predictorEmail,
        prediction: predictorPrediction,
      })
      .then((response) => {
        setData(response.data);
      });
  }
  function createPostforAdvocaters() {
    axios
      .post(baseURL + "advocators", {
        fullName: advocatorFullName,
        email: advocatorEmail,
      })
      .then((response) => {
        setAdvocatorData(response.data);
      });
  }
  const handlePredictionClose = () => {
    setPredictionModalIsOpen(false);
    setPredictionSubmitted(false);
  };
  const handlePredictionOpen = () => {
    setPredictionModalIsOpen(true);
  };
  const handleAdvocateClose = () => {
    setAdvocateModalIsOpen(false);
    setadvocateSubmitted(false);
  };
  const handleAdvocateonOpen = () => {
    setAdvocateModalIsOpen(true);
  };
  const submitPrediction = (event: any) => {
    setPredictionSubmitted(true);
    event.preventDefault();
    createPostforPredictions();
  };
  const submitAdvocate = (event: any) => {
    setadvocateSubmitted(true);
    event.preventDefault();
    createPostforAdvocaters();
  };

  const link = "https://www.cr34.com/" + advocatorData?._id;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(link);
  };
  const idCSS = "gradient";

  const [circularValue, setCircularValue] = useState(0);
  const [imageBlur, setImageBlur] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setCircularValue(circularValue + 3.333333333);
      setImageBlur(imageBlur - 1);
    }, 86400000);

    return () => {
      clearInterval(interval);
    };
  });
  return (
    <div className="container">
      <div className="headerContainer">
        <div className="headerTop">
          <div className="logoContainer">
            <img src={creaCubedLogo} className="logoimg" />
          </div>

          <button className="joinButton" onClick={handleAdvocateonOpen}>
            <p>Join</p>
          </button>
        </div>
        <div className="headerBottom">
          <h1>
            Predict the Gadget that will save WagaWaga and stand a chance to win
            a reward
          </h1>
          <h2>
            How much do you know about this gadget? Click on the button to
            participate the challenge
          </h2>
          <button onClick={handlePredictionOpen}>
            <p>Predict the Gadget</p>
          </button>
        </div>
        <div className="leftimage">
          <img src={img2} />
          <p>The Commuter</p>
        </div>
        <img src={img} className="rightimage" />
      </div>

      <img src={img3} className="kickstarterimg" />

      <div className="aboutTheChallengeContainer">
        <div className="leftContainer">
          <h1>About the Challenge</h1>
          <p>
            This is a challenge by the crea Technology in predicting our new
            innovative Gadget. This creation of ours enables busy minds to get
            work done while on the move; anywhere, anytime
          </p>
        </div>
        <div className="rightContainer">
          <div className="progressBar">
            <GradientSVG />
            <CircularProgressbarWithChildren
              strokeWidth={8}
              value={circularValue}
              styles={{
                path: { stroke: `url(#${idCSS})`, height: "100%" },
                trail: {
                  stroke: "#D9D9D9",
                },
              }}
            >
              <img
                style={{ filter: `blur(${imageBlur}px)` }}
                className="device"
                src={device}
              />
            </CircularProgressbarWithChildren>
          </div>
        </div>
      </div>

      <div className="gadgetSpecificationsContainer">
        <h1>This Gadget is like a Throne which you can:</h1>
        <div className="gadgetSpecificationsInner">
          <div className="gadgetspecification">
            <div className="specification blue">
              <p>1</p>
            </div>
            <p>Sit on</p>
          </div>
          <div className="gadgetspecification">
            <div className="specification yellow">
              <p>2</p>
            </div>
            <p>Travel by</p>
          </div>
        </div>
        <div className="gadgetSpecificationsInner">
          <div className="gadgetspecification">
            <div className="specification green">
              <p>3</p>
            </div>
            <p>Carry It</p>
          </div>
          <div className="gadgetspecification">
            <div className="specification red">
              <p>4</p>
            </div>
            <p>Work on it</p>
          </div>
        </div>
        <button onClick={handlePredictionOpen}>Predict the Gadget</button>
      </div>

      <div className="informationsContainer">
        <h2>How to partcipate</h2>
        <div className="informationsInner">
          <div className="information">
            <div className="blue">1</div>
            <p>Click on the “Predict the Gadget” Button</p>
          </div>
          <div className="information">
            <div className="yellow">2</div>
            <p>
              Enter your email address and your prediction to the input box and
              submit
            </p>
          </div>
        </div>
        <div className="informationsInner">
          <div className="information">
            <div className="green">3</div>
            <p>Wait for the campaign date</p>
          </div>
          <div className="information">
            <div className="red">4</div>
            <p>
              An email will be sent to successful winners to claim their gifts
            </p>
          </div>
        </div>
      </div>

      <div className="prizeContainer">
        <div className="prizeLeftContainer">
          <h2>Prize</h2>
          <p>
            The first 1000 best predictions willl be sent an email where their
            address will be asked to send them their free gifts{" "}
          </p>
          <button onClick={handlePredictionOpen}>Predict the Gadget</button>
        </div>
        <div className="prizeRightContainer">
          <img src={prize} />
        </div>
      </div>

      <div className="advocatorsContainer">
        <h2>Be Our Advocators</h2>
        <p>
          Get rewarded by being one of our Advocators for the challenge and
          stand a chance to win the followings{" "}
        </p>
        <div className="advocatorInner">
          <div className="adcocatorinfo">
            <img src={trophy} />
            <h5>
              3 Gadgets will be given free to the top 3 Advocators that have the
              most hits with their links.
            </h5>
          </div>
          <div className="adcocatorinfo">
            <img src={gift} />
            <h5>
              A free e-Shirts will be given to any Advocator that brought more
              than 100 hits.
            </h5>
          </div>
        </div>
        <button onClick={handleAdvocateonOpen}>Join the Advocators</button>
      </div>

      <div className="informationsContainer">
        <h2>How It Works</h2>
        <div className="informationsInner">
          <div className="information">
            <div className="blue">1</div>
            <p>
              Click on the “join the Advocators” button and enter your details
            </p>
          </div>
          <div className="information">
            <div className="yellow">2</div>
            <p>
              A unique link will be generated for you after successful
              submission
            </p>
          </div>
        </div>
        <div className="informationsInner">
          <div className="information">
            <div className="green">3</div>
            <p>Share the link generated to friends and families </p>
          </div>
          <div className="information">
            <div className="red">4</div>
            <p>Wait for an email if you are among the winners</p>
          </div>
        </div>
        <button onClick={handleAdvocateonOpen}>Join the Advocators</button>
      </div>

      <div className="footer">
        <p>Copyright © Createch 2022</p>
        <p>Alienish ONGO</p>
      </div>

      <Modal
        isOpen={predictionModalIsOpen}
        onRequestClose={handlePredictionClose}
        className="modal"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "rgb(26 26 26 / 75%)",
          },
        }}
      >
        {predictionSubmitted ? (
          <div className="modalContainer">
            <img src={logo} className="logo" />
            <div className="predictionSubmit">
              <img src={submitPredictionimg} className="succesfullsubmitimg" />
              <h2>Thank You!</h2>
              <p>
                Your prediction has been succesfully recorded. we will
                communicate to you if you are among the winners
              </p>
            </div>
          </div>
        ) : (
          <div className="modalContainer">
            <img src={logo} className="logo" />
            <h1>Enter your details</h1>
            <form onSubmit={submitPrediction}>
              <label>
                Full name
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={predictorFullName}
                  onChange={(e) => setPredictorFullName(e.target.value)}
                  placeholder="Input your name"
                />
              </label>
              <label>
                Email Address
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={predictorEmail}
                  onChange={(e) => setPredictorEmail(e.target.value)}
                  placeholder="Input your email address"
                />
              </label>
              <label>
                Your prediction ( Max 300 words )
                <input
                  type="text"
                  id="prediction"
                  name="prediction"
                  value={predictorPrediction}
                  onChange={(e) => setPredictorPrediction(e.target.value)}
                  maxLength={300}
                  placeholder="Write your prediction"
                />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </Modal>
      <Modal
        isOpen={advocateModalIsOpen}
        onRequestClose={handleAdvocateClose}
        className="modal"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "rgb(26 26 26 / 75%)",
          },
        }}
      >
        {advocateSubmitted ? (
          <div className="modalContainer">
            <img src={logo} className="logo" />
            <div className="predictionSubmit">
              <img src={submitAdvocateimg} className="submitAdvocateimg" />
              <h2>Congratulations you are In!</h2>
              <p>
                Share the link below to friends and family to stand a chance to
                win gifts from us
              </p>
              <div className="link">
                <p>https://www.cr34.com/{advocatorData?._id}</p>
                <button
                  onClick={() => {
                    copyToClipboard();
                  }}
                >
                  <img src={copy} />
                  Copy
                </button>
              </div>
              <div className="socialMedia">
                <button>
                  <img src={facebookLogo} />
                </button>
                <button>
                  <img src={linkedinLogo} />
                </button>
                <button>
                  <img src={twitterLogo} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="modalContainer">
            <img src={logo} className="logo" />
            <h1>Enter your details</h1>
            <form onSubmit={submitAdvocate}>
              <label>
                Full name
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={advocatorFullName}
                  onChange={(e) => setAdvocatorFullName(e.target.value)}
                  placeholder="Input your name"
                />
              </label>
              <label>
                Email Address
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={advocatorEmail}
                  onChange={(e) => setAdvocatorEmail(e.target.value)}
                  placeholder="Input your email address"
                />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Landingpage;
