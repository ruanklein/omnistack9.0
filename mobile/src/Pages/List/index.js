import React, { useState, useEffect } from 'react';
import { 
    SafeAreaView,
    ScrollView,
    Image,
    AsyncStorage
} from 'react-native';

import SpotList from '../../Components/SpotList';

import logo from '../../Assets/logo.png';

import styles from './styles';

export default () => {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storageTechs => {
            const techsArray = storageTechs.split(',').map(tech => tech.trim());
            setTechs(techsArray);
        })
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />

            <ScrollView>
                {techs.map((tech, idx) => <SpotList key={idx} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    );
};