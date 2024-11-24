import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image, FlatList } from 'react-native';
import { UserContext } from '../context/UserContext';

const HomeDashboard = ({ navigation, route }) => {
  const { userData } = useContext(UserContext);
  const healthData = [
    { id: 1, title: 'Steps', data: '10,000', image: require('../assets/icons/run.png'), backgroundColor: '#7C83ED' },
    { id: 2, title: 'Cycle Tracking', data: '12 days before period', image: require('../assets/icons/cycle.png'), backgroundColor: '#9973D7' },
    { id: 3, title: 'Sleep', data: '7 h 31 mins', image: require('../assets/icons/sleep.png'), backgroundColor: '#125D95' },
    { id: 4, title: 'Nutrition', data: '960 kcal', image: require('../assets/icons/nutrition.png'), backgroundColor: '#21A1A3' },
    { id: 5, title: 'Heart', data: '75 bpm', image: require('../assets/icons/heart.png'), backgroundColor: '#DE3B40' },
    { id: 6, title: 'Burned Calories', data: '500 kcal', image: require('../assets/icons/burne.png'), backgroundColor: '#F1C932' },
    { id: 7, title: 'BMI', data: '22.5 BMI', image: require('../assets/icons/body.png'), backgroundColor: '#535CE8' },
    { id: 8, title: 'Double Support Time', data: '29.7 %', image: require('../assets/icons/target.png'), backgroundColor: '#535CE8' },
  ];
  const weekReport = [
    { id: 1, title: '👣 Steps', data: '697,978' },
    { id: 2, title: '💪 Workout', data: '6h 45min' },
    { id: 3, title: '💧 Water', data: '10,659 ml' },
    { id: 4, title: '😴 Sleep', data: '29h 17min' },
    { id: 5, title: '📊 BMI', data: '22.5 BMI' },
    { id: 6, title: '💓 Heart', data: '68 BPM' },
  ];
  const blogs = [
    { id: 1, title: 'Nutrition', description: 'More about Apples: Benefits, nutrition, and tips', vote: '78 votes', image: require('../assets/images/blog-01.png') },
    { id: 2, title: 'Lifestyle', description: 'The science of using time to maximize your health', vote: '65 votes', image: require('../assets/images/blog-02.jpg') },
  ];
  const footer = [
    { id: 1, title: 'Overview', icon: require('../assets/icons/overview_selected.png'), color: '#535CE8' },
    { id: 2, title: 'Explore', icon: require('../assets/icons/explore.png') },
    { id: 3, title: 'Sharing', icon: require('../assets/icons/sharing.png') },
  ];


  // State to manage the number of items to display
  const renderItem = ({ item }) => (
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
  const [showAllReport, setShowAllReport] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showAllBlogs, setShowAllBlogs] = useState(false);
  const itemsToShow = showAll ? healthData : healthData.slice(0, 4);
  const weekReportToShow = showAllReport ? weekReport : weekReport.slice(0, 4);
  const blogsToShow = showAllBlogs ? blogs : blogs.slice(0, 4);

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
  const handlePress = () => {
    navigation.navigate('AllHealthDataScreen'); // Chuyển hướng đến trang AllHealthDataScreen
  };
  const handleViewMoreLess = () => {
    setShowAll(prev => !prev);
  };
  const handleViewMoreLessReport = () => {
    setShowAllReport(prev => !prev);
  };
  const handleViewMoreLessBlogs = () => {
    setShowAllBlogs(prev => !prev);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Image source={require('../assets/icons/logo.png')} style={styles.logoImage} resizeMode='contain' />
          <Image source={{ uri: userData?.avatar }} style={styles.avatarImage} resizeMode='contain' />
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.sectionCalendar}>
            <Image source={require('../assets/icons/sun.png')} style={styles.sectionCalendarIcon} resizeMode='contain' />
            <Text style={styles.sectionCalendarTitle}>TUES 11 JUL</Text>
          </View>
          <View style={styles.overviewSection}>
            <View style={styles.overviewTitle}>
              <Text style={styles.overviewTitleText}>Overview</Text>
              <TouchableOpacity style={styles.overviewTitleAllData} onPress={handlePress}>
                <Image
                  source={require('../assets/icons/rocket.png')}
                  style={styles.overviewTitleAllDataIcon}
                  resizeMode='contain'
                />
                <Text style={styles.overviewTitleAllDataText}>All Data</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.overviewContent}>
              <View style={styles.contentWrapper}>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>Health Score</Text>
                  <Text style={styles.description}>
                    Based on your overview health tracking, your score is 78 and considered good.
                  </Text>
                </View>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Tell me more</Text>
                  <Image
                    source={require('../assets/icons/more.png')}
                    style={styles.buttonIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.scoreContainer}>
                <Image source={require('../assets/icons/score.png')} style={styles.scoreIcon} resizeMode='contain' />
                <Text style={styles.scoreText}>78</Text>
              </View>
            </View>
          </View>
          <View style={styles.highlightSection}>
            <View style={styles.highlightTitle}>
              <Text style={styles.highlightTitleText}>Highlights</Text>
              <View style={styles.highlightTitleMore}>
                <TouchableOpacity onPress={handleViewMoreLess}>
                  <Text style={styles.highlightTitleMoreText}>{showAll ? 'View Less' : 'View More'}</Text>
                </TouchableOpacity>
                <Image source={require('../assets/icons/more.png')} style={styles.highlightTitleMoreIcon} resizeMode='contain' />
              </View>
            </View>

            <View style={styles.highlightContent}>
              <View style={styles.highlightRow}>
                {itemsToShow.map(item => (
                  <View key={item.id} style={[styles.highlightItem, { backgroundColor: item.backgroundColor }]}>
                    <Image source={item.image} style={styles.highlightItemIcon} resizeMode='contain' />
                    <Text style={styles.highlightItemTitle}>{item.title}</Text>
                    <Text style={styles.highlightItemData}>{item.data}</Text>
                    <Text style={styles.highlightItemUpdated}>Updated 15 min ago</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <View style={styles.reportSection}>
            <View style={styles.highlightTitle}>
              <Text style={styles.highlightTitleText}>This week report</Text>
              <View style={styles.highlightTitleMore}>
                <TouchableOpacity onPress={handleViewMoreLessReport}>
                  <Text style={styles.highlightTitleMoreText}>{showAll ? 'View Less' : 'View More'}</Text>
                </TouchableOpacity>
                <Image source={require('../assets/icons/more.png')} style={styles.highlightTitleMoreIcon} resizeMode='contain' />
              </View>
            </View>
            <View style={styles.reportContent}>
              <View style={styles.reportRow}>
                {weekReportToShow.map(item => (
                  <View key={item.id} style={styles.reportItem}>
                    <Text style={styles.reportItemTitle}>{item.title}</Text>
                    <Text style={styles.reportItemData}>{item.data}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <View style={styles.blogSection}>
            <View style={styles.highlightTitle}>
              <Text style={styles.highlightTitleText}>Blogs</Text>
              <View style={styles.highlightTitleMore}>
                <TouchableOpacity onPress={handleViewMoreLessBlogs}>
                  <Text style={styles.highlightTitleMoreText}>{showAll ? 'View Less' : 'View More'}</Text>
                </TouchableOpacity>
                <Image source={require('../assets/icons/more.png')} style={styles.highlightTitleMoreIcon} resizeMode='contain' />
              </View>
            </View>
            <View style={styles.blogContent}>
              <FlatList
                data={blogsToShow}
                renderItem={renderItem}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  logoImage: {
    width: 40,
    height: 40,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  bodyContainer: {
    marginHorizontal: 20,
  },
  sectionCalendar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionCalendarIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  sectionCalendarTitle: {
    fontSize: 14,
    color: '#565E6C',
    fontWeight: 'bold',
  },
  overviewSection: {},
  overviewTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,

  },
  overviewTitleText: {
    fontSize: 20,
    fontWeight: '600',
    marginRight: 10,
    fontFamily: 'Outfit, sans-serif',
  },
  overviewTitleAllData: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#686fea',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 8,
    overflow: 'hidden',
    gap: 4,
    borderStyle: 'solid',
  },
  overviewTitleAllDataIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  overviewTitleAllDataText: {
    fontSize: 14,
    color: '#686fea',
  },
  overviewContent: {
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f4f6f9',
  },
  contentWrapper: {
    flex: 1,
    marginTop: 9,
  },
  textContainer: {
    paddingLeft: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 36,
    color: 'rgba(23, 26, 31, 1)',
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    marginTop: 4,
    color: 'rgba(23, 26, 31, 1)',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  buttonText: {
    fontSize: 11,
    color: 'rgba(83, 92, 232, 1)',
    fontWeight: '400',
    lineHeight: 22,
  },
  buttonIcon: {
    width: 12,
    height: 12,
    marginLeft: 4,
  },
  scoreContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    width: 72,
    height: 72,
    position: 'relative',
    padding: 0,
    overflow: 'hidden',
  },

  scoreIcon: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  scoreText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    position: 'absolute',
    textAlign: 'center',
    lineHeight: 36,
  },
  highlightSection: {
    marginTop: 30,
  },
  highlightTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  highlightTitleText: {
    fontSize: 20,
    fontWeight: '600',
    marginRight: 10,
    fontFamily: 'Outfit, sans-serif',
  },
  highlightTitleMore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  highlightTitleMoreText: {
    fontSize: 14,
    color: '#686fea',
    marginRight: 10,
  },
  highlightTitleMoreIcon: {
    width: 15,
    height: 15,
  },
  highlightContent: {
    flexDirection: 'column',
  },
  highlightRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  highlightItem: {
    width: '48%',
    height: 180,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: 'left',
  },
  highlightItemTitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 20,
    marginBottom: 5
  },
  highlightItemData: {
    fontSize: 17,
    color: '#fff',
    fontWeight: '500',
  },
  highlightItemUpdated: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
    marginBottom: 5,

  },
  highlightItemIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
    marginLeft: 100,
  },
  reportSection: {
    marginTop: 30,
    marginBottom: 20,
  },
  reportContent: {
    flexDirection: 'column',
  },
  reportRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',

  },
  reportItem: {
    width: 166,
    height: 91,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'left',
    borderWidth: 1,
    borderColor: '#F1F2FD'
  },
  reportItemTitle: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 10,
  },
  reportItemData: {
    fontSize: 17,
    fontWeight: '500',
    marginLeft: 10,
  },
  blogContent: {
    flexDirection: 'row',
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderTopWidth: 1,
    display: 'flex',
    overflow: 'hidden',

  },
  footerItem: {
    alignItems: 'center',
    padding: 10,
    flex: 1
  },
  footerIcon: {
    width: 24,
    height: 24,
  },
  footerTitle: {
    marginTop: 5,
    fontSize: 12,
  },
});

export default HomeDashboard;
