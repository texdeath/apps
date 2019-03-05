import * as React from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';

import Portal from './views/Portal';
import Charts from './views/Charts';

const component:React.SFC = () => {
    return (
        <div>
            <Switch>
                <Route exact path={'/'} component={Portal} />
                <Route exact path={'/charts'} component={Charts} />
            </Switch>
        </div>
    );
};

export default component;