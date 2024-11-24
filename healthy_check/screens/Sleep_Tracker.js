import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const data = {
    Today: [
        { label: "Mon", total: 100, progress: 34 },
        { label: "Tue", total: 100, progress: 78 },
        { label: "Wed", total: 100, progress: 56 },
        { label: "Thu", total: 100, progress: 12 },
        { label: "Fri", total: 100, progress: 98 },
        { label: "Sat", total: 100, progress: 64 },
        { label: "Sun", total: 100, progress: 43, isCurrent: true },
    ],
    Weekly: [
        { label: "Mon", total: 100, progress: 72 },
        { label: "Tue", total: 100, progress: 15 },
        { label: "Wed", total: 100, progress: 60 },
        { label: "Thu", total: 100, progress: 89 },
        { label: "Fri", total: 100, progress: 32 },
        { label: "Sat", total: 100, progress: 47 },
        { label: "Sun", total: 100, progress: 93, isCurrent: true },
    ],
    Monthly: [
        { label: "Mon", total: 100, progress: 9 },
        { label: "Tue", total: 100, progress: 76 },
        { label: "Wed", total: 100, progress: 88 },
        { label: "Thu", total: 100, progress: 42 },
        { label: "Fri", total: 100, progress: 5 },
        { label: "Sat", total: 100, progress: 53, isCurrent: true },
        { label: "Sun", total: 100, progress: 27 },
    ],
};

