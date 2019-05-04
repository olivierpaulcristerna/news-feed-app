import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, ScrollView } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

export default class Posts extends React.Component {
    
    render() {
        const { navigation } = this.props;
        const image = navigation.getParam('image', 'NO-IMAGE');
        const title = navigation.getParam('title', 'NO-TITLE');
        const description = navigation.getParam('description', 'NO-DESCRIPTION');

        return (
            <ScrollView>
                <View style={styles.postContainer}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.titlePost}>{entities.decode(title)}</Text>
                        <Image source={{uri: image}} style={styles.imagePost} />
                        <Text style={styles.descPost}>{entities.decode(description)}</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    postContainer: {
      flex: 1, 
      flexDirection:'column'
    },
    infoContainer: {
        width: '100%', 
        padding: 15,
        height: '100%',
    },
    titlePost: {
        fontSize: 25,
        paddingTop: 10,
        paddingBottom: 10,
    },
    descPost: {
        fontSize: 18,
        paddingTop: 10,
        paddingBottom: 10,
    },
    imagePost: {
        height: 300,
        width: '100%',
    }
});