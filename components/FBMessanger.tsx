/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

const Div = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > & { attribution?: string; page_id?: string }
) => <div {...props}>{props.children}</div>;

const FBMessanger: React.FC = () => {
  useEffect(() => {
    (window as any).fbAsyncInit = function () {
      (window as any).FB.init({
        xfbml: true,
        version: 'v10.0',
      });
    };

    (function (d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const js = d.createElement(s) as any;
      js.id = id;
      js.src = 'https://connect.facebook.net/ja_JP/sdk/xfbml.customerchat.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  return (
    <>
      <Div id="fb-root"></Div>
      <Div
        className="fb-customerchat"
        attribution="setup_tool"
        page_id="107975137462152"
      ></Div>
    </>
  );
};

export default FBMessanger;
