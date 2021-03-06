import React, {useContext} from 'react';
import {StyleSheet, Text, FlatList, TouchableOpacity} from "react-native";
import {NavigationEvents} from 'react-navigation';
import {ListItem} from "react-native-elements";
import {Context as TrackContext} from '../context/TrackContext';

const TrackListScreen = ({navigation}) => {

    const {state, fetchTracks} = useContext(TrackContext)

    return (
        <>
            <NavigationEvents onWillFocus={fetchTracks}/>
            {/*<Text style={{fontSize: 48}}>TrackListScreen Screen</Text>*/}
            <FlatList data={state} keyExtractor={item => item._id} renderItem={({item}) => {
                return <TouchableOpacity onPress={() => navigation.navigate('TrackDetail', { _id: item._id})}>
                    <ListItem chevron title={item.name} />
                </TouchableOpacity>
            }
            }/>
        </>
    );
};

TrackListScreen.navigationsOptions = () => {
    title: 'Tracks'
};

const styles = StyleSheet.create({});

export default TrackListScreen;