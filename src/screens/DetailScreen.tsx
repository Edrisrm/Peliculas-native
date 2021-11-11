import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Movie } from '../interfaces/MovieInterface';
import { Navigation, RootStackParams } from '../navigation/Navigation';

import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';
import Icon  from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
const screenHight = Dimensions.get('window').height;

interface Props extends StackScreenProps<RootStackParams,'DetailScreen'> {}
export const DetailScreen = ({route, navigation}: Props) => {

    const movie = route.params;
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const {isLoading, cast, movieFull} = useMovieDetails(movie.id);


    return (
        <ScrollView>
            <View style={styles.imageContainer}>
                <View style={styles.imageBorder} >
                    <Image
                        source={{ uri }}
                        style={ styles.posterImage }
                    />
                </View>
            </View>
            <View style={styles.marginContainer}>
                <Text style={styles.subTitle}>{movie.original_title}</Text>
                <Text style={styles.title}>{movie.title}</Text>
            </View>
           
                {
                    isLoading ?
                    <ActivityIndicator
                    style={{marginTop: 20}} 
                    size={35} 
                    color="grey" 
                    animating={isLoading} 
                    /> : <MovieDetails  movieFull={movieFull!} cast={cast}/>
                }
               <View
                style={styles.backButton}
               >
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                    >
                        <Icon
                            color="#fff"
                            name="arrow-back-outline"
                            size={60}
                        />
                    </TouchableOpacity>
                
               </View>
           

        </ScrollView>
        
        
    )
}

const styles = StyleSheet.create({
    posterImage: {
        flex: 1,
        
    },
    imageContainer: {
        width: '100%',
        height: screenHight * 0.7,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,
        elevation: 9,
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25,
    },
    imageBorder: {
        flex: 1,
        overflow: 'hidden',
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25,
    },
    marginContainer:{
        marginHorizonal: 20,
        marginTop: 20,

    },
    subTitle: {
        fontSize: 16,
        opacity: 0.8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    backButton: {
        position: 'absolute',
        zIndex: 999,
        elevation: 9,
        top: 20,
        left: 5,
    }
});
