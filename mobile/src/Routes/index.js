import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from '../Pages/Login';
import List from '../Pages/List';
import Book from '../Pages/Book';

export default createAppContainer(
    createSwitchNavigator({
        Login,
        List,
        Book
    })
);