import React, { useState, useEffect } from 'react';
import { 
    SafeAreaView,
    ScrollView,
    Image,
    AsyncStorage,
    TouchableOpacity,
    Alert
} from 'react-native';

import { withNavigation } from 'react-navigation';

import socketio from 'socket.io-client';

import env from '../../../env.json';

import SpotList from '../../Components/SpotList';

import logo from '../../Assets/logo.png';

import styles from './styles';

export default withNavigation(({ navigation }) => {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio(`${env.host}:${env.port}`, {
                query: { user_id }
            });

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
            });
        });
    });

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storageTechs => {
            const techsArray = storageTechs.split(',').map(tech => tech.trim());
            setTechs(techsArray);
        })
    }, []);

    async function logout() {
        await AsyncStorage.clear();
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={logout}>    
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>

            <ScrollView>
                {techs.map((tech, idx) => <SpotList key={idx} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    );
});