import { Image, ScrollView, Text, View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";
const days = [
    { label: "M", date: "06", duration: 10, content: "High chance of getting pregnant" },
    { label: "T", date: "07", duration: 9, content: "High chance of getting pregnant" },
    { label: "T", date: "09", duration: 8, content: "High chance of getting pregnant" },
    { label: "F", date: "10", duration: 7, content: "Low chance of getting pregnant" },
    { label: "S", date: "11", duration: 6, content: "Low chance of getting pregnant" },
    { label: "S", date: "12", duration: 5, content: "Low chance of getting pregnant" },
];


const CycleTracker = ({ navigation }) => {
    const [selectedDay, setSelectedDay] = useState(days[5]);
    const [showAll, setShowAll] = useState(false);
    const handleViewMoreLess = () => {
        setShowAll(prev => !prev);
    };
    const handleViewMoreLessReport = () => {
        setShowAllReport(prev => !prev);
    };
    const [showAllReport, setShowAllReport] = useState(false);
    const MenstrualHealthItem = ({ img, content }) => {
        return (
            <TouchableOpacity style={styles.menstrualHealthItem}>
                <Image source={img} style={styles.menstrualImage} resizeMode="cover" />
                <Text style={styles.menstrualText}>{content}</Text>
            </TouchableOpacity>
        );
    };

    const AnimatedStepsText = ({ targetSteps }) => {
        const [displaySteps, setDisplaySteps] = useState(0);
        const animatedSteps = useSharedValue(0);

        useEffect(() => {
            animatedSteps.value = withTiming(targetSteps, { duration: 500 });
            const interval = setInterval(() => {
                setDisplaySteps(Math.round(animatedSteps.value));
            }, 16); // Update every ~16ms (60fps)
            return () => clearInterval(interval);
        }, [targetSteps]);

        return <Text style={styles.stepsText}>{displaySteps} days</Text>;
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            resizeMode="contain"
                            source={require("../assets/icons/back.png")}
                            style={styles.leftArrow}
                            accessibilityLabel="Left arrow"
                        />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 40 }}>
                        <Text style={styles.stepsText}>Cycle tracking</Text>
                    </View>

                </View>
                <View style={styles.mainContent}>
                    <View style={styles.calendarContainer}>
                        {days.map((day, index) => (
                            <View key={index} style={styles.dayContainer}>
                                <Text style={styles.dayLabel}>{day.label}</Text>
                                <TouchableOpacity
                                    style={[
                                        styles.dayButton,
                                        selectedDay.date === day.date && styles.selectedDayButton,
                                    ]}
                                    onPress={() => setSelectedDay(day)}
                                >
                                    <Text
                                        style={[
                                            styles.dayText,
                                            selectedDay.date === day.date && styles.selectedDayText,
                                        ]}
                                    >
                                        {day.date}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>

                    <View style={styles.periodContainer}>
                        <Text style={styles.periodText}>Period in</Text>
                        <AnimatedStepsText targetSteps={selectedDay.duration} />
                        <Text style={styles.periodContent}>{selectedDay.content}</Text>
                        <TouchableOpacity style={styles.editButton}>
                            <Text style={styles.editButtonText}>Edit period dates</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.feelingContainer}>
                        <Text style={styles.feelingTitle}>How are you feeling today?</Text>
                        <View style={styles.feelingOptions}>
                            <TouchableOpacity style={styles.feelingOption}>
                                <View style={styles.feelingIcon}>
                                    <Image source={require("../assets/icons/note.png")} resizeMode="contain" style={styles.feelingImage} />
                                </View>
                                <Text style={styles.feelingOptionText}>
                                    Share your symptoms with us
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.feelingOption}>
                                <View style={[styles.feelingIcon, styles.dailyIcon]}>
                                    <Image source={require("../assets/icons/daily.png")} resizeMode="contain" style={styles.feelingImage} />
                                </View>
                                <Text style={styles.feelingOptionText}>
                                    Here's your daily insights
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.highlightTitle}>
                        <Text style={styles.highlightTitleText}>Menstrual health</Text>
                        <View style={styles.highlightTitleMore}>
                            <TouchableOpacity onPress={handleViewMoreLessReport}>
                                <Text style={styles.highlightTitleMoreText}>{showAllReport ? 'View Less' : 'View More'}</Text>
                            </TouchableOpacity>
                            <Image source={require('../assets/icons/more.png')} style={styles.highlightTitleMoreIcon} resizeMode='contain' />
                        </View>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.menstrualHealthContainer}>
                        <View style={styles.menstrualHealthItems}>
                            {Array(4).fill().map((_, index) => (
                                <View key={index}>
                                    <MenstrualHealthItem
                                        img={require("../assets/images/cycle-01.png")}
                                        content="Craving sweets on your period? Here's why & what to do about it"
                                    />
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        marginTop: 10,
        marginLeft: 20,
        width: 196,
        maxWidth: "100%",
        alignItems: "stretch",
        gap: 20,
        justifyContent: "space-between",
    },
    leftArrow: {
        position: "relative",
        display: "flex",
        marginTop: "auto",
        marginBottom: "auto",
        width: 16,
        flexShrink: 0,
        aspectRatio: 1,
    },

    stepsText: {
        fontFamily: "Outfit, sans-serif",
        fontSize: 20,
        color: "#fff",
        fontWeight: "500",
        textAlign: "center",
    },

    highlightTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 20,
        marginLeft: 40
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

    mainContent: {
        marginBottom: 32,
        paddingHorizontal: 20,
    },
    calendarContainer: {
        marginTop: 28,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dayContainer: {
        alignItems: 'center',
    },
    dayLabel: {
        fontSize: 14,
        color: '#424955',
    },
    dayButton: {
        marginTop: 6,
        height: 42,
        width: 42,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        backgroundColor: '#F8F9FA',
    },
    selectedDayButton: {
        backgroundColor: '#535CE8',
    },
    dayText: {
        fontSize: 16,
        color: '#323842',
    },
    selectedDayText: {
        color: '#F1F2FD',
    },
    periodContainer: {
        marginTop: 40,
        height: 270,
        width: 270,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 135,
        backgroundColor: '#7C83ED',
        justifyContent: 'center',
        shadowColor: 'rgba(23, 26, 31, 0.20)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 3,
    },
    periodText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#F1F2FD',
    },
    periodContent: {
        marginTop: 4,
        fontSize: 12,
        color: '#F1F2FD',
    },
    editButton: {
        marginTop: 24,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
        backgroundColor: 'white',
        paddingHorizontal: 12,
    },
    editButtonText: {
        fontSize: 14,
        color: '#535CE8',
    },
    feelingContainer: {
        marginTop: 42,
    },
    feelingTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#323842',
    },
    feelingOptions: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    feelingOption: {
        flex: 1,
        height: 118,
        borderRadius: 16,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        shadowColor: 'rgba(23, 26, 31, 0.20)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 3,
    },
    feelingIcon: {
        height: 44,
        width: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22,
        backgroundColor: '#F1F2FD',
    },
    dailyIcon: {
        backgroundColor: '#FFF4F0',
    },
    feelingOptionText: {
        marginTop: 4,
        fontSize: 12,
        textAlign: 'center',
        color: '#323842',
    },
    menstrualHealthContainer: {
        marginTop: 16,
    },
    menstrualHealthItems: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    menstrualHealthItem: {
        width: 226,
        alignItems: 'center',
        borderRadius: 16,
        borderColor: '#e9e9eb',
        borderWidth: 1,
        backgroundColor: 'white',
        paddingBottom: 15,
        shadowColor: 'rgba(23, 26, 31, 0.20)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 3,
    },
    menstrualImage: {
        height: 160,
        width: '100%',
    },
    menstrualText: {
        marginTop: 12,
        width: 190,
        fontSize: 16,
        fontWeight: '600',
        color: '#323842',
    },
});

export default CycleTracker;
