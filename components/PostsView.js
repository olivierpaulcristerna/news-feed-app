import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Navigator, TouchableOpacity } from 'react-native';

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

export default class PostsAgropecuaria extends React.Component {
    constructor(props){
        super(props);
        const { navigation } = this.props;
        const cat_id = navigation.getParam('cat_id', null);
        var url = 'http://engrane-server.net/x/wp-json/wp/v2/posts/?orderBy=date&order=desc&page=1&per_page=10';
        
        if(cat_id) {
            url = url+'&categories='+cat_id;
        } 

        this.state ={ 
            posts: [], 
            page: 1, 
            isLoading: true, 
            cat_id: cat_id,
            wpurl: url
        }
    }

    componentDidMount() {
        this.getPosts();
    }
    
    getPosts() {
        return fetch(
            this.state.wpurl
        )
        .then(response => response.json())
        .then(responseJson => {
            this.setState(prevState => ({
                posts: [...prevState.posts, ...responseJson],
                isLoading: false
            }));
        })
        .catch(error => {
            console.error(error);
        });
    }

    render() {
        if(this.state.isLoading) {
            return (
                <View style={styles.loadingContent}>
                    <Text>Cargando...</Text>
                </View>
            );
        }

        return (
            <FlatList
            data={this.state.posts}
            renderItem={({item}) => 
                <TouchableOpacity onPress={() => this.props.navigation.push('Details',{ image: item.better_featured_image.source_url, title: entities.decode(item.title.rendered), description: entities.decode(item.content.rendered.replace(/<\/?[^>]+(>|$)/g, "")) })}>
                    <View style={styles.postContainer}>
                        <View style={styles.infoContainer}>
                            <Text style={{fontSize:20, color:'indigo'}}>{entities.decode(item.title.rendered)}</Text>
                        </View>
                        <View style={styles.imageContainer}>
                            <Image source={{uri: item.better_featured_image.source_url}} style={styles.imagePost}/>
                        </View>
                    </View>
                </TouchableOpacity>
            }
            keyExtractor={({id}, index) => id.toString()}
            />
        )
    }

}

const styles = StyleSheet.create({
    loadingContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    postContainer: {
      flex: 1, 
      flexDirection:'row'
    },
    infoContainer: {
        width: '70%', 
        padding: 15,
        height: 115,
    },
    imageContainer: {
        width: '30%', 
        height: 115,
    },
    imagePost: {
        height: '100%',
        width: '100%',
    },
});