import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StarRating = ({ rating }) => {
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Ionicons
                    key={i}
                    name={i <= rating ? 'star-sharp' : 'star-sharp'}
                    size={16}
                    color={i <= rating ? '#FFC090' : '#D9D9D9'}
                />
            );
        }
        return stars;
    };

    return (
        <View style={styles.starView}>
            {renderStars(rating)}
        </View>
    );
};

const styles = StyleSheet.create({
    starView: {
        flexDirection: 'row'
    }
});

export default StarRating;