const SleepTracker = ({ navigation }) => {
    const [selectedTab, setSelectedTab] = useState("Weekly");

    const animatedHeights = data[selectedTab].map(() => useSharedValue(0));

    useEffect(() => {
        animatedHeights.forEach((height, index) => {
            height.value = withTiming((data[selectedTab][index].progress / data[selectedTab][index].total) * 200, {
                duration: 1000,
            });
        });
    }, [selectedTab]);

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

                    <View style={styles.stepsContainer}>
                        <Text style={styles.stepsText}>Sleep</Text>
                    </View>
                </View>
                <View style={styles.mainContent}>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerText}>
                            Your average time of sleep a day is
                            <Text style={styles.highlightText}> 7h 31 min </Text>
                        </Text>
                    </View>

                    {/* Tabs */}
                    <View style={styles.tabsContainer}>
                        {["Today", "Weekly", "Monthly"].map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setSelectedTab(tab)}
                                style={[
                                    styles.tab,
                                    selectedTab === tab && styles.activeTab,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        selectedTab === tab && styles.activeTabText,
                                    ]}
                                >
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Dynamic Bars */}
                    <View style={styles.barsContainer}>
                        {data[selectedTab].map((day, index) => {
                            // Animated style for each bar
                            const animatedStyle = useAnimatedStyle(() => {
                                return {
                                    height: animatedHeights[index].value,
                                };
                            });

                            return (
                                <View key={index} style={styles.barWrapper}>
                                    <View style={styles.barBackground}>
                                        <Animated.View
                                            style={[
                                                styles.bar,
                                                day.isCurrent ? styles.currentBar : styles.regularBar,
                                                animatedStyle,
                                            ]}
                                        />
                                    </View>
                                    <Text style={styles.barLabel}>{day.label}</Text>
                                </View>
                            );
                        })}
                    </View>

                    {/* Time */}
                    <View style={styles.timeContainer}>
                        <View style={styles.timeCard}>
                            <Text style={styles.timeCardTitle}>🌟 Sleep rate</Text>
                            <Text style={styles.timeCardValue}>82%</Text>
                        </View>
                        <View style={styles.timeCard}>
                            <Text style={styles.timeCardTitle}>😴 Deepsleep</Text>
                            <Text style={styles.timeCardValue}>1h 3min</Text>
                        </View>
                    </View>

                    {/* Schedule */}
                    <View style={styles.scheduleContainer}>
                        <View style={styles.scheduleHeader}>
                            <Text style={styles.scheduleTitle}>Schedule</Text>
                            <TouchableOpacity>
                                <Text style={styles.editButton}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.scheduleCardsContainer}>
                            <View style={styles.scheduleCard}>
                                <View style={styles.scheduleCardHeader}>
                                    <Image source={require('../assets/icons/bed-small.png')} style={styles.scheduleCardIcon} resizeMode="contain" />
                                    <Text style={styles.scheduleCardText}>Bedtime</Text>
                                </View>
                                <View style={styles.scheduleTimeContainer}>
                                    <Text style={styles.scheduleTime}>22:00</Text>
                                    <Text style={styles.schedulePeriod}>pm</Text>
                                </View>
                            </View>
                            <View style={[styles.scheduleCard, styles.wakeUpCard]}>
                                <View style={styles.scheduleCardHeader}>
                                    <Image source={require('../assets/icons/bell.png')} style={styles.scheduleCardIcon} resizeMode="contain" />
                                    <Text style={styles.scheduleCardText}>Wake up</Text>
                                </View>
                                <View style={styles.scheduleTimeContainer}>
                                    <Text style={styles.scheduleTime}>07:30</Text>
                                    <Text style={styles.schedulePeriod}>am</Text>
                                </View>
                            </View>
                        </View>
                    </View>
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
        color: "rgba(23, 26, 31, 1)",
        fontWeight: "500",
        textAlign: "center",
    },
    mainContent: {
        marginBottom: 32,
        paddingHorizontal: 20,
    },
    headerTextContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    headerText: {
        width: 250,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
        color: '#323842',
    },
    highlightText: {
        color: '#535CE8',
    },
    tabsContainer: {
        marginTop: 40,
        height: 36,
        flexDirection: 'row',
    },
    tab: {
        flex: 1,
        marginHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },
    activeTab: {
        backgroundColor: '#535CE8',
    },
    tabText: {
        fontSize: 14,
        color: '#7B7B7B',
    },
    activeTabText: {
        color: 'white',
    },
    barsContainer: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    barWrapper: {
        alignItems: 'center',
    },
    barBackground: {
        height: 200,
        width: 32,
        justifyContent: 'flex-end',
        backgroundColor: '#E6E6E6',
        borderRadius: 16,
    },
    bar: {
        width: '100%',
        borderRadius: 16,
    },
    currentBar: {
        backgroundColor: '#7C83ED',
    },
    regularBar: {
        backgroundColor: '#CACDF8',
    },
    barLabel: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 12,
        color: '#323842',
    },
    timeContainer: {
        marginTop: 36,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10
    },
    timeCard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
        borderRadius: 16,
        borderColor: '#e9e9eb',
        borderWidth: 1,
        backgroundColor: 'white',
        shadowColor: 'rgba(23, 26, 31, 0.20)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 3,
    },
    timeCardTitle: {
        fontSize: 12,
        color: '#323842',
    },
    timeCardValue: {
        marginTop: 4,
        fontSize: 18,
        fontWeight: '600',
        color: '#323842',
    },
    scheduleContainer: {
        marginTop: 40,
    },
    scheduleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    scheduleTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#323842',
    },
    editButton: {
        fontSize: 14,
        color: '#7B7B7B',
    },
    scheduleCardsContainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10
    },
    scheduleCard: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 16,
        paddingLeft: 16,
        height: 72,
        backgroundColor: '#7B48CC',
        shadowColor: 'rgba(23, 26, 31, 0.20)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 3,
    },
    wakeUpCard: {
        backgroundColor: '#2ACCCF',
    },
    scheduleCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    scheduleCardText: {
        fontSize: 12,
        color: 'white',
    },
    scheduleTimeContainer: {
        marginTop: 4,
        flexDirection: 'row',
        gap: 4,
    },
    scheduleTime: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
    },
    schedulePeriod: {
        fontSize: 12,
        color: 'white',
    },
});

export default SleepTracker;
