import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const ExploreScreen = ({ navigation, route }) => {
    const { userData } = useContext(UserContext);
    const footer = [
        { id: 1, title: 'Overview', icon: require('../assets/icons/overview.png') },
        { id: 2, title: 'Explore', icon: require('../assets/icons/explore_selected.png'), color: '#535CE8' },
        { id: 3, title: 'Sharing', icon: require('../assets/icons/sharing.png') },
    ];
    const blogs = [
        { id: 1, title: 'Nutrition', description: 'More about Apples: Benefits, nutrition, and tips', vote: '78 votes', image: require('../assets/images/blog-01.png') },
        { id: 2, title: 'Lifestyle', description: 'The science of using time to maximize your health', vote: '65 votes', image: require('../assets/images/blog-02.jpg') },
    ];
    const forYouTopic = [
        { id: 1, title: 'Nutrition', image: 'https://i.imgur.com/kEnt2mj.png' },
        { id: 2, title: 'Sports', image: 'https://i.imgur.com/uZp1gda.png' },
        { id: 3, title: 'Running', image: 'https://i.imgur.com/C0lsm8R.png' },
        { id: 4, title: 'Yoga', image: 'https://i.imgur.com/9xxoFxG.png' },
        { id: 5, title: 'Travel', image: 'https://i.imgur.com/rtuuzqv.png' }
    ];

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


    const renderItem = ({ item }) => (
        <TouchableOpacity>
            <View style={styles.itemWrapper}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <Text style={styles.itemTitle}>{item.title}</Text>
            </View>
        </TouchableOpacity>

    );
    const renderBlogItem = ({ item }) => (
        <TouchableOpacity style={styles.blogRow}>
            <View style={styles.blogItem}>
                <Image source={item.image} style={styles.blogImage} resizeMode="cover" />
                <Text style={styles.blogTitle}>{item.title}</Text>
                <Text style={styles.blogDescription}>{item.description}</Text>
                <View style={styles.blogVotesContainer}>
                    <Image source={require('../assets/icons/like.png')} style={styles.blogVotesIcon} resizeMode='contain' />
                    <Text style={styles.blogVotes}>{item.vote}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
    const [showAllBlogs, setShowAllBlogs] = useState(false);
    const blogsToShow = showAllBlogs ? blogs : blogs.slice(0, 4);
    const handleViewMoreLessBlogs = () => {
        setShowAllBlogs(prev => !prev);
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.headerContainer}>
                    <View style={styles.searchContainer}>
                        <Image source={require('../assets/icons/search.png')} style={styles.searchIcon} />
                        <TextInput placeholder='Search topic' style={{
                            flex: 1,
                            height: 40,
                            marginLeft: 10,
                            fontSize: 16,
                            outline: 'none',
                        }} placeholderTextColor={'#BCC1CA'} />
                    </View>
                    <View style={styles.profileContainer}>
                        <Image source={{ uri: userData?.avatar }} style={styles.profileImage} />
                    </View>
                </View>
                <View style={styles.bodyContainer}>
                    <View style={styles.sectionForYou}>
                        <View style={styles.categoryTitle}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#171A1F', }}>For You</Text>
                            <TouchableOpacity>
                                <Image source={require('../assets/icons/dots.png')} style={{ width: 24, height: 24 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <FlatList
                        data={forYouTopic}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={true}
                        contentContainerStyle={styles.flatListContainer}
                    />
                    <View style={styles.blogSection}>
                        <View style={styles.categoryTitle}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#171A1F', }}>Newest blogs</Text>
                            <View style={styles.categoryTitleMore}>
                                <TouchableOpacity onPress={handleViewMoreLessBlogs}>
                                    <Text style={styles.categoryTitleMoreText}>{showAllBlogs ? 'View Less' : 'View More'}</Text>
                                </TouchableOpacity>
                                <Image source={require('../assets/icons/more.png')} style={styles.categoryTitleMoreIcon} resizeMode='contain' />
                            </View>
                        </View>
                        <View style={styles.blogContent}>
                            <FlatList
                                data={blogsToShow}
                                renderItem={renderBlogItem}
                                keyExtractor={(item) => item.id.toString()}
                                horizontal={true}
                                showsHorizontalScrollIndicator={true}
                                contentContainerStyle={styles.blogListContainer}
                            />
                        </View>
                    </View>
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
}

export default ExploreScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginRight: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 1,
    },
    searchIcon: {
        width: 20,
        height: 20,
    },

    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
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
    },
    footerIcon: {
        width: 24,
        height: 24,
    },
    footerTitle: {
        marginTop: 5,
        fontSize: 12,
    },
    bodyContainer: {
        padding: 16,
    },
    sectionForYou: {
        marginBottom: 20,
    },
    categoryTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flatListContainer: {
        paddingVertical: 10,
    },
    itemWrapper: {
        height: 120,
        width: 120,
        backgroundColor: '#F1F2FD',
        borderColor: '#BCC1CA',
        borderWidth: 1,
        borderRadius: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    itemTitle: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#171A1F',
    },
    blogSection: {
        marginBottom: 20,
        paddingVertical: 10,
    },
    blogContent: {
        flexDirection: 'row',
        marginTop: 15
    },
    blogListContainer: {
        paddingVertical: 10,
    },
    blogRow: {
        marginHorizontal: 10, // Thay đổi margin nếu cần
        width: 272,
        height: 340,
    },
    blogItem: {
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: 'flex-start', // Đặt justifyContent để căn giữa
    },
    blogImage: {
        width: 230,
        height: 162,
        borderRadius: 16,
        alignSelf: 'center',
        marginTop: 15
    },
    blogTitle: {
        fontSize: 14,
        margin: 8,
    },
    blogDescription: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 8,
    },
    blogVotes: {
        fontSize: 12,
        color: '#535CE8',
        margin: 8,
        lineHeight: 22,
    },
    blogVotesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f4f4fc',
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 1,
        gap: 4,
        display: 'flex',
        overflow: 'hidden',
        width: 100,
        marginLeft: 8,
        marginBottom: 10,
        marginTop: 10
    },
    blogVotesIcon: {
        width: 15,
        height: 15,
        aspectRatio: 1,
    },
    categoryTitleMore: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    categoryTitleMoreText: {
        fontSize: 14,
        color: '#686fea',
        marginRight: 10,
    },
    categoryTitleMoreIcon: {
        width: 15,
        height: 15,
    },

});
