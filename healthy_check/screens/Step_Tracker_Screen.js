import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, { Easing, withTiming, useSharedValue, useAnimatedProps } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { LineChart } from 'react-native-chart-kit';  // Assuming you're using this package for line charts

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircleProgress = ({ percentage, color, feColor = "#F4F6FA", radius, strokeWidth, cx, cy }) => {
    const circumference = 2 * Math.PI * radius;
    const progress = useSharedValue(0);

    const animatedProps = useAnimatedProps(() => {
        const strokeDashoffset = circumference - (progress.value / 100) * circumference;
        return {
            strokeDashoffset,
        };
    });

    useEffect(() => {
        progress.value = withTiming(percentage, { duration: 600 });
    }, [percentage]);

    return (
        <Svg width={2 * (radius + strokeWidth)} height={2 * (radius + strokeWidth)} viewBox={`0 0 ${2 * (radius + strokeWidth)} ${2 * (radius + strokeWidth)}`}>
            <Circle
                strokeWidth={strokeWidth}
                stroke={feColor}
                fill="transparent"
                r={radius}
                cx={cx}
                cy={cy}
            />
            <AnimatedCircle
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                animatedProps={animatedProps}
                strokeLinecap="round"
                stroke={color}
                fill="transparent"
                r={radius}
                cx={cx}
                cy={cy}
            />
        </Svg>
    );
};

const AnimatedStepsText = ({ targetSteps }) => {
    const [displaySteps, setDisplaySteps] = useState(0);
    const animatedSteps = useSharedValue(0);

    useEffect(() => {
        animatedSteps.value = withTiming(targetSteps, { duration: 600 });

        const interval = setInterval(() => {
            setDisplaySteps(Math.round(animatedSteps.value));
        }, 16); // Update every ~16ms (60fps)

        return () => clearInterval(interval);
    }, [targetSteps]);

    return (
        <Text style={styles.stepCountText}>
            {displaySteps.toLocaleString()}
        </Text>
    );
};

