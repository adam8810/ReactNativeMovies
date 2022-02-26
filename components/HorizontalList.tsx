import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  Pressable
} from "react-native";
import MovieListItem from "./MovieListItem";
import { Text } from "./Themed";

export default function HorizontalListComponent<T>(
  { heading, data, onItemPress, renderItem, itemIdentifier }: {
    heading?: string,
    data: Array<T>,
    onItemPress: (item: T) => void,
    renderItem: ListRenderItem<T>,
    itemIdentifier?: string,
  }
) {

  return (
    <View style={styles.container}>
      {!heading || (<Text style={styles.heading}>{heading}</Text>)}
      <FlatList
        horizontal
        data={data}
        renderItem={(component) => (
          <Pressable onPress={() => onItemPress(component.item)}>
            {renderItem(component)}
          </Pressable>
        )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 25,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 8,
    marginBottom: 5,
  },
});