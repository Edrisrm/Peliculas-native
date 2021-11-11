import React from 'react'
import { FlatList, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Cast } from '../interfaces/credistInterface'
import { MovieFull } from '../interfaces/MovieInterface'
import  currencyFormater from 'currency-formatter';
import { CastItem } from './CastItem';
interface Props {
    movieFull: MovieFull;
    cast: Cast[];
}

export const MovieDetails = ({ movieFull, cast}: Props) => {
    return (
        <>
            {/* detalles */}
            <View style={{marginHorizontal: 20}}>
                <View style={{flexDirection: 'row'}}>
                    <Icon
                        name="star-outline"
                        color="#ffd700"
                        size={20}
                    />
                    <Text>{movieFull.vote_average}</Text>

                    <Text style={{marginLeft: 5}}>
                        {
                            movieFull.genres.map( g => g.name).join(', ')
                        }
                    </Text>
                </View>

                {/* historia */}
                <Text style={{fontSize: 20, marginTop:10, fontWeight: 'bold'}}>
                    Historia
                </Text>
                <Text style={{fontSize: 16}}>
                    {movieFull.overview}
                </Text>

                <Text style={{fontSize: 20, marginTop:10, fontWeight: 'bold'}}>
                    Presupuesto
                </Text>
                <Text style={{fontSize: 18}}>
                   {currencyFormater.format(movieFull.budget, { code: 'USD' })}
                </Text>
            </View>
            {/* casting */}
            <View style={{marginTop: 10, marginBottom: 20}}>
                <Text style={{fontSize: 20, marginTop:10, fontWeight: 'bold', marginHorizontal: 20}}>
                    Actores
                </Text>
                <FlatList
                    data={cast}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <CastItem actor={item}/>}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{marginTop: 10, height: 70}}
                />
            </View>
        </>
    )
}
