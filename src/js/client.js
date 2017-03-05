import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Todos from "./pages/Todos";

const app = document.getElementById('app');

ReactDOM.render(<Todos />, app);