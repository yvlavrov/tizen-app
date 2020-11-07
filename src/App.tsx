import React from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { ComplexTrain } from './pages/ComplexTrain';
import { SimpleTrain } from './pages/SimpleTrain';
import { TrainScreen } from './pages/TrainScreen';
import { Settings } from './pages/Settings';

export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/simple">
                        <SimpleTrain />
                    </Route>
                    <Route path="/complex">
                        <ComplexTrain />
                    </Route>
                    <Route exact path="/train/:zone">
                        <TrainScreen />
                    </Route>
                    <Route path="/settings">
                        <Settings />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
