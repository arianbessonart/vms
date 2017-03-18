import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  
  .app-bar{
    -moz-transition: left 218ms cubic-bezier(0.4, 0, 0.2, 1);
    -o-transition: left 218ms cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-transition: left 218ms cubic-bezier(0.4, 0, 0.2, 1);
    transition: left 218ms cubic-bezier(0.4, 0, 0.2, 1);
    left: 0;
    width: auto !important;
    right: 0 !important;
    position: fixed !important;
  }
  .app-content{
    -moz-transition: padding-left 218ms cubic-bezier(0.4, 0, 0.2, 1);
    -o-transition: padding-left 218ms cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-transition: padding-left 218ms cubic-bezier(0.4, 0, 0.2, 1);
    transition: padding-left 218ms cubic-bezier(0.4, 0, 0.2, 1);
    padding-right: 20px !important;
    padding-top: 64px !important;
  }
  .app-bar.expanded{
    left: 255px;
  }
  
  .app-content.expanded{
    padding-left: 255px;
  }
`;
