import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { View, Text } from './Themed';

export interface PropTypes {
  title: string,
  posterPath: string,
  size: string,
  style?: any,
}

export default function MoviePosterComponent(
  { title, posterPath, size, style }: PropTypes
) {
  return (
    <View>
      {!posterPath ? (
        <View
          style={[styles.movie_poster, styles.noImage, style]}>
          <Text style={{ alignSelf: 'center', fontSize: 20, color: '#FFFFFF' }}>{title}</Text>
        </View>

      ) : (
        <Image
          style={[styles.movie_poster, style]}
          source={{
            uri: `https://image.tmdb.org/t/p/${size}${posterPath}`
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  movie_poster: {
    height: 165,
    borderRadius: 10,
    width: 108,
  },
  noImage: {
    backgroundColor: '#EEEEEE',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    paddingTop: 2,
    paddingLeft: 2,
  }
});