import React from "react";
import SocialLogin from "react-social-login";

function SocialBtn(props: any) {
  //   const { children, triggerLogin } = props;

  return (
    <div>
      <button onClick={props?.triggerLogin} {...props}>
        {props?.children}
      </button>
    </div>
  );
}

export default SocialLogin(SocialBtn);
