import React, { useEffect } from "react";
import { Redirect } from 'react-router-dom';

const Facebook = (props) => {
  useEffect(() => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: "212497526628049",
        cookie: true,
        xfbml: true,
        version: "v6.0"
      });

      window.FB.AppEvents.logPageView();
    };

    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const facebookLogin = () => {
    window.FB.login(
      function(resp) {
        statusChangeCallback(resp);
      },
      {
        scope: "email,public_profile"
      }
    );
  };

  const statusChangeCallback = response => {
    if (response.status === "connected") {
      alert("Connected to facebook. Retriving user from fb");
      // Logged into your app and Facebook.
      fetchDataFacebook();
    } else if (response.status === "not_authorized") {
    } else {
      console.log(
       "User cancelled"
      );
    }
  };

  const fetchDataFacebook = () => {
    window.FB.api("/me", function(user) {
      alert("Successful login for: " + user.name);
    });
  };
  return (
    <div className='facebook'>
      <button 
        onClick={facebookLogin}
        className='btn'
        >
          Continue with Facebook
      </button>
    </div>
  );
};

export default Facebook;