const StepTrackerScreen = ({ navigation }) => {
    const count = 10000;  // Example step count
    const goal = 18000;  // Goal
    const stepsPercentage = (count / goal) * 100;  // Progress percentage
    const circleData = [
        { Icon: require("../assets/icons/fire.png"), value: "950 kcal", percentage: 60, color: "#2ACCCF", feColor: "#d4f5f5" },
        { Icon: require("../assets/icons/map.png"), value: "7 km", percentage: 40, color: "#7B48CC", feColor: "#e5daf5" },
        { Icon: require("../assets/icons/min.png"), value: "120 mins", percentage: 80, color: "#535CE8", feColor: "#dddefa" },
    ];

    const [selectedTab, setSelectedTab] = useState("Weekly");
    const dataSets = {
        Today: [11000, 7000, 15000, 10000, 9000, 16000, 14000],
        Weekly: [9000, 11000, 13000, 8000, 9500, 17000, 15000],
        Monthly: [8000, 8500, 9000, 11000, 14000, 11000, 13000],
    };


    const chartData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                data: dataSets[selectedTab],
            },
        ],
    };

    const screenWidth = Dimensions.get('window').width;

    return (
        <ScrollView style={styles.container}>
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
                    <Text style={styles.stepsText}>Steps</Text>
                </View>
            </View>

            <View style={styles.bodyContainer}>
                <View style={styles.goalProgressContainer}>
                    <Text style={styles.goalProgressText}>
                        You have achieved <Text style={styles.highlightText}>{stepsPercentage.toFixed(0)}%</Text> of your goal today
                    </Text>
                </View>

                <View style={styles.stepsCounterContainer}>
                    <View style={styles.progressCircleContainer}>
                        <CircleProgress
                            percentage={stepsPercentage}
                            color={"#535CE8"}
                            radius={110}
                            strokeWidth={8}
                            cx={120}
                            cy={120}
                        />
                        <View style={styles.innerCircleContent}>
                            <View style={styles.stepImgContainer}>
                                <Image
                                    source={require("../assets/icons/steps.png")}
                                    style={{ width: 50, height: 50 }}
                                    accessibilityLabel="Step image"
                                    resizeMode='contain'
                                />
                            </View>
                            <View style={styles.stepCountContainer}>
                                <AnimatedStepsText targetSteps={count} />
                            </View>
                            <View style={styles.stepGoalContainer}>
                                <Text style={styles.stepGoalText}>Steps out of {(goal / 1000).toFixed(0)}k</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Circular icons */}
                <View style={styles.iconContainer}>
                    {circleData.map((item, index) => (
                        <View key={index} style={styles.iconWrapper}>
                            <View style={styles.svgContainer}>
                                <CircleProgress
                                    percentage={item.percentage}
                                    color={item.color}
                                    feColor={item.feColor}
                                    radius={32}
                                    strokeWidth={8}
                                    cx={40} // Center coordinate for a 64x64 SVG
                                    cy={40}
                                />
                                <Image
                                    source={item.Icon}
                                    style={styles.iconImage}
                                    accessibilityLabel={`Icon for ${item.value}`}
                                    resizeMode='contain'
                                />
                            </View>
                            <Text style={styles.iconText}>
                                {item.value}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Tabs and LineChart */}
                <View style={styles.tabContainer}>
                    <View style={styles.tabHeader}>
                        {["Today", "Weekly", "Monthly"].map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setSelectedTab(tab)}
                                style={[styles.tabButton, selectedTab === tab && styles.selectedTab]}
                            >
                                <Text style={[styles.tabText, selectedTab === tab && styles.selectedTabText]}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <LineChart
                        data={chartData}
                        width={screenWidth - 40} // Dynamic width based on screen
                        height={200}
                        chartConfig={{
                            backgroundColor: "#7C83ED",
                            backgroundGradientFrom: "#7C83ED",
                            backgroundGradientTo: "#7C83ED",
                            decimalPlaces: 0,
                            color: () => "#fff",
                            propsForLabels: {
                                fontSize: 12,
                                fontFamily: "Lato-Regular",
                            },
                            propsForBackgroundLines: {
                                strokeDasharray: "", // solid line
                                stroke: "#fff", // Color of horizontal lines
                            },
                            strokeWidth: 2,
                        }}
                        withHorizontalLines={false}
                        bezier
                        style={{
                            borderRadius: 10, // Add borderRadius here
                        }}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 1)",
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
    bodyContainer: {
        padding: 20,
    },
    goalProgressContainer: {
        width: '100%',
        alignItems: 'center', // Căn giữa nội dung theo chiều ngang
        justifyContent: 'center',
        padding: 30,
    },
    goalProgressText: {
        color: 'rgba(23, 26, 31, 1)',
        fontSize: 24,
        fontFamily: 'Outfit, sans-serif',
        fontWeight: '600',
        lineHeight: 36,
        textAlign: 'center',
    },
    highlightText: {
        color: "#535CE8",
    },
    stepsCounterContainer: {
        alignItems: 'center',
        justifyContent: "center",
        padding: 20,
    },
    progressCircleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircleContent: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepImgContainer: {
        width: 50,
        height: 50,
    },
    stepCountContainer: {
        marginTop: 10,
    },
    stepCountText: {
        fontSize: 30,
        fontWeight: '600',
    },
    stepGoalContainer: {
        marginTop: 10,
    },
    stepGoalText: {
        fontSize: 14,
        color: '#444',
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    iconWrapper: {
        alignItems: "center",
        justifyContent: "center",

    },
    svgContainer: {
        width: 64,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    iconImage: {
        position: 'absolute',
        width: 25,
        height: 25,
    },
    iconText: {
        marginTop: 8,
        fontSize: 12,
        fontWeight: '600',
    },
    tabContainer: {
        marginTop: 20,
        backgroundColor: "#7C83ED",
        borderRadius: 10,
    },
    tabHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    tabButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    selectedTab: {
        backgroundColor: "#535CE8",
    },
    tabText: {
        fontSize: 16,
        color: "#444",
        fontWeight: "600",
    },
    selectedTabText: {
        color: "#fff",
    },
});

export default StepTrackerScreen;
