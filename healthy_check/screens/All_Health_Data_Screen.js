import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const AllHealthDataScreen = ({ navigation }) => {
    const { userData } = useContext(UserContext);
    const footer = [
        { id: 1, title: 'Overview', icon: require('../assets/icons/overview_selected.png'), color: '#535CE8' },
        { id: 2, title: 'Explore', icon: require('../assets/icons/explore.png') },
        { id: 3, title: 'Sharing', icon: require('../assets/icons/sharing.png') },
    ];

    const [healthData, setHealthData] = useState([]);

    useEffect(() => {
        fetch('https://67287ec0270bd0b97555b8be.mockapi.io/api/v1/health_data')
            .then(response => response.json())
            .then(data => setHealthData(data))
            .catch(error => console.error('Error fetching health data:', error));
    }, []);

    const renderHealthItem = ({ item }) => {
        const handlePress = () => {
            switch (item.title) {
                case 'Steps':
                    navigation.navigate('StepTrackerScreen');
                    break;
                case 'Sleep':
                    navigation.navigate('SleepTracker');
                    break;
                case 'Cycle Tracking':
                    navigation.navigate('CycleTracker');
                    break;
                case 'Nutrition':
                    navigation.navigate('NutritionTracker');
                    break;
                default:
                    console.log(`${item.title} pressed`);
                    break;
            }
        };

        return (
            <TouchableOpacity style={styles.healthItem} onPress={handlePress}>
                <View style={[styles.imageContainer, { backgroundColor: item.backgroundColor || '#e0e0e0' }]}>
                    <Image source={{ uri: item.image }} style={styles.healthImage} resizeMode='cover' />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemData}>{item.data}</Text>
                </View>
                <Image source={require('../assets/icons/more.png')} style={styles.moreIcon} resizeMode='contain' />
            </TouchableOpacity>
        );
    };

    const handleBackPress = () => {
        navigation.navigate('HomeDashboard');
    };

    const handleFooterPress = (title) => {
        switch (title) {
            case 'Overview':
                navigation.navigate('HomeDashboard');
                break;
            case 'Explore':
                navigation.navigate('ExploreScreen');
                break;
            case 'Sharing':
                navigation.navigate('SharingScreen');
                break;
            default:
                console.log(`${title} pressed`);
                break;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                        <Image source={require('../assets/icons/back.png')} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>All Health Data</Text>
                </View>
                <View style={styles.itemContainer}>
                    <FlatList
                        data={healthData}
                        renderItem={renderHealthItem}
                        keyExtractor={(item) => item.id.toString()} // Đảm bảo id là chuỗi
                        numColumns={1} // Hiển thị 1 cột
                    />
                </View>
            </ScrollView>
            <View style={styles.footer}>
                {footer.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.footerItem}
                        onPress={() => handleFooterPress(item.title)}
                    >
                        <Image source={item.icon} style={styles.footerIcon} resizeMode='contain' />
                        <Text style={[styles.footerTitle, { color: item.color || '#000' }]}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
};

export default AllHealthDataScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderTopWidth: 1,
    },
    footerItem: {
        alignItems: 'center',
        padding: 10,
        flex: 1,
    },
    footerIcon: {
        width: 24,
        height: 24,
    },
    footerTitle: {
        marginTop: 5,
        fontSize: 12,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderColor: '#ccc',
        justifyContent: 'center',
        position: 'relative',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    backButton: {
        position: 'absolute',
        left: 10,
        padding: 10,
    },
    itemContainer: {
        padding: 10,
    },
    healthItem: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#F1F2FD',
        padding: 10,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    itemTitle: {
        fontSize: 14,
        marginBottom: 10,
    },
    itemData: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    moreIcon: {
        width: 24,
        height: 24,
    },
    imageContainer: {
        width: 58,
        height: 58,
        borderRadius: 5,
        overflow: 'hidden',
    },
    healthImage: {
        width: 28,
        height: 28,
        alignSelf: 'center',
        marginTop: 15,
        justifyContent: 'center',
    }
});
